#!/usr/bin/env node
/**
 * Publishes the due content-bank X slot through the real browser (launchd).
 *
 * Why not the API: as of 2026-08-01, API-published posts on this account
 * plateaued under 50 impressions each, consistent with pay-per-use API posts
 * being deprioritized in ranking. Same content, same slots, browser transport.
 *
 * Mirrors scripts/publish-due-slot.mjs exactly on the content contract
 * (slot windows, posted.json state, post-stats-registry.md row) so the
 * scoreboard/digest pipeline is unchanged. Posting mechanics mirror
 * scripts/comment-session.mjs: OS-level keystrokes into the user's real
 * Chrome (Playwright/CDP is detected by X), idle gate, in-loop API
 * verification via twitterapi.io (read-only), git commit of state.
 *
 * Text entry is clipboard+Cmd+V (posts are long and multi-paragraph;
 * per-character keystrokes drop newlines). The previous clipboard text is
 * restored afterwards. Threads post part 1 via the composer, then each
 * later part as a self-reply via the proven "r" reply flow.
 *
 * Env: TWITTERAPIIO_KEY. Override idle gate: FORCE=1. Dry run: DRY=1
 * (opens composer, pastes, then discards instead of submitting).
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { execSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(path.resolve(REPO));

const IST_OFFSET_MIN = 330;
const now = new Date(Date.now() + IST_OFFSET_MIN * 60 * 1000);
const today = now.toISOString().slice(0, 10);
const istMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

const dir = path.join("content-bank", "x", today);
const stateFile = path.join(dir, "posted.json");
const registry = "distribution/first-ten-customers-for-a-b2b-ai-startup/post-stats-registry.md";
const DRY = process.env.DRY === "1";

if (!process.env.TWITTERAPIIO_KEY && !DRY) {
  console.error("TWITTERAPIIO_KEY missing (needed to verify posts landed)");
  process.exit(1);
}
if (!existsSync(dir)) {
  console.log(`No content bank for ${today} — nothing to publish.`);
  process.exit(0);
}

const state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};

const SLOTS = [
  { key: "slot1", opensAt: 0 },
  { key: "slot2", opensAt: 12 * 60 },
  { key: "slot3", opensAt: 17 * 60 },
];

function slotFile(key) {
  const threadPath = path.join(dir, `${key}.thread.json`);
  const textPath = path.join(dir, `${key}.txt`);
  if (existsSync(threadPath)) return { path: threadPath, type: "thread" };
  if (existsSync(textPath)) return { path: textPath, type: "text" };
  return null;
}

const due = process.env.FORCE_SLOT
  ? SLOTS.find((s) => s.key === `slot${process.env.FORCE_SLOT}`)
  : SLOTS.find((s) => !state[s.key] && istMinutes >= s.opensAt && slotFile(s.key));

if (!due || (state[due.key] && !process.env.FORCE_SLOT)) {
  console.log("No due unposted slot right now.");
  process.exit(0);
}
const file = slotFile(due.key);
if (!file) {
  console.log(`${due.key} has no content file.`);
  process.exit(0);
}

// ---------- idle gate (same as comment-session) ----------
if (process.env.FORCE !== "1" && !DRY) {
  try {
    const idleNs = execSync("ioreg -c IOHIDSystem | awk '/HIDIdleTime/ {print $NF; exit}'", { encoding: "utf8" }).trim();
    const idleSec = parseInt(idleNs, 10) / 1e9;
    if (idleSec < 180) {
      console.log(`Machine in use (idle ${Math.round(idleSec)}s < 180s). Skipping; next launchd slot will catch up.`);
      process.exit(0);
    }
  } catch { /* if the check fails, proceed */ }
}

// ---------- browser helpers ----------
function osa(script) {
  return execFileSync("osascript", ["-e", script], { encoding: "utf8", timeout: 30000 });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function setClipboard(text) {
  execFileSync("pbcopy", [], { input: text });
}
function getClipboard() {
  try { return execSync("pbpaste", { encoding: "utf8" }); } catch { return null; }
}

const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();

// Verify a just-submitted post landed: look for its opening text in the
// account's recent tweets. Returns the status id or null.
async function verifyPosted(text, { asReplyTo = null } = {}) {
  if (DRY) return "dry-run";
  await sleep(8000);
  const want = norm(text).slice(0, 60);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch("https://api.twitterapi.io/twitter/user/last_tweets?userName=ruchitdalwadi&includeReplies=true",
        { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } });
      const d = await r.json();
      for (const t of (d.data?.tweets ?? d.tweets ?? []).slice(0, 10)) {
        if (asReplyTo && (t.inReplyToId ?? "") !== asReplyTo) continue;
        if (norm(t.text ?? "").startsWith(want.slice(0, 40))) return t.id;
      }
    } catch { /* retry */ }
    await sleep(7000);
  }
  return null;
}

// Paste text into the focused composer and submit (or discard in DRY mode).
async function pasteAndSubmit(text) {
  setClipboard(text);
  osa(`tell application "System Events" to keystroke "v" using command down`);
  await sleep(2500);
  if (DRY) {
    // Discard without touching the composer: navigating away leaves X's
    // native "Leave site?" confirm, which Esc cannot dismiss and which blocks
    // Chrome modally (observed 2026-08-01, stalled the browser until cleared).
    // Clear the field first, then leave, then accept any confirm with Return.
    osa(`tell application "System Events" to keystroke "a" using command down`);
    await sleep(400);
    osa(`tell application "System Events" to key code 51`); // delete
    await sleep(800);
    osa(`tell application "Google Chrome" to set URL of active tab of front window to "about:blank"`);
    await sleep(1500);
    try { osa(`tell application "System Events" to key code 36`); } catch {}
    return;
  }
  osa(`tell application "System Events" to key code 36 using command down`);
  await sleep(5000);
}

// ---------- publish ----------
const parts = file.type === "thread"
  ? JSON.parse(readFileSync(file.path, "utf8"))
  : [readFileSync(file.path, "utf8").trim()];

console.log(`Posting ${due.key} (${file.type}, ${parts.length} part${parts.length > 1 ? "s" : ""}) via browser${DRY ? " [DRY]" : ""}...`);

const prevClipboard = getClipboard();
const posted = [];
try {
  // Part 1: compose from scratch. x.com/compose/post opens the composer overlay.
  osa(`tell application "Google Chrome" to activate`);
  osa(`tell application "Google Chrome" to open location "https://x.com/compose/post"`);
  await sleep(10000 + Math.random() * 3000);
  osa(`tell application "Google Chrome" to activate`);
  await sleep(800);
  await pasteAndSubmit(parts[0]);

  const rootId = await verifyPosted(parts[0]);
  if (!rootId) {
    console.error("NOT VERIFIED: part 1 did not appear on the timeline. Aborting (state untouched, next run retries).");
    try { osa(`tell application "System Events" to keystroke "w" using command down`); } catch {}
    process.exit(1);
  }
  posted.push(rootId);

  // Later parts: self-reply chain via the proven reply flow.
  let replyTo = rootId;
  for (const part of parts.slice(1)) {
    if (DRY) break;
    await sleep(4000);
    osa(`tell application "Google Chrome" to open location "https://x.com/ruchitdalwadi/status/${replyTo}"`);
    await sleep(9000 + Math.random() * 3000);
    osa(`tell application "Google Chrome" to activate`);
    await sleep(800);
    osa(`tell application "System Events" to keystroke "r"`);
    await sleep(2500);
    await pasteAndSubmit(part);
    const id = await verifyPosted(part, { asReplyTo: replyTo });
    if (!id) {
      console.error(`NOT VERIFIED: thread part ${posted.length + 1}. Stopping the chain; posted parts stay up.`);
      break;
    }
    posted.push(id);
    replyTo = id;
  }

  // Close the working tab.
  try { osa(`tell application "System Events" to keystroke "w" using command down`); } catch {}
} finally {
  if (prevClipboard !== null) { try { setClipboard(prevClipboard); } catch {} }
}

if (DRY) {
  console.log("DRY RUN OK: composer opened, text pasted, draft discarded. No post submitted.");
  process.exit(0);
}

// ---------- record (same contract as publish-due-slot.mjs) ----------
state[due.key] = { ids: posted, at: new Date().toISOString(), via: "browser" };
writeFileSync(stateFile, JSON.stringify(state, null, 2));

const rootId = posted[0];
const url = `https://x.com/ruchitdalwadi/status/${rootId}`;
const row = `| ${today}-${due.key} | X | native_post | ${rootId} | ${url} |  | ${new Date(Date.now() + IST_OFFSET_MIN * 60000).toISOString().replace("Z", "+05:30")} | browser runner |  |  |  |  |  | active | Auto-published from content bank via browser (${file.type}${posted.length > 1 ? `, ${posted.length} parts` : ""}). |`;
appendFileSync(registry, row + "\n");

try {
  execSync(`git add content-bank distribution && git commit -m "campaign: browser-published ${due.key} ${today}" && git pull --rebase && git push`, { timeout: 90000 });
} catch (e) {
  console.error("commit failed (state saved locally):", String(e.message).slice(0, 200));
}

console.log(`Published ${due.key} (${file.type}) → ${url}${posted.length < parts.length ? ` [WARNING: only ${posted.length}/${parts.length} parts verified]` : ""}`);
