#!/usr/bin/env node
/**
 * Daily trend post — finds what's hot in the AI conversation right now and
 * writes ONE original take (not a quote, not a reply) per CONTENT_RULES.
 *
 * Env: TWITTERAPIIO_KEY, GEMINI_API_KEY,
 *      X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET
 */

import { TwitterApi } from "twitter-api-v2";
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { draftWithGemini } from "./lib/gemini.mjs";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";

function assertEnv(names) {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    console.error(`Missing env: ${missing.join(", ")} — skipping run.`);
    process.exit(0);
  }
}
assertEnv(["TWITTERAPIIO_KEY", "GEMINI_API_KEY", "X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_TOKEN_SECRET"]);

const LANES = [
  '("Claude" OR "GPT" OR "Gemini") (launch OR update OR released OR "just shipped") min_faves:200',
  '("AI agents" OR "coding agents" OR "Claude Code" OR "Cursor") min_faves:300',
  '("AI" AND (PM OR product OR startup)) min_faves:300',
];

const seen = [];
for (const lane of LANES) {
  const r = await fetch(
    `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Latest&query=${encodeURIComponent(lane + " -filter:replies lang:en")}`,
    { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } },
  );
  if (!r.ok) continue;
  const d = await r.json();
  for (const t of (d.tweets ?? []).slice(0, 8)) {
    seen.push({
      author: t.author?.userName,
      text: (t.text ?? "").slice(0, 400),
      likes: t.likeCount ?? 0,
      views: t.viewCount ?? 0,
    });
  }
}

if (seen.length < 3) {
  console.log("Not enough trend signal today — skipping.");
  process.exit(0);
}

const contentRules = existsSync(`${DIR}/CONTENT_RULES.md`)
  ? readFileSync(`${DIR}/CONTENT_RULES.md`, "utf8")
  : "";

const radar = existsSync(`${DIR}/TREND_RADAR.md`)
  ? readFileSync(`${DIR}/TREND_RADAR.md`, "utf8").slice(0, 3000)
  : "";

const text = await draftWithGemini({
  system: `You write ONE original X post for Ruchit Dalwadi, operator/teacher in AI, startups, product.

${contentRules}

Task: from the trending posts provided, identify the single most consequential conversation happening in AI right now. Write an ORIGINAL take on it (do not address or mention any specific post or author). 150 to 280 characters. It must pass the quality gate: specific, useful or genuinely funny, no em dashes, sounds like a person.

CRITICAL accuracy rules:
- NEVER attribute statements, quotes, or claims to named people or companies (no "X said", "according to Y"). The source tweets may be wrong, and repeating unverified claims destroys credibility.
- Comment on the pattern or question in the conversation, using Ruchit's own operator experience as the substance.
- If the only interesting angle requires an attributed claim, respond SKIP.

If nothing is genuinely worth posting about, respond with exactly: SKIP

Output ONLY the post text or SKIP.`,
  user: `${radar ? `Today's trend radar brief:\n${radar}\n\n---\n\n` : ""}Trending in the last hours:\n\n${seen.map((s) => `[@${s.author}, ${s.likes} likes, ${s.views} views]: ${s.text}`).join("\n\n")}`,
  maxChars: 280,
});

if (!text || text === "SKIP" || text.length < 60) {
  console.log("No clean trend take today — skipping.");
  process.exit(0);
}

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});
const out = await client.v2.tweet(text);
const url = `https://x.com/ruchitdalwadi/status/${out.data.id}`;

const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
appendFileSync(
  `${DIR}/post-stats-registry.md`,
  `| ${today}-trend-slot | X | native_post | ${out.data.id} | ${url} |  | ${new Date(Date.now() + 330 * 60000).toISOString().replace("Z", "+05:30")} | GitHub Action trend agent |  |  |  |  |  | active | Daily trend take (Gemini). |\n`,
);
console.log(`Trend post live: ${url}\n${text}`);
