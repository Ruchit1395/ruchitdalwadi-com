#!/usr/bin/env node
/**
 * Daily Trend Radar — recurring trend intelligence, fully cloud.
 *
 * Samples the top conversations across campaign lanes (last 24h), then has
 * Gemini synthesize a daily brief: top conversations, winning formats,
 * keywords, and 3 concrete post angles for Ruchit.
 *
 * Output:
 *   distribution/.../trend-radar/YYYY-MM-DD.md  (daily archive)
 *   distribution/.../TREND_RADAR.md             (latest, always current)
 *
 * The 16:00 IST trend-post agent reads today's radar for sharper context.
 *
 * Env: TWITTERAPIIO_KEY, GEMINI_API_KEY
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const RADAR_DIR = `${DIR}/trend-radar`;

function assertEnv(names) {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    console.error(`Missing env: ${missing.join(", ")} — skipping.`);
    process.exit(0);
  }
}
assertEnv(["TWITTERAPIIO_KEY", "GEMINI_API_KEY"]);

const LANES = [
  { name: "agents-evals", q: '("AI agents" OR "agentic" OR "evals" OR "agent harness") min_faves:150' },
  { name: "coding-ai", q: '("Claude Code" OR "Cursor" OR "coding agent" OR "vibe coding") min_faves:150' },
  { name: "models-tools", q: '("Claude" OR "GPT" OR "Gemini" OR "open source model") (launch OR update OR benchmark OR released) min_faves:200' },
  { name: "pm-product", q: '(PM OR "product manager" OR roadmap OR "product strategy") AI min_faves:100' },
  { name: "startups", q: '(founder OR startup OR "B2B SaaS") (AI OR agents) min_faves:150' },
  { name: "ai-work", q: '("AI at work" OR "AI workflow" OR "AI productivity" OR automation) min_faves:150' },
];

async function searchLane(query, type) {
  const r = await fetch(
    `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=${type}&query=${encodeURIComponent(query)}`,
    { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } },
  );
  if (!r.ok) return [];
  return (await r.json()).tweets ?? [];
}

const samples = [];
for (const lane of LANES) {
  const q = lane.q.replace(/min_faves:\d+/, "min_faves:80") + " -filter:replies lang:en within_time:24h";
  // Top first; fall back to Latest; one retry after backoff if throttled empty
  let tweets = await searchLane(q, "Top");
  if (tweets.length === 0) tweets = await searchLane(q, "Latest");
  if (tweets.length === 0) {
    await new Promise((r) => setTimeout(r, 8000));
    tweets = await searchLane(q, "Top");
  }
  for (const t of tweets.slice(0, 15)) {
    samples.push({
      lane: lane.name,
      author: t.author?.userName,
      followers: t.author?.followers ?? 0,
      views: t.viewCount ?? 0,
      likes: t.likeCount ?? 0,
      replies: t.replyCount ?? 0,
      hasMedia: Boolean(t.extendedEntities?.media?.length || t.entities?.media?.length),
      isLong: (t.text ?? "").length > 400,
      text: (t.text ?? "").slice(0, 350),
    });
  }
  await new Promise((r) => setTimeout(r, 2000));
}

if (samples.length < 10) {
  console.log(`Only ${samples.length} samples — skipping radar today.`);
  process.exit(0);
}

const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);

const prompt = `You are the trend analyst for Ruchit Dalwadi (operator/teacher: AI, startups, product; TG: founders, PMs, operators, AI builders).

Below are ${samples.length} top-performing posts from the last 24h across six lanes. Produce today's TREND RADAR in this exact markdown structure:

## Top conversations (max 5)
For each: one line on what the conversation is, why it's hot, and engagement evidence (cite views/likes from the data).

## Formats winning right now
What shapes are earning engagement in this sample: threads vs short takes vs images vs long posts. Cite counts from the data (e.g., "6 of the top 10 posts have images").

## Keywords and phrases
The recurring terms, product names, and framings people are using today.

## 3 post angles for Ruchit
Three specific post ideas that ride these conversations while teaching something from his territory (agents, evals, workflows, product judgment). Each: one-line angle + suggested format. No em dashes anywhere.

## Avoid today
Anything saturated, political, or drama-driven to stay away from.

Be specific and quantitative. No em dashes.`;

const res = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    process.env.GEMINI_API_KEY,
  {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: prompt }] },
      contents: [{ parts: [{ text: JSON.stringify(samples, null, 1) }] }],
      generationConfig: { maxOutputTokens: 3000, temperature: 0.4, thinkingConfig: { thinkingBudget: 0 } },
    }),
  },
);
if (!res.ok) {
  console.error(`gemini failed: ${res.status}`);
  process.exit(1);
}
const data = await res.json();
let brief = (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
brief = brief.replace(/\s*[—–]\s*/g, ", ");

const doc = `# Trend Radar — ${today}

Generated daily at 08:30 IST from ${samples.length} top posts across ${LANES.length} lanes (last 24h).

${brief}

---
*Source: twitterapi.io Top search per lane. Consumed by the 16:00 IST trend-post agent and future content-bank generation.*
`;

mkdirSync(RADAR_DIR, { recursive: true });
writeFileSync(path.join(RADAR_DIR, `${today}.md`), doc);
writeFileSync(`${DIR}/TREND_RADAR.md`, doc);
console.log(`Radar written for ${today} (${samples.length} samples).`);
