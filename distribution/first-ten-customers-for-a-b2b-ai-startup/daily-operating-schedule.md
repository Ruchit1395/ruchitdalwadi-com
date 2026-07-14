# Daily operating schedule

Created: 2026-06-22T00:25:09+05:30.
Updated: 2026-07-14T10:30:00+05:30.

Purpose: daily execution rhythm for the X Premium + LinkedIn reach campaign, now pivoted from narrow first-customer/GTM distribution to broader practical AI teaching.

Execution is tracked in `daily-activity-ledger.csv`. Use that ledger to compare planned daily cadence against actual posts, reply batches, comment batches, outreach, metric checks, and verified replies.

The current strategy is not "post more forever." It is:

1. Keep one strong native idea alive.
2. Enter rooms where the right audience is already paying attention.
3. Turn replies/comments into the next native post.
4. Track replies and profile movement, not just clicks.

## Strategy update, 2026-06-29

The campaign is now explicitly broader than AI GTM and narrow evals content.

Core positioning:

- practical AI teaching for beginners, operators, founders, PMs, and builders,
- "how to actually use AI at work,"
- "how to stop being behind,"
- "one workflow you can copy today,"
- agents/evals/harnesses as proof and examples, not the whole category.

Comment style:

- sharper and more opinionated,
- practical and specific,
- no-link by default,
- avoid generic agreement.

Good comment pattern:

- name the mistake,
- give the better frame,
- add one concrete operational detail.

Example:

> Most people do this backwards. The model is not the bottleneck; the review loop is.

Room selection:

- prioritize medium-hot rooms over only mega-viral posts,
- ideal range: 30-500 likes/reactions and under 80 comments when possible,
- author or topic should still be active,
- comment should have a real opening for a useful contrarian or practical point.

Keyword lanes:

- AI productivity,
- AI workflow,
- AI for work,
- AI agents,
- context engineering,
- prompting,
- Cursor,
- ChatGPT,
- AI tools,
- AI automation,
- model choice,
- AI for PMs,
- AI for founders,
- AI coding,
- evals,
- harnesses,
- review loops.

## Daily volume targets

The campaign target is 20 verified cold comments per local day: 10 on X and 10 on LinkedIn. Use 08:00-23:00 IST as the pacing window, which means roughly 4 comments by 11:00, 8 by 14:00, 12 by 18:00, and 20 by 23:00.

When actual verified comments trail the expected pace by 3 or more, enter recovery mode. A new recovery session may start after 10 minutes from the newest verified comment, even when the normal 2.5-hour session cooldown has not elapsed. The per-comment 2-minute spacing, 5-comment session cap, 20-comment daily cap, 10-per-platform caps, room-quality gates, and browser verification rules do not change.

This prevents a low-volume morning from becoming an automatic zero-comment day. Recovery sessions should fill the most lagging platform first, then use the normal mixed-session preference when both platforms have capacity.

## Strategy update, 2026-06-30: X Premium

X Premium is now active / in verification review. Treat this as a tactical upgrade, not a content-quality shortcut.

Operational changes:

- X becomes the faster testing channel because replies can receive priority treatment and longer posts/replies are available.
- Keep the existing 3 X reply batches/day floor, but add one opportunistic 3-reply mini-batch when browser stability and good rooms allow.
- Increase native X target from 2/day to 2-3/day: one short sharp post, one practical mini-framework, and an optional third post based only on live signal.
- Use longer X posts selectively for 600-1,200 character mini-essays, checklists, and "workflow you can copy today" posts.
- Normal X replies still default to 180-240 characters. Use 240-600 characters only for high-context, high-quality targets.
- Do not change X profile photo, display name, or handle while the checkmark is under review or newly applied.

See `x-premium-operating-plan-2026-06-30.md` for the Premium-specific rules.

## Strategy update, 2026-06-30: voice and value density

The campaign has a recognizable automation fingerprint: contrarian opener, blank line, bullet checklist, closing aphorism. That pattern should no longer be used as the default.

See `voice-and-value-guide-2026-06-30.md` before drafting native posts or comment batches.

New quality rules:

- No two native posts in 48 hours should use the same visible structure.
- No batch may use the same opening structure more than twice.
- At least 2 replies per X batch must include specific implementation advice, not just a framing line.
- At least 1 LinkedIn comment per batch must be a 4-6 sentence high-value comment with a concrete workflow, example, or decision rule.
- Every public touch must include at least one concrete value object: template, decision rule, before/after, failure mode, test, owner, or "what I would do Monday" action.
- Before posting, run the value pass: "What can the reader do next?" If the answer is vague, rewrite.
- Native posts must pass the 8/10 voice-and-value score. X replies and LinkedIn comments must pass 7/10.

## Strategy update, 2026-06-30: 45-minute retry queue

Do not burn an entire block repeatedly fighting a failed social editor.

When a high-signal target or native post fails because of browser/platform input, disabled buttons, or verification failure:

1. Log the failed attempt in `tracker.csv`, `metrics-log.csv`, and `WORKLOG.md`.
2. Add the target to `retry-queue.csv` with `retry_after = failure time + 45 minutes`.
3. Continue the current block with another channel or a fresh target instead of retrying the same editor loop.
4. At the next heartbeat or retry wakeup, process due rows from `retry-queue.csv` before scouting new targets.
5. Give each queued item one fresh retry attempt from a clean browser state.
6. If the retry succeeds, mark the row `posted` and log the verified URL/evidence.
7. If the retry fails again, mark it `manual_packet_needed` or `abandoned_stale`; do not keep retrying indefinitely.

Retry priority:

- first: X replies/native posts that are still timely and already had a strong drafted angle,
- second: LinkedIn comments in medium-hot rooms,
- third: native posts that can be reformatted into a shorter/manual packet.

Hard cap: one queued item gets one retry attempt per wakeup before moving to the next queued item. If the same platform fails twice in the retry wakeup, stop that platform and preserve remaining due rows.

## Strategy update, 2026-06-30: 24-hour execution window

The old 10:00-22:00 IST-only operating window is removed. The campaign can now execute public X and LinkedIn actions at any hour when the target is high-signal, the browser path is stable, and the action fits the current strategy.

This does not mean passive browsing all night.

Outside the original 10:00-22:00 IST core window:

- process due `retry-queue.csv` rows first,
- respond to substantive public inbound if visible,
- prioritize X over LinkedIn for late-night/overnight work because X rooms stay active globally and Premium reply ranking may help,
- allow one compact recovery block when the day is behind: 3-6 X replies or 3-5 LinkedIn comments, depending on platform stability,
- allow one native X post only when it comes from live signal or a prepared high-value draft,
- skip passive metric refreshes unless a public action just happened or there is likely response signal,
- return quietly when there are no due retries, no substantive inbound, and no strong room already open.

Full daytime blocks remain the backbone. Overnight blocks are for recovery, global X rooms, and retry capture, not for low-quality volume.

### New native posts

X:

- 2-3 standalone native posts per day.
- Use live replies, high-performing comments, and practical AI confusion as raw material.
- No links by default.
- At least one daily X post should be a short, sharp idea.
- At least one daily X post should be a practical mini-framework if the composer supports longer posting.
- The optional third X post is allowed only when it comes from live signal: a reply, comment, trend, or repeated audience confusion.
- Rotate format daily: micro-scene, teardown, operator memo, before/after, question-first, tiny template, or earned skepticism.
- Avoid starting more than one daily native X post with "Most..."

LinkedIn:

- 1 native post per day if the composer works.
- Use LinkedIn posts for bigger teaching moves, not every small thought.
- If the native composer fails, stop after one verified attempt and replace it with a verified LinkedIn comment batch.
- LinkedIn native posts should contain one unusually useful artifact: a workflow spec, decision tree, teardown, or Monday-morning exercise.

Default rule:

- X tests ideas faster.
- LinkedIn compounds better when the post is more considered and comment activity feeds profile discovery.

### Replies and comments

X:

- 3 reply batches per day.
- 5-6 replies per batch.
- Daily target: 15-18 useful replies.
- Add one opportunistic Premium mini-batch of 3 verified X replies when strong rooms are available and the browser path is stable.
- Hard draft rule: normal X replies should be drafted at 180-240 characters before opening the composer. Premium longer replies may be 240-600 characters only when the room is strong and the extra nuance materially improves the comment.
- Use Premium reply prioritization where ranking matters: verified-heavy threads, fast-moving AI tool/update posts, and medium-hot rooms where comments are still readable.

LinkedIn:

- 3 comment batches per day.
- 5 comments per batch.
- Daily target: 15 useful comments.
- LinkedIn is first-class: every active execution block should attempt LinkedIn comments first or second unless browser/platform input fails.

Every reply/comment should be no-link by default and should add one of:

- a sharper frame,
- a useful counterpoint,
- a concrete example,
- a founder/operator question,
- a missing practical caveat.

Every batch should also rotate comment shapes. Do not post five versions of "the workflow matters more than the tool." Use target-specific nouns and vary between implementation advice, question-first, before/after, failure-mode, and tiny-template comments.

## Daily cadence

The recurring heartbeat runs every 45 minutes across the full day so failed-but-qualified items can be retried after cooldown and global X/LinkedIn opportunities can be used outside the old 10:00-22:00 IST window.

Token-saving rule: every 45-minute wakeup should inspect `retry-queue.csv` first. If no queued row is due and the wakeup is not near a full scheduled block, browse live platforms only when there is a strong reason: substantive inbound is likely, the browser is already on a high-signal target, or the day is materially behind and the action can be a compact recovery block. Otherwise return quietly.

Discovery rule: when a public action is authorized, use the authenticated home feed as the first discovery surface on both platforms. Inspect visible feed cards before keyword searches. A feed sample that yields enough qualified rooms is sufficient; do not discard those rooms or spend the block searching for theoretically better ones.

Full scheduled check/action slots:

- 10:00 IST
- 14:00 IST
- 18:00 IST
- 22:00 IST
- Overnight recovery slots as needed: 00:00, 03:00, 06:00 IST, only when behind or when due retries/substantive inbound exist.

Daily stats refresh:

- Run at the first heartbeat at or after 13:00 IST.
- Read `post-stats-registry.md` before outbound work unless urgent due retries exist.
- Update every active row with visible views/impressions, likes/reactions, replies/comments, reposts/shares, `last_checked_ist`, tool path, and notes where available.
- Use Composio first for LinkedIn stats/read-back; use browser automation for X only when browser health is clean.
- Do not post, comment, reply, like, repost, follow, open DMs, or answer DMs during the stats refresh.
- Leave unknown values blank. Record exact API/browser limitations instead of guessing.
- Mirror changed/new checkpoints into `metrics-log.csv`, append the daily check row in `post-stats-registry.md`, and note meaningful blockers in `WORKLOG.md`.

Each check should map to the closest daily operating window below. If a window was missed, recover the most lagging channel first, with LinkedIn comments prioritized when LinkedIn is behind.

Before normal scheduled actions, check `retry-queue.csv` for due rows. Process due retry rows first when they are still relevant, regardless of hour.

45-minute retry wakeups:

- If `retry-queue.csv` has due queued rows, process them before new scouting.
- If there are no due rows, do not open X or LinkedIn just to check.
- If a due retry succeeds, update `retry-queue.csv` and the normal logs.
- If a due retry fails again, mark `manual_packet_needed` or `abandoned_stale`.
- If two retries fail on the same platform in one wakeup, stop that platform and preserve the remaining due rows.

### Morning block, 10:00-12:00 IST

Goal: start the day with public surface area and LinkedIn discovery.

Actions:

1. Check X and LinkedIn notifications/comments for substantive public inbound.
2. Reply to campaign-quality inbound before posting new outbound.
3. Start with feed-first discovery: inspect at least 20 visible LinkedIn posts or 3 screenfuls, then comment in the strongest rooms. Use keyword lanes only if the feed sample is thin.
4. Publish X native post 1, preferably a short sharp idea.
5. Start with feed-first discovery: inspect at least 20 visible X posts or 3 screenfuls, then reply in the strongest rooms. Use the X scout and keyword lanes only if the feed sample is thin.
6. Log every verified action.

### Midday block, 14:00-16:00 IST

Goal: enter active conversations while workday attention is high.

Actions:

1. Check inbound lightly.
2. Run X reply batch 2: 5-6 replies under active AI workflow/tool/model rooms.
3. Run LinkedIn comment batch 2: 5 comments.
4. Prefer practical AI-for-work rooms over narrow implementation-only threads.
5. If the X path is stable and strong rooms are available, add a Premium mini-batch of 3 extra X replies.
6. Log target quality: visible reactions, comments, topic, author, and why the room was chosen.

### Evening block, 18:00-20:00 IST

Goal: reinforce identity and catch LinkedIn.

Actions:

1. Check inbound lightly.
2. Attempt LinkedIn native post. If composer input fails, convert the idea into LinkedIn comment fallback.
3. Publish X native post 2, preferably a practical mini-framework or checklist.
4. Run LinkedIn comment batch 3 if not already complete.
5. Use sharper frameworks that can become repeatable series.

### Late block, 20:00-22:00 IST

Goal: finish the daily reply target and prepare tomorrow.

Actions:

1. Check inbound lightly.
2. Retry due `retry-queue.csv` rows that are still timely.
3. Run X reply batch 3: 5-6 replies.
4. If there was a strong live exchange, publish optional X native post 3 only before 21:30 IST.
5. Do a quick metric/reply review only for posts touched in the last 48 hours.
6. Draft tomorrow's hooks from the strongest live exchange.
7. Update the daily ledger with planned vs actual.

### Overnight recovery blocks, 22:00-10:00 IST

Goal: recover missed daily surface area without lowering quality.

Actions:

1. Check `retry-queue.csv` first.
2. If due retries exist, process them before new scouting.
3. If no due retries exist, act only when one of these is true:
   - there is substantive public inbound,
   - the browser is already on a high-signal X/LinkedIn target,
   - the daily ledger is behind and a compact recovery block can be completed without fighting the editor.
4. Prefer X reply recovery because global AI rooms stay active overnight.
5. Keep overnight batches smaller unless the browser path is stable: 3-6 X replies or 3-5 LinkedIn comments.
6. Do not publish low-confidence native posts just to fill a count.
7. Log failures as zero-count evidence rather than repeatedly retrying the same editor.

## Reach math

The monthly goal is 100,000 reached impressions.

- Required average: 3,333 reached impressions per day.
- With 28 days left, required average rises to about 3,572 per day.
- With 21 days left, required average rises to about 4,762 per day.
- With 14 days left, required average rises to about 7,143 per day.

The operating assumption for normal comments/replies is conservative:

- weak room: 20-50 views,
- decent room: 50-150 views,
- strong room: 150-500 views,
- breakout room: 1,000+ views.

At roughly 30-33 comments/replies per day across X and LinkedIn, a normal 100-view average creates only 3,000-3,300 reached impressions/day. That is barely at the required daily pace and leaves no margin for weak rooms, so the campaign cannot rely on volume alone. Each batch must include at least 2-3 medium-hot or strong rooms where the original post already has visible discussion, comments, bookmarks, or known high-signal participants.

### Every 4-hour signal check

Goal: respond before adding new surface area.

Actions:

1. Check X and LinkedIn notifications/comments for substantive replies.
2. Reply to campaign-quality inbound comments before publishing anything new.
3. Refresh only posts touched in the last 48 hours or posts that likely have response signal.
4. Log evidence in `tracker.csv`, `metrics-log.csv`, `daily-activity-ledger.csv`, and `WORKLOG.md`.
5. Stop after one verified public action is posted and logged, or after 30 minutes of browser work.

Do not burn cycles on passive metric refreshes. A check is useful only if it can produce a reply, a public action, or a better next decision.

Maintenance checks may stop after one verified public action. Active execution blocks may not stop after one comment/reply unless the browser path fails or the available rooms are low quality. In an active block, complete the planned batch floor: 5-6 X replies and/or 5 LinkedIn comments.

## Chat summary format

After any scheduled block, retry processing, inbound check, stats refresh, public post/comment/reply, or meaningful blocker, leave a short chat summary. Use this exact shape so future agents and the user can scan the thread quickly:

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

Use a quiet no-op response only when there were no due retries, no full block, no stats refresh due, no live tool/browser attempt, no day-gap recovery, and no useful unblock.

## Additional daily work

### Direct outreach

Paused for this sprint unless the user explicitly re-opens it. The next three days prioritize public X and LinkedIn surface area.

### Content recycling

Every day, convert at least one useful conversation into a draft:

- an X post,
- a LinkedIn post,
- a future reply/comment,
- or a direct note angle.

Do not recycle weak vanity engagement. Only recycle material that reveals an objection, useful language, or a sharper wedge.

### Metric review

Check 2-3 times per day:

- X thread/post views,
- X replies/reposts/likes,
- LinkedIn impressions,
- LinkedIn profile viewers,
- LinkedIn first-comment impressions,
- website clicks if visible,
- verified replies in `reply-source-scorecard.csv`.

At the 13:00 IST daily stats refresh, `post-stats-registry.md` is the asset lookup surface and `metrics-log.csv` is the structured checkpoint surface. Save stable identifiers for every new asset immediately after posting so the next stats run can find it without re-scouting.

After each day, update `daily-activity-ledger.csv` with planned vs actual activity. If actual execution is below plan for two consecutive days, the next day's priority should be reply/comment batches before additional standalone experiments.

Do not judge comments by likes alone. Judge them by:

- replies from target people,
- profile-view movement,
- follow-on conversations,
- raw material for better posts.

## Current operating stance

The campaign is below 100k pace. Public X and LinkedIn posts/comments/replies are authorized autonomously when they fit the practical AI teaching strategy and are high-signal.

Do not direct-message anyone, email anyone, upload files, edit live profiles, spend money, or change account/security settings unless the user explicitly approves that exact action.
