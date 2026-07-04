# First Ten Customers Campaign

No-API, free-cost X + LinkedIn distribution package for:

`https://ruchitdalwadi.com/writing/first-ten-customers-for-a-b2b-ai-startup`

## What this package is

This folder contains the complete pilot campaign for one website post:

- launch strategy,
- LinkedIn carousel PDF,
- LinkedIn and X copy,
- 30-day follow-up calendar,
- comment/reply banks,
- outreach templates,
- local launch cockpit,
- local metrics dashboard,
- tracker/worklog.

The website content and code are not modified by this package.

## Fast start

From this folder:

```bash
./scripts/start_cockpit.sh
```

Then open:

- Launch cockpit: `http://127.0.0.1:8765/launch-cockpit.html`
- Metrics dashboard: `http://127.0.0.1:8765/metrics-dashboard.html`

Validate the campaign package:

```bash
./scripts/validate_campaign.py
```

## Publish approval gate

Nothing should be posted, commented, replied, sent, or uploaded without one of these explicit approval phrases:

```text
approved: publish LinkedIn carousel
approved: publish LinkedIn anchor
approved: publish X thread
approved: reply to Luke Sophinos
approved: publish horizontal GPT X follow-up
approved: publish horizontal GPT LinkedIn follow-up
approved: add horizontal GPT X link reply
approved: add horizontal GPT LinkedIn first comment
approved: post horizontal GPT X engagement queue
approved: post LinkedIn horizontal GPT engagement queue
approved: scout high-engagement rooms
approved: post LinkedIn high-engagement comment batch
approved: post X high-engagement reply batch
```

The strongest first move is the LinkedIn carousel plus the X thread:

```text
approved: publish LinkedIn carousel
approved: publish X thread
```

## Recommended launch order

1. Open the launch cockpit.
2. Use the search queue to leave 5 useful LinkedIn comments and 10 useful X replies.
3. Publish the LinkedIn carousel after approval.
4. Add the LinkedIn first comment with the canonical URL.
5. Publish the X thread after approval.
6. Add the X link reply.
7. Log post URLs in `tracker.csv`.
8. Capture metrics in `metrics-log.csv` at 1h, 3h, 6h, 24h, 48h, Day 7, Day 14, and Day 30.
9. Use `30-day-calendar.md` and `follow-up-copy-bank.md` to keep the idea alive for a month.

## Key files

- `LAUNCH_ROOM.md` - execution command center.
- `launch-cockpit.html` - local copy/search/approval cockpit.
- `metrics-dashboard.html` - local 100k reach dashboard.
- `reach-model.md` - 30-day pace model and pivot thresholds.
- `daily-operating-schedule.md` - daily cadence for posts, replies/comments, metrics, and outreach.
- `daily-activity-ledger.csv` - daily planned vs actual execution ledger.
- `post-stats-registry.md` - human-readable registry of every public X/LinkedIn post, comment, and reply that needs daily stats refreshes.
- `pace-audit-2026-06-22.md` - current pace deficit and next action decision.
- `reach-model.csv` - numeric target bands for 100k reach.
- `assets/carousel/first-ten-customers-carousel.pdf` - LinkedIn document carousel.
- `assets/carousel/png/` - stable PNG slide exports for X/image reuse.
- `carousel-assets.md` - how to use the PDF and PNG carousel assets.
- `copy-ready/` - paste-ready post/comment files.
- `30-day-calendar.md` - day-by-day campaign calendar.
- `follow-up-copy-bank.md` - LinkedIn and X follow-up variants.
- `next-follow-up-package.md` - paid-pilot follow-up and trigger rules.
- `horizontal-gpt-follow-up-package.md` - next objection-led follow-up based on Luke Sophinos's verified response.
- `day-2-rescue-sprint.md` - next 24-hour rescue sequence for the underperforming launch.
- `next-approval-bundle.md` - concise current approval menu and recommended next action.
- `today-execution-pack-2026-06-22.md` - approval-ready execution order for the current rescue day.
- `luke-reply-execution-runbook.md` - exact runbook for the next approved X reply.
- `high-engagement-commenting-playbook.md` - current growth pivot: comment in already-active rooms.
- `high-engagement-room-scorecard.md` - stricter 15-point filter for future high-engagement comment/reply targets.
- `high-engagement-scout-queue-2026-06-22.md` - ranked LinkedIn/X target map for live high-engagement scouting.
- `linkedin-high-engagement-comment-batch-2026-06-22.md` - approval-gated LinkedIn comment templates for high-engagement posts.
- `x-high-engagement-reply-batch-2026-06-22.md` - approval-gated X reply templates for high-engagement posts.
- `horizontal-gpt-engagement-queue-2026-06-21.md` - vetted X reply queue around the horizontal-GPT objection.
- `linkedin-horizontal-gpt-engagement-queue-2026-06-21.md` - vetted LinkedIn comment queue around the horizontal-GPT objection.
- `hook-lab.md` - alternate hooks and scoring rubric for relaunches/follow-ups.
- `comment-reply-bank.md` - reply bank for objections and conversations.
- `search-queues.md` - free X/LinkedIn search queues.
- `x-engagement-queue-2026-06-20.md` - post-launch X reply queue drafted from live searches.
- `profile-optimization.md` - X/LinkedIn bio, headline, pinned, and featured recommendations.
- `outreach.md` - direct outreach templates.
- `direct-outreach-targets-2026-06-20.md` - 30 specific founder/operator/investor outreach targets and message angles.
- `direct-outreach-batch-1-messages.md` - exact drafted messages/replies for the first 10 outreach targets.
- `direct-outreach-batch-2-messages.md` - exact drafted messages/replies for outreach targets 11-20.
- `direct-outreach-batch-3-messages.md` - exact drafted messages/replies for outreach targets 21-30.
- `direct-outreach-tracker.csv` - per-target outreach status and reply/forward tracking.
- `tracker.csv` - execution tracker.
- `metrics-log.csv` - metric source for dashboard.
- `reply-source-scorecard.csv` - per-response source tracking so replies are attributed by channel.
- `metrics-entry-guide.md` - how to fill metric checkpoints after publishing.
- `WORKLOG.md` - record of what was created and verified.
- `CAMPAIGN_AUDIT.md` - requirement-by-requirement completion audit.
- `scripts/validate_campaign.py` - pre-launch package validator.

## Reporting contract for agents

Every run should preserve two reporting surfaces:

1. `post-stats-registry.md` is the durable per-asset stats registry. Every public X/LinkedIn native post, comment, and reply needs a row with a stable identifier, URL, target/parent, tool path, and latest stats when available.
2. The chat thread is the human-facing run summary. After any scheduled block, retry processing, inbound check, stats refresh, post/comment/reply, or meaningful blocker, leave a concise summary in this structure:

```text
X:
- New post: count and URLs/URNs, or None.
- New comments: count and URLs, or None.
- Replies: count and URLs for posted replies or notable inbound replies, or None.
- Stats updated: count and URLs, or None.

LinkedIn:
- New post: count and URLs/URNs, or None.
- New comments: count and URLs/URNs or target descriptions, or None.
- Replies: count and URLs/URNs for notable inbound replies/comments, or None.
- Stats updated: count and URLs/URNs or target descriptions, or None.

Status: remaining day gaps and blockers in one short line.
```

Daily stats refresh runs at the first automation wakeup at or after 13:00 IST. Update views/impressions, likes/reactions, replies/comments, reposts/shares, and `last_checked_ist` in `post-stats-registry.md`; mirror changed checkpoints into `metrics-log.csv`; log noteworthy tool/browser limitations in `WORKLOG.md`. Leave unknown values blank rather than guessing.

## Target

100,000 total viewers/impressions across X and LinkedIn in 30 days.

This is not guaranteed. The strategy maximizes the odds by treating the essay as a campaign: native posts, carousel, thread, comments, direct sends, follow-ups, and metric-based iteration.
