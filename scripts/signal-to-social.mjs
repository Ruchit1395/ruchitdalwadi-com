#!/usr/bin/env node
/**
 * Signal -> Social bridge.
 *
 * Reads the latest digest from the Signal trend pipeline, extracts the single
 * most publicly-compelling insight, and writes ONE X post + ONE LinkedIn post
 * in Ruchit's voice (per CONTENT_RULES). These become the day's timely,
 * receipts-grounded posts, replacing the evergreen bank slot for the day.
 *
 * Digest source (in order):
 *   1. env SIGNAL_DIGEST_TEXT (raw markdown, used by CI after fetching)
 *   2. local sibling repo ../signal/digests/*.md (newest) - for local runs
 *   3. GitHub API on Ruchit1395/signal using SIGNAL_REPO_TOKEN - for CI
 *
 * Output (with --write):
 *   content-bank/x/<today>/slot3.txt        (19:00 IST X post)
 *   content-bank/li/<today>/post.md         (14:30 IST LinkedIn post)
 * Without --write: prints both to stdout for review.
 *
 * Env: GEMINI_API_KEY (+ SIGNAL_REPO_TOKEN in CI). Never posts directly;
 * the existing publishers pick these up.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(path.resolve(REPO));
const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const WRITE = process.argv.includes("--write");
const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);

if (!process.env.GEMINI_API_KEY) { console.error("GEMINI_API_KEY missing"); process.exit(1); }

// ---------- get the digest ----------
async function getDigest() {
  if (process.env.SIGNAL_DIGEST_TEXT) return process.env.SIGNAL_DIGEST_TEXT;
  const sibling = path.resolve(REPO, "../signal/digests");
  if (existsSync(sibling)) {
    const files = readdirSync(sibling).filter((f) => f.endsWith(".md")).sort().reverse();
    if (files.length) return readFileSync(path.join(sibling, files[0]), "utf8");
  }
  const token = process.env.SIGNAL_REPO_TOKEN;
  if (token) {
    // find newest digest via the contents API, then fetch raw
    const list = await fetch("https://api.github.com/repos/Ruchit1395/signal/contents/digests", {
      headers: { Authorization: `token ${token}`, "User-Agent": "signal-bridge" },
    });
    if (list.ok) {
      const files = (await list.json()).filter((f) => f.name.endsWith(".md")).map((f) => f.name).sort().reverse();
      if (files.length) {
        const raw = await fetch(`https://api.github.com/repos/Ruchit1395/signal/contents/digests/${files[0]}`, {
          headers: { Authorization: `token ${token}`, "User-Agent": "signal-bridge", Accept: "application/vnd.github.raw" },
        });
        if (raw.ok) return raw.text();
      }
    }
  }
  return null;
}

const digestRaw = await getDigest();
if (!digestRaw) { console.error("No Signal digest available. Skipping."); process.exit(0); }

// Strip the digest to PUBLIC trend facts only. The digest interleaves public
// facts ("What:") with Ruchit's private framing ("Why it matters to you:",
// "Apply (for your ... goal):"). Those private sections leak job-hunt and
// side-project context into public posts, so we keep only the section titles,
// the "What:" facts, and the "Worth a look" items.
function publicFactsOnly(md) {
  const lines = md.split("\n");
  const kept = [];
  let inWorthALook = false;
  for (const line of lines) {
    const t = line.trim();
    if (/^##\s+Worth a look/i.test(t)) { inWorthALook = true; kept.push(line); continue; }
    if (/^##\s/.test(t) && !/worth a look/i.test(t)) inWorthALook = false;
    if (/^###\s/.test(t)) { kept.push(line); continue; }                 // trend titles
    if (/^\*\s*\*\*What:\*\*/i.test(t)) { kept.push(line); continue; }    // the public fact
    if (inWorthALook && /^\*/.test(t)) { kept.push(line); continue; }     // outside-watchlist finds
  }
  const out = kept.join("\n").trim();
  // guard: if stripping produced too little, fall back to the raw digest head
  return out.length > 200 ? out : md.slice(0, 4000);
}
const digest = publicFactsOnly(digestRaw);

const contentRules = readFileSync(`${DIR}/CONTENT_RULES.md`, "utf8");
const hookPlaybook = existsSync(`${DIR}/HOOK_PLAYBOOK.md`) ? readFileSync(`${DIR}/HOOK_PLAYBOOK.md`, "utf8") : "";

// ---------- generate ----------
const SYSTEM = `You turn a private trend-intelligence digest into PUBLIC social posts for Ruchit Dalwadi, an operator and teacher in AI, startups, and product (a decade shipping across six industries).

${contentRules}

${hookPlaybook.slice(0, 3000)}

CRITICAL translation rules:
- The digest is Ruchit's PRIVATE research, framed as "how to apply this to your work" (job applications, his side projects like Nestwise/Bloom/ThreadSweep, his interviews). NONE of that private framing goes public. Never mention job applications, interviews, specific personal side-project names, or "your work".
- Prefer insights that are SAFE TO ASSERT: a specific result or number (e.g. an agent resolving 32 of 34 support tickets autonomously), a named technique or pattern (a "test backwards from the customer bug" loop; a startup-handshake that fixes agent amnesia), or a concrete capability. These are techniques you can teach with confidence.
- AVOID asserting a company's business, pricing, or strategy decision as fact (e.g. "Anthropic unbundled X from Y"). The digest is a second-hand summary of a single tweet; if the claim is wrong, it damages credibility. If the strongest insight is company news, either frame it as "the conversation this week around X" without asserting the underlying fact, or skip it for a technique insight instead.
- AVOID abstract/meta posts about "signal vs noise", pipeline architecture, or "how to filter information" - those read as generic. Write Ruchit's OPERATOR POV on the concrete technique: what it means for people building AI products, what to actually do, where the trap is.
- Ground every post in that real specific receipt. A busy founder should think "only someone paying attention this week would know that."
- Do NOT include URLs or @handles in the post body (X charges 13x for link posts and suppresses them). You may reference "someone shipped X" without linking.
- X post: 500-1200 chars, long-form, hook on line 1, one concrete takeaway or step. LinkedIn post: 500-1400 chars, narrative, short paragraphs, first 2 lines earn the click.
- Both must pass the six-axis quality gate. Zero em dashes. No banned openers (Absolutely/Most people/Stop doing/This/Great). Different shape from each other.

Output STRICT JSON only: {"topic": "<one line: which insight you chose>", "x": "<the X post>", "li": "<the LinkedIn post>"}`;

async function generate(attempt = 0, lastFail = "") {
  const hint = lastFail
    ? `\n\nYour previous attempt was REJECTED for: ${lastFail}. Write a completely different post that fixes every one of those. Pick a different insight if needed.`
    : "";
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ parts: [{ text: `Today's Signal digest (public trend facts only):\n\n${digest.slice(0, 12000)}${hint}` }] }],
        generationConfig: { maxOutputTokens: 4096, temperature: 0.6, thinkingConfig: { thinkingBudget: 0 }, responseMimeType: "application/json" },
      }),
    },
  );
  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const txt = (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
  let obj;
  try { obj = JSON.parse(txt); } catch { if (attempt < 4) return generate(attempt + 1, "invalid JSON output"); throw new Error("bad JSON from model"); }
  const clean = (s) => (s ?? "").replace(/\s*[—–]\s*/g, ", ").trim();
  obj.x = clean(obj.x); obj.li = clean(obj.li);
  const reasons = (s, min, max) => {
    const r = [];
    if (!s) return ["empty"];
    if (s.length < min || s.length > max) r.push(`length ${s.length} not in ${min}-${max}`);
    if (/[—–]/.test(s)) r.push("em dash");
    if (/^(absolutely|most people|stop doing|this[.!]|great (post|point)|so true|exactly[.,])/i.test(s)) r.push("banned opener");
    if (/^(are|is|do|does|have|has|will|can|could|would|why|what|how|ever wonder)\b.*\?/i.test(s.split("\n")[0])) r.push("question-bait opener");
    if (/\bstop (building|doing|sifting|scrolling) .{0,40}?\.?\s*(build|start)\b/i.test(s)) r.push("stop-start scaffold");
    if (/\bmost (people|teams)\b/i.test(s)) r.push("most-people scaffold");
    if (/\bis ?n'?t just .{2,40}?[.,] it'?s\b/i.test(s)) r.push("isnt-just scaffold");
    if (/\bthe real (game|problem|question) is\b/i.test(s)) r.push("real-X scaffold");
    if (/(game[- ]changer|mind[- ]blowing|revolutionary|🚀|game changer)/i.test(s)) r.push("hype word");
    if (/\b(agree\?|thoughts\?|repost)/i.test(s)) r.push("engagement bait");
    // private-context leak: names and framings that must never go public
    if (/\b(nestwise|bloom|threadsweep|career-ops|constructor\.io|constructor trial|anthropic interview|job application|n8n|tally form|supabase|your goals|my goals|micro-saas portfolio)\b/i.test(s)) r.push("private-context leak");
    return r;
  };
  const xr = reasons(obj.x, 350, 1300), lr = reasons(obj.li, 350, 1600);
  if ((xr.length || lr.length) && attempt < 4) {
    return generate(attempt + 1, `X: [${xr.join(", ") || "ok"}] | LI: [${lr.join(", ") || "ok"}]`);
  }
  if (xr.length || lr.length) throw new Error(`quality gate failed after retries. X:[${xr}] LI:[${lr}]`);
  return obj;
}

let out;
try {
  out = await generate();
} catch (err) {
  // A gate failure is SAFE: we simply don't produce a Signal post today, and
  // the evergreen content bank stays as the fallback. Never exit non-zero
  // (that would fail the workflow); log and skip.
  console.log(`No clean Signal post today (${String(err.message).slice(0, 160)}). Falling back to bank content.`);
  process.exit(0);
}

console.log(`\n=== TOPIC ===\n${out.topic}\n`);
console.log(`=== X (${out.x.length} chars) ===\n${out.x}\n`);
console.log(`=== LINKEDIN (${out.li.length} chars) ===\n${out.li}\n`);

if (WRITE) {
  mkdirSync(`content-bank/x/${today}`, { recursive: true });
  mkdirSync(`content-bank/li/${today}`, { recursive: true });
  writeFileSync(`content-bank/x/${today}/slot3.txt`, out.x + "\n");
  // signal post replaces any thread for slot3 (thread files live at slot2)
  writeFileSync(`content-bank/li/${today}/post.md`, out.li + "\n");
  console.log(`Wrote content-bank/x/${today}/slot3.txt and content-bank/li/${today}/post.md`);
}
