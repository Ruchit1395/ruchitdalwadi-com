#!/usr/bin/env node
/**
 * Automated LinkedIn comment session — real Chrome, OS-level automation.
 *
 * LinkedIn has no search/read API, so this uses Chrome's "Allow JavaScript
 * from Apple Events" (View > Developer) to read search results and click,
 * plus System Events keystrokes to type. Same detectability profile as a
 * human: real browser, real session, OS input.
 *
 * Usage: node --env-file=.env.local scripts/li-comment-session.mjs
 * Env: GEMINI_API_KEY
 * Rails: max 3/session, shares the 12/day cap in replied-log.csv, idle gate.
 */

import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { execSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(path.resolve(REPO));

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const MAX_SESSION = 3;
const MAX_DAY = 12;
const MIN_REACTIONS = 40;

const LANES = ["AI agents", "AI workflow", "LLM evals", "AI product management", "context engineering", "Claude Code"];

function osa(script) {
  return execFileSync("osascript", ["-e", script], { encoding: "utf8", timeout: 30000 }).trim();
}
function chromeJS(js) {
  const b64 = Buffer.from(js, "utf8").toString("base64");
  return osa(`tell application "Google Chrome" to execute front window's active tab javascript "eval(atob('${b64}'))"`);
}

// ---------- gates ----------
function todayRows() {
  if (!existsSync(`${DIR}/replied-log.csv`)) return [];
  const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
  return readFileSync(`${DIR}/replied-log.csv`, "utf8").trim().split("\n").slice(1)
    .filter((r) => r.startsWith(today) && !r.includes("failed-not-posted"));
}
if (todayRows().length >= MAX_DAY) { console.log("Daily cap reached."); process.exit(0); }

if (process.env.FORCE !== "1") {
  try {
    const idleNs = execSync("ioreg -c IOHIDSystem | awk '/HIDIdleTime/ {print $NF; exit}'", { encoding: "utf8" }).trim();
    if (parseInt(idleNs, 10) / 1e9 < 300) { console.log("Machine in use. Skipping."); process.exit(0); }
  } catch {}
}

const logRaw = existsSync(`${DIR}/replied-log.csv`) ? readFileSync(`${DIR}/replied-log.csv`, "utf8") : "";

// ---------- capability check ----------
osa(`tell application "Google Chrome" to activate`);
osa(`tell application "Google Chrome" to open location "https://www.linkedin.com/feed/"`);
await new Promise((r) => setTimeout(r, 8000));
try {
  const ok = chromeJS(`document.title`);
  if (!ok) throw new Error("empty");
} catch (e) {
  console.error("Chrome JavaScript-from-Apple-Events is OFF. Enable: Chrome > View > Developer > Allow JavaScript from Apple Events. Aborting cleanly.");
  try { osa(`tell application "System Events" to keystroke "w" using command down`); } catch {}
  process.exit(0);
}
if (chromeJS(`location.pathname.startsWith('/login') || document.querySelector('.sign-in-form') ? 'OUT' : 'IN'`) === "OUT") {
  console.error("Not logged into LinkedIn in Chrome. Aborting.");
  process.exit(0);
}

// ---------- scout via search page ----------
const lane = LANES[new Date().getDate() % LANES.length];
osa(`tell application "Google Chrome" to open location "https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(lane)}&sortBy=%22date_posted%22"`);
await new Promise((r) => setTimeout(r, 10000));
chromeJS(`window.scrollTo(0, 1200)`);
await new Promise((r) => setTimeout(r, 3000));

const rawPosts = chromeJS(`
(() => {
  const out = [];
  for (const el of document.querySelectorAll('[data-urn*="activity"], div.feed-shared-update-v2')) {
    const urn = (el.getAttribute('data-urn') || '').match(/urn:li:activity:\\d+/)?.[0];
    if (!urn) continue;
    const txt = el.innerText || '';
    const rx = txt.match(/([\\d,.]+[KM]?)\\s*(reactions|likes)|^([\\d,.]+)$/m);
    const reactions = txt.match(/([\\d,]+)\\s*\\n/);
    const author = (txt.split('\\n')[0] || '').slice(0, 60);
    out.push({ urn, author, snippet: txt.slice(0, 400).replace(/\\n/g, ' | ') });
    if (out.length >= 10) break;
  }
  return JSON.stringify(out);
})()
`);

let candidates = [];
try { candidates = JSON.parse(rawPosts); } catch { candidates = []; }
if (candidates.length === 0) {
  console.log(`No parseable posts for lane "${lane}".`);
  process.exit(0);
}
candidates = candidates.filter((c) => !logRaw.includes(c.urn));

// ---------- draft ----------
const contentRules = readFileSync(`${DIR}/CONTENT_RULES.md`, "utf8");
async function draft(c, prior, attempt = 0) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `You draft LinkedIn comments for Ruchit Dalwadi, operator/teacher in AI, startups, product.

${contentRules.slice(0, 5000)}

LinkedIn comment rules: 250-450 chars. Slightly warmer register than X, narrative allowed. Add ONE substantive thing: a frame, named test, war-story number, or sharp caveat. No links, no hashtags, no emoji, no em dashes. Never open with agreement words (Absolutely/Great post/So true/Love this). If the post is promotional fluff or you cannot add real value, output SKIP. Output ONLY the comment or SKIP.` }] },
        contents: [{ parts: [{ text: `LinkedIn post (author + snippet): ${c.author}\n${c.snippet}\n\nEarlier comments this session (vary shape):\n${prior.join("\n") || "none"}${attempt ? "\nPrevious draft rejected. Fix." : ""}` }] }],
        generationConfig: { maxOutputTokens: 1024, temperature: 0.9, thinkingConfig: { thinkingBudget: 0 } },
      }),
    },
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const d = await res.json();
  let text = (d.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim()
    .replace(/^["']|["']$/g, "").replace(/\s*[—–]\s*/g, ", ").replace(/[`$\\]/g, "'").trim();
  if (text === "SKIP") return null;
  const bad = text.length < 150 || text.length > 460 || /^(absolutely|totally|exactly|spot on|great|this[.!]|love|so true|100%)/i.test(text) || !/[.!?"]$/.test(text);
  if (bad && attempt < 2) return draft(c, prior, attempt + 1);
  return bad ? null : text;
}

// ---------- post ----------
const prior = [];
let posted = 0;
const budget = Math.min(MAX_SESSION, MAX_DAY - todayRows().length);

for (const c of candidates) {
  if (posted >= budget) break;
  try {
    const comment = await draft(c, prior);
    if (!comment) { console.log(`skip ${c.urn}: no clean draft`); continue; }

    const url = `https://www.linkedin.com/feed/update/${c.urn}/`;
    osa(`tell application "Google Chrome" to activate`);
    osa(`tell application "Google Chrome" to open location "${url}"`);
    await new Promise((r) => setTimeout(r, 9000 + Math.random() * 3000));

    // open the comment editor via the Comment button, then focus lands in it
    const clicked = chromeJS(`
(() => {
  const btn = [...document.querySelectorAll('button')].find(b => (b.getAttribute('aria-label')||'').match(/^Comment/i) || b.innerText.trim() === 'Comment');
  if (!btn) return 'NO_BUTTON';
  btn.click();
  return 'OK';
})()`);
    if (clicked !== "OK") { console.log(`skip ${c.urn}: comment button not found`); continue; }
    await new Promise((r) => setTimeout(r, 2500));
    chromeJS(`(() => { const ed = document.querySelector('.ql-editor[contenteditable="true"]'); if (ed) ed.focus(); return 'F'; })()`);
    await new Promise((r) => setTimeout(r, 800));

    osa(`tell application "System Events" to keystroke "${comment.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
    await new Promise((r) => setTimeout(r, 2000));

    const submitted = chromeJS(`
(() => {
  const btn = [...document.querySelectorAll('button')].find(b => b.className.includes('comments-comment-box__submit') || (b.innerText.trim() === 'Comment' && !b.disabled && b.closest('.comments-comment-box')));
  if (!btn) return 'NO_SUBMIT';
  btn.click();
  return 'OK';
})()`);
    if (submitted !== "OK") { console.log(`skip ${c.urn}: submit not found`); continue; }
    await new Promise((r) => setTimeout(r, 5000));

    // verify our text is now in the page
    const probe = comment.slice(0, 60);
    const verified = chromeJS(`document.body.innerText.includes(${JSON.stringify(JSON.stringify(probe)).slice(1, -1)}) ? 'YES' : 'NO'`);
    osa(`tell application "System Events" to keystroke "w" using command down`);

    if (verified !== "YES") {
      console.log(`NOT VERIFIED on ${c.urn}. Not counted.`);
      appendFileSync(`${DIR}/replied-log.csv`, `${new Date().toISOString()},${c.urn},${c.author.replace(/,/g, " ")},,failed-not-posted,${url}\n`);
      continue;
    }
    posted++;
    prior.push(comment);
    console.log(`posted on ${c.urn} (${c.author.slice(0, 30)})`);
    appendFileSync(`${DIR}/replied-log.csv`, `${new Date().toISOString()},${c.urn},${c.author.replace(/,/g, " ")},,li-verified,${url}\n`);
    if (posted < budget) await new Promise((r) => setTimeout(r, 90000 + Math.random() * 90000));
  } catch (err) {
    console.error(`failed on ${c.urn}: ${String(err.message).slice(0, 150)}`);
    try { osa(`tell application "System Events" to keystroke "w" using command down`); } catch {}
  }
}

if (posted > 0) {
  try {
    execSync(`git add ${DIR} && git commit -m "campaign: automated LinkedIn comment session (${posted} posted)" && git pull --rebase && git push`, { timeout: 90000 });
  } catch (e) { console.error("commit failed:", String(e.message).slice(0, 150)); }
}
console.log(`LinkedIn session done: ${posted} comments posted (lane: ${lane}).`);
