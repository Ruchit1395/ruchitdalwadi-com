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

- Latest measured checkpoint: 2026-06-22T13:24:46+05:30.
- X root tweet: 105 visible views, 2 likes, 2 replies, 1 repost.
- LinkedIn anchor: live with 233 visible impressions, 2 visible reactions, 1 comment; first-comment link showed 28 impressions.
- Current measured owned-post impressions: 338.
- Current 100k progress: 0.338%.
- Current target-path deficit: 1,162 impressions versus the Day 1 target of 1,500, and 2,662 impressions versus the Day 2 target of 3,000.
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
- The first 48 hours should ideally create the first real distribution signal.
- A cold start can still work if replies/forwards create second-degree distribution.

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

1. If approved, reply to Luke Sophinos to deepen the first verified response thread.
2. If approved, post the X high-engagement reply batch after scoring targets with `high-engagement-room-scorecard.md`.
3. Publish the horizontal GPT follow-up only after Luke or the X reply batch creates signal, or if the user explicitly approves posting despite no signal.
4. If approved, scout high-engagement LinkedIn/X rooms where founder/operator/investor posts are already moving.
5. Post another LinkedIn high-engagement comment batch only after stable URLs and 11/15+ room scores.
6. Monitor Batch A, Batch B, Batch C, new high-engagement comments, and public outreach replies.
7. Complete any high-fit pending public touch that has a stable channel.
8. Publish the prepared paid-pilot follow-up only if the horizontal GPT angle does not create engagement and the campaign stays quiet.
9. Repurpose into carousel/image if file upload is available or manual upload is acceptable.
10. Send direct links only after public context exists or the target has a clear direct channel.

Latest checkpoint: 2026-06-22T13:24:46+05:30 has X root at 105 visible views and LinkedIn anchor at 233 visible impressions. X/LinkedIn notifications still show no new verified response beyond Luke.

Reason: if the audience graph is small, more posts alone will not fix distribution. The first lever is getting relevant people to engage.
