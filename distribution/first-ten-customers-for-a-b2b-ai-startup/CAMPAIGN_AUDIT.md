# Campaign audit

Last updated: 2026-06-20.

This audit maps the active goal to current evidence in the campaign package.

Goal:

> Increase reach on X and LinkedIn for free. Target 100,000 viewers in one month. Create a 100x effective GTM/growth strategy, implement it on one post from the website, do it on LinkedIn and X, and keep drafting what was done.

Campaign post:

`https://ruchitdalwadi.com/writing/first-ten-customers-for-a-b2b-ai-startup`

## Requirement status

| Requirement | Status | Evidence |
|---|---|---|
| Pick one website post | Complete | `WORKLOG.md`; selected `First ten customers for a B2B AI startup` |
| Keep website code/content unchanged | Complete | Campaign lives under `distribution/`; no site content edits required |
| Create free X/LinkedIn growth strategy | Complete | `strategy.md`, `30-day-calendar.md`, `48-hour-schedule.md`, `reach-model.md` |
| Turn post into LinkedIn assets | Complete, anchor live, carousel drafted | `copy-ready/linkedin-anchor-post.txt`, `assets/carousel/first-ten-customers-carousel.pdf`, `copy-ready/linkedin-carousel-caption.txt` |
| Turn post into X assets | Complete and thread published | `copy-ready/x-thread.txt`, `copy-ready/x-link-reply.txt`, X root URL in `tracker.csv` |
| Publish on X | Complete | X thread: `https://x.com/ruchitdalwadi/status/2068304482589650946`; link reply: `https://x.com/ruchitdalwadi/status/2068304756179931420` |
| Publish on LinkedIn | Complete for anchor post | LinkedIn anchor: `https://www.linkedin.com/feed/update/urn:li:activity:7474074950476382208/`; first comment has LinkedIn UTM essay URL |
| Create 48-hour engagement plan | Complete, Batches A/B/C executed | `engagement-plan.md`, `48-hour-schedule.md`, `x-engagement-queue-2026-06-20.md` |
| Create direct outreach system | Complete, Batch 1 partially sent, Batches 2-3 drafted | `outreach.md`, `direct-outreach-targets-2026-06-20.md`, `direct-outreach-batch-2-messages.md`, `direct-outreach-batch-3-messages.md`, `direct-outreach-tracker.csv` |
| Create 30-day campaign system | Complete | `30-day-calendar.md`, `follow-up-copy-bank.md`, `hook-lab.md`, `comment-reply-bank.md`, `reach-model.csv` |
| Create tracking system | Complete and current | `tracker.csv`, `metrics-log.csv`, `reply-source-scorecard.csv`, `metrics-dashboard.html`, `metrics-entry-guide.md`, `direct-outreach-tracker.csv` |
| Create local execution cockpit | Complete and verified | `launch-cockpit.html`; validator confirms `http://127.0.0.1:8765/launch-cockpit.html` returns 200 |
| Create recurring check-in | Complete | Codex automation `first-10-customers-campaign-check-in` |
| Keep draft/worklog of what was done | Complete/current | `WORKLOG.md`, `README.md`, `campaign-manifest.json`, this audit |
| Reach 100k viewers in one month | Not complete | Latest captured X root metric is 86 visible views; latest captured LinkedIn anchor metric is 174 visible impressions; 30-day outcome remains in progress |

## Verified evidence

- `campaign-manifest.json` parses as valid JSON.
- `scripts/start_cockpit.sh` has valid shell syntax.
- LinkedIn carousel PDF exists and is non-empty.
- Stable PNG carousel export contains 9 slides.
- X thread parts are under 280 characters.
- Follow-up X variants are under 280 characters.
- X hook variants are under 280 characters.
- `tracker.csv` parses cleanly with 13 rows.
- `metrics-log.csv` parses cleanly with 31+ rows.
- `direct-outreach-tracker.csv` parses cleanly with 30 rows.
- `reply-source-scorecard.csv` parses cleanly and is ready for per-response attribution.
- Dashboard verified-response cards are based on `reply-source-scorecard.csv`, not raw platform comment counters.
- First verified response is logged: Luke Sophinos replied to the vertical AI public touch.
- `direct-outreach-batch-2-messages.md` exists with target-specific copy for outreach targets 11-20.
- `direct-outreach-batch-3-messages.md` exists with target-specific copy for outreach targets 21-30.
- `reach-model.csv` parses cleanly with 11 rows.
- Local cockpit returns HTTP 200.
- Metrics dashboard returns HTTP 200.
- The served metrics dashboard includes pace fields for daily-needed, Day 7 gap, and next lever.

## Current live state

### X

Live:

- Root thread: `https://x.com/ruchitdalwadi/status/2068304482589650946`
- Essay link reply: `https://x.com/ruchitdalwadi/status/2068304756179931420`

Latest captured metric evidence:

- 2026-06-21T17:28:23+05:30: root tweet at 86 visible views, 2 likes, 1 repost, 2 replies.
- Approved X engagement Batch A was posted.
- Two additional Batch B replies were posted under live GTM/AI-agent conversations:
  - `https://x.com/ruchitdalwadi/status/2068379658677256638`
  - `https://x.com/ruchitdalwadi/status/2068379782845550763`
- Two additional Batch C replies were posted under live AI-agent GTM/founder-led-sales conversations:
  - `https://x.com/ruchitdalwadi/status/2068380961314914786`
  - `https://x.com/ruchitdalwadi/status/2068380996974895157`

Next X action:

- Monitor Batch A replies and profile visits before posting another standalone X post.

### LinkedIn

Live:

- Anchor post: `https://www.linkedin.com/feed/update/urn:li:activity:7474074950476382208/`
- First comment: `https://ruchitdalwadi.com/writing/first-ten-customers-for-a-b2b-ai-startup?utm_source=linkedin&utm_medium=social&utm_campaign=first-ten-customers`

Latest captured metric evidence:

- 2026-06-21T17:56:14+05:30: anchor post rose to 184 visible impressions, 2 visible reactions, 1 comment; first-comment link showed 27 impressions.

Next LinkedIn action:

1. Monitor the 1h/3h/6h checkpoints.
2. Publish the document carousel only if a file-upload-capable path is available; in-app browser upload was blocked.
3. Use the follow-up bank only if the anchor slows.

## 100k reach model

The campaign is currently below pace, but this is expected before the engagement/outreach loops are live.

Use:

- `reach-model.md`
- `reach-model.csv`
- `metrics-dashboard.html`

Current model recommendation:

1. If approved, reply to Luke Sophinos using `copy-ready/x-reply-luke-sophinos-horizontal-gpt.txt`.
2. Monitor X engagement Batches A/B/C and public outreach replies.
3. Pause additional broad X replies briefly unless a high-authority or direct-response opportunity appears.
4. Log every meaningful response in `reply-source-scorecard.csv` so channel quality is judged by replies, not clicks.
5. Use `horizontal-gpt-follow-up-package.md` after the Luke reply is handled or explicitly skipped.
5. Use `next-follow-up-package.md` only if the horizontal GPT angle does not create engagement.
6. Use `day-2-rescue-sprint.md` as the current 24-hour operating plan.
7. Use `next-approval-bundle.md` as the concise current approval menu.
8. Use `luke-reply-execution-runbook.md` after `approved: reply to Luke Sophinos`.
7. Use `horizontal-gpt-engagement-queue-2026-06-21.md` only after explicit approval and live target recheck.
8. Use `linkedin-horizontal-gpt-engagement-queue-2026-06-21.md` only after explicit approval and live target recheck.
5. Finish the remaining high-fit outreach only through stable public/direct channels.
6. Monitor LinkedIn anchor and publish the carousel manually/file-upload-capable if needed.
7. Do not create more posts until the first engagement loop has been measured.

## Remaining approval/live-action gates

The remaining work requires external side effects:

- posting more X engagement replies beyond the approved executed batches,
- sending direct outreach,
- editing profile/pinned/featured surfaces,
- uploading/publishing the LinkedIn carousel.

These require explicit approval or direct user action.

## Approval phrases

Already used:

```text
approved: publish X thread
approved: publish LinkedIn anchor
```

Still useful:

```text
approved: post X engagement batch A
approved: post X engagement replies 1-5
approved: send direct outreach batch 1
approved: send direct outreach batch 2
approved: send direct outreach batch 3
approved: publish LinkedIn carousel
approved: reply to Luke Sophinos
approved: publish horizontal GPT X follow-up
approved: publish horizontal GPT LinkedIn follow-up
approved: add horizontal GPT X link reply
approved: add horizontal GPT LinkedIn first comment
approved: post horizontal GPT X engagement queue
approved: post LinkedIn horizontal GPT engagement queue
```

## Completion criteria still unmet

Do not mark the overall goal complete until:

- Initial 48-hour engagement loop is executed or explicitly waived.
- Direct outreach Batch 1 is sent or explicitly waived.
- Metrics are tracked through the 30-day period.
- The 30-day period either reaches 100k viewers/impressions or produces a documented result below target.
