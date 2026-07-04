# 100k reach model

Goal: 100,000 total viewers/impressions across X and LinkedIn in 30 days, free of cost.

This is not a forecast. It is an operating model: it tells us whether the campaign is on pace and which lever to pull next.

Data sources:

- `metrics-log.csv` for actual platform metrics.
- `tracker.csv` for execution state.
- `direct-outreach-tracker.csv` for replies/forwards from individual people.
- `reach-model.csv` for target bands and decisions.

## Current state

Last captured evidence:

- Latest measured checkpoint: 2026-06-22T15:25:17+05:30.
- X root tweet: 106 visible views, 2 likes, 2 replies, 1 repost.
- LinkedIn anchor: live with 244 visible impressions, 2 visible reactions, 1 comment; first-comment link showed 28 impressions.
- Current measured owned-post impressions: 350.
- Current 100k progress: 0.350%.
- Current target-path deficit: 1,150 impressions versus the Day 1 target of 1,500, and 2,650 impressions versus the Day 2 target of 3,000.
- X engagement Batch A: sent.
- X engagement Batch B: two no-link replies sent under live GTM/AI-agent conversations.
- X engagement Batch C: two no-link replies sent under live AI-agent GTM/founder-led-sales conversations.
- Next paid-pilot follow-up package: prepared but not published.
- Horizontal GPT follow-up package: prepared but not published; this should outrank the paid-pilot follow-up because it came from the first verified target response.
- Day 2 rescue sprint: prepared but not executed; it sequences Luke reply, horizontal GPT follow-up, and direct outreach only if the public loop stays quiet.
- Next approval bundle: prepared; use it as the shortest current action menu.
- Luke reply execution runbook: prepared; use it immediately after approval.
- Horizontal GPT X engagement queue: prepared but not executed; use only after approval and live target recheck.
- LinkedIn horizontal GPT engagement queue: prepared but not executed; use only after approval and live target recheck.
- High-engagement commenting playbook: prepared after user challenge; use it as a rescue lever, but only with the stricter room scorecard.
- LinkedIn high-engagement comment batch: first approved batch was posted on 2026-06-22, but it did not create immediate campaign-quality replies or meaningful anchor movement.
- X high-engagement reply batch: drafted but not executed; use only after approval and live target recheck.
- First verified response: Luke Sophinos replied to the vertical AI wedge comment; response logged in `reply-source-scorecard.csv`.
- Direct outreach: 8/10 Batch 1 public touches completed; Forum skipped after review; Michael/AI Seed pending.
- LinkedIn carousel: prepared but not published because the browser could not access LinkedIn's PDF upload input.

The campaign is not on pace yet. It needs approved public conversation, not more passive monitoring.

## Reach math

100,000 impressions in 30 days means:

- 3,333 impressions/day on average.
- 23,333 impressions/week on average.
- The first 48 hours should ideally create the first real distribution signal.
- A cold start can still work if replies/forwards create second-degree distribution.

As the month shrinks, the daily requirement rises:

- 28 days left: about 3,572 impressions/day.
- 21 days left: about 4,762 impressions/day.
- 14 days left: about 7,143 impressions/day.
- 7 days left: about 14,286 impressions/day.

For the practical AI teaching sprint, the daily surface-area floor is:

- 2 native X posts.
- 1 LinkedIn native post, or a verified LinkedIn comment fallback if the native composer fails.
- 2 X reply batches of 6-7 replies each.
- 2 LinkedIn comment batches of 6-7 comments each.

That creates 24-28 public comments/replies per day before native posts. If the average comment/reply earns only 100 views, that is 2,400-2,800 reached impressions/day and still below the 100k path. Therefore volume is necessary but not sufficient: every batch needs at least 2-3 strong rooms where the original post already has high views, high comments, high bookmarks, or high-signal participants.

X draft guard:

- Draft every X reply at 240 characters or fewer.
- Use 240 as the campaign limit, even if the platform allows more, so the composer does not waste attempts on emergency trimming.
- If a reply cannot make its point under 240 characters, split the idea into a shorter sharper reply or skip the room.

Minimum viable path:

- Day 7: 7,500+ impressions.
- Day 14: 20,000+ impressions.
- Day 21: 40,000+ impressions.
- Day 30: 70,000+ impressions. This is below goal, but still enough signal to know the campaign worked and needs one breakout assist.

Target path:

- Day 7: 15,000 impressions.
- Day 14: 40,000 impressions.
- Day 21: 70,000 impressions.
- Day 30: 100,000 impressions.

Strong path:

- Day 7: 30,000 impressions.
- Day 14: 60,000 impressions.
- Day 21: 85,000 impressions.
- Day 30: 120,000 impressions.

## Decision thresholds

### First 24 hours

If X is under 500 views and LinkedIn is live:

- Push engagement/outreach before creating more standalone posts.
- Watch for replies from Batch A.
- Do not publish a second X post until the first engagement loop has been measured.

If X is under 500 views but at least one high-quality reply appears:

- Reply deeply.
- Turn the best reply into a standalone post within 24 hours.

If X is under 500 views and no replies appear:

- Use `hook-lab.md`.
- Rewrite the next post around pain:
  - bad: "Here is the early GTM playbook"
  - better: "Your free AI pilot is lying to you"

### 48 hours

If combined impressions are under 1,500:

- Publish the paid-pilot follow-up.
- Send direct outreach Batch 1.
- Comment under 10 X posts and 5 LinkedIn posts.

If combined impressions are 1,500-5,000:

- Keep the topic alive with comments.
- Publish one standalone X post from the strongest angle.
- Do not restart the whole campaign yet.

If combined impressions are over 5,000:

- Reply to everyone.
- Publish the LinkedIn investor/operator version.
- Ask 3 warm people to comment or challenge the idea.

### Day 7

If below 7,500 impressions:

- The idea may still be good, but distribution is too weak.
- Narrow targets to founder-led sales, AI agents, and design partner operators.
- Stop aiming at broad-famous accounts until the post has proof.

If 7,500-15,000 impressions:

- Continue the calendar.
- Use direct outreach to create second-degree distribution.

If over 15,000 impressions:

- Turn the best-performing angle into a second thread.
- Ask operators/investors who replied whether this matches what they see.

## Lever order

Use this order before creating more content:

1. Check X and LinkedIn notifications/comments and reply to substantive inbound first.
2. Run the next scorecard-qualified X reply batch: 6-7 replies, each drafted under 240 characters.
3. Run the next scorecard-qualified LinkedIn comment batch: 6-7 comments.
4. Publish native X posts from the strongest live exchanges.
5. Attempt the daily LinkedIn native post once; if the composer fails, convert the idea into one extra LinkedIn comment and log the blocker.
6. Monitor recent public actions only when new signal is likely; avoid passive refresh loops.
7. Repurpose the best replies/comments into the next day’s native posts.
8. Use direct outreach only if explicitly reopened by the user.

Latest checkpoint: 2026-06-22T15:25:17+05:30 has X root at 106 visible views and LinkedIn anchor at 244 visible impressions. X/LinkedIn notifications still show no new verified response beyond Luke.

Reason: if the audience graph is small, more posts alone will not fix distribution. The first lever is getting relevant people to engage.
