# High-engagement room scorecard

Created: 2026-06-22T00:28:17+05:30.

Purpose: make future LinkedIn/X comment batches stricter after the first LinkedIn high-engagement batch created minimal movement.

This is the filter before posting any future public comment or reply. It prevents "relevant but low-leverage" activity.

## Minimum bar

Do not comment or reply unless the target passes all four gates:

1. Stable target: use a specific post URL/permalink when available, not only a search results URL.
2. Audience fit: founder, operator, investor, AI builder, GTM leader, product leader, or relevant B2B SaaS audience.
3. Topic fit: first customers, B2B AI, vertical AI, AI agents, GTM, founder-led sales, positioning, paid pilots, design partners, PMF, or pricing.
4. Conversation fit: the comment can add a useful missing lens without linking to the essay.

If any gate fails, skip.

## Scorecard

Score each candidate out of 15.

Post only if the score is 11+.

### Audience quality: 0-3

- 3: author regularly reaches founders/operators/investors or has a highly relevant niche audience.
- 2: author is relevant but audience quality is uncertain.
- 1: author is adjacent but not clearly useful for this essay.
- 0: audience mismatch.

### Current engagement: 0-3

LinkedIn:

- 3: 100+ reactions or 20+ comments, or visibly active discussion from relevant people.
- 2: 20+ reactions or 5+ comments from relevant people.
- 1: some engagement but mostly weak or generic.
- 0: no visible signal.

X:

- 3: active replies/reposts from relevant people.
- 2: visible discussion with at least a few substantive replies.
- 1: mostly likes, little discussion.
- 0: dead thread.

### Topic fit: 0-3

- 3: directly about the essay's core wedge.
- 2: adjacent enough that the comment feels natural.
- 1: broad AI/startup topic but weak connection.
- 0: unrelated.

### Comment edge: 0-3

- 3: comment adds a missing test, objection, or sharper frame.
- 2: comment adds a useful practical caveat.
- 1: comment is agreeable but not distinctive.
- 0: comment would be generic or self-promotional.

### Timing: 0-2

- 2: posted in the last 1-12 hours and still active.
- 1: posted in the last 24-48 hours, still relevant.
- 0: stale unless the post is unusually active.

### Stability: 0-1

- 1: exact post permalink captured before posting.
- 0: only search/feed URL available.

## Batch construction rule

A batch should include:

- 70% proven-engagement rooms: score 12+ with visible discussion.
- 20% exact-fit exceptions: score 11+ with unusually strong topic fit.
- 10% experimental: only if the comment is unusually sharp and low-risk.

Each normal batch should post:

- 6-7 LinkedIn comments, or
- 6-7 X replies.

Do not count a batch as complete at one comment/reply. One comment/reply is a maintenance action, not a batch.

For X, draft every reply at 240 characters or fewer before opening the composer. Skip or rewrite any reply that needs emergency trimming inside X.

## Logging rule

For every approved posted comment/reply, log:

- timestamp,
- platform,
- author,
- exact post URL,
- score,
- visible counters before posting,
- comment/reply text,
- verification evidence,
- whether it created a reply, profile view, follow, or click later.

Use:

- `tracker.csv`,
- `metrics-log.csv`,
- `WORKLOG.md`,
- `reply-source-scorecard.csv` if anyone responds.

## Current lesson

The first LinkedIn high-engagement batch proved that relevance alone is not enough.

Next batches should avoid:

- search-result-only targets when a permalink cannot be captured,
- low-engagement posts unless the fit is exceptional,
- comments on posts where the audience is broad marketing rather than AI/GTM/founder/operator,
- extra posting before the previous batch has had enough time to create replies or profile-view movement.
