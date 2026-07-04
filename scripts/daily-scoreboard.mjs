#!/usr/bin/env node
/**
 * Daily stats refresh + SCOREBOARD.md generation.
 *
 * Reads every X status ID from the campaign files, batch-fetches metrics
 * (twitterapi.io if TWITTERAPIIO_KEY is set — 30x cheaper — else official
 * bearer), appends a daily snapshot to scoreboard-history.csv, and rewrites
 * SCOREBOARD.md with totals, pace vs targets, and top posts.
 *
 * LinkedIn numbers cannot be read via API for personal profiles; they are
 * maintained manually in li-manual-stats.csv (impressions column) and folded
 * into the scoreboard when present.
 */

import { TwitterApi } from "twitter-api-v2";
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { execSync } from "node:child_process";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const HISTORY = `${DIR}/scoreboard-history.csv`;
const BOARD = `${DIR}/SCOREBOARD.md`;
const LI_MANUAL = `${DIR}/li-manual-stats.csv`;

const CAMPAIGN_END = "2026-07-19";
const TARGET_EACH = 100_000;

const ids = execSync(
  `grep -ohE "x\\.com/ruchitdalwadi/status/[0-9]+" ${DIR}/post-stats-registry.md ${DIR}/tracker.csv ${DIR}/metrics-log.csv ${DIR}/WORKLOG.md content-bank/x/*/posted.json 2>/dev/null | grep -oE "[0-9]+$" | sort -u`,
  { encoding: "utf8" },
)
  .trim()
  .split("\n")
  .filter(Boolean);

async function fetchViaTwitterapiIo(ids) {
  const out = [];
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const res = await fetch(
      `https://api.twitterapi.io/twitter/tweets?tweet_ids=${batch.join(",")}`,
      { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } },
    );
    if (!res.ok) throw new Error(`twitterapi.io ${res.status}: ${await res.text()}`);
    const data = await res.json();
    for (const t of data.tweets ?? data.data ?? []) {
      out.push({
        id: t.id,
        impressions: t.viewCount ?? null,
        likes: t.likeCount ?? 0,
        replies: t.replyCount ?? 0,
        reposts: (t.retweetCount ?? 0) + (t.quoteCount ?? 0),
      });
    }
  }
  return out;
}

async function fetchViaOfficial(ids) {
  const client = new TwitterApi(process.env.X_BEARER_TOKEN);
  const out = [];
  for (let i = 0; i < ids.length; i += 100) {
    const res = await client.v2.tweets(ids.slice(i, i + 100), { "tweet.fields": ["public_metrics"] });
    for (const t of res.data ?? []) {
      const m = t.public_metrics ?? {};
      out.push({
        id: t.id,
        impressions: m.impression_count ?? null,
        likes: m.like_count ?? 0,
        replies: m.reply_count ?? 0,
        reposts: (m.retweet_count ?? 0) + (m.quote_count ?? 0),
      });
    }
  }
  return out;
}

const stats = process.env.TWITTERAPIIO_KEY
  ? await fetchViaTwitterapiIo(ids).catch(async (e) => {
      console.error(`twitterapi.io failed (${e.message}); falling back to official API`);
      return fetchViaOfficial(ids);
    })
  : await fetchViaOfficial(ids);

const xTotal = stats.reduce((s, t) => s + (t.impressions ?? 0), 0);
const xLikes = stats.reduce((s, t) => s + t.likes, 0);
const xReplies = stats.reduce((s, t) => s + t.replies, 0);

let liTotal = 0;
if (existsSync(LI_MANUAL)) {
  const rows = readFileSync(LI_MANUAL, "utf8").trim().split("\n").slice(1);
  liTotal = rows.reduce((s, r) => s + (parseInt(r.split(",")[2], 10) || 0), 0);
}

const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
const daysLeft = Math.max(0, Math.round((new Date(CAMPAIGN_END) - new Date(today)) / 86400000));

if (!existsSync(HISTORY)) {
  writeFileSync(HISTORY, "date,x_impressions,x_likes,x_replies,li_impressions_manual,posts_tracked\n");
}
appendFileSync(HISTORY, `${today},${xTotal},${xLikes},${xReplies},${liTotal},${stats.length}\n`);

const history = readFileSync(HISTORY, "utf8").trim().split("\n").slice(1);
const prev = history.length >= 2 ? history[history.length - 2].split(",") : null;
const xDelta = prev ? xTotal - parseInt(prev[1], 10) : xTotal;

const top = stats
  .filter((t) => t.impressions)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 10);

const xNeedPerDay = daysLeft > 0 ? Math.ceil((TARGET_EACH - xTotal) / daysLeft) : 0;
const liNeedPerDay = daysLeft > 0 ? Math.ceil((TARGET_EACH - liTotal) / daysLeft) : 0;

const board = `# Campaign Scoreboard

Updated: ${today} (auto — daily 13:00 IST)

## Totals vs target

| Platform | Impressions | Target | Progress | Needed/day (${daysLeft}d left) |
|---|---:|---:|---:|---:|
| X | ${xTotal.toLocaleString()} | ${TARGET_EACH.toLocaleString()} | ${((xTotal / TARGET_EACH) * 100).toFixed(1)}% | ${xNeedPerDay.toLocaleString()} |
| LinkedIn (manual) | ${liTotal.toLocaleString()} | ${TARGET_EACH.toLocaleString()} | ${((liTotal / TARGET_EACH) * 100).toFixed(1)}% | ${liNeedPerDay.toLocaleString()} |

X day-over-day: **${xDelta >= 0 ? "+" : ""}${xDelta.toLocaleString()}** · engagement: ${xLikes} likes, ${xReplies} replies across ${stats.length} tracked posts.

## Top X posts

| Views | Likes | Replies | URL |
|---:|---:|---:|---|
${top.map((t) => `| ${t.impressions.toLocaleString()} | ${t.likes} | ${t.replies} | https://x.com/ruchitdalwadi/status/${t.id} |`).join("\n")}

## History

| Date | X total | Δ | LI (manual) |
|---|---:|---:|---:|
${history
  .slice(-15)
  .map((r, i, arr) => {
    const c = r.split(",");
    const p = i > 0 ? arr[i - 1].split(",") : null;
    const d = p ? parseInt(c[1], 10) - parseInt(p[1], 10) : "";
    return `| ${c[0]} | ${parseInt(c[1], 10).toLocaleString()} | ${d === "" ? "—" : (d >= 0 ? "+" : "") + d.toLocaleString()} | ${parseInt(c[4], 10).toLocaleString()} |`;
  })
  .join("\n")}
`;

writeFileSync(BOARD, board);
console.log(`Scoreboard written. X: ${xTotal} (${xDelta >= 0 ? "+" : ""}${xDelta} today), LI manual: ${liTotal}, ${daysLeft} days left.`);
