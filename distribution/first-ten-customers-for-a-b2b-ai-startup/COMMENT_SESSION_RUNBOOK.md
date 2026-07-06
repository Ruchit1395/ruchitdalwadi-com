# Comment Session Runbook — for the browser automation agent (Codex)

Purpose: cold comments in fresh, high-engagement, in-lane rooms are the account-warming and visibility engine. The X API forbids this motion (403 on cold replies and quotes), so it runs ONLY through the browser. This runbook makes it deterministic.

Read together with: `CONTENT_RULES.md`, `HOOK_PLAYBOOK.md`, `AUDIENCE_MAP.md`.

## When to run

On any heartbeat where ALL of these hold:
1. Browser control is healthy (tab create + navigate succeed).
2. Last comment session ended more than 3 hours ago (check newest timestamp in `replied-log.csv`).
3. Fewer than 12 cold comments posted today across X + LinkedIn (count today's rows in `replied-log.csv`).

If the browser fails twice at tab level, stop and log the blocker. Do not retry the same wakeup.

## X session (4-5 comments)

### 1. Scout
From the repo root:

```bash
node --env-file=.env.local scripts/scout-comment-targets.mjs 6
```

This returns fresh (<24h), engaged (40+ likes, <150 replies), in-lane targets, already deduped against `replied-log.csv` (never same post twice, never same author within 3 days) and filtered against finance/crypto/politics rooms. If it prints `NO_TARGETS`, end the session.

### 2. Select
From the list, keep 4-5 where the author's audience is clearly our TG (founders, PMs, operators, AI builders). Drop anything that is a company promo, an engagement-farm listicle, or unrelated to: agents, evals, AI workflows, AI coding, model choice, AI product/PM work.

### 3. Draft — one comment per target
Rules (all mandatory):
- 150-240 characters.
- Add ONE thing the room does not already have: a frame, a named test, a war-story number, a sharp caveat, or one dry observation.
- Answer the post's actual point in the first 10 words. No throat-clearing.
- NO links, NO hashtags, NO emoji, NO em dashes ("—" or "–").
- Banned openers: Absolutely / Totally agree / Exactly / Spot on / Great post / This / Love this / 100%.
- Banned scaffolds: "isn't just X, it's Y", "the real game is", "Most people...".
- Vary shape across the session: if comment 1 was a test-to-run, comment 2 is a war story or a caveat or a dry observation.
- War-story details available (do not invent new companies): logistics agent-to-pipeline 9%->2%, pharma 11x prompt rewrites vs one example pair, ERP row-100 pagination bug, ed-tech 20-case escalation set, fashion 12->5 tools, pharma 31 rejects -> 3 root causes.

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

## LinkedIn session (3-5 comments, when browser healthy)

1. Search LinkedIn content for lanes: "AI agents", "AI workflow", "evals LLM", "AI product management", "Claude Code" (rotate).
2. Room gate: only posts with 50+ reactions, posted within ~48h, author is a practitioner or educator in our TG (not a company page promo, not a tiny poll).
3. Comment: 300-600 chars, same content rules as X (no links, no em dashes, no banned openers, one substantive addition). LinkedIn register: slightly warmer, narrative allowed.
4. One comment per author per week. Log to `replied-log.csv` with the post URL in place of tweet id.
5. If the editor rejects text twice, stop LinkedIn for the session and log the blocker.

## Hard safety rails (never violate)

- Max 12 cold comments/day total; max 5 per session; 2+ min spacing.
- No DMs, no follows, no likes, no reposts, no profile edits, no paid actions.
- Never comment in politics/crypto/stocks/tragedy rooms even if AI-adjacent.
- Never comment twice on the same post; never the same author within 3 days (X) / 7 days (LinkedIn).
- If unsure whether a room fits the TG, skip it. A skipped room costs nothing; a spammy comment costs reputation.
