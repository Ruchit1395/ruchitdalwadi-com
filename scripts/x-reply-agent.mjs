#!/usr/bin/env node
/**
 * X reply agent — cloud-safe, no browser.
 *
 * Flow per run:
 *   1. Search recent posts across campaign lanes (twitterapi.io — cheap reads).
 *   2. Filter by room scorecard: min engagement, recency, no politics/spam,
 *      not already replied, not own posts.
 *   3. Ask Claude to draft a <=240-char no-link reply in Ruchit's voice for
 *      the top rooms (voice guide + reply bank included as context).
 *   4. Post up to MAX_REPLIES via official X API.
 *   5. Log to replied-log.csv + registry.
 *
 * Env: TWITTERAPIIO_KEY, ANTHROPIC_API_KEY,
 *      X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET
 */

import { TwitterApi } from "twitter-api-v2";
import { readFileSync, existsSync, appendFileSync, writeFileSync } from "node:fs";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const REPLIED_LOG = `${DIR}/replied-log.csv`;
const MAX_REPLIES = 5;
const MIN_LIKES = 30;
const MAX_REPLIES_ON_TARGET = 120; // skip mega-viral, comments unreadable

const LANES = [
  '("Claude Code" OR "coding agent" OR "Cursor") (workflow OR harness OR evals) min_faves:30',
  '("AI agents" OR "agentic") (production OR reliability OR handoff OR evals) min_faves:30',
  '("AI at work" OR "AI workflow" OR "AI productivity") (team OR operators) min_faves:30',
  '("prompt engineering" OR "context engineering") (system OR workflow) min_faves:30',
  '("model choice" OR "which model" OR "model routing") min_faves:20',
];

function assertEnv(names) {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    console.error(`Missing env: ${missing.join(", ")} — skipping run (not an error).`);
    process.exit(0);
  }
}
assertEnv(["TWITTERAPIIO_KEY", "ANTHROPIC_API_KEY", "X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_TOKEN_SECRET"]);

const repliedAuthors = new Set();
const repliedIds = new Set();
if (existsSync(REPLIED_LOG)) {
  for (const row of readFileSync(REPLIED_LOG, "utf8").trim().split("\n").slice(1)) {
    const [date, targetId, author] = row.split(",");
    repliedIds.add(targetId);
    // avoid same author within 3 days
    if (Date.now() - new Date(date).getTime() < 3 * 86400000) repliedAuthors.add(author);
  }
} else {
  writeFileSync(REPLIED_LOG, "date,target_id,target_author,target_views,reply_id,reply_url\n");
}

async function searchLane(query) {
  const res = await fetch(
    `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Latest&query=${encodeURIComponent(query + " -filter:replies lang:en")}`,
    { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } },
  );
  if (!res.ok) {
    console.error(`search failed for lane: ${res.status}`);
    return [];
  }
  const data = await res.json();
  return data.tweets ?? [];
}

const candidates = [];
for (const lane of LANES) {
  const tweets = await searchLane(lane);
  for (const t of tweets) {
    const author = t.author?.userName ?? "";
    if (author.toLowerCase() === "ruchitdalwadi") continue;
    if (repliedIds.has(t.id) || repliedAuthors.has(author)) continue;
    if ((t.likeCount ?? 0) < MIN_LIKES) continue;
    if ((t.replyCount ?? 0) > MAX_REPLIES_ON_TARGET) continue;
    const text = (t.text ?? "").toLowerCase();
    if (/(giveaway|airdrop|follow me|dm me|link in bio|🚨|breaking:)/.test(text)) continue;
    candidates.push({
      id: t.id,
      author,
      text: t.text,
      views: t.viewCount ?? 0,
      likes: t.likeCount ?? 0,
      replies: t.replyCount ?? 0,
      score: (t.viewCount ?? 0) / 1000 + (t.likeCount ?? 0) - (t.replyCount ?? 0) * 0.5,
    });
  }
}

candidates.sort((a, b) => b.score - a.score);
const targets = [];
const seenAuthors = new Set();
for (const c of candidates) {
  if (seenAuthors.has(c.author)) continue;
  seenAuthors.add(c.author);
  targets.push(c);
  if (targets.length >= MAX_REPLIES) break;
}

if (targets.length === 0) {
  console.log("No scorecard-qualified targets this run.");
  process.exit(0);
}

const voiceGuide = existsSync(`${DIR}/voice-and-value-guide-2026-06-30.md`)
  ? readFileSync(`${DIR}/voice-and-value-guide-2026-06-30.md`, "utf8").slice(0, 4000)
  : "";

async function draftReply(target) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 300,
      system: `You draft X replies for Ruchit Dalwadi — operator/teacher in AI, startups, product. A decade shipping across six industries; now teaching practical AI: agents, evals, workflows, harness design.

Voice rules:
- <=240 characters. Hard limit.
- No links, no hashtags, no emoji, no "great post".
- Add ONE thing: a frame, a caveat, a workflow step, or a concrete test.
- Plain confident sentences. Specific > general. Never salesy.
- If the post asks a question, answer it directly first.

${voiceGuide ? "Voice guide excerpt:\n" + voiceGuide : ""}

Reply with ONLY the reply text, nothing else.`,
      messages: [
        {
          role: "user",
          content: `Post by @${target.author} (${target.likes} likes, ${target.replies} replies):\n\n"${target.text}"\n\nDraft the reply.`,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text?.trim() ?? "";
}

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

let posted = 0;
for (const target of targets) {
  try {
    let reply = await draftReply(target);
    if (reply.length > 240) reply = reply.slice(0, 237) + "...";
    if (!reply || reply.length < 30) {
      console.log(`skip @${target.author}: draft too short`);
      continue;
    }
    const res = await client.v2.tweet({ text: reply, reply: { in_reply_to_tweet_id: target.id } });
    const url = `https://x.com/ruchitdalwadi/status/${res.data.id}`;
    appendFileSync(
      REPLIED_LOG,
      `${new Date().toISOString()},${target.id},${target.author},${target.views},${res.data.id},${url}\n`,
    );
    console.log(`replied to @${target.author} (${target.views} views): ${url}`);
    posted++;
    await new Promise((r) => setTimeout(r, 4000));
  } catch (err) {
    console.error(`failed on @${target.author}: ${err.message}`);
  }
}

console.log(`Run complete: ${posted}/${targets.length} replies posted.`);
