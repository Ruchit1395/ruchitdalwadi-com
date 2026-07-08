# Comment Session Runbook — for the browser automation agent (Codex)

Purpose: cold comments in fresh, high-engagement, in-lane rooms are the account-warming and visibility engine. The X API forbids this motion (403 on cold replies and quotes), so it runs ONLY through the browser. This runbook makes it deterministic.

Read together with: `CONTENT_RULES.md`, `HOOK_PLAYBOOK.md`, `AUDIENCE_MAP.md`.

## When to run

On any heartbeat where ALL of these hold:
1. Browser control is healthy (tab create + navigate succeed).
2. Last comment session ended more than 2.5 hours ago (check newest timestamp in `replied-log.csv`).
3. Fewer than 12 cold comments posted today across X + LinkedIn (count today's rows in `replied-log.csv`).

If the browser fails twice at tab level, stop and log the blocker. Do not retry the same wakeup.

## Session objective

When the gates pass, the job is to leave qualified comments, not merely to run one scout command.

Default target per heartbeat: 4-5 total cold comments, split across both platforms when possible:
- Preferred mix: 2 X comments + 3 LinkedIn comments. LinkedIn is Codex's PRIMARY comment duty: the scheduled local runner (launchd, 3x/day) covers X deterministically, and no script can automate LinkedIn (obfuscated DOM), so agent-with-eyes effort goes there first.
- If one platform cannot produce qualified rooms after the fallback ladder below, fill the session with the other platform up to the 5-comment session cap.
- If only 1-3 qualified rooms exist after exhaustive fallback, post those. A smaller verified session is better than a zero-comment session.
- A zero-comment session is allowed only after the fallback ladder has been exhausted and the blocker is logged clearly.

Do not lower the quality bar into spam. Do broaden search, rerun scouting with larger pools, rotate lanes, and use minimum viable sessions instead of ending early.

## X session (target 3-5 comments)

### 1. Scout
From the repo root:

```bash
node --env-file=.env.local scripts/scout-comment-targets.mjs 6
```

This returns fresh (<24h), engaged (40+ likes, <150 replies), in-lane targets, already deduped against `replied-log.csv` (never same post twice, never same author within 3 days) and filtered against finance/crypto/politics rooms.

If it prints `NO_TARGETS` or returns fewer than 4 qualified targets after selection, do not end the session yet. Run the X fallback ladder.

### X fallback ladder

Use these steps in order until you have enough qualified targets or the ladder is exhausted:

1. Rerun the scout with a larger pool:

```bash
node --env-file=.env.local scripts/scout-comment-targets.mjs 12
```

2. If still short, rerun once more:

```bash
node --env-file=.env.local scripts/scout-comment-targets.mjs 20
```

3. If still short and browser health is good, use X browser search directly. Sample at least 8 lanes before declaring X exhausted. Use Top for quality, then Latest when Top is stale:
   - `"AI agents" min_faves:20 -crypto -stocks -trading -politics lang:en`
   - `"AI workflow" min_faves:20 -crypto -stocks -trading -politics lang:en`
   - `"AI coding" min_faves:20 -crypto -stocks -trading -politics lang:en`
   - `"Claude Code" min_faves:20 -crypto -stocks -trading -politics lang:en`
   - `"Cursor" "AI" min_faves:20 -crypto -stocks -trading -politics lang:en`
   - `"LLM evals" OR "AI evals" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"context engineering" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"ChatGPT at work" min_faves:20 -crypto -stocks -trading -politics lang:en`
   - `"model choice" "AI" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"AI product management" min_faves:10 -crypto -stocks -trading -politics lang:en`

4. If the room is highly relevant and the author is clearly TG, relaxed engagement is allowed: 20+ likes for X, under 200 replies, posted within ~48h. Do not relax the banned-room rails.

5. If direct X search yields only 1-3 qualified rooms, post those and then try the LinkedIn ladder for the remaining session slots.

### 2. Select
From the list, keep targets where the author's audience is clearly our TG (founders, PMs, operators, AI builders). Drop anything that is a company promo, an engagement-farm listicle, or unrelated to: agents, evals, AI workflows, AI coding, model choice, AI product/PM work.

Selection priority:
1. Practitioner or builder sharing a concrete lesson.
2. Founder, PM, operator, engineer, educator, or AI builder with active comments.
3. A strong room where the comment can add a test, caveat, failure mode, or workflow.

Do not reject a good target only because it is not perfect. Reject it only when it breaks the rails, is off-lane, is promotional, or lacks a real opening for a substantive comment.

### 3. Draft — one comment per target
Rules (all mandatory):
- 150-240 characters.
- Add ONE thing the room does not already have: a frame, a named test, a war-story number, a sharp caveat, or one dry observation.
- Answer the post's actual point in the first 10 words. No throat-clearing.
- NO links, NO hashtags, NO emoji, NO em dashes ("—" or "–").
- Banned openers: Absolutely / Totally agree / Exactly / Spot on / Great post / This / Love this / 100%.
- Banned scaffolds: "isn't just X, it's Y", "the real game is", "Most people...".
- Vary shape across the session: if comment 1 was a test-to-run, comment 2 is a war story or a caveat or a dry observation.
- RECEIPTS FIRST (new standard, 2026-07-06): prefer real, verifiable material from Ruchit's own public builds over anonymized war stories. Available real material, all true and checkable:
  - X's API returns 403 on cold replies AND cold quotes ("not mentioned or otherwise engaged") - learned building his own distribution automation this week
  - X pay-per-use pricing: $0.015 per post, $0.20 if the post contains a link (13x penalty)
  - Playwright/CDP browsers get served a dead static shell by X, headed or headless
  - Gemini 2.5 Flash thinking mode silently eats maxOutputTokens and truncates output mid-word unless thinkingBudget is set to 0
  - His first 70 X posts earned 2,981 impressions total; content quality was not the bottleneck, distribution was
  - LinkedIn personal API cannot read post stats (403) or search public posts at all; document carousels cannot be uploaded by any API
  - Runs a 6-axis eval rubric (min 12/18, no axis below 2) on content before publishing
  The old anonymized industry stories (pharma 11x, logistics 9->2%, ERP row-100, ed-tech 20-case, fashion 12->5) may still be used, but a real receipt beats an anonymous story every time.

Reference examples of the standard (posted 2026-07-05):
- "The prompting-before-agents one is underrated. Most agent problems I get asked about are context problems wearing a costume. If quality plateaus after two prompt edits, change what the model can see, not the words."
- "The 40 minute build is the demo. Whether it survives depends on the boring contract: what it may touch, when it must stop, who reviews run 20."
- "Benchmark deltas tell you it can code. They do not tell you how it fails... The failure shape decides production, not the leaderboard."

### 4. Post (browser)
For each target:
1. Navigate to the target URL. Wait for load.
2. Click the "Post your reply" box, type the comment.
3. Screenshot; confirm the text is fully present in the composer.
4. Find and click the Reply submit button INSIDE the composer (not the reply icon on the post).
5. 2+ minutes between comments (natural pacing).

If the composer rejects input twice on a target, skip it and continue.

### 5. Verify and log
After the batch, verify each landed:

```bash
# check recent replies include the new ones
curl -s "https://api.twitterapi.io/twitter/user/last_tweets?userName=ruchitdalwadi&includeReplies=true" -H "X-API-Key: $TWITTERAPIIO_KEY"
```

For each verified comment, append to `replied-log.csv`:
`<iso-date>,<target_tweet_id>,<target_author>,<target_views>,<reply_id>,<reply_url>`

Unverified after one recheck = do not count; note in the session summary.

### 6. Commit
Per the existing contract: stage `distribution/`, commit, `git pull --rebase`, push. Then post the standard chat summary (X/LinkedIn/Status shape from README.md).

## LinkedIn session (target 2-5 comments, when browser healthy)

1. Search LinkedIn content for lanes: "AI agents", "AI workflow", "evals LLM", "AI product management", "Claude Code" (rotate).
2. Room gate: only posts with 50+ reactions, posted within ~48h, author is a practitioner or educator in our TG (not a company page promo, not a tiny poll).
3. Comment: 300-600 chars, same content rules as X (no links, no em dashes, no banned openers, one substantive addition). LinkedIn register: slightly warmer, narrative allowed.
4. One comment per author per week. Log to `replied-log.csv` with the post URL in place of tweet id.
5. If the editor rejects text twice, stop LinkedIn for the session and log the blocker.

### LinkedIn fallback ladder

If the first lane does not produce qualified rooms, do not stop. Sample at least 8 lanes before declaring LinkedIn exhausted:
- "AI agents"
- "AI workflow"
- "evals LLM"
- "AI product management"
- "Claude Code"
- "AI coding"
- "Cursor AI"
- "ChatGPT for work"
- "context engineering"
- "LLM product"
- "agentic AI workflow"
- "AI automation operators"

Use these filters and fallbacks:
1. Prefer 50+ reactions, within ~48h, practitioner or educator author.
2. If still short, accept 25+ reactions when the post is within ~24h and the author is clearly TG.
3. If still short, accept a thoughtful practitioner post with active comments even if reactions are not visible, but only when the room is clearly in-lane and non-promotional.
4. Skip company promos, course lead-gen posts, engagement polls, generic "future of work" takes, and posts where only connections can comment.
5. If LinkedIn gives search pages with mostly promos or polls, change the lane, sort/filter by recent when available, and inspect more results before stopping.

The LinkedIn goal is recurring presence. If there are 1-2 high-quality rooms and X has remaining capacity, post those instead of returning zero LinkedIn comments.

## Hard safety rails (never violate)

- Max 12 cold comments/day total; max 5 per session; 2+ min spacing.
- No DMs, no follows, no likes, no reposts, no profile edits, no paid actions.
- Never comment in politics/crypto/stocks/tragedy rooms even if AI-adjacent.
- Never comment twice on the same post; never the same author within 3 days (X) / 7 days (LinkedIn).
- If unsure whether a room fits the TG, skip it. A skipped room costs nothing; a spammy comment costs reputation.

## Exhaustion standard

"No qualified posts" means all of this happened:
1. Browser health passed.
2. X scout ran at 6, 12, and 20.
3. Direct X browser search sampled at least 8 fallback lanes.
4. LinkedIn browser search sampled at least 8 fallback lanes.
5. All candidates failed for concrete reasons: banned room, off-lane, promo, engagement farm, insufficient audience fit, duplicate author/post, cannot comment, or composer failure.

If fewer than 4-5 comments were posted, the summary must say exactly which ladder steps ran and why remaining candidates were skipped.
