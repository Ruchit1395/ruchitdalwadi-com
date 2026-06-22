# Luke Sophinos reply execution runbook

Updated: 2026-06-21T17:56:14+05:30.

Purpose: make the next approved action executable without hesitation or accidental scope creep.

## Approval phrase

```text
approved: reply to Luke Sophinos
```

This approval covers only:

- Opening Luke Sophinos's reply.
- Publishing the prepared X reply from Ruchit's account.
- Updating local campaign records afterward.

It does not cover:

- Posting the horizontal GPT standalone follow-up.
- Adding a link reply.
- Posting any X/LinkedIn engagement queues.
- Sending direct outreach.

## Live target

Luke's reply:

`https://x.com/lukesophinos/status/2068384975523643431`

Current evidence:

- Luke is the only verified target response.
- Reply view count has moved from 8 to 13 during monitoring.
- No other campaign-quality reply has appeared.

## Copy to publish

File:

`copy-ready/x-reply-luke-sophinos-horizontal-gpt.txt`

Text:

```text
Exactly. That is the real wedge test.

A vertical AI product has to beat horizontal GPT on workflow context, reliability, and handoff cost.

If the buyer can solve it with ChatGPT + a prompt, there is no product yet.

The first 10 customers expose where that line is.
```

Length: 267 characters.

## Pre-post checks

Before posting:

1. Confirm the browser is logged into Ruchit's X account.
2. Open Luke's reply URL directly.
3. Confirm the visible reply text still matches the objection:
   `why it’s needed over a horizontal gpt`.
4. Confirm no newer reply from Luke makes the drafted response stale.
5. Confirm the X reply composer is replying to Luke's post, not the root thread.

If any check fails, do not post. Record the issue in `WORKLOG.md`.

## Posting steps after approval

1. Open Luke's reply URL.
2. Use the reply control under Luke's post.
3. Paste `copy-ready/x-reply-luke-sophinos-horizontal-gpt.txt`.
4. Confirm the text is complete and under 280 characters.
5. Publish the reply.
6. Copy the new reply URL.

## Immediate logging

Update:

- `tracker.csv`
- `metrics-log.csv`
- `WORKLOG.md`
- `reply-source-scorecard.csv` only if Luke or another target replies again.

Log:

- timestamp,
- new reply URL,
- X root views at time of posting,
- Luke reply view count at time of posting,
- whether the reply was posted under Luke or elsewhere.

## Follow-up checkpoints

T+30 minutes:

- Refresh Luke thread.
- Refresh X notifications.
- Record whether Luke liked, replied, reposted, or ignored.
- Record root thread views.

T+90 minutes:

- Repeat T+30.
- If there is any meaningful engagement, ask for or use existing approval for:
  `approved: publish horizontal GPT X follow-up`

T+24 hours:

- Add a row to `reply-source-scorecard.csv` for any new target response.
- Decide whether to use:
  `approved: post horizontal GPT X engagement queue`

## Success signal

This action is successful if it creates any of:

- Luke replies again.
- Luke likes/reposts.
- Another founder/operator joins the thread.
- X root gains 25+ incremental views within 90 minutes.
- The objection becomes strong enough to justify the standalone horizontal GPT follow-up.
