# Metrics entry guide

Use this guide after publishing to keep the 100k dashboard accurate.

Metrics source:

`metrics-log.csv`

Reply source tracker:

`reply-source-scorecard.csv`

Daily activity ledger:

`daily-activity-ledger.csv`

Dashboard:

`http://127.0.0.1:8765/metrics-dashboard.html`

Reach model:

- `reach-model.md`
- `reach-model.csv`

## What to enter

For each checkpoint row, fill:

- `post_url` - canonical URL for the social post/thread.
- `impressions` - platform-reported impressions/views.
- `likes` - reactions/likes.
- `comments` - LinkedIn comments or X replies.
- `reposts` - reposts/shares/reposts.
- `profile_views` - if available.
- `link_clicks` - if available.
- `direct_replies` - DMs/emails/replies caused by the post.
- `notes` - best comment, strongest objection, or next action.

Leave unknown numbers blank. Do not guess.

Important distinction:

- `metrics-log.csv` platform comments can include self-comments, thread structure, or platform UI counters.
- `reply-source-scorecard.csv` is the source of truth for verified human responses caused by the campaign.
- `daily-activity-ledger.csv` is the source of truth for planned vs actual daily execution volume.
- The dashboard's "Verified Responses" and "Target Responses" cards only count `reply-source-scorecard.csv`.

## Reply-source tracking

Use `reply-source-scorecard.csv` for every meaningful response caused by the campaign.

Add one row per reply, DM, forward, useful comment, or target-audience response:

- `source_channel` - X owned post, X engagement replies, LinkedIn native, LinkedIn comment, direct outreach, newsletter, etc.
- `source_asset` - thread, anchor post, Batch A, paid-pilot follow-up, direct outreach batch 1.
- `source_url` - the post/reply/comment/send that caused the response.
- `responder` - person or organization.
- `responder_type` - founder, operator, investor, community, unknown.
- `reply_type` - public reply, comment, DM, email, forward, repost-with-comment.
- `response_url` - public URL if available.
- `quality_score` - 1 low signal, 2 relevant, 3 target-audience/high leverage.
- `followup_action` - reply, ask question, turn into post, send essay, no action.
- `notes` - what they said or why it matters.

This is the table to use when deciding which channel is creating actual conversations. Do not mark a response here unless a real person or organization responded, forwarded, commented, DM'd, emailed, or reposted with context.

## Checkpoint cadence

Primary launch assets:

- T+1h
- T+3h
- T+6h
- T+24h
- T+48h
- Day 7
- Day 14
- Day 30

Follow-up assets:

- Add a row when published.
- Capture 24h and 48h metrics if the post gets traction.

## How to interpret

Use `reach-model.md` for pace thresholds. The short version:

- under 500 views in the first 24 hours means distribution is the problem; publish LinkedIn and use engagement Batch A before making more content.
- under 1,500 combined impressions at 48 hours means push paid-pilot follow-up plus direct outreach Batch 1.
- under 7,500 by Day 7 means narrow the audience graph and stop aiming at broad-famous accounts until the idea has proof.

High impressions, low replies:

- The hook traveled, but the post may not invite participation.
- Next action: ask a sharper question.

Low impressions, high-quality replies:

- The idea works; the distribution graph is too small.
- Next action: comment more and send directly to better-matched people.

Low impressions, low replies:

- The hook probably missed.
- Next action: use `hook-lab.md` and rewrite around pain.

High replies, low link clicks:

- Not a failure. For this campaign, replies and comments are better leading indicators than clicks.

## Minimum review ritual

At each checkpoint, answer:

1. Which exact sentence got the best response?
2. Who responded that is in the target audience?
3. What objection came up?
4. What should the next post say?
5. Should we push comments, direct outreach, or another native post?
