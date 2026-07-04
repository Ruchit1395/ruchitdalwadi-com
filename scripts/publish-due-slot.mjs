#!/usr/bin/env node
/**
 * Publishes the due content-bank slot for today (IST).
 *
 * Content bank layout:
 *   content-bank/x/YYYY-MM-DD/slot1.txt          — plain post
 *   content-bank/x/YYYY-MM-DD/slot2.thread.json  — thread (JSON array of strings)
 *   content-bank/x/YYYY-MM-DD/slot3.txt
 *   content-bank/x/YYYY-MM-DD/posted.json        — state written by this script
 *
 * Slot windows (IST): slot1 <= 11:30, slot2 <= 16:30, slot3 <= 23:59.
 * The workflow runs at 09:00 / 14:00 / 19:00 IST; the first unposted slot
 * whose window has opened gets published. FORCE_SLOT overrides.
 */

import { TwitterApi } from "twitter-api-v2";
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import path from "node:path";

const IST_OFFSET_MIN = 330;
const now = new Date(Date.now() + IST_OFFSET_MIN * 60 * 1000);
const today = now.toISOString().slice(0, 10);
const istMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

const dir = path.join("content-bank", "x", today);
const stateFile = path.join(dir, "posted.json");
const registry = "distribution/first-ten-customers-for-a-b2b-ai-startup/post-stats-registry.md";

if (!existsSync(dir)) {
  console.log(`No content bank for ${today} — nothing to publish.`);
  process.exit(0);
}

const state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};

const SLOTS = [
  { key: "slot1", opensAt: 0 },
  { key: "slot2", opensAt: 12 * 60 },
  { key: "slot3", opensAt: 17 * 60 },
];

function slotFile(key) {
  const threadPath = path.join(dir, `${key}.thread.json`);
  const textPath = path.join(dir, `${key}.txt`);
  if (existsSync(threadPath)) return { path: threadPath, type: "thread" };
  if (existsSync(textPath)) return { path: textPath, type: "text" };
  return null;
}

let due = null;
if (process.env.FORCE_SLOT) {
  due = SLOTS.find((s) => s.key === `slot${process.env.FORCE_SLOT}`);
} else {
  due = SLOTS.find((s) => !state[s.key] && istMinutes >= s.opensAt && slotFile(s.key));
}

if (!due || state[due.key]) {
  console.log("No due unposted slot right now.");
  process.exit(0);
}

const file = slotFile(due.key);
if (!file) {
  console.log(`${due.key} has no content file.`);
  process.exit(0);
}

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

const posted = [];
if (file.type === "thread") {
  const parts = JSON.parse(readFileSync(file.path, "utf8"));
  let replyTo;
  for (const part of parts) {
    const payload = replyTo ? { text: part, reply: { in_reply_to_tweet_id: replyTo } } : { text: part };
    const res = await client.v2.tweet(payload);
    posted.push(res.data.id);
    replyTo = res.data.id;
    await new Promise((r) => setTimeout(r, 1500));
  }
} else {
  const text = readFileSync(file.path, "utf8").trim();
  const res = await client.v2.tweet(text);
  posted.push(res.data.id);
}

state[due.key] = { ids: posted, at: new Date().toISOString() };
writeFileSync(stateFile, JSON.stringify(state, null, 2));

const rootId = posted[0];
const url = `https://x.com/ruchitdalwadi/status/${rootId}`;
const row = `| ${today}-${due.key} | X | native_post | ${rootId} | ${url} |  | ${new Date(Date.now() + IST_OFFSET_MIN * 60000).toISOString().replace("Z", "+05:30")} | GitHub Action official API |  |  |  |  |  | active | Auto-published from content bank (${file.type}${posted.length > 1 ? `, ${posted.length} parts` : ""}). |`;
appendFileSync(registry, row + "\n");

console.log(`Published ${due.key} (${file.type}) → ${url}`);
