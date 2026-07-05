#!/usr/bin/env node
/**
 * X inbound engagement agent — cloud-safe, API-legal.
 *
 * X's API blocks cold replies/quotes, but allows replying to users who
 * engaged you first. This agent:
 *   1. Fetches recent replies/mentions to @ruchitdalwadi (twitterapi.io reads).
 *   2. Filters: not own, not already answered, not spam, substantive.
 *   3. Gemini drafts a reply per CONTENT_RULES (shape-varied, no em dashes).
 *   4. Posts via official API. Logs to inbound-log.csv.
 *
 * Env: TWITTERAPIIO_KEY, GEMINI_API_KEY,
 *      X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET
 */

import { TwitterApi } from "twitter-api-v2";
import { readFileSync, existsSync, appendFileSync, writeFileSync } from "node:fs";
import { draftWithGemini } from "./lib/gemini.mjs";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const LOG = `${DIR}/inbound-log.csv`;
const MAX_PER_RUN = 8;

function assertEnv(names) {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    console.error(`Missing env: ${missing.join(", ")} — skipping run.`);
    process.exit(0);
  }
}
assertEnv(["TWITTERAPIIO_KEY", "GEMINI_API_KEY", "X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_TOKEN_SECRET"]);

const answered = new Set();
if (existsSync(LOG)) {
  for (const row of readFileSync(LOG, "utf8").trim().split("\n").slice(1)) {
    answered.add(row.split(",")[1]);
  }
} else {
  writeFileSync(LOG, "date,inbound_id,inbound_author,reply_id,reply_url\n");
}

const res = await fetch(
  "https://api.twitterapi.io/twitter/user/mentions?userName=ruchitdalwadi",
  { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } },
);
if (!res.ok) {
  console.error(`mentions fetch failed: ${res.status}`);
  process.exit(0);
}
const data = await res.json();
const MAX_AGE_MS = 48 * 3600 * 1000;
const mentions = (data.tweets ?? [])
  .filter((t) => {
    const author = t.author?.userName?.toLowerCase() ?? "";
    if (author === "ruchitdalwadi" || answered.has(t.id)) return false;
    // mentions endpoint returns all-time history; only answer fresh ones
    const created = t.createdAt ? new Date(t.createdAt).getTime() : 0;
    if (!created || Date.now() - created > MAX_AGE_MS) return false;
    const text = (t.text ?? "").toLowerCase();
    if (text.length < 15) return false; // "nice", "🔥" etc — like-worthy, not reply-worthy
    if (/(airdrop|giveaway|dm me|promo|crypto pump)/.test(text)) return false;
    return true;
  })
  .slice(0, MAX_PER_RUN);

if (mentions.length === 0) {
  console.log("No new substantive inbound.");
  process.exit(0);
}

const contentRules = existsSync(`${DIR}/CONTENT_RULES.md`)
  ? readFileSync(`${DIR}/CONTENT_RULES.md`, "utf8")
  : "";

const SYSTEM = `You draft X replies for Ruchit Dalwadi to people who replied to HIS posts. He is an operator and teacher in AI, startups, product.

${contentRules}

Inbound-reply rules on top:
- 240 characters max. Hard limit.
- This person engaged Ruchit. Be warm but substantive: answer their question, extend their point, or concede a good pushback honestly.
- No links, no hashtags, no emoji.
- Never repeat the shape of the previous reply in this batch.
- ABSOLUTELY no em dashes ("—" or "–").

Output ONLY the reply text.`;

async function draft(m, prior) {
  return draftWithGemini({
    system: SYSTEM,
    user: `Inbound from @${m.author.userName}: "${m.text}"\n\nEarlier replies this batch (vary shape; never open two replies the same way):\n${prior.join("\n") || "none"}\n\nDraft the reply.`,
    maxChars: 240,
  });
}

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

const prior = [];
const answeredAuthorsThisRun = new Set();
let posted = 0;
for (const m of mentions) {
  try {
    // one reply per author per run — two answers into the same thread reads as spam
    const authorKey = m.author?.userName?.toLowerCase() ?? "";
    if (answeredAuthorsThisRun.has(authorKey)) continue;
    const reply = await draft(m, prior);
    if (!reply || reply.length < 20) {
      console.log(`skip @${m.author?.userName}: no clean draft`);
      continue;
    }
    answeredAuthorsThisRun.add(authorKey);
    const out = await client.v2.tweet({ text: reply, reply: { in_reply_to_tweet_id: m.id } });
    const url = `https://x.com/ruchitdalwadi/status/${out.data.id}`;
    appendFileSync(LOG, `${new Date().toISOString()},${m.id},${m.author.userName},${out.data.id},${url}\n`);
    prior.push(reply);
    posted++;
    console.log(`answered @${m.author.userName}: ${url}`);
    await new Promise((r) => setTimeout(r, 3000));
  } catch (err) {
    console.error(`failed on @${m.author?.userName}: ${JSON.stringify(err?.data ?? err.message).slice(0, 200)}`);
  }
}
console.log(`Inbound run complete: ${posted}/${mentions.length} answered.`);
