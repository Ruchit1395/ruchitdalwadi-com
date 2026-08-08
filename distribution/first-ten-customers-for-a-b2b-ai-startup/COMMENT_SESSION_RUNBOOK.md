# Comment Session Runbook — for the browser automation agent (Codex)

Purpose: cold comments in fresh, high-engagement, in-lane rooms are the account-warming and visibility engine. The X API forbids this motion (403 on cold replies and quotes), so it runs ONLY through the browser. This runbook makes it deterministic.

Submission boundary: X cold comments must be composed and submitted through the authenticated browser-control session. Never submit them through the X API, Composio, a script, or a direct HTTP endpoint. `twitterapi.io` is optional best-effort evidence only and never gates a browser submission. If it is unavailable, continue with browser-only posting and record that the post-submit check was unavailable.

Read together with: `CONTENT_RULES.md`, `HOOK_PLAYBOOK.md`, `AUDIENCE_MAP.md`, `VOICE_COMPOSITION_GUIDE.md`.

## When to run

On any heartbeat where ALL of these hold:
1. Browser control is healthy (tab create + navigate succeed).
2. Cadence is eligible:
   - **Normal mode:** the last comment session ended more than 2.5 hours ago.
   - **Recovery mode:** the last session was more recent, but the campaign is behind its local-day pace by at least 2 comments, at least 60 minutes have passed since the newest logged comment, and a fresh qualified room is available. The 2.5-hour cooldown is a burst-control default, not a hard stop when the day is materially behind.
3. Fewer than 20 cold comments posted today across X + LinkedIn (count today's rows in `replied-log.csv`), with a maximum of 10 on X and 10 on LinkedIn.

If the browser fails twice at tab level, stop and log the blocker. Do not retry the same wakeup.

### Standing authorization and recovery

- The user's recurring heartbeat instruction is standing authorization for qualified public cold comments. Do not ask for a second confirmation before submitting a comment that passes this runbook.
- Treat browser failures as platform-local. After one tab failure, recover with one fresh tab; if that platform fails again, log the platform blocker and immediately continue the other platform or any already-qualified target. Never discard a valid target solely because the other platform is unavailable.
- Process search lanes one at a time. If a lane or bulk scan times out, record the completed lanes, resume from the first unprocessed lane after recovery, and do not restart the entire session.
- A valid 1-3-room session is complete enough to post. Post the qualified rooms found, even when the preferred cross-platform mix is unavailable.
- Do not carry a drafted target across wakeups. If it is stale, promotional, duplicate, or otherwise fails the room gate on recheck, discard it and scout a fresh replacement.

### Cadence modes and recovery override

- Count comments by the local calendar day in Asia/Kolkata. Pace the 20-comment target across the active window from 08:00 to 23:00 IST. Before 08:00, the expected pace is 0. From 08:00 onward, calculate `expected_by_now = ceil(20 * elapsed_active_minutes / 900)`, capped at 20.
- Enter recovery mode when `expected_by_now - comments_today >= 2`. Example: at 11:00 IST the expected pace is 4 comments; a day at 2/20 is behind by 2 and should reopen after the shorter recovery interval.
- In recovery mode, wait at least 60 minutes from the newest logged comment before starting another session. Keep the mandatory 2+ minute spacing between individual comments.
- Recovery mode does not relax quality or safety rails: maximum 5 comments per session, maximum 20 per day, maximum 10 per platform, author cooldowns, banned-room exclusions, browser-only posting, and visible pre-submit composer-state verification remain mandatory. Post-submit landed-reply verification is optional.
- If the day is behind but one platform is capped, route recovery capacity to the other platform. If both platforms have capacity, use the normal mixed-session preference.
- When the deficit is 2 or more, target the full 5-comment session cap whenever qualified rooms exist. A smaller session is allowed only after the applicable fallback ladder is exhausted; keep scouting until the capacity is recovered or concrete safety/quality skips make further posting unavailable.
- Re-evaluate the pace after every session. Do not wait for the 2.5-hour normal cooldown when recovery mode still applies; return to normal mode once the backlog is less than 2 comments. Do not leave the campaign two or more comments behind across two consecutive eligible heartbeats without opening the recovery session and attempting the full qualified batch.

## Session objective

When the gates pass, the job is to leave qualified comments, not merely to run one scout command.

Default target per heartbeat: 4-5 total cold comments, split across both platforms when possible:
- Preferred mix: 2 X comments + 3 LinkedIn comments. Codex owns both cold-comment platforms and handles all comments through the browser. Do not assume a scheduled runner will cover X; check the log and run the X browser ladder in this session when capacity is available.
- If one platform cannot produce qualified rooms after the fallback ladder below, fill the session with the other platform up to the 5-comment session cap.
- If only 1-3 qualified rooms exist after exhaustive fallback, post those. A smaller verified session is better than a zero-comment session.
- A zero-comment session is allowed only after the fallback ladder has been exhausted and the blocker is logged clearly.

### Division of labour (verified 2026-08-02 — read this before anything else)

| Job | Owner | Codex should |
|---|---|---|
| X native posts | `x-post-session.mjs` (launchd, 09:00/12:15/19:15/22:00 IST) | Never touch |
| LinkedIn native posts | `li-publish.mjs` (Composio API) | Never touch |
| **X cold comments** | **Codex via browser** | **Handle the feed, fallback lanes, browser composer, and optional best-effort landed-reply lookup. Do not delegate to `comment-session.mjs`.** |
| **LinkedIn cold comments** | **Codex via browser** | **Handle the feed, fallback lanes, browser composer, and exact pre-submit text check.** |

Why Codex owns both cold-comment platforms: LinkedIn's obfuscated DOM prevents reliable script-based dedupe and permalink capture, while X requires browser-only submission. `li-comment-session.mjs` is retired and `comment-session.mjs` is no longer the owner of X comments. Native posts remain outside this duty.

Native posts are handled only by `NATIVE_POST_RUNBOOK.md` and its separate evening schedules. This runbook remains cold-comments-only. Do not draft or publish native posts from a comment-session run.

### Verify the text, not just that something posted

A comment that posts with mangled text is worse than no comment. On 2026-08-02 a 309-character X reply passed a pre-submit length check, then submitted corrupted: spaces dropped and replaced with stray periods ("State. measurementis the bucket", "a rightanswer in 40 calls"). It is still live as a permanent example.

So, on every comment:
1. Immediately before submitting, re-read the composer text from the page.
2. Compare it against the text you intended, not just whether the composer is non-empty.
3. A post-submit re-read is optional and must not gate the submission or trigger a replacement attempt.

Keep comments short. The X drafts cap at 240 characters and have never corrupted; the failure appeared at 309. Treat ~250 characters as the practical ceiling for anything typed or pasted into a composer.

### Known blockers to check first

- **twitterapi.io credits.** As of 2026-08-02 the balance is exhausted (`"Credits is not enough. Please recharge"`). While empty, X post-submit verification cannot run, but that does not block browser-only submissions. Do not use the API as a submit path, and do not treat its absence as evidence that no browser targets exist.
- **X DOM scouting fallback.** When twitterapi.io is empty, X targets can still be read from the logged-in browser: `article[data-testid="tweet"]` with `a[href*="/status/"]` for the id and `[data-testid="tweetText"]` for the body. These selectors were verified working on 2026-08-02.

Do not lower the quality bar into spam. Do broaden search, rerun scouting with larger pools, rotate lanes, and use minimum viable sessions instead of ending early.

### Non-zero LinkedIn session policy

The LinkedIn feed is a starting point, not a stopping point. Do not close a session with zero comments just because the feed is thin.

When fewer than two feed rooms pass the normal gate:

1. Search at least 8 base lanes one at a time.
2. If the base pass is short, search at least 8 expanded AI-system, startup, and technical-builder lanes.
3. Relax the room gate in this order: 25+ reactions within 24 hours from a clearly relevant practitioner, then a thoughtful practitioner post with active comments even when reactions are not visible.
4. Inspect additional result cards and rotate lanes until a qualified room is found or a hard platform blocker is confirmed.

A zero-comment session is an exceptional blocker outcome only. It requires a documented browser failure, account restriction, or a completed feed, base-lane, expanded-lane, and relaxed-criteria search with every candidate rejected for a concrete safety or quality reason. Never force a comment into a banned, promotional, duplicate, same-week-author, or genuinely uncertain room just to avoid zero.

### Watchlist recovery queue

If the feed and normal search lanes produce no qualified room, continue through `ai-operator-post-watchlist-2026-08-05.csv` before declaring the session empty.

1. Work from the next unreviewed profile in the watchlist, prioritizing rows with `candidate_post_url` and then rows marked `needs_live_recheck`.
2. Open the latest post live. Confirm it is still fresh, public, in-lane, non-promotional, and open to comments. A profile link or search result is a lead, not proof of a target.
3. Use loose criteria only for a clearly relevant practitioner post with a real opening. A thoughtful post with active comments can qualify even when reaction counts are hidden.
4. Skip hiring, polls, lead magnets, service pitches, company promos, stale posts, duplicates, cooldown authors, and uncertain rooms. Continue down the queue after each skip.
5. Post every safe qualified room found, up to the session cap. Do not stop at zero merely because the home feed was thin.

### Comment voice gate

Comments must sound like a sharp human who has shipped things. No AI slop, no filler, no generic praise, no corporate fog, and no standard reply pattern. Use plain language first: one clear point, short sentences, everyday words, and a practical move the reader can understand without specialist jargon. Prefer `note`, `check`, `rule`, `owner`, `step`, and `fix` over `artifact`, `architecture`, `orchestration`, `autonomy`, `operating system`, or `decision tree`. Use a technical term only when the target requires it, then explain it in ordinary language. A dry joke is optional, and it must be easy to understand. Satire may target broken processes, incentives, dashboards, or tool rituals. Never mock, abuse, threaten, or put down the author, their identity, or their audience. Every comment still needs one useful addition tied to the actual post.

Before drafting, use `VOICE_COMPOSITION_GUIDE.md`. It provides a mandatory composite voice system based on high-level, non-exclusive craft traits from the campaign's reference writers. Never imitate a named person, reuse a recognizable phrase, or reproduce a signature structure. Choose no more than two reference qualities, use an original Ruchit receipt or a target-specific detail, and complete the composition checklist before submitting.

## X session (target 3-5 comments)

### 1. Feed-first discovery (primary)

Start on the authenticated X home feed, not keyword search. Inspect at least 20 visible posts or 3 screenfuls, whichever comes first, scrolling in small increments so each card can be rechecked. Capture the post URL, author, age, likes, replies, and the concrete opening for a useful comment.

Keep feed targets when they are fresh, in-lane, practitioner-authored, and pass the normal engagement and safety gates. Skip reposts without a substantive author comment, ads, company launch promos, engagement farms, banned rooms, duplicates, and authors inside the 3-day cooldown.

If the feed sample produces 3 or more qualified rooms, use those rooms and do not run a keyword scout just to replace them. If it produces fewer than 3, continue to the browser-search fallback below. Feed discovery does not replace dedupe, author cooldowns, or visible pre-submit composer-state verification.

### 2. X browser-search fallback

Use these steps in order until you have enough qualified targets or the ladder is exhausted:

1. With browser health confirmed, use X browser search directly. Sample at least 8 lanes before declaring X exhausted. Use Top for quality, then Latest when Top is stale:
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
   - `"AI startup" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"B2B AI" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"enterprise AI" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"AI infrastructure" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"AI developer tools" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"startup engineering" AI min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"technical founder" AI min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"agent evaluation" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"production AI" min_faves:10 -crypto -stocks -trading -politics lang:en`
   - `"MCP tools" min_faves:10 -crypto -stocks -trading -politics lang:en`

2. If the room is highly relevant and the author is clearly TG, relaxed engagement is allowed: 20+ likes for X, under 200 replies, posted within ~48h. Do not relax the banned-room rails.

3. If direct X search yields only 1-3 qualified rooms, post those and then try the LinkedIn ladder for the remaining session slots.

### 3. Select
From the list, keep targets where the author's audience is clearly our TG (founders, PMs, operators, AI builders). Drop anything that is a company promo, an engagement-farm listicle, or unrelated to: agents, evals, AI workflows, AI coding, model choice, AI product/PM work.

Selection priority:
1. Practitioner or builder sharing a concrete lesson.
2. Founder, PM, operator, engineer, educator, or AI builder with active comments.
3. A strong room where the comment can add a test, caveat, failure mode, or workflow.

Do not reject a good target only because it is not perfect. Reject it only when it breaks the rails, is off-lane, is promotional, or lacks a real opening for a substantive comment.

### 4. Draft — one comment per target
Rules (all mandatory):
- Normally 90-180 characters. Use 1 or 2 sentences unless extra words make the point clearer.
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

### 5. Post (browser)
For each target:
1. Navigate to the target URL. Wait for load.
2. Click the "Post your reply" box, type the comment.
3. Confirm the exact text is fully present through visible DOM or equivalent page state immediately before submission. A screenshot is optional and is not a posting gate.
4. Find and click the Reply submit button INSIDE the composer (not the reply icon on the post).
5. 2+ minutes between comments (natural pacing).

If the composer rejects input twice on a target, skip it and continue.

### 6. Log
After the batch, a landed-reply check is optional. If the check is available, record its result. If it is unavailable, record the browser submission and the unavailable post-submit check without claiming that the reply was verified:

```bash
# check recent replies include the new ones
curl -s "https://api.twitterapi.io/twitter/user/last_tweets?userName=ruchitdalwadi&includeReplies=true" -H "X-API-Key: $TWITTERAPIIO_KEY"
```

For each browser-submitted comment, append to `replied-log.csv`:
`<iso-date>,<target_tweet_id>,<target_author>,<target_views>,<reply_id>,<reply_url>`

Leave `reply_id` and `reply_url` blank when the browser does not expose them. Do not invent a landed identifier.

Unverified after one recheck = do not count; note in the session summary.

### 7. Commit
Per the existing contract: stage `distribution/`, commit, `git pull --rebase`, push. Then post the standard chat summary (X/LinkedIn/Status shape from README.md).

## LinkedIn session (target 2-5 comments, when browser healthy)

This is Codex's core duty. If a wakeup can only do one thing, do this.
Note (2026-08-02): the `li-comment-session.mjs` script referenced in older notes is retired and its launchd job is unloaded. Do not try to run it or repair its selectors.

1. Feed-first discovery: open the authenticated LinkedIn home feed and inspect at least 20 visible post cards or 3 screenfuls, whichever comes first. Capture exact post URLs, author, age, reactions, comments, and the substantive opening before drafting.
2. Keep fresh, practitioner-authored, in-lane feed rooms that pass the normal 50+ reaction gate, or the 25+ within 24 hours practitioner fallback. Skip reposts without substance, polls, company promos, lead-gen, hiring posts, restricted rooms, duplicates, and authors inside the 7-day cooldown.
3. If feed-first discovery finds 2 or more qualified rooms, comment there and do not search merely to replace them. If it finds fewer than 2, continue with the keyword lanes below and sample at least 8 lanes before declaring LinkedIn exhausted.
4. Search LinkedIn content using the rotating lane bank below. Start with the base lanes, then add expanded lanes whenever the first pass is short. Do not require every lane in one session:
   - Base: AI agents, AI workflow, evals LLM, AI product management, Claude Code, AI coding, Cursor AI, ChatGPT for work.
   - AI systems: artificial intelligence, generative AI, LLM applications, RAG, context engineering, AI automation, AI infrastructure, AI developer tools, agent evaluation, production AI, AI observability, AI safety engineering, model context protocol, MCP tools.
   - Startup and technical builders: AI startups, startup AI, B2B AI, enterprise AI, SaaS AI, startup engineering, startup product, technical founders, tech founders, product engineering, software engineering, developer tools, AI implementation, workflow automation, future of work.
5. Room gate: only posts with 50+ reactions, posted within about 48h, author is a practitioner or educator in our TG (not a company page promo, not a tiny poll).
6. Comment: normally 180-350 chars and 2-3 sentences, same content rules as X (no links, no em dashes, no banned openers, one substantive addition). LinkedIn register: slightly warmer, narrative allowed. Do not stretch a simple point to hit a length target. Immediately before submission, confirm the exact text through visible DOM or equivalent page state. A screenshot is optional and is not a posting gate.
7. One comment per author per week. Log to replied-log.csv with the post URL in place of tweet id.
8. If the editor rejects text twice, stop LinkedIn for the session and log the blocker.

### LinkedIn selector recovery

If the comment button or editor selector times out before the editor opens, retry that exact target once in a fresh tab. Re-navigate to the target, wait for the post to render, and use visible DOM or equivalent page state to confirm the editor before typing. If the second selector attempt also times out, skip that target, log `LinkedIn selector timeout after one retry`, and continue with the next qualified target or X. Never blind-click or carry the target into the next wakeup.

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
- "artificial intelligence"
- "generative AI"
- "LLM applications"
- RAG
- "AI automation"
- "AI infrastructure"
- "AI developer tools"
- "agent evaluation"
- "production AI"
- "AI observability"
- "AI safety engineering"
- "model context protocol"
- "MCP tools"
- "AI startups"
- "startup AI"
- "B2B AI"
- "enterprise AI"
- "SaaS AI"
- "startup engineering"
- "startup product"
- "technical founders"
- "tech founders"
- "product engineering"
- "software engineering"
- "developer tools"
- "AI implementation"
- "workflow automation"
- "future of work"

Use these filters and fallbacks:
1. Prefer 50+ reactions, within ~48h, practitioner or educator author.
2. If still short, accept 25+ reactions when the post is within ~24h and the author is clearly TG.
3. If still short, accept a thoughtful practitioner post with active comments even if reactions are not visible, but only when the room is clearly in-lane and non-promotional.
4. Skip company promos, course lead-gen posts, engagement polls, generic "future of work" takes, and posts where only connections can comment.
5. If LinkedIn gives search pages with mostly promos or polls, change the lane, sort/filter by recent when available, and inspect more results before stopping.

The LinkedIn goal is recurring presence. If there are 1-2 high-quality rooms and X has remaining capacity, post those instead of returning zero LinkedIn comments.

## Hard safety rails (never violate)

- Max 20 cold comments/day total, with no more than 10 on X and 10 on LinkedIn; max 5 per session; 2+ min spacing.
- No DMs, no follows, no likes, no reposts, no profile edits, no paid actions.
- Never comment in politics/crypto/stocks/tragedy rooms even if AI-adjacent.
- Never comment twice on the same post; never the same author within 3 days (X) / 7 days (LinkedIn).
- If unsure whether a room fits the TG, skip it. A skipped room costs nothing; a spammy comment costs reputation.

## Exhaustion standard

"No qualified posts" means all of this happened:
1. Browser health passed.
2. X authenticated feed sampled at least 20 visible posts or 3 screenfuls.
3. X scout ran at 6, 12, and 20 when the feed produced fewer than 3 qualified rooms.
4. Direct X browser search sampled at least 8 fallback lanes when still short, including expanded AI, startup, and technical-builder lanes when the base lanes are short.
5. LinkedIn authenticated feed sampled at least 20 visible posts or 3 screenfuls.
6. LinkedIn browser search sampled at least 8 fallback lanes when still short, including expanded AI, startup, and technical-builder lanes when the base lanes are short.
7. All candidates failed for concrete reasons: banned room, off-lane, promo, engagement farm, insufficient audience fit, duplicate author/post, cannot comment, or composer failure.

If fewer than 4-5 comments were posted, the summary must say exactly which ladder steps ran and why remaining candidates were skipped.
