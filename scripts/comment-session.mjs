#!/usr/bin/env node
/**
 * Automated X comment session — runs unattended on a schedule (launchd).
 *
 * Flow: scout targets (twitterapi.io) → draft per CONTENT_RULES via Gemini →
 * post via Playwright (persistent logged-in profile) → verify via API →
 * log to replied-log.csv → commit.
 *
 * One-time setup:  node scripts/comment-session.mjs login
 *   (opens a headed browser; log into x.com manually; close when done)
 * Scheduled run:   node --env-file=.env.local scripts/comment-session.mjs
 *
 * Safety rails (mirror COMMENT_SESSION_RUNBOOK.md):
 *   max 5/session, max 12/day, 90-180s spacing, quality gates on drafts,
 *   no rooms outside the lanes, dedup via replied-log.csv.
 */

import { chromium } from "playwright"; // used only by cookies/login modes
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { execSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(path.resolve(REPO));

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const PROFILE = path.join(os.homedir(), ".x-comment-runner-profile");
const MAX_SESSION = 5;
const MAX_DAY = 12;

// ---------- cookie-inject mode ----------
// Usage: node scripts/comment-session.mjs cookies <auth_token> <ct0>
// Transplants an existing x.com session (from the user's real browser) into
// the runner profile, skipping the login flow entirely.
if (process.argv[2] === "cookies") {
  const [authToken, ct0] = [process.argv[3], process.argv[4]];
  if (!authToken || !ct0) { console.error("Usage: cookies <auth_token> <ct0>"); process.exit(1); }
  const ctx = await chromium.launchPersistentContext(PROFILE, { channel: 'chrome', headless: true });
  await ctx.addCookies([
    { name: "auth_token", value: authToken, domain: ".x.com", path: "/", httpOnly: true, secure: true, sameSite: "None" },
    { name: "ct0", value: ct0, domain: ".x.com", path: "/", httpOnly: false, secure: true, sameSite: "Lax" },
  ]);
  const page = await ctx.newPage();
  await page.goto("https://x.com/home", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(6000);
  const loggedIn = !page.url().includes("/login") &&
    (await page.locator('[data-testid="SideNav_AccountSwitcher_Button"]').count()) > 0;
  console.log(loggedIn ? "SESSION VERIFIED — runner is armed." : `NOT LOGGED IN — url: ${page.url()}`);
  await ctx.close();
  process.exit(loggedIn ? 0 : 1);
}

// ---------- login mode ----------
if (process.argv[2] === "login") {
  const ctx = await chromium.launchPersistentContext(PROFILE, { channel: 'chrome', headless: false, viewport: { width: 1280, height: 850 } });
  const page = await ctx.newPage();
  await page.goto("https://x.com/login");
  console.log("Log into x.com in the opened window. Close the browser window when done.");
  await new Promise((resolve) => ctx.on("close", resolve));
  console.log("Profile saved. Scheduled runs will reuse this login.");
  process.exit(0);
}

// ---------- gates ----------
function todayCount() {
  if (!existsSync(`${DIR}/replied-log.csv`)) return 0;
  const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
  return readFileSync(`${DIR}/replied-log.csv`, "utf8").trim().split("\n").slice(1)
    .filter((r) => r.startsWith(today)).length;
}
if (todayCount() >= MAX_DAY) {
  console.log(`Daily cap reached (${MAX_DAY}). Exiting.`);
  process.exit(0);
}
if (!existsSync(PROFILE)) {
  console.error("No login profile. Run: node scripts/comment-session.mjs login");
  process.exit(1);
}

// ---------- idle gate ----------
// OS-keystroke automation must not collide with a human at the keyboard.
// Scheduled runs proceed only if the machine has been idle 5+ minutes.
// Override for supervised test runs: FORCE=1
if (process.env.FORCE !== "1") {
  try {
    const idleNs = execSync("ioreg -c IOHIDSystem | awk '/HIDIdleTime/ {print $NF; exit}'", { encoding: "utf8" }).trim();
    const idleSec = parseInt(idleNs, 10) / 1e9;
    if (idleSec < 300) {
      console.log(`Machine in use (idle ${Math.round(idleSec)}s < 300s). Skipping session; launchd will try the next slot.`);
      process.exit(0);
    }
  } catch { /* if the check fails, proceed */ }
}

// ---------- scout ----------
let scoutOut = "";
try {
  scoutOut = execSync("node --env-file=.env.local scripts/scout-comment-targets.mjs 8", { encoding: "utf8", timeout: 120000 });
} catch (e) {
  console.error("scout failed:", e.message);
  process.exit(1);
}
if (scoutOut.includes("NO_TARGETS")) {
  console.log("No qualified targets this run.");
  process.exit(0);
}
const targets = [];
for (const block of scoutOut.split(/\n(?=\d+\. )/)) {
  const m = block.match(/@(\S+) \(([\d,]+) followers\).*?([\d,]+) views, (\d+) likes, (\d+) replies\n\s+(https:\/\/x\.com\/\S+\/status\/(\d+))\n\s+"([\s\S]*?)"\s*$/);
  if (m) targets.push({ author: m[1], url: m[6], id: m[7], views: m[3], text: m[8].slice(0, 300) });
}
if (targets.length === 0) {
  console.log("Could not parse targets.");
  process.exit(0);
}

// ---------- draft ----------
const contentRules = readFileSync(`${DIR}/CONTENT_RULES.md`, "utf8");
const OPENER_BAN = /^(absolutely|totally agree|exactly|spot on|great (point|post|take)|you hit the nail|agreed|so true|100%|couldn't agree|well said|this[.!]|love this)/i;
const SCAFFOLD_BAN = /(isn't just [^.]{3,40}, it's|the real (game|question|problem|shift) is|stop doing [^.]+\. start)/i;

async function draft(target, prior, attempt = 0) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `You draft X comments for Ruchit Dalwadi, operator/teacher in AI, startups, product (a decade across six industries).

${contentRules.slice(0, 5000)}

Comment rules: 150-240 chars. Add ONE thing the room lacks: a frame, named test, war-story number, sharp caveat, or dry observation. Answer their point in the first 10 words. No links/hashtags/emoji/em-dashes. Never open with agreement words. Output ONLY the comment.` }] },
        contents: [{ parts: [{ text: `Post by @${target.author}: "${target.text}"\n\nEarlier comments this session (use a different shape):\n${prior.join("\n") || "none"}${attempt ? "\n\nPrevious draft rejected by quality gate. Fix it." : ""}` }] }],
        generationConfig: { maxOutputTokens: 1024, temperature: 0.9, thinkingConfig: { thinkingBudget: 0 } },
      }),
    },
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const d = await res.json();
  let text = (d.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim()
    .replace(/^["']|["']$/g, "").replace(/\s*[—–]\s*/g, ", ").replace(/[\`$\\]/g, "'").trim();
  const bad = text.length < 100 || text.length > 240 || OPENER_BAN.test(text) || SCAFFOLD_BAN.test(text) || !/[.!?"]$/.test(text);
  if (bad && attempt < 2) return draft(target, prior, attempt + 1);
  return bad ? null : text;
}

// ---------- post (OS-level automation of real Chrome) ----------
// Playwright/CDP is detected by X (serves a static shell). System Events
// keystrokes into the user's real Chrome are indistinguishable from typing.
// Flow per target: open URL in Chrome -> "r" opens reply composer ->
// type comment -> Cmd+Enter submits -> Cmd+W closes tab.
function osa(script) {
  // execFileSync: no shell involved, so no backtick/quote injection from draft text
  return execFileSync("osascript", ["-e", script], { encoding: "utf8", timeout: 30000 });
}
function escAS(text) {
  return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const prior = [];
let posted = 0;
const budget = Math.min(MAX_SESSION, MAX_DAY - todayCount());

for (const target of targets) {
  if (posted >= budget) break;
  try {
    const comment = await draft(target, prior);
    if (!comment) { console.log(`skip @${target.author}: no clean draft`); continue; }

    osa(`tell application "Google Chrome" to activate`);
    osa(`tell application "Google Chrome" to open location "${target.url}"`);
    await new Promise((r) => setTimeout(r, 9000 + Math.random() * 3000));

    // re-assert focus, then "r" opens the reply composer on the main tweet
    osa(`tell application "Google Chrome" to activate`);
    await new Promise((r) => setTimeout(r, 800));
    osa(`tell application "System Events" to keystroke "r"`);
    await new Promise((r) => setTimeout(r, 2500));

    osa(`tell application "System Events" to keystroke "${escAS(comment)}"`);
    await new Promise((r) => setTimeout(r, 2000));

    // Cmd+Enter submits
    osa(`tell application "System Events" to key code 36 using command down`);
    await new Promise((r) => setTimeout(r, 4000));

    // close the tab
    osa(`tell application "System Events" to keystroke "w" using command down`);

    // in-loop verification: only count what actually landed
    await new Promise((r) => setTimeout(r, 6000));
    let verified = null;
    try {
      const vr = await fetch("https://api.twitterapi.io/twitter/user/last_tweets?userName=ruchitdalwadi&includeReplies=true",
        { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } });
      const vd = await vr.json();
      for (const t of (vd.data?.tweets ?? vd.tweets ?? []).slice(0, 8)) {
        if ((t.inReplyToId ?? "") === target.id) { verified = t.id; break; }
      }
    } catch {}
    if (!verified) {
      console.log(`NOT VERIFIED on @${target.author} — keystrokes may have missed. Not counted.`);
      appendFileSync(`${DIR}/replied-log.csv`,
        `${new Date().toISOString()},${target.id},${target.author},${String(target.views).replace(/,/g, "")},failed-not-posted,${target.url}\n`);
      continue;
    }

    posted++;
    prior.push(comment);
    console.log(`posted on @${target.author}: https://x.com/ruchitdalwadi/status/${verified}`);
    appendFileSync(`${DIR}/replied-log.csv`,
      `${new Date().toISOString()},${target.id},${target.author},${String(target.views).replace(/,/g, "")},${verified},https://x.com/ruchitdalwadi/status/${verified}\n`);

    if (posted < budget) await new Promise((r) => setTimeout(r, 90000 + Math.random() * 90000));
  } catch (err) {
    console.error(`failed on @${target.author}: ${String(err.message).slice(0, 150)}`);
    try { osa(`tell application "System Events" to keystroke "w" using command down`); } catch {}
  }
}

// ---------- verify ----------
if (posted > 0) {
  await new Promise((r) => setTimeout(r, 8000));
  try {
    const res = await fetch("https://api.twitterapi.io/twitter/user/last_tweets?userName=ruchitdalwadi&includeReplies=true",
      { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } });
    const d = await res.json();
    const tweets = d.data?.tweets ?? d.tweets ?? [];
    let log = readFileSync(`${DIR}/replied-log.csv`, "utf8");
    for (const t of tweets.slice(0, 15)) {
      const tid = t.inReplyToId ?? "";
      if (log.includes(`,${tid},`) && log.includes("pending-verify")) {
        log = log.replace(new RegExp(`(,${tid},[^,]*,[^,]*,)pending-verify,[^\n]*`),
          `$1${t.id},https://x.com/ruchitdalwadi/status/${t.id}`);
      }
    }
    const { writeFileSync } = await import("node:fs");
    writeFileSync(`${DIR}/replied-log.csv`, log);
  } catch (e) {
    console.error("verify pass failed (rows stay pending-verify):", e.message);
  }
  try {
    execSync(`git add ${DIR} && git commit -m "campaign: automated comment session (${posted} posted)" && git pull --rebase && git push`, { timeout: 90000 });
  } catch (e) {
    console.error("commit failed:", String(e.message).slice(0, 200));
  }
}
console.log(`Session done: ${posted} comments posted.`);
