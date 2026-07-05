#!/usr/bin/env node
/**
 * Daily Telegram digest — 21:30 IST, after the day's cycle completes.
 *
 * Assembles: impressions + delta, today's published assets, inbound answered,
 * pace vs target, blockers. Sends one compact HTML message via Telegram bot.
 *
 * Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 * Setup helper: node scripts/daily-digest.mjs discover   (prints chat ids
 * from getUpdates after you message the bot once)
 */

import { readFileSync, existsSync } from "node:fs";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT = process.env.TELEGRAM_CHAT_ID;

const IST = 330 * 60000;
const today = new Date(Date.now() + IST).toISOString().slice(0, 10);

if (process.argv[2] === "discover") {
  if (!TOKEN) { console.error("Set TELEGRAM_BOT_TOKEN first"); process.exit(1); }
  const r = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
  const d = await r.json();
  const chats = new Map();
  for (const u of d.result ?? []) {
    const c = u.message?.chat;
    if (c) chats.set(c.id, `${c.first_name ?? ""} ${c.username ? "@" + c.username : ""}`.trim());
  }
  if (chats.size === 0) console.log("No chats found. Message the bot first, then rerun.");
  for (const [id, name] of chats) console.log(`chat_id: ${id}  (${name})`);
  process.exit(0);
}

if (!TOKEN || !CHAT) {
  console.error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing — skipping digest.");
  process.exit(0);
}

// --- gather ---
const CAMPAIGN_END = "2026-07-19";
const TARGET = 100000;
const daysLeft = Math.max(0, Math.round((new Date(CAMPAIGN_END) - new Date(today)) / 86400000));
const dayNum = 15 - daysLeft;

let xTotal = 0, xDelta = 0, liManual = 0;
if (existsSync(`${DIR}/scoreboard-history.csv`)) {
  const rows = readFileSync(`${DIR}/scoreboard-history.csv`, "utf8").trim().split("\n").slice(1);
  if (rows.length) {
    const last = rows[rows.length - 1].split(",");
    xTotal = parseInt(last[1], 10) || 0;
    liManual = parseInt(last[4], 10) || 0;
    if (rows.length >= 2) xDelta = xTotal - (parseInt(rows[rows.length - 2].split(",")[1], 10) || 0);
  }
}

function safeJson(p) {
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}

const xState = safeJson(`content-bank/x/${today}/posted.json`) ?? {};
const xSlots = Object.keys(xState).length;
const liState = safeJson(`content-bank/li/${today}/posted.json`);

function countToday(file, dateCol = 0) {
  if (!existsSync(file)) return 0;
  return readFileSync(file, "utf8").trim().split("\n").slice(1)
    .filter((r) => r.split(",")[dateCol]?.startsWith(today)).length;
}
const inboundToday = countToday(`${DIR}/inbound-log.csv`);

let trendToday = false;
if (existsSync(`${DIR}/post-stats-registry.md`)) {
  trendToday = readFileSync(`${DIR}/post-stats-registry.md`, "utf8").includes(`${today}-trend-slot`);
}

let topLine = "";
if (existsSync(`${DIR}/SCOREBOARD.md`)) {
  const m = readFileSync(`${DIR}/SCOREBOARD.md`, "utf8").match(/\| ([\d,]+) \| \d+ \| \d+ \| (https:\/\/x\.com\/\S+) \|/);
  if (m) topLine = `${m[1]} views · ${m[2]}`;
}

const needPerDay = daysLeft > 0 ? Math.ceil((TARGET - xTotal) / daysLeft) : 0;
const pacePct = ((xTotal / TARGET) * 100).toFixed(1);

const missed = [];
if (xSlots < 3) missed.push(`X natives ${xSlots}/3`);
if (!trendToday) missed.push("trend post skipped");
if (!liState) missed.push("LinkedIn 0/1");

const msg = `<b>Day ${dayNum}/15 · ${today}</b>

<b>X</b>: ${xTotal.toLocaleString()} total (${xDelta >= 0 ? "+" : ""}${xDelta.toLocaleString()} today) · ${pacePct}% of 100k
Published: ${xSlots}/3 natives${trendToday ? " + trend post" : ""} · answered ${inboundToday} inbound

<b>LinkedIn</b>: ${liState ? "posted ✓" : "not posted ✗"} · manual stats: ${liManual.toLocaleString()}

${topLine ? `<b>Top post</b>: ${topLine}\n` : ""}<b>Pace</b>: need ${needPerDay.toLocaleString()}/day on X (${daysLeft}d left)
${missed.length ? `\n⚠ ${missed.join(" · ")}` : "\n✓ Full day executed"}${dayNum >= 7 && xTotal < 15000 ? "\n\n🔴 PIVOT flag: under 15k trajectory. Format shift recommended." : ""}`;

const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ chat_id: CHAT, text: msg, parse_mode: "HTML", disable_web_page_preview: true }),
});
const out = await res.json();
console.log(out.ok ? "Digest sent." : `Telegram error: ${JSON.stringify(out)}`);
