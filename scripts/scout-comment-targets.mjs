#!/usr/bin/env node
/**
 * Scout comment targets — deterministic target list for browser comment
 * sessions (Codex heartbeat or interactive agents).
 *
 * Finds fresh (<24h), high-engagement, in-lane posts whose audience matches
 * our TG, deduped against replied-log.csv. Prints a ranked list.
 *
 * Usage: node --env-file=.env.local scripts/scout-comment-targets.mjs [count]
 * Env: TWITTERAPIIO_KEY
 */

import { readFileSync, existsSync } from "node:fs";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const COUNT = parseInt(process.argv[2] ?? "6", 10);

if (!process.env.TWITTERAPIIO_KEY) {
  console.error("TWITTERAPIIO_KEY missing");
  process.exit(1);
}

const LANES = [
  '("AI agents" OR agentic OR evals OR "agent harness") min_faves:60',
  '("Claude Code" OR Cursor OR "coding agent" OR "AI coding") min_faves:50',
  '("prompt engineering" OR "context engineering" OR "AI workflow") min_faves:40',
  '("product manager" OR PM OR founder) (AI OR agents) (lesson OR mistake OR workflow OR shipped) min_faves:40',
  '("Claude" OR "GPT" OR Gemini OR Anthropic OR OpenAI) (launch OR released OR benchmark OR update) min_faves:80',
];

// wrong-audience rooms: finance, crypto, politics, giveaways
const BLOCK = /(bitcoin|solana|crypto|token|airdrop|\$[A-Z]{2,5}\b|stock|etf|nasdaq|fed |rate cut|election|senate|congress|giveaway|whitelist|mint|nft)/i;

const repliedAuthors = new Set();
const repliedIds = new Set();
if (existsSync(`${DIR}/replied-log.csv`)) {
  for (const row of readFileSync(`${DIR}/replied-log.csv`, "utf8").trim().split("\n").slice(1)) {
    const [date, targetId, author] = row.split(",");
    repliedIds.add(targetId);
    if (Date.now() - new Date(date).getTime() < 3 * 86400000) repliedAuthors.add((author ?? "").toLowerCase());
  }
}

const seen = new Map();
for (const lane of LANES) {
  for (const qt of ["Top", "Latest"]) {
    const r = await fetch(
      `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=${qt}&query=${encodeURIComponent(lane + " -filter:replies lang:en within_time:24h")}`,
      { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } },
    );
    if (!r.ok) continue;
    const d = await r.json();
    for (const t of d.tweets ?? []) {
      const a = t.author ?? {};
      const handle = (a.userName ?? "").toLowerCase();
      if (!handle || handle === "ruchitdalwadi") continue;
      if (repliedIds.has(t.id) || repliedAuthors.has(handle)) continue;
      const likes = t.likeCount ?? 0;
      const replies = t.replyCount ?? 0;
      if (likes < 40 || replies > 150) continue;
      const text = t.text ?? "";
      if (BLOCK.test(text) || BLOCK.test(a.name ?? "")) continue;
      seen.set(t.id, {
        url: `https://x.com/${a.userName}/status/${t.id}`,
        author: a.userName,
        followers: a.followers ?? 0,
        views: t.viewCount ?? 0,
        likes,
        replies,
        ageHint: t.createdAt ?? "",
        text: text.slice(0, 240).replace(/\n/g, " "),
      });
    }
    await new Promise((r) => setTimeout(r, 1500));
    if (seen.size >= COUNT * 4) break;
  }
}

const uniqueByAuthor = new Map();
for (const t of [...seen.values()].sort((x, y) => y.views + y.likes * 100 - (x.views + x.likes * 100))) {
  const key = t.author.toLowerCase();
  if (!uniqueByAuthor.has(key)) uniqueByAuthor.set(key, t);
  if (uniqueByAuthor.size >= COUNT) break;
}

const out = [...uniqueByAuthor.values()];
if (out.length === 0) {
  console.log("NO_TARGETS (throttled or thin day — retry in 30+ min)");
  process.exit(0);
}
for (const [i, t] of out.entries()) {
  console.log(`${i + 1}. @${t.author} (${t.followers.toLocaleString()} followers) — ${t.views.toLocaleString()} views, ${t.likes} likes, ${t.replies} replies`);
  console.log(`   ${t.url}`);
  console.log(`   "${t.text}"`);
  console.log("");
}
