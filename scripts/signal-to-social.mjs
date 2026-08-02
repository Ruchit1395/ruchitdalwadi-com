#!/usr/bin/env node
/**
 * Signal -> Social, collapsed to a single LLM pass (2026-07-12).
 *
 * Previous architecture: the Signal repo classified/researched/digested X
 * trends with 3 LLM stages for a personal digest nobody read anymore, then
 * this bridge ran a 4th LLM pass over the digest. Now:
 *
 *   X (twitterapi.io, live)  ->  engagement rank (no LLM)  ->  ONE Gemini
 *   Flash call (pick insight + fetch its source via url_context + write the
 *   X and LinkedIn posts)  ->  existing publishers
 *
 * Fetch is inline, so input is same-morning fresh by construction: no
 * cross-repo token, no freshness guard, no digest parsing.
 *
 * Output (with --write):
 *   content-bank/x/<today>/slot3.txt        (19:00 IST X post)
 *   content-bank/li/<today>/post.md         (14:30 IST LinkedIn post)
 *   content-bank/x/<today>/.signal-done     (idempotency for the retry cron)
 * Without --write: prints both for review. Gate failures always exit 0 —
 * the evergreen bank content is the fallback, never a bad post.
 *
 * Env: GEMINI_API_KEY, TWITTERAPIIO_KEY
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(path.resolve(REPO));
const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const TOPICS_LOG = `${DIR}/signal-topics-log.csv`;
const WRITE = process.argv.includes("--write");
const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);

for (const k of ["GEMINI_API_KEY", "TWITTERAPIIO_KEY"]) {
  if (!process.env[k]) { console.error(`${k} missing`); process.exit(1); }
}

// Idempotency: the 11:30 IST retry cron exits if the 09:45 run succeeded.
const doneMarker = `content-bank/x/${today}/.signal-done`;
if (existsSync(doneMarker)) { console.log("Signal post already generated today. Nothing to do."); process.exit(0); }

// ---------- fetch (no LLM) ----------
// Curated watchlist (from the retired Signal repo's config) + keyword lanes
// for voices outside it.
const WATCHLIST = [
  "AnthropicAI", "alexalbert__", "felixrieseberg", "steipete", "trq212",
  "OfficialLoganK", "_catwu", "bcherny", "Saboo_Shubham_", "unwind_ai_",
  "swyx", "danshipper", "MatthewBerman", "karpathy",
  "lennysan", "petergyang", "PawelHuryn", "ttorres", "clairevo", "ant_murphy", "shl",
  "CoFoundersNik", "boringmarketer", "starter_story", "iamgdsa", "carlvellotti",
  "hnshah", "sahilypatel", "gregisenberg", "arvidkahl", "levelsio",
];
const LANES = [
  '("AI agents" OR agentic OR "agent harness" OR evals) min_faves:200',
  '("Claude Code" OR Cursor OR "coding agent") (workflow OR shipped OR built) min_faves:150',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const H = { "X-API-Key": process.env.TWITTERAPIIO_KEY };
const cutoffMs = Date.now() - 26 * 3600 * 1000; // ~last day, small buffer

async function fetchJson(url) {
  try {
    const r = await fetch(url, { headers: H, signal: AbortSignal.timeout(30000) });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

const candidates = new Map();
function consider(t, source) {
  const a = t.author ?? {};
  const handle = a.userName ?? "";
  if (!handle || handle.toLowerCase() === "ruchitdalwadi") return;
  if (t.isReply) return;
  const created = t.createdAt ? new Date(t.createdAt).getTime() : 0;
  if (!created || created < cutoffMs) return;
  const text = t.text ?? "";
  if (text.length < 60) return;
  if (/(airdrop|giveaway|\$[A-Z]{2,5}\b|bitcoin|solana|stablecoin|web3|nft)/i.test(text)) return;
  if (/(worth more than|save (this|the article)|bookmark this|👇|thread 🧵|steal my|free course|\$\d+ course|read this before)/i.test(text)) return;
  const urls = (text.match(/https?:\/\/\S+/g) ?? []).slice(0, 3);
  candidates.set(t.id, {
    id: t.id,
    author: handle,
    followers: a.followers ?? 0,
    views: t.viewCount ?? 0,
    likes: t.likeCount ?? 0,
    text: text.slice(0, 500),
    urls,
    source,
    score: (t.viewCount ?? 0) + (t.likeCount ?? 0) * 100,
  });
}

console.log(`Fetching ${WATCHLIST.length} watchlist authors + ${LANES.length} lanes...`);
for (const h of WATCHLIST) {
  const d = await fetchJson(`https://api.twitterapi.io/twitter/user/last_tweets?userName=${h}`);
  for (const t of (d?.data?.tweets ?? d?.tweets ?? []).slice(0, 10)) consider(t, "watchlist");
  await sleep(1100);
}
for (const q of LANES) {
  const d = await fetchJson(
    `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Top&query=${encodeURIComponent(q + " -filter:replies lang:en within_time:24h")}`,
  );
  for (const t of (d?.tweets ?? []).slice(0, 10)) consider(t, "lane");
  await sleep(1100);
}

// ---------- rank (no LLM) ----------
// Watchlist posts get a boost: curated voices beat raw virality for our TG.
const ranked = [...candidates.values()]
  .map((c) => ({ ...c, rank: c.score * (c.source === "watchlist" ? 3 : 1) }))
  .sort((a, b) => b.rank - a.rank)
  .slice(0, 15);

if (ranked.length < 3) {
  console.log(`Only ${ranked.length} candidates fetched (API throttled?). Falling back to bank content.`);
  process.exit(0);
}
console.log(`${candidates.size} candidates, top ${ranked.length} kept. Best: @${ranked[0].author} (${ranked[0].views} views)`);

// ---------- dedupe context ----------
let recentTopics = [];
if (existsSync(TOPICS_LOG)) {
  recentTopics = readFileSync(TOPICS_LOG, "utf8").trim().split("\n").slice(1)
    .slice(-7).map((r) => r.split(",").slice(1, 2)[0]).filter(Boolean);
} else {
  writeFileSync(TOPICS_LOG, "date,topic,source_post_id,source_author\n");
}

const contentRules = readFileSync(`${DIR}/CONTENT_RULES.md`, "utf8");
const hookPlaybook = existsSync(`${DIR}/HOOK_PLAYBOOK.md`) ? readFileSync(`${DIR}/HOOK_PLAYBOOK.md`, "utf8") : "";

// ---------- generate: ONE call (select + read source + write both posts) ----------
const SYSTEM = `You turn today's live X trend candidates into PUBLIC social posts for Ruchit Dalwadi, an operator and teacher in AI, startups, and product (a decade shipping across six industries).

${contentRules}

${hookPlaybook.slice(0, 3000)}

YOUR JOB, in one pass:
1. From the candidate posts, pick the SINGLE most valuable insight for an audience of founders, PMs, operators, and AI builders.
2. If the chosen post links to a source, fetch and read it (you have the url_context tool) and ground the posts in the source's actual facts and numbers.
3. Write ONE X post and ONE LinkedIn post about it.

Selection rules:
- Prefer insights that are SAFE TO ASSERT: a specific result or number, a named technique or pattern, a concrete capability someone shipped. These are things you can teach with confidence.
- AVOID asserting a company's business, pricing, or strategy decision as fact from a single tweet; if the strongest item is company news, frame it as "the conversation this week around X" or pick a different insight.
- AVOID abstract/meta topics (signal vs noise, how to filter information).
- Skip anything resembling these recently-used topics: ${recentTopics.join(" | ") || "none yet"}.

Writing rules:

WHAT ACTUALLY WORKS (measured on Ruchit's own LinkedIn, not theory):
His best post earned 25,327 impressions. His next four earned 761, 665, 377 and 365. The 34x winner was this:
  "We hired someone brilliant last year. Day one, we gave her no laptop, no docs, no examples of past work, told her nothing about the customer, and left a sticky note that said 'make it pop.' Then we wrote 'not a good fit' in her review."
That post never mentions AI. It is secretly about how teams onboard AI, and the reader only realises it at the end.
The four that died all opened by announcing their topic: "A failure you fixed in March...", "The release of Claude Opus 5 brings a critical lesson...", "The demo worked in week one...", "The first 10 customers of a B2B AI startup...".

So, in order of importance:
1. OPEN WITH SOMETHING CONCRETE, NOT A CATEGORY. A specific situation, object or number beats an abstraction.
   CRITICAL LIMIT: you do NOT have access to Ruchit's life and may NEVER invent one. Do not write "we hired", "I watched", "a teammate of mine", "last week we", or any first-person story. The 25k example above worked because it actually happened to him; a fabricated version of it is worthless and dangerous. When you have no true story, open on the concrete specifics of the news itself (the actual thing shipped, the actual number, the actual behaviour) and stay in observational voice throughout.
2. DO NOT ANNOUNCE THE TOPIC IN THE FIRST LINE. Never open with "The release of X brings a lesson", "Here is what I learned about", "X is a critical lesson for anyone building". Make the reader arrive at the point; do not hand it to them.
3. LET THE INSIGHT LAND LATE. The strongest shape is a story or situation that seems to be about something ordinary, and turns out to be about the AI lesson. Delayed recognition is what makes people comment.
4. SENSORY, SPECIFIC DETAIL. Laptop, sticky note, "make it pop", a 2am page, a 400-line diff. Concrete nouns beat abstract ones.
5. NO JARGON IN THE FIRST TWO LINES. No "agentic", "system prompt", "eval harness" before the reader is hooked.
6. PRACTICAL PAYOFF STILL REQUIRED. After the hook lands, the reader must get something they can act on: the move, and what it gains them.

HARD FORMAT RULES:
- PLAIN TEXT ONLY. LinkedIn and X do not render markdown. Never use double-asterisk bold, single-asterisk italics, hash headings, or backtick code marks. Asterisks around words are the single most obvious sign a machine wrote the post.
- Never write a numbered list where each item begins with a bolded label. That structure is the most recognisable LLM shape there is. If you need a list, write plain sentences.
- Do not narrate your own structure: no "Here's what they found:", "Here are 3 takeaways:", "Let's break it down:".
- Do not end with a question aimed at farming replies ("What are you removing this week?", "Thoughts?"). End on the strongest line instead. At most one post in three may end on a genuine question.
- NEVER claim someone else's work, benchmark, test, or numbers as Ruchit's own. No "my benchmark", "I tested", "our numbers" for results from the candidates. Attribute neutrally: "a benchmark doing the rounds this week", "someone measured", "the reported numbers". Ruchit only speaks first-person about his own experience (opinions, what he'd do with it).
- No URLs or @handles in post bodies. You may say "someone shipped X" without linking.
- X post: 400-1200 chars, hook on line 1. LinkedIn post: 500-1400 chars, short paragraphs with whitespace, first two lines earn the click. The two must not be the same text reshaped.
- Zero em dashes. No hype. No banned openers or scaffolds.

Output STRICT JSON only, no markdown fences:
{"topic": "<one line: the insight you chose>", "source_id": "<id of the chosen candidate post>", "x": "<the X post>", "li": "<the LinkedIn post>"}`;

function candidateBlock(c, i) {
  return `[${i + 1}] id=${c.id} @${c.author} (${c.followers.toLocaleString()} followers, ${c.views.toLocaleString()} views, ${c.likes} likes, ${c.source})
"${c.text}"${c.urls.length ? "\nlinks: " + c.urls.join(" ") : ""}`;
}

async function generate(attempt = 0, lastFail = "") {
  const hint = lastFail
    ? `\n\nYour previous attempt was REJECTED for: ${lastFail}. Fix every one of those; pick a different insight if needed.`
    : "";
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ parts: [{ text: `Today's candidates (live from X, last 24h):\n\n${ranked.map(candidateBlock).join("\n\n")}${hint}` }] }],
        // url_context lets the model fetch the chosen post's linked source.
        // Tool use is incompatible with responseMimeType:application/json,
        // so we parse JSON out of the text response instead.
        tools: [{ url_context: {} }],
        generationConfig: { maxOutputTokens: 4096, temperature: 0.6, thinkingConfig: { thinkingBudget: 0 } },
      }),
    },
  );
  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const txt = (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
  let obj;
  try {
    const m = txt.match(/\{[\s\S]*\}/);
    obj = JSON.parse(m ? m[0] : txt);
  } catch {
    if (attempt < 4) return generate(attempt + 1, "output was not valid JSON");
    throw new Error("bad JSON from model");
  }
  // LinkedIn and X render no markdown: asterisks/headings/backticks would
  // appear literally and read as machine-written. Strip them defensively
  // rather than trusting the model to obey.
  const clean = (s) =>
    (s ?? "")
      .replace(/\s*[—–]\s*/g, ", ")
      .replace(/\*\*(.+?)\*\*/g, "$1")      // **bold**
      .replace(/(?<!\w)\*(?!\s)(.+?)(?<!\s)\*(?!\w)/g, "$1") // *italic*
      .replace(/^#{1,6}\s+/gm, "")            // ## headings
      .replace(/`([^`]+)`/g, "$1")             // `code`
      .replace(/^\s*[-*]\s+/gm, "")           // markdown bullets
      .trim();
  obj.x = clean(obj.x); obj.li = clean(obj.li);
  const reasons = (s, min, max) => {
    const r = [];
    if (!s) return ["empty"];
    if (s.length < min || s.length > max) r.push(`length ${s.length} not in ${min}-${max}`);
    if (/[—–]/.test(s)) r.push("em dash");
    if (/^(absolutely|most people|stop doing|this[.!]|great (post|point)|so true|exactly[.,])/i.test(s)) r.push("banned opener");
    if (/^(are|is|do|does|have|has|will|can|could|would|why|what|how|ever wonder|you'?re|still|ever)\b.*\?/i.test(s.split("\n")[0])) r.push("question-bait opener");
    if (/\bstop \w+ing\b[^.!?]{0,60}[.!?]\s*start \w+ing\b/i.test(s)) r.push("stop-start scaffold");
    if (/^\W*most (people|teams|founders|companies)\b/i.test(s.split("\n")[0])
        || /\bmost (people|teams|founders|companies) (think|believe|assume|still)\b/i.test(s)) r.push("most-people scaffold");
    if (/\bis ?n'?t (just |about |only )?.{2,60}?[.,;:] it'?s\b/i.test(s)
        || /\bit'?s not (just |about |only )?.{2,60}?[.,;:] it'?s\b/i.test(s)) r.push("isnt-X-its-Y scaffold");
    if (/[*#`]/.test(s)) r.push("markdown characters (platforms render none)");
    if (/\b\d{1,3}\s?%[^.]{0,90}\b(of (their|our|its|the) (team|engineers|staff|employees|developers))/i.test(s)
        || /\b(anthropic|openai|google|deepmind|meta|microsoft|mistral|xai)\b[^.]{0,70}\b(engineer|employee|insider|staffer|team member)\b[^.]{0,120}\d{1,3}\s?%/i.test(s)) {
      r.push("statistic about a named company's internal practice (third-hand, unverifiable)");
    }
    if (/^(the (release|launch|announcement) of|here'?s what|here are \d|a (critical|key|important) lesson)/i.test(s)) r.push("announces its own topic in the opening line");
    if (/\n\s*\d[.)]\s+\S+.{0,40}:/.test(s)) r.push("numbered list with labelled headers (classic LLM shape)");
    if (/\b(thoughts|agree|am i (wrong|right)|what do you think|what are you .{3,50}|which (one|side) are you .{0,30})\?\s*$/i.test(s)) r.push("reply-farming question ending");
    if (/\b(the real \w+ is|where the real \w+ is|hiding in plain sight)\b/i.test(s)) r.push("real-X scaffold");
    if (/(game[- ]changer|mind[- ]blowing|revolutionary|🚀|game changer)/i.test(s)) r.push("hype word");
    if (/\b(agree\?|thoughts\?|repost)/i.test(s)) r.push("engagement bait");
    if (/https?:\/\/|@\w+/.test(s)) r.push("url or handle in body");
    // Two distinct fabrications, both observed live:
    //  (a) claiming the source's results as Ruchit's own measurements
    //  (b) inventing a scene he witnessed ("I watched a teammate spend 20
    //      minutes...", 2026-08-01). Ruchit's real stories come from him, so
    //      the generator may never invent one.
    if (/\b(my|our) (benchmark|test|tests|experiment|numbers|data|bill|run)\b/i.test(s) || /\bI (tested|benchmarked|measured|ran (it|them|the))\b/i.test(s)) r.push("fabricated first-person claim (results belong to the source, not Ruchit)");
    if (/\b(we|i) (hired|fired|built|shipped|launched|switched|migrated|rewrote|spent|gave|measured|watched|saw|sat with|met|tried|ran) \b/i.test(s)
        || /\bI (watched|saw|sat with|met|overheard|walked into|spent \w+ (hours?|minutes?|days?))\b/i.test(s)
        || /\b(a|my) (teammate|colleague|friend|client|founder I|engineer I)\b/i.test(s)
        || /\b(last|this) (week|month|year),? I\b/i.test(s)) r.push("invented personal anecdote (generator cannot author Ruchit's memories)");
    // Genuinely private terms only. n8n/supabase/tally were removed 2026-08-01:
    // they guarded the retired private digest; with live public tweets as input
    // they are ordinary public tools and blocked legitimate trend topics.
    {
      const leak = s.match(/\b(nestwise|threadsweep|career-ops|constructor\.io|constructor trial|anthropic interview|job application|your goals|my goals|micro-saas portfolio)\b/i);
      if (leak) r.push(`private-context leak (${leak[1]})`);
    }
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
  console.log(`No clean Signal post today (${String(err.message).slice(0, 160)}). Falling back to bank content.`);
  process.exit(0);
}

const chosen = ranked.find((c) => c.id === String(out.source_id)) ?? ranked[0];
console.log(`\n=== TOPIC ===\n${out.topic}`);
console.log(`=== SOURCE ===\n@${chosen.author}: https://x.com/${chosen.author}/status/${chosen.id}\n`);
console.log(`=== X (${out.x.length} chars) ===\n${out.x}\n`);
console.log(`=== LINKEDIN (${out.li.length} chars) ===\n${out.li}\n`);

if (WRITE) {
  mkdirSync(`content-bank/x/${today}`, { recursive: true });
  mkdirSync(`content-bank/li/${today}`, { recursive: true });
  writeFileSync(`content-bank/x/${today}/slot3.txt`, out.x + "\n");
  writeFileSync(`content-bank/li/${today}/post.md`, out.li + "\n");
  writeFileSync(doneMarker, `${new Date().toISOString()} | ${out.topic}\n`);
  appendFileSync(TOPICS_LOG, `${today},"${String(out.topic).replace(/"/g, "'")}",${chosen.id},${chosen.author}\n`);
  console.log(`Wrote content-bank/x/${today}/slot3.txt and content-bank/li/${today}/post.md`);
}
