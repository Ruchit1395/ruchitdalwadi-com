#!/usr/bin/env node
/**
 * X (Twitter) publish + stats CLI for the distribution campaign.
 *
 * Run with: node --env-file=.env.local scripts/x-publish.mjs <command> [...args]
 * (from the repo root)
 *
 * Commands:
 *   whoami                          Verify user-context auth (needs access token)
 *   post <text>                     Post a single tweet
 *   post-file <path>                Post tweet text from a file (avoids shell quoting)
 *   thread <path.json>              Post a thread; file is a JSON array of strings
 *   media <img> <text>              Post a tweet with one image
 *   reply <tweet_id> <text>         Reply to a tweet
 *   stats <id1,id2,...>             Batch metrics lookup (bearer; up to 100 ids)
 *   stats-registry                  Look up every status ID found in the campaign registry
 *
 * Read auth  : X_BEARER_TOKEN (app-only) — stats commands.
 * Write auth : X_API_KEY / X_API_SECRET / X_ACCESS_TOKEN / X_ACCESS_TOKEN_SECRET
 *              (OAuth 1.0a user context) — post/thread/media/reply/whoami.
 */

import { TwitterApi } from "twitter-api-v2";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const CAMPAIGN_DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";

function readClient() {
  const bearer = process.env.X_BEARER_TOKEN;
  if (!bearer) die("X_BEARER_TOKEN missing from env");
  return new TwitterApi(bearer);
}

function writeClient() {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET } = process.env;
  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_TOKEN_SECRET) {
    die(
      "Write credentials incomplete. Need X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET in .env.local.\n" +
        "Generate the access token pair on developer.x.com → Keys and Tokens → Access Token and Secret (Read and Write).",
    );
  }
  return new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_TOKEN_SECRET,
  });
}

function die(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

function ok(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

async function cmdWhoami() {
  const me = await writeClient().v2.me();
  ok(me.data);
}

async function cmdPost(text) {
  if (!text?.trim()) die("post requires non-empty text");
  const res = await writeClient().v2.tweet(text);
  ok({ id: res.data.id, url: `https://x.com/ruchitdalwadi/status/${res.data.id}`, text: res.data.text });
}

async function cmdPostFile(file) {
  const text = readFileSync(file, "utf8").trim();
  await cmdPost(text);
}

async function cmdThread(file) {
  const parts = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(parts) || parts.length === 0) die("thread file must be a non-empty JSON array of strings");
  const client = writeClient();
  const posted = [];
  let replyTo = undefined;
  for (const part of parts) {
    const payload = replyTo ? { text: part, reply: { in_reply_to_tweet_id: replyTo } } : { text: part };
    const res = await client.v2.tweet(payload);
    posted.push({ id: res.data.id, url: `https://x.com/ruchitdalwadi/status/${res.data.id}` });
    replyTo = res.data.id;
    await new Promise((r) => setTimeout(r, 1500));
  }
  ok({ thread_root: posted[0], parts: posted });
}

async function cmdMedia(img, text) {
  if (!text?.trim()) die("media requires caption text");
  const client = writeClient();
  const mediaId = await client.v1.uploadMedia(path.resolve(img));
  const res = await client.v2.tweet({ text, media: { media_ids: [mediaId] } });
  ok({ id: res.data.id, url: `https://x.com/ruchitdalwadi/status/${res.data.id}`, media_id: mediaId });
}

async function cmdReply(tweetId, text) {
  if (!/^\d{1,19}$/.test(tweetId ?? "")) die("reply requires a numeric tweet id");
  if (!text?.trim()) die("reply requires non-empty text");
  const res = await writeClient().v2.tweet({ text, reply: { in_reply_to_tweet_id: tweetId } });
  ok({ id: res.data.id, url: `https://x.com/ruchitdalwadi/status/${res.data.id}` });
}

async function statsFor(ids) {
  const client = readClient();
  const out = [];
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const res = await client.v2.tweets(batch, { "tweet.fields": ["public_metrics", "created_at"] });
    for (const t of res.data ?? []) {
      const m = t.public_metrics ?? {};
      out.push({
        id: t.id,
        url: `https://x.com/ruchitdalwadi/status/${t.id}`,
        created_at: t.created_at,
        impressions: m.impression_count ?? null,
        likes: m.like_count ?? null,
        replies: m.reply_count ?? null,
        reposts: (m.retweet_count ?? 0) + (m.quote_count ?? 0),
        bookmarks: m.bookmark_count ?? null,
      });
    }
    for (const e of res.errors ?? []) {
      out.push({ id: e.resource_id ?? e.value, error: e.title ?? "lookup failed" });
    }
  }
  return out;
}

async function cmdStats(csv) {
  const ids = (csv ?? "").split(",").map((s) => s.trim()).filter((s) => /^\d{1,19}$/.test(s));
  if (ids.length === 0) die("stats requires comma-separated numeric ids");
  ok(await statsFor(ids));
}

async function cmdStatsRegistry() {
  const cmd = `grep -ohE "x\\.com/ruchitdalwadi/status/[0-9]+" ${CAMPAIGN_DIR}/post-stats-registry.md ${CAMPAIGN_DIR}/tracker.csv ${CAMPAIGN_DIR}/metrics-log.csv ${CAMPAIGN_DIR}/WORKLOG.md 2>/dev/null | grep -oE "[0-9]+$" | sort -u`;
  const ids = execSync(cmd, { encoding: "utf8" }).trim().split("\n").filter(Boolean);
  if (ids.length === 0) die("no status ids found in campaign files");
  const stats = await statsFor(ids);
  const total = stats.reduce((sum, s) => sum + (s.impressions ?? 0), 0);
  ok({ posts: stats.length, total_impressions: total, stats });
}

const [cmd, ...args] = process.argv.slice(2);
const commands = {
  whoami: cmdWhoami,
  post: () => cmdPost(args.join(" ")),
  "post-file": () => cmdPostFile(args[0]),
  thread: () => cmdThread(args[0]),
  media: () => cmdMedia(args[0], args.slice(1).join(" ")),
  reply: () => cmdReply(args[0], args.slice(1).join(" ")),
  stats: () => cmdStats(args[0]),
  "stats-registry": cmdStatsRegistry,
};

const fn = commands[cmd];
if (!fn) {
  console.error(`Usage: node --env-file=.env.local scripts/x-publish.mjs <${Object.keys(commands).join("|")}> [...args]`);
  process.exit(1);
}

fn().catch((err) => {
  const detail = err?.data ? JSON.stringify(err.data) : String(err);
  die(`${cmd} failed: ${detail}`);
});
