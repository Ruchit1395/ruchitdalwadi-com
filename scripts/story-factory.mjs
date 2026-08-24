#!/usr/bin/env node
/**
 * Weekly story factory (2026-08-16) — the corrected content engine.
 *
 * The measured truth of Jul-Aug 2026: ~50 machine posts produced exactly one
 * outlier (25,327 impressions, 34x median), and it was a story: human
 * protagonist, concrete props, hidden topic, late reveal. The daily pipeline
 * shipped its single cheap draft every day with zero selection pressure.
 * Variance games are won by generating MANY candidates and shipping FEW.
 *
 * This factory, weekly (Sunday):
 *   1. Generates 18 story-form candidates at high effort (Gemini Pro),
 *      across three modes:
 *        a: invented first-person parable (the measured winner's mode)
 *        b: same craft, honest hypothetical framing ("Picture the new hire...")
 *        c: Ruchit's real stories from STORY_BANK.md (when material exists)
 *   2. Judges all candidates (hook, concreteness, late reveal, payoff,
 *      outlier odds, 6-axis rubric) and ranks.
 *   3. Ships the top 3 into next week's Mon/Wed/Fri content bank (LI + X),
 *      max 2 per mode for diversity. The other 15 die unpublished.
 *   4. Telegram preview with veto instructions. Full scored list kept in
 *      distribution/.../factory-picks/.
 *
 * No twitterapi.io dependency: story posts are evergreen by design.
 * Publishing stays with the existing runners (bank contract unchanged).
 *
 * Env: GEMINI_API_KEY. Optional: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
 * Usage: node scripts/story-factory.mjs [--dry]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(path.resolve(REPO));
const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const DRY = process.argv.includes("--dry");
const MODEL = "gemini-2.5-pro"; // weekly cadence: spend on quality, not volume

if (!process.env.GEMINI_API_KEY) { console.error("GEMINI_API_KEY missing"); process.exit(1); }

// ---------- next week's publish dates (Mon/Wed/Fri, IST) ----------
const istNow = new Date(Date.now() + 330 * 60000);
const dow = istNow.getUTCDay();
const nextMonday = new Date(istNow);
nextMonday.setUTCDate(istNow.getUTCDate() + ((8 - dow) % 7 || 7));
const dates = [0, 2, 4].map((off) => {
  const d = new Date(nextMonday); d.setUTCDate(nextMonday.getUTCDate() + off);
  return d.toISOString().slice(0, 10);
});

// Idempotency per date: fill only the slots still missing, so a partial
// week (observed 2026-08-16: Friday empty after a short generation) heals.
const missing = DRY ? dates : dates.filter((d) => !existsSync(`content-bank/x/${d}/slot3.txt`));
if (missing.length === 0) {
  console.log(`Factory already filled week of ${dates[0]}. Nothing to do.`);
  process.exit(0);
}

// ---------- context ----------
const contentRules = readFileSync(`${DIR}/CONTENT_RULES.md`, "utf8");
const audienceMap = existsSync(`${DIR}/AUDIENCE_MAP.md`) ? readFileSync(`${DIR}/AUDIENCE_MAP.md`, "utf8") : "";
const storyBank = existsSync(`${DIR}/STORY_BANK.md`) ? readFileSync(`${DIR}/STORY_BANK.md`, "utf8") : "";
const recentTopics = existsSync(`${DIR}/signal-topics-log.csv`)
  ? readFileSync(`${DIR}/signal-topics-log.csv`, "utf8").trim().split("\n").slice(-10).map((r) => r.split(",")[1]).filter(Boolean)
  : [];

const rawEntries = [...storyBank.matchAll(/- date: [\s\S]*?story: >\n([\s\S]*?)(?=\n- date:|\n*$)/g)]
  .map((m) => m[1].trim()).filter((s) => s && !/\(three lines/.test(s));
// Entries flagged NEEDS-EXPLICIT-APPROVAL are off limits to the factory:
// they ship only when Ruchit hand-approves them (e.g. anything touching
// layoffs). Filter them out of the raw pool entirely.
const blocks = [...storyBank.matchAll(/- date: [\s\S]*?(?=\n- date:|\n*$)/g)].map((m) => m[0]);
const usableEntries = blocks
  .filter((b) => b.includes("status: unused") && !b.includes("NEEDS-EXPLICIT-APPROVAL"))
  .map((b) => (b.match(/story: >\n([\s\S]*)$/) ?? [])[1]?.trim())
  .filter(Boolean);
const hasRealMaterial = usableEntries.length > 0;

const WINNER = `We hired someone brilliant last year. Day one, we gave her no laptop, no docs, no examples of past work, told her nothing about the customer, and left a sticky note that said "make it pop." Then we wrote "not a good fit" in her review.

Nobody would run onboarding like that. It is also, roughly, the standard operating procedure for every AI tool inside most companies.`;

// ---------- generation ----------
async function gemini(system, user, maxTokens = 8192, temperature = 0.9) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=` + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ parts: [{ text: user }] }],
        generationConfig: { maxOutputTokens: maxTokens, temperature },
      }),
    },
  );
  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const d = await res.json();
  return (d.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
}

const CRAFT = `You write LinkedIn/X posts for Ruchit Dalwadi (operator, teacher: AI, startups, product; a decade across six industries).

${contentRules.slice(0, 6000)}

THE MEASURED WINNER on this account (25,327 impressions; everything else averaged ~500). Study its anatomy:
${WINNER}

Why it worked, feature by feature:
- A human being with a pronoun in sentence one. Not a concept.
- Concrete props: laptop, docs, sticky note, "make it pop", the review.
- The subject is HIDDEN: reads as a workplace injustice story; the AI lesson lands only at the pivot. Delayed recognition is what makes people react and comment.
- Injustice/stakes: someone was set up to fail. The reader feels it before they learn anything.
- Zero jargon before the pivot.
- After the pivot: a practical fix a reader can run this week.

FORM RULES (violations are auto-rejected by regex):
- Plain text only. No asterisks, hashes, backticks, em dashes, en dashes.
- No "This isn't about X, it's about Y" / "it's not just X, it's Y" qualifier scaffolds.
- No "the real X is", "hiding in plain sight", "Most people think", "Stop Xing. Start Ying."
- No hype words, no emoji, no URLs, no @handles, no "Thoughts?" endings, at most one closing question per 3 posts.
- Never state a percentage or internal practice of a named company.
- LinkedIn: 500-1400 chars, short paragraphs, first two lines earn the click. X: 400-1100 chars, hook on line one. The X version must be a re-told tighter version, not a truncation.
HUMAN LANGUAGE, NOT AI LANGUAGE (the reader must never smell a machine):
- No moral-of-the-story last line. Endings like "We turned X into Y" or "A is more important than B" are machine bows. End on something concrete: a detail, a cost, a rule someone actually follows.
- No adjective triplets ("personal, disconnected, and insecure"). Two or one.
- No symmetric statistics ("90% as good, 99% cheaper"). Real numbers are lopsided or vague the way memory is.
- No labelled metaphors in quotes ("the 'fighter jet' model"). Use a metaphor once, unmarked, or not at all.
- Vary sentence length like a person: an occasional fragment, an occasional long run, not two tidy sentences per paragraph forever.
- Include one detail that does no rhetorical work. Real stories carry noise; parables that only carry the lesson feel written by a committee.
- INSANELY SIMPLE LANGUAGE. Write like you talk. Short sentences. Words a 12 year old knows. One idea per sentence. If a sentence needs a comma to breathe, consider splitting it. "The gap collapsed" beats "the distance contracted materially".
- Banned vocabulary: delve, tapestry, testament, seamless, robust, elevate, unlock, supercharge, leverage, game-changing, landscape, navigating, "in today's".
- Avoid these recent topics: ${recentTopics.join(" | ") || "none"}.`;

const MODES = {
  a: `MODE A, invented first-person parable: a fictional but plausible "we/I" story in Ruchit's voice, like the winner. Composite, never claiming checkable specifics (no named companies, no real people, no precise dates). The story is a vehicle for one AI/product/startup lesson.`,
  b: `MODE B, honest hypothetical: identical story craft, but framed openly as a scenario: "Picture the new hire who...", "A team ships a demo in week one...". No first-person claim. The craft must be strong enough that the framing costs nothing.`,
  c: `MODE C, real material: shape ONE of these true stories from Ruchit's life into the winner's form. Keep every real specific; do not invent details beyond connective tissue. Do not name companies.\n\nRAW MATERIAL:\n${usableEntries.join("\n---\n")}`,
};

const plan = hasRealMaterial ? [["a", 6], ["b", 6], ["c", 6]] : [["a", 9], ["b", 9]];

console.log(`Generating ${plan.map(([m, n]) => `${n}x${m}`).join(" + ")} candidates for ${dates.join(", ")}...`);
const candidates = [];
for (const [mode, n] of plan) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const txt = await gemini(
      CRAFT + "\n\n" + MODES[mode],
      `Write ${n} DIFFERENT candidates in this mode. Vary the pain point (draw from this audience map), the story shape, and the lesson:\n\n${audienceMap.slice(0, 4000)}\n\nOutput STRICT JSON only: [{"title":"<5 words>","li":"<linkedin post>","x":"<x post>"}] with exactly ${n} items. No markdown fences.`,
      8192, 1.0,
    );
    let got = 0;
    try {
      const arr = JSON.parse(txt.match(/\[[\s\S]*\]/)?.[0] ?? "[]");
      for (const c of arr) if (c?.li && c?.x) { candidates.push({ mode, ...c }); got++; }
    } catch { /* fall through to retry */ }
    console.log(`  mode ${mode} attempt ${attempt + 1}: ${got} candidates`);
    if (got > 0) break;
  }
}
console.log(`${candidates.length} candidates generated.`);
if (candidates.length < 6) { console.error("Too few candidates; aborting without writing."); process.exit(1); }

// ---------- mechanical gate (relaxed for story modes: invented "we/I" allowed) ----------
function gateFail(s) {
  const r = [];
  if (!s) return ["empty"];
  if (/[—–]/.test(s)) r.push("em dash");
  if (/[*#`]/.test(s)) r.push("markdown");
  if (/\bis ?n'?t (just|about|only) .{2,60}?[.,;:] it'?s\b/i.test(s) || /\bit'?s not (just|about|only) .{2,60}?[.,;:] it'?s\b/i.test(s)) r.push("hollow scaffold");
  if (/\b(the real \w+ is|where the real \w+ is|hiding in plain sight)\b/i.test(s)) r.push("real-X");
  if (/\bmost (people|teams|founders|companies) (think|believe|assume|still)\b/i.test(s)) r.push("most-people");
  if (/\bstop \w+ing\b[^.!?]{0,60}[.!?]\s*start \w+ing\b/i.test(s)) r.push("stop-start");
  if (/(game[- ]changer|mind[- ]blowing|revolutionary|🚀)/i.test(s)) r.push("hype");
  if (/https?:\/\/|@\w{3,}/.test(s)) r.push("url/handle");
  if (/\b(thoughts|agree|what do you think|what are you .{3,50})\?\s*$/i.test(s)) r.push("reply farming");
  if (/\b(nestwise|threadsweep|career-ops|constructor\.io|anthropic interview|job application|micro-saas portfolio)\b/i.test(s)) r.push("private leak");
  if (/\b\d{1,3}\s?%[^.]{0,90}\b(of (their|our|its|the) (team|engineers|staff|employees))/i.test(s)) r.push("company stat");
  if (/\b(anthropic|openai|google|deepmind|meta|microsoft)\b[^.]{0,70}\b(engineer|employee|insider)\b/i.test(s)) r.push("named-company anecdote");
  if (/\b(delve|tapestry|testament to|seamless|robust|elevate|unlock|supercharge|leverage[ds]?|game.chang\w*|landscape of|navigating the|in today'?s)\b/i.test(s)) r.push("AI vocabulary");
  if (/(is (more important than|job one|the key|everything)|turned \w+[^.]{0,30} into [^.]{0,30})\.\s*$/im.test(s)) r.push("epigram closer");
  if (/\b\w+, \w+, and \w+\b[.,]/.test(s)) r.push("adjective triplet");
  if (/\d+%[^.]{0,40}\d+%/.test(s)) r.push("symmetric stats");
  if (/\.\.\./.test(s)) r.push("ellipsis");
  if ([...s].some((ch) => ch.charCodeAt(0) > 127 && !"'\u2018\u2019\u201c\u201d".includes(ch))) r.push("non-ascii character (watermark risk)");
  return r;
}
const viable = candidates.filter((c) => {
  const fails = [...gateFail(c.li), ...gateFail(c.x)];
  if (fails.length) console.log(`  gate-drop [${c.mode}] "${c.title}": ${[...new Set(fails)].join(", ")}`);
  return fails.length === 0;
});
console.log(`${viable.length}/${candidates.length} pass mechanical gates.`);

// ---------- judge ----------
const judgeTxt = await gemini(
  `You are a brutal selector for a social account whose ONE measured winner is below. You score candidates on how likely they are to be another outlier, not on competence. Median content scores low by definition.

WINNER:
${WINNER}`,
  `Score each candidate 0-10 on: hook (would a scrolling founder stop), human (protagonist + concrete props), reveal (is the subject hidden until a pivot), payoff (practical move after the pivot), distinct (does it avoid feeling like every AI post). Then outlier_odds 0-10 overall, weighting reveal and hook double.

Candidates:
${viable.map((c, i) => `[${i}] (mode ${c.mode}) ${c.li}`).join("\n\n")}

Output STRICT JSON only: [{"i":0,"hook":0,"human":0,"reveal":0,"payoff":0,"distinct":0,"outlier_odds":0,"one_line_verdict":""}]`,
  8192, 0.2,
);
let scores = [];
try { scores = JSON.parse(judgeTxt.match(/\[[\s\S]*\]/)?.[0] ?? "[]"); } catch { console.error("judge unparseable"); process.exit(1); }

const ranked = scores
  .map((s) => ({ ...s, c: viable[s.i], composite: s.outlier_odds * 2 + s.hook + s.reveal + s.human + s.payoff + s.distinct }))
  .filter((s) => s.c)
  .sort((x, y) => y.composite - x.composite);

// pick one per missing date, mode-diverse (max 2 per mode); if diversity
// starves the count (a whole batch failed), fill the rest by rank anyway.
const NEED = missing.length;
const picks = [];
const modeCount = {};
for (const s of ranked) {
  if ((modeCount[s.c.mode] ?? 0) >= 2) continue;
  picks.push(s); modeCount[s.c.mode] = (modeCount[s.c.mode] ?? 0) + 1;
  if (picks.length === NEED) break;
}
for (const s of ranked) {
  if (picks.length >= NEED) break;
  if (!picks.includes(s)) picks.push(s);
}

// ---------- report ----------
mkdirSync(`${DIR}/factory-picks`, { recursive: true });
const week = dates[0];
const report = [`# Factory picks, week of ${week}`, "",
  ...ranked.map((s) => `## ${picks.includes(s) ? "SHIPPED" : "killed"} [mode ${s.c.mode}] ${s.c.title} (composite ${s.composite})\n${s.one_line_verdict}\n\n${s.c.li}\n`)].join("\n");
if (!DRY) writeFileSync(`${DIR}/factory-picks/${week}.md`, report);

console.log("\n=== PICKS ===");
picks.forEach((s, i) => console.log(`${missing[i]} [mode ${s.c.mode}] composite ${s.composite}: ${s.c.title}\n  ${s.c.li.split("\n")[0].slice(0, 100)}`));

if (DRY) { console.log("\n(dry run: nothing written)"); process.exit(0); }

// ---------- humanizer pass ----------
// Winners get one more edit whose only job is killing machine rhythm. If the
// rewrite trips any gate, the original (already gate-clean) ships instead.
for (const s of picks) {
  try {
    const txt = await gemini(
      `You are a line editor. Rewrite the two posts below so no reader could suspect a machine wrote them, while changing nothing about the story, facts, or length band. Kill: moral-of-the-story last lines, adjective triplets, symmetric statistics, tidy two-sentence paragraph rhythm, labelled metaphors in quotes. Add: one concrete detail that does no rhetorical work, uneven sentence lengths. Plain text, no dashes of any kind, no markdown.`,
      `LINKEDIN:\n${s.c.li}\n\nX:\n${s.c.x}\n\nOutput STRICT JSON only: {"li":"...","x":"..."}`,
      4096, 0.7,
    );
    const j = JSON.parse(txt.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
    if (j.li && j.x && gateFail(j.li).length === 0 && gateFail(j.x).length === 0) {
      s.c.li = j.li; s.c.x = j.x;
      console.log(`  humanized: ${s.c.title}`);
    } else {
      console.log(`  humanizer rejected for ${s.c.title}; shipping original`);
    }
  } catch { console.log(`  humanizer failed for ${s.c.title}; shipping original`); }
}

// ---------- ship into the bank (existing runner contract) ----------
picks.forEach((s, i) => {
  const d = missing[i];
  mkdirSync(`content-bank/x/${d}`, { recursive: true });
  mkdirSync(`content-bank/li/${d}`, { recursive: true });
  writeFileSync(`content-bank/x/${d}/slot3.txt`, s.c.x.trim() + "\n");
  writeFileSync(`content-bank/li/${d}/post.md`, s.c.li.trim() + "\n");
});

// mark story-bank material used
if (hasRealMaterial && picks.some((s) => s.c.mode === "c")) {
  writeFileSync(`${DIR}/STORY_BANK.md`, storyBank.replace(/status: unused/g, "status: used"));
}

// telegram preview + veto
try {
  const tok = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (tok && chat) {
    const msg = `🏭 Story factory: ${candidates.length} generated, ${viable.length} passed gates, ${picks.length} shipped for ${missing.join(" / ")}:\n\n` +
      picks.map((s, i) => `${missing[i]} [${s.c.mode}] ${s.c.title}\n"${s.c.li.split("\n")[0].slice(0, 90)}..."`).join("\n\n") +
      `\n\nVeto: delete content-bank/x/<date>/slot3.txt and li/<date>/post.md before 09:00 IST that day. Full scored list: factory-picks/${week}.md`;
    await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: msg }),
    });
  }
} catch {}

console.log(`\nShipped ${picks.length} picks into the bank for ${missing.join(", ")}. ${ranked.length - picks.length} candidates killed.`);
