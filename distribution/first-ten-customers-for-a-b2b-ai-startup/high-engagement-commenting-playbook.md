# High-engagement commenting playbook

Prepared: 2026-06-22T00:07:00+05:30.

Purpose: shift distribution from "publish and wait" to "earn attention inside posts that already have attention."

This is now the primary free-growth lever for the campaign. The launch posts are live, but the graph is not yet large enough for passive posting to reach 100k. The campaign needs second-degree distribution from founders, operators, investors, and AI/GTM commentators whose posts are already moving.

## Core thesis

Do not comment on famous people because they are famous.

Comment where all four are true:

1. The post is recent enough that the author or audience may still read comments.
2. The post already has visible engagement or a live comment thread.
3. The topic is adjacent to first customers, B2B AI, vertical AI, founder-led sales, design partners, paid pilots, or AI GTM.
4. Our comment adds a missing lens instead of summarizing the post.

## Priority order

1. LinkedIn comments under high-engagement founder/operator/investor posts.
2. X replies under active posts from AI/GTM/founder accounts.
3. Reply to Luke Sophinos because he already responded with the strongest objection.
4. Standalone follow-up posts only after a comment/reply creates signal.
5. Direct outreach only when there is a specific reason the essay helps the recipient.

## What counts as a good target

Use `high-engagement-room-scorecard.md` before posting. The current minimum is 11/15, with a stable permalink preferred before any live comment/reply.

LinkedIn:

- Posted in the last 1-24 hours.
- 20+ reactions or 5+ comments for smaller operators.
- 100+ reactions or 20+ comments for larger accounts.
- The comments are substantive, not just congratulations.
- The author writes about startups, GTM, AI, product, sales, or investing.
- Exact post permalink is captured whenever LinkedIn exposes one.

X:

- Posted in the last 1-12 hours.
- The post has visible replies or reposts, not just likes.
- The author has an audience in AI, SaaS, GTM, product, or investing.
- The thread is still active enough that a useful reply can be seen.
- Exact post URL is captured before replying.

Skip:

- Generic AI hype.
- Political/news hijacks.
- Posts where the only available comment is self-promotion.
- Posts where our essay angle would feel bolted on.
- Search-result-only LinkedIn targets when the browser cannot prove the exact post being commented on.

## Comment shapes that should travel

### 1. Missing test

Use when the original post makes a big AI/startup claim.

```text
The test I keep coming back to is whether the product removes a workflow handoff, not whether the demo looks impressive. If the buyer can solve it with ChatGPT plus a prompt, the startup has not found its wedge yet.
```

### 2. Founder-led learning loop

Use when the original post discusses early sales, GTM, or first customers.

```text
The first customers are less like a sales motion and more like product research with revenue attached. One founder needs to stay close enough to see where the workflow breaks, what the buyer values, and what can become repeatable.
```

### 3. Paid pilot signal

Use when the original post mentions pilots, design partners, pricing, or validation.

```text
Free pilots are dangerous because they hide weak demand. Even a small paid pilot changes the conversation: the buyer starts telling you what actually matters, not just what sounds interesting.
```

### 4. Vertical AI defensibility

Use when the original post discusses vertical AI, AI agents, or wrappers.

```text
Vertical AI earns its category when it owns context, exceptions, and handoffs inside a workflow. Otherwise it is just a nicer front end for a horizontal model.
```

### 5. Customer 1 to customer 11

Use when the original post discusses PMF, repeatability, or scaling.

```text
The question is not whether customer #1 is happy. It is whether customer #1 teaches you how to sell customer #11 without rebuilding the product.
```

## Commenting rules

- No essay link in first-touch comments.
- No "great post" openers.
- No pretending to know the author's company or customers unless the post states it.
- Prefer one concrete idea over three generic points.
- End with a sharp question only when it naturally invites the author to respond.
- Log every posted comment in `tracker.csv`, `metrics-log.csv`, and `WORKLOG.md`.
- Log every meaningful reply in `reply-source-scorecard.csv`.

## Approval gates

Use these exact phrases:

```text
approved: scout high-engagement rooms
approved: post LinkedIn high-engagement comment batch
approved: post X high-engagement reply batch
```

`approved: scout high-engagement rooms` allows read-only scouting and drafting only.

The two posting approvals allow live comments/replies only after each target is rechecked in the browser and still matches the rules above.

Future batches must also pass `high-engagement-room-scorecard.md`; relevance is not enough.

## Success metric

Do not judge the batch by clicks.

Judge it by:

- author replies,
- relevant audience replies,
- profile views,
- follow-on impressions on the original anchor/X thread,
- and whether any comment is strong enough to become the next standalone post.
