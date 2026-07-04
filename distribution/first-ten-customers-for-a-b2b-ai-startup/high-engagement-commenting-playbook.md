# High-engagement commenting playbook

Prepared: 2026-06-22T00:07:00+05:30.
Updated: 2026-06-30T19:00:00+05:30.

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

1. X replies under active AI/workflow/tool posts where Premium reply priority can help visibility.
2. LinkedIn comments under high-engagement founder/operator/investor posts.
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
- Premium-preferred room: 30-500 likes, fewer than 80 replies, and a comment section where a verified/prioritized reply can still rank.
- Stronger exception: a mega post is allowed only when the reply is early, the post is from a core AI/tool account, or the exact topic is central to our positioning.

Skip:

- Generic AI hype.
- Political/news hijacks.
- Posts where the only available comment is self-promotion.
- Posts where our essay angle would feel bolted on.
- Search-result-only LinkedIn targets when the browser cannot prove the exact post being commented on.

## Comment shapes that should travel

Use these as thinking shapes, not paste templates. The 2026-06-30 voice rule is: every comment must be specific enough that it would feel odd under a different post.

For practical AI teaching, rotate these additional shapes:

### A. Implementation sequence

Use when the original post is excited about a new AI tool, agent, or workflow.

```text
If I had to operationalize this, I would define the trigger, the context packet, the allowed actions, the review rule, and the stop condition before picking the tool. Otherwise the team gets a cool demo and no repeatable workflow.
```

### B. Failure case first

Use when the original post is too optimistic.

```text
The failure case I would test first is not whether the AI can complete the happy path. It is whether it knows when to stop, ask for missing context, or hand off because the next action has real cost.
```

### C. Before/after

Use when the post discusses AI adoption, productivity, or PM/operator workflows.

```text
The before/after I would want to see is not "used AI" vs "did not use AI." It is: unclear task to reviewed output, scattered context to reusable context packet, one-off prompt to repeatable review rule.
```

### D. Tiny template

Use when the post asks for practical advice.

```text
The tiny spec I would write: "AI may use [sources], may change [things], must return [evidence], should ask for help when [condition], and is reviewed by [owner]." That prevents a lot of pretend automation.
```

### E. Earned skepticism

Use when the post is about model/tool breakthroughs.

```text
The capability is real. The part I would verify is whether the workflow gets easier to review. Better output is useful, but lower review cost is what makes teams actually keep using it.
```

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
- Refer to one specific noun from the original post when truthful: the tool, workflow, role, claim, metric, or failure mode.
- Do not reuse the same opener more than twice in a batch.
- Do not use "The hard part is..." unless the next sentence gives a concrete system, test, owner, or workflow step.
- Avoid repeated "X is not Y" structure. Use micro-scene, teardown, implementation sequence, failure case, or tiny template instead.
- For every 5-comment LinkedIn batch, use at least 4 different comment shapes.
- For every 5-6 reply X batch, include at least 2 replies with specific implementation advice.
- Every comment must pass the `voice-and-value-guide-2026-06-30.md` scoring gate before posting.
- Normal X replies stay 180-240 characters.
- Premium longer X replies can be 240-600 characters only for strong, high-context targets.
- Use the target-page inline composer on X when the modal composer silently fails verification.
- For X, count only replies that verify on `with_replies` or on the target conversation.
- Log every posted comment in `tracker.csv`, `metrics-log.csv`, and `WORKLOG.md`.
- Log every meaningful reply in `reply-source-scorecard.csv`.

## Failed action retry rule

If a comment/reply is high-signal but fails because the browser editor rejects input, the post button stays disabled, or verification fails:

- do not keep retrying the same target inside the same block,
- add it to `retry-queue.csv`,
- set `retry_after` to 45 minutes after failure,
- keep the exact draft and target URL,
- retry once from a fresh browser state,
- count only verified posts/comments/replies,
- after a second failure, mark it `manual_packet_needed` or `abandoned_stale`.

This prevents a good target from being lost while also preventing editor failures from consuming the whole campaign block.

## X Premium-specific tactics

Use Premium for better placement and better formats:

- Prioritize verified-heavy and medium-hot posts where reply ranking matters.
- Use bookmark folders to save strong targets for the next scheduled block.
- Use longer posts for mini-frameworks, not rambling.
- Use the edit window only for typos, formatting, or one clarifying line on original/quote posts.
- Do not edit X profile photo, display name, or handle while the blue checkmark is under review or newly applied.

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
