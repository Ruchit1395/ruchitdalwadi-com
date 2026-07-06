# Post Stats Registry

Created: 2026-07-02T16:20:00+05:30.

Purpose: durable lookup table for every public X/LinkedIn post, comment, and reply that should receive daily stats refreshes.

Daily refresh time: 13:00 IST.

Use this file together with `tracker.csv` and `metrics-log.csv`. CSV files remain the source of truth for structured logs; this Markdown file is the human-readable registry of identifiers and latest stats.

This file is also the handoff map for future agents. If a new public asset is not here, assume the next stats refresh will not be able to find it reliably.

## Rules

- Add every new public X/LinkedIn native post, comment, and reply here immediately after posting.
- Save the most stable identifier available:
  - X: status ID and full `https://x.com/.../status/...` URL.
  - LinkedIn native post: `urn:li:share:*` or `urn:li:ugcPost:*` plus feed URL.
  - LinkedIn comment: comment URN/permalink when Composio/browser exposes it; otherwise save target post URL and note `comment permalink pending`.
- At 13:00 IST daily, update latest visible stats for each active row:
  - views/impressions,
  - likes/reactions,
  - replies/comments,
  - reposts/shares,
  - last checked timestamp,
  - tool path used.
- Leave unknown values blank. Do not guess.
- If an API cannot read a post, record the exact limitation in `notes`.
- After a stats refresh, add a row to `Daily 13:00 IST Check Log` and include the refresh count in the chat thread summary.
- Do not take public actions during stats refresh. No posting, commenting, replying, liking, reposting, following, DM opening, or DM answering.

## Chat Summary Contract

After a scheduled task, retry processing, inbound check, stats refresh, public post/comment/reply, or meaningful blocker, summarize in the chat thread with this shape:

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

Use `None` instead of omitting a line. Keep summaries short; the registry and CSVs carry the detailed evidence.

## Active Registry

| asset_id | platform | type | stable_id | url | parent_or_target | posted_at_ist | tool_path | latest_views | latest_likes | latest_replies_comments | latest_reposts | last_checked_ist | status | notes |
|---|---|---|---|---|---|---|---|---:|---:|---:|---:|---|---|---|
| day-10-x-delba-claude-code-ctrlg-reply | X | reply | 2074052602887852519 | https://x.com/ruchitdalwadi/status/2074052602887852519 | https://x.com/delba_oliveira/status/2073782737182367803 | 2026-07-06T14:17:29+05:30 | browser X + twitterapi.io verify | 2 | 0 | 0 | 0 | 2026-07-06T14:37:22+05:30 | active | Cold comment session. Target before posting: 72,281 views, 657 likes, 31 replies, 28 reposts. Screenshot-verified composer before submit. |
| day-10-x-cat-claude-code-candidate-workflow-reply | X | reply | 2074053543485751531 | https://x.com/ruchitdalwadi/status/2074053543485751531 | https://x.com/_catwu/status/2073806626965049686 | 2026-07-06T14:21:13+05:30 | browser X + twitterapi.io verify | 2 | 1 | 0 | 0 | 2026-07-06T14:37:22+05:30 | active | Cold comment session. Target before posting: 64,233 views, 560 likes, 93 replies, 30 reposts. Screenshot-verified composer before submit. |
| day-10-x-jacob-fable-codex-conductor-reply | X | reply | 2074054866172080480 | https://x.com/ruchitdalwadi/status/2074054866172080480 | https://x.com/JacobMolBio/status/2073813853109105114 | 2026-07-06T14:26:28+05:30 | browser X + twitterapi.io verify | 2 | 0 | 0 | 0 | 2026-07-06T14:37:22+05:30 | active | Cold comment session. Target before posting: 75,614 views, 271 likes, 16 replies, 12 reposts. First composer click timed out; clean retry after reload succeeded with screenshot verification. |
| day-10-linkedin-jaibharath-ai-coding-cognitive-debt-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/pulse/beyond-technical-debt-why-ai-coding-agents-create-jaibharath-ganesan-cwgxc/ | Jaibharath Ganesan AI coding agents cognitive debt post | 2026-07-06T14:35:30+05:30 | browser LinkedIn fallback |  |  |  |  | 2026-07-06T14:37:22+05:30 | active | Cold comment session. Browser showed comment landed as Ruchit D / You. Search result target showed 9 reactions, 1 comment, 1 repost before posting; selected under LinkedIn fallback rule because it was in-lane, practitioner-authored, within 1 day, and non-promotional. Need durable LinkedIn comment permalink/URN if visible later. |
| day-8-linkedin-native-model-switch-note | LinkedIn | native_post | urn:li:share:7479030295779004416 | https://www.linkedin.com/feed/update/urn:li:share:7479030295779004416/ |  | 2026-07-04T03:07:37+05:30 | Composio LinkedIn |  | 2 |  |  | 2026-07-04T13:25:04+05:30 | active | Composio create succeeded. 2026-07-04 stats refresh: GET_POST_CONTENT returned 403 Forbidden; LIST_REACTIONS returned total=2. Views/comments/reposts unavailable; do not guess stats. Post teaches a model-switch note: task, current failure, test set, pass bar, and fallback. |
| day-8-linkedin-native-content-bank-auto | LinkedIn | native_post | urn:li:share:7479146031931322369 | https://www.linkedin.com/feed/update/urn:li:share:7479146031931322369/ |  | 2026-07-04T17:46:10.093+05:30 | Composio REST (own project) |  |  |  |  |  | active | Auto-published from content bank; discovered in local registry during 17:55 IST heartbeat and moved from Daily 13:00 IST Check Log into Active Registry. |
| day-8-x-native-failure-template | X | native_post | 2073383497478377535 | https://x.com/ruchitdalwadi/status/2073383497478377535 |  | 2026-07-04T17:58:42+05:30 | official API x-publish.mjs | 0 | 0 | 0 | 0 | 2026-07-04T17:58:42+05:30 | active | Posted via OAuth API after whoami verified @ruchitdalwadi. API returned text shortened at the final line to: "It will just fail". Immediate API stats were all zero. |
| day-8-x-native-trend-gemini-1803 | X | native_post | 2073384593697468521 | https://x.com/ruchitdalwadi/status/2073384593697468521 |  | 2026-07-04T18:03:03.714+05:30 | GitHub Action trend agent | 9 | 0 | 1 | 0 | 2026-07-04T18:42:00+05:30 | active | Daily trend take (Gemini). Discovered in Daily 13:00 IST Check Log during 18:40 heartbeat; X API stats verified public status with 9 impressions, 0 likes, 1 reply, 0 reposts, 0 bookmarks. |
| day-8-x-native-trend-gemini-1758-not-found | X | native_post | 2073383436920955152 | https://x.com/ruchitdalwadi/status/2073383436920955152 |  | 2026-07-04T17:58:27.831+05:30 | GitHub Action trend agent |  |  |  |  | 2026-07-04T18:42:00+05:30 | not_found | Daily trend take (Gemini) registry row returned X API Not Found during 18:40 heartbeat; not counted as a verified public post. |
| day-8-x-native-demo-vs-product-discipline | X | native_post | 2073364437789188264 | https://x.com/ruchitdalwadi/status/2073364437789188264 |  | 2026-07-04T16:42:57+05:30 | official API x-publish.mjs |  |  |  |  |  | active | First API-published native. Demo-vs-product discipline post. Posted timestamp corrected from status ID snowflake; original local registry row had 17:15 IST. |
| day-7-linkedin-native-agent-handoff-card | LinkedIn | native_post | urn:li:share:7478665802834038785 | https://www.linkedin.com/feed/update/urn:li:share:7478665802834038785/ |  | 2026-07-03T09:58:20+05:30 | Composio LinkedIn |  | 0 |  |  | 2026-07-04T13:25:04+05:30 | active | Composio create succeeded. 2026-07-04 stats refresh: GET_POST_CONTENT returned 403 Forbidden; LIST_REACTIONS returned total=0. Views/comments/reposts unavailable; do not guess stats. Post teaches an agent workflow handoff card: input, allowed decision, touched tool/file, required evidence, refusal line, exception owner, and smallest rerun test. |
| day-6-linkedin-native-rejected-output-workflow | LinkedIn | native_post | urn:li:share:7478382489783144448 | https://www.linkedin.com/feed/update/urn:li:share:7478382489783144448/ |  | 2026-07-02T15:12:32+05:30 | Composio LinkedIn |  | 2 |  |  | 2026-07-04T13:25:04+05:30 | active | Composio create succeeded. 2026-07-04 stats refresh: GET_POST_CONTENT returned 403 Forbidden; LIST_REACTIONS returned total=2. Views/comments/reposts unavailable; do not guess stats. |
| day-6-myttle-claude-tag-shared-handoff-reply | X | reply | 2072605730222604339 | https://x.com/ruchitdalwadi/status/2072605730222604339 | https://x.com/xmyttle/status/2072397828371161498 | 2026-07-02T14:29:25+05:30 | browser X |  |  |  |  |  | active | Target before posting: 1.4K views, 34 likes, 8 replies, 4 reposts. |
| day-6-ai-guides-agent-skill-harness-reply | X | reply | 2072605792063402218 | https://x.com/ruchitdalwadi/status/2072605792063402218 | https://x.com/free_ai_guides/status/2072361228517994880 | 2026-07-02T14:29:25+05:30 | browser X |  |  |  |  |  | active | Target before posting: 3.5K views, 26 likes, 4 replies, 20 reposts. |
| day-6-daily-dose-agent-harness-architecture-reply | X | reply | 2072605862242537791 | https://x.com/ruchitdalwadi/status/2072605862242537791 | https://x.com/DailyDoseOfDS_/status/2072251381608820969 | 2026-07-02T14:29:25+05:30 | browser X |  |  |  |  |  | active | Target before posting: 24K views, 348 likes, 8 replies, 79 reposts. |
| day-6-maestro-mcp-coding-agent-flow-reply | X | reply | 2072605926948053467 | https://x.com/ruchitdalwadi/status/2072605926948053467 | https://x.com/maestro__dev/status/2072305027360997658 | 2026-07-02T14:29:25+05:30 | browser X |  |  |  |  |  | active | Target before posting: 2.2K views, 33 likes, 2 replies, 2 reposts. |
| day-6-kuch-claude-code-folder-agent-reply | X | reply | 2072605989745099113 | https://x.com/ruchitdalwadi/status/2072605989745099113 | https://x.com/thekuchh/status/2072364811606766020 | 2026-07-02T14:29:25+05:30 | browser X |  |  |  |  |  | active | Target before posting: 2K views, 27 likes, 11 replies, 1 repost. |
| day-6-david-ai-workspace-quality-gate-reply | X | reply | 2072582958490534151 | https://x.com/ruchitdalwadi/status/2072582958490534151 |  | 2026-07-02T13:00:09+05:30 | browser X |  |  |  |  |  | active | Target before posting: 1.4K views, 106 likes, 30 replies, 60 reposts. |
| day-6-freecodecamp-claude-code-rules-reply | X | reply | 2072583182986412152 | https://x.com/ruchitdalwadi/status/2072583182986412152 |  | 2026-07-02T13:00:09+05:30 | browser X |  |  |  |  |  | active | Target before posting: 8,840 views, 61 likes, 16 replies, 43 reposts. |
| day-6-olly-context-library-reject-examples-reply | X | reply | 2072583262879527378 | https://x.com/ruchitdalwadi/status/2072583262879527378 |  | 2026-07-02T13:00:09+05:30 | browser X |  |  |  |  |  | active | Target before posting: 2,893 views, 23 likes, 1 reply, 2 reposts. |
| day-6-langchain-agent-eval-observability-reply | X | reply | 2072583421755605027 | https://x.com/ruchitdalwadi/status/2072583421755605027 |  | 2026-07-02T13:00:09+05:30 | browser X |  |  |  |  |  | active | Target before posting: 39K views, 69 likes, 2 replies, 19 reposts. |
| day-6-cognition-routing-merge-eval-reply | X | reply | 2072583522460783102 | https://x.com/ruchitdalwadi/status/2072583522460783102 |  | 2026-07-02T13:00:09+05:30 | browser X |  |  |  |  |  | active | Target before posting: 512.2K views, 1.1K likes, 77 replies, 249 reposts. |
| day-6-vornix-ai-ops-workflow-automation-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20for%20work%20operators&origin=GLOBAL_SEARCH_HEADER | Vornix Solutions AI operations workflow poll | 2026-07-02T13:47:20+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Need durable LinkedIn comment permalink/URN if visible later. |
| day-6-gordian-ai-work-productivity-workflow-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20for%20work%20operators&origin=GLOBAL_SEARCH_HEADER | Gordian Staffing Careers AI-at-work productivity poll | 2026-07-02T13:47:20+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Need durable LinkedIn comment permalink/URN if visible later. |
| day-6-dev-ai-learning-coding-review-note-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20coding%20workflow&origin=GLOBAL_SEARCH_HEADER | Dev Mohite AI learning/coding article | 2026-07-02T13:47:20+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Need durable LinkedIn comment permalink/URN if visible later. |
| day-6-srinivas-agentic-coding-boundaries-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20coding%20workflow&origin=GLOBAL_SEARCH_HEADER | Srinivas Gutta agentic coding/orchestration post | 2026-07-02T13:47:20+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Need durable LinkedIn comment permalink/URN if visible later. |
| day-6-alex-ai-teammates-production-contract-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20agents%20evals%20workflow&origin=GLOBAL_SEARCH_HEADER | Alex Padaliya production AI teammate post | 2026-07-02T13:47:20+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Need durable LinkedIn comment permalink/URN if visible later. |
| day-6-rishita-confident-wrongness-verification-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/groups/12505570/?q=highlightedFeedForGroups&highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7478320080150384640 | Rishita Katoch confident wrongness / verification post | 2026-07-02T11:36:37+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Target showed 2 reactions after posting. |
| day-6-harish-ai-tools-workflow-compression-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20workflow&origin=GLOBAL_SEARCH_HEADER | Harish kumar AI tools/workflows post | 2026-07-02T11:36:37+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Target showed 717 reactions, 137 comments, 88 reposts after posting. |
| day-6-brevity-ai-save-10-hours-workflow-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20workflow&origin=GLOBAL_SEARCH_HEADER | Brevity Software Solutions AI 10-hours-saved poll | 2026-07-02T11:36:37+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Target showed 3 reactions, 1 comment, 1 repost. |
| day-6-sgs-ai-at-work-workflow-automation-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20workflow&origin=GLOBAL_SEARCH_HEADER | SGS Consulting AI-at-work poll | 2026-07-02T11:36:37+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Target showed 2 reactions, 4 comments, 1 repost. |
| day-6-shivani-ai-agents-workflow-roles-comment | LinkedIn | comment | comment permalink pending | https://www.linkedin.com/search/results/content/?keywords=AI%20workflow&origin=GLOBAL_SEARCH_HEADER | Shivani Sisodiya / Ai Mindshare AI agents workflow post | 2026-07-02T11:36:37+05:30 | browser LinkedIn fallback |  |  |  |  |  | active | Visible counters were not captured cleanly from search container. |

## Daily 13:00 IST Check Log

| checked_at_ist | rows_checked | rows_updated | tool_paths | blockers | notes |
|---|---:|---:|---|---|---|
| 2026-07-02T16:46:45+05:30 | 21 | 0 | Composio LinkedIn attempted; browser X skipped | Composio LinkedIn multi-execute timed out at 300s; browser X/browser LinkedIn skipped because the most recent two tab-level browser health checks timed out | No public actions taken. Leave stats blank until Composio read-back or browser health is clean. |
| 2026-07-03T13:41:24+05:30 | 22 | 0 | Composio LinkedIn attempted; browser X/browser LinkedIn skipped | Composio LinkedIn GET_POST_CONTENT returned 403 Forbidden for both active native share URNs; browser X/browser LinkedIn skipped because the most recent two tab-level browser health checks timed out | No public actions taken. Stats left blank where unavailable; do not guess metrics. |
| 2026-07-04T13:25:04+05:30 | 23 | 3 | Composio LinkedIn attempted; browser X/browser LinkedIn skipped | GET_POST_CONTENT returned 403 Forbidden for all 3 native LinkedIn shares; LINKEDIN_GET_SHARE_STATS is organization-scoped and not applicable to personal profile shares; browser X/browser LinkedIn skipped because the latest browser retry failed below platform | Updated verified LinkedIn reaction totals only: day-8 model-switch note=2, day-7 agent handoff card=0, day-6 rejected-output workflow=2. Views/comments/reposts left blank where unavailable; no public actions taken. |
| 2026-07-05-slot1 | X | native_post | 2073661873627488529 | https://x.com/ruchitdalwadi/status/2073661873627488529 |  | 2026-07-05T12:24:52.252+05:30 | GitHub Action official API |  |  |  |  |  | active | Auto-published from content bank (text). |
| 2026-07-05-slot2 | X | native_post | 2073717708349206640 | https://x.com/ruchitdalwadi/status/2073717708349206640 |  | 2026-07-05T16:06:44.341+05:30 | GitHub Action official API |  |  |  |  |  | active | Auto-published from content bank (text). |
| 2026-07-05-li-native | LinkedIn | native_post | urn:li:share:7479489142897328128 | https://www.linkedin.com/feed/update/urn:li:share:7479489142897328128/ |  | 2026-07-05T16:29:34.226+05:30 | Composio REST (own project) |  |  |  |  |  | active | Auto-published from content bank. |
| 2026-07-05-trend-slot | X | native_post | 2073737989428011512 | https://x.com/ruchitdalwadi/status/2073737989428011512 |  | 2026-07-05T17:27:19.706+05:30 | GitHub Action trend agent |  |  |  |  |  | active | Daily trend take (Gemini). |
| 2026-07-05-slot3 | X | native_post | 2073783150204035580 | https://x.com/ruchitdalwadi/status/2073783150204035580 |  | 2026-07-05T20:26:46.880+05:30 | GitHub Action official API |  |  |  |  |  | active | Auto-published from content bank (text). |
| 2026-07-06-slot1 | X | native_post | 2074041455010549952 | https://x.com/ruchitdalwadi/status/2074041455010549952 |  | 2026-07-06T13:33:11.503+05:30 | GitHub Action official API |  |  |  |  |  | active | Auto-published from content bank (text). |
| 2026-07-06-slot2 | X | native_post | 2074106945074610623 | https://x.com/ruchitdalwadi/status/2074106945074610623 |  | 2026-07-06T17:53:25.612+05:30 | GitHub Action official API |  |  |  |  |  | active | Auto-published from content bank (text). |
| 2026-07-06-li-native | LinkedIn | native_post | urn:li:share:7479876047195279360 | https://www.linkedin.com/feed/update/urn:li:share:7479876047195279360/ |  | 2026-07-06T18:06:59.299+05:30 | Composio REST (own project) |  |  |  |  |  | active | Auto-published from content bank. |
