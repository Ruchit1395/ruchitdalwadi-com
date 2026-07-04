#!/usr/bin/env node
/**
 * Target-200 builder — ranks accounts worth engaging for visibility.
 *
 * Method: sample Top + Latest posts across campaign lanes (last 7 days),
 * aggregate by author, score by engagement quality and activity, emit the
 * top 200 as CSV + a human-readable markdown view.
 *
 * Scoring favors the "commentable sweet spot": accounts that are active,
 * earn real engagement, and whose comment sections are not so big that a
 * reply drowns (mega accounts are kept but tiered).
 *
 * Output:
 *   distribution/.../target-accounts.csv
 *   distribution/.../TARGETS.md
 *
 * Env: TWITTERAPIIO_KEY
 */

import { writeFileSync } from "node:fs";

const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";

if (!process.env.TWITTERAPIIO_KEY) {
  console.error("TWITTERAPIIO_KEY missing");
  process.exit(1);
}

const LANES = [
  { name: "agents-evals", q: '("AI agents" OR "agentic AI" OR "evals" OR "LLM evaluation") min_faves:50' },
  { name: "coding-ai", q: '("Claude Code" OR "Cursor" OR "coding agents" OR "AI coding") min_faves:50' },
  { name: "pm-product", q: '("product management" OR "product manager" OR "product strategy") min_faves:40' },
  { name: "startups-gtm", q: '(founder OR "B2B SaaS" OR GTM OR "first customers") (AI OR product) min_faves:40' },
  { name: "ai-teaching", q: '("prompt engineering" OR "context engineering" OR "AI workflow" OR "AI at work") min_faves:50' },
  { name: "models-news", q: '("Claude" OR "GPT" OR "Gemini" OR Anthropic OR OpenAI) (update OR launch OR benchmark) min_faves:80' },
];

async function search(q, type, cursor = "") {
  const url = `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=${type}&query=${encodeURIComponent(q + " -filter:replies lang:en")}${cursor ? `&cursor=${cursor}` : ""}`;
  const r = await fetch(url, { headers: { "X-API-Key": process.env.TWITTERAPIIO_KEY } });
  if (!r.ok) return { tweets: [] };
  return r.json();
}

const authors = new Map();

for (const lane of LANES) {
  for (const type of ["Top", "Latest"]) {
    let cursor = "";
    for (let page = 0; page < 3; page++) {
      const d = await search(lane.q, type, cursor);
      for (const t of d.tweets ?? []) {
        const a = t.author;
        if (!a?.userName) continue;
        const key = a.userName.toLowerCase();
        if (key === "ruchitdalwadi") continue;
        const entry = authors.get(key) ?? {
          handle: a.userName,
          name: a.name ?? "",
          followers: a.followers ?? 0,
          verified: a.isBlueVerified ?? false,
          posts: 0,
          totalViews: 0,
          totalLikes: 0,
          totalReplies: 0,
          lanes: new Set(),
          sample: "",
        };
        entry.posts++;
        entry.totalViews += t.viewCount ?? 0;
        entry.totalLikes += t.likeCount ?? 0;
        entry.totalReplies += t.replyCount ?? 0;
        entry.lanes.add(lane.name);
        if (!entry.sample && (t.text ?? "").length > 40) entry.sample = t.text.slice(0, 100).replace(/\n/g, " ");
        authors.set(key, entry);
      }
      cursor = d.next_cursor ?? "";
      if (!cursor || !(d.tweets ?? []).length) break;
      await new Promise((r) => setTimeout(r, 1200));
    }
  }
}

const SPAM = /(promo|deals|airdrop|giveaway|signals|pump|casino)/i;

const ranked = [...authors.values()]
  .filter((a) => a.followers >= 1000 && !SPAM.test(a.handle + a.name))
  .map((a) => {
    const avgViews = a.totalViews / a.posts;
    const avgLikes = a.totalLikes / a.posts;
    const engagementRate = a.followers > 0 ? avgLikes / a.followers : 0;
    // sweet-spot multiplier: comments get seen at 2k-200k followers
    const tier = a.followers > 500000 ? "mega" : a.followers > 100000 ? "large" : a.followers > 10000 ? "mid" : "rising";
    const sweetSpot = tier === "mid" ? 1.5 : tier === "rising" ? 1.3 : tier === "large" ? 1.0 : 0.6;
    const score = Math.log10(1 + avgViews) * Math.log10(1 + avgLikes) * (1 + Math.min(engagementRate * 100, 3)) * sweetSpot * Math.min(a.posts, 4);
    return { ...a, avgViews: Math.round(avgViews), avgLikes: Math.round(avgLikes), tier, score };
  })
  .sort((x, y) => y.score - x.score)
  .slice(0, 200);

const csv = [
  "rank,handle,name,followers,tier,posts_sampled,avg_views,avg_likes,lanes,score,sample",
  ...ranked.map((a, i) =>
    [
      i + 1,
      a.handle,
      `"${a.name.replace(/"/g, "'")}"`,
      a.followers,
      a.tier,
      a.posts,
      a.avgViews,
      a.avgLikes,
      `"${[...a.lanes].join("|")}"`,
      a.score.toFixed(1),
      `"${a.sample.replace(/"/g, "'")}"`,
    ].join(","),
  ),
].join("\n");
writeFileSync(`${DIR}/target-accounts.csv`, csv + "\n");

const byTier = { rising: [], mid: [], large: [], mega: [] };
ranked.forEach((a, i) => byTier[a.tier].push({ ...a, rank: i + 1 }));

const md = `# Target 200 — accounts to engage for visibility

Generated ${new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10)} from 7-day engagement data across ${LANES.length} lanes. Refreshed weekly (Sundays).

How to use: these are the rooms for browser comment sessions (X API blocks cold replies, so this list powers laptop-on batches and manual engagement). Prioritize **mid** and **rising** tiers: comments there actually get seen. Mega accounts are context, not primary targets.

| Tier | Count | Comment strategy |
|---|---:|---|
| rising (1k-10k followers) | ${byTier.rising.length} | Early, substantive comments build peer relationships |
| mid (10k-100k) | ${byTier.mid.length} | The sweet spot: real reach, readable comment sections |
| large (100k-500k) | ${byTier.large.length} | Comment within 30 min of their post or skip |
| mega (500k+) | ${byTier.mega.length} | Only when the post is <1h old and directly in our lane |

## Top 50 by score

| # | Handle | Followers | Tier | Avg views | Avg likes | Lanes |
|---:|---|---:|---|---:|---:|---|
${ranked.slice(0, 50).map((a, i) => `| ${i + 1} | @${a.handle} | ${a.followers.toLocaleString()} | ${a.tier} | ${a.avgViews.toLocaleString()} | ${a.avgLikes.toLocaleString()} | ${[...a.lanes].join(", ")} |`).join("\n")}

Full list: \`target-accounts.csv\` (200 rows).
`;
writeFileSync(`${DIR}/TARGETS.md`, md);

console.log(`Ranked ${ranked.length} targets from ${authors.size} authors sampled.`);
console.log(`Tiers: rising=${byTier.rising.length} mid=${byTier.mid.length} large=${byTier.large.length} mega=${byTier.mega.length}`);
