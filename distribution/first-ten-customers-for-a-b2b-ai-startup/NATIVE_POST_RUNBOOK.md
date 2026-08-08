# Native Post Runbook

Purpose: publish useful, original native posts in the evening without turning the account into a content machine.

This runbook owns native X and LinkedIn posts only. `COMMENT_SESSION_RUNBOOK.md` owns cold comments and replies only. The two schedules are separate.

## Cadence

- X: one native post every day at 19:00 IST.
- LinkedIn: one native post every other day at 19:20 IST, starting 2026-08-08.
- Do not add a second native post on either platform unless the user explicitly asks.
- If a scheduled run misses, fix the blocker, dry-run the posting path, and make up the missed post at the next safe evening slot. Never post two native posts back-to-back to catch up.

## Authority and safety

The user has authorized these scheduled native posts. Publish only through the browser.

Never send DMs, follow, like, repost, edit a profile, upload a file, spend money, change account or security settings, or make any other action outside the native post itself.

Do not post about politics, crypto, stocks, tragedy, medical claims, legal advice, or an unverified breaking-news claim. For a current event, product release, or news item, use a current primary source and state only what it supports.

## Voice

Read these before drafting:

- `CONTENT_RULES.md`
- `VOICE_COMPOSITION_GUIDE.md`
- `HOOK_PLAYBOOK.md`
- `AUDIENCE_MAP.md`

The plain-language gate is mandatory. Write like you are explaining a useful thing to a smart coworker over coffee.

- One useful idea per post.
- Short sentences and everyday words.
- Explain technical terms the first time they appear.
- No em dashes, emoji, hashtags, links in the body, AI templates, filler, fake certainty, or generic inspiration.
- No jargon used just to sound smart. Prefer `check`, `rule`, `note`, `step`, `owner`, `problem`, and `fix` over strategy-deck language.
- A joke is optional. It should be short, easy to get, and aimed at a broken process, not a person.

## What to publish

Pick a fresh angle that helps founders, PMs, operators, or AI builders do better work this week.

Good raw material:

- a practical workflow that saves time or avoids a common mistake;
- a comparison with a clear decision rule;
- a small experiment, demo, or before-and-after from Ruchit's real work;
- a useful take on verified AI news, with a practical implication;
- a simple tutorial, checklist, or template;
- a lesson from building, testing, shipping, reviewing, or fixing something.

Every post needs one of these:

1. A real receipt from Ruchit's work or a public source.
2. A concrete example visible in the product or workflow being discussed.
3. A clearly labeled recommendation and its tradeoff.

Do not invent a customer story, result, metric, failure, or personal experience.

## Topic selection

Before drafting:

1. Read the last 10 native-post entries in `post-stats-registry.md`, `tracker.csv`, and `WORKLOG.md` to avoid repeating a recent topic, hook, or post shape.
2. Choose one audience pain from `AUDIENCE_MAP.md` and one topic from the list above.
3. For time-sensitive news, verify it with a current primary source before using it. If no source is available, switch to an evergreen workflow lesson.
4. Write down the reader's Monday-morning action in one plain sentence. If there is no action, choose a different topic.

## Draft shapes

Use a different shape from the last two native posts.

### Simple workflow

Name the work moment. Give 3 short steps. Explain the result.

### Comparison

Name two options. Say when to choose each. Add the one check that prevents a bad choice.

### Small lesson

Start with the mistake or surprise. Explain what changed. End with the simple rule.

### Tutorial or demo

Show the smallest useful setup. State what to test. Name where it fails.

### Verified news translation

State the verified fact. Explain why it matters to a working team. Give one action, not a prediction.

## Length

- X: 350 to 900 characters, usually 3 to 6 short paragraphs. Shorter is fine when the point is sharp.
- LinkedIn: 600 to 1,200 characters, usually 4 to 7 short paragraphs. Use a list only when each item changes a decision.

Do not use a thread, carousel, image, poll, or link unless the user explicitly asks for that format.

## Pre-publish gate

Run every check before posting:

1. The platform is due and has not already received today's scheduled post.
2. The topic and opening do not repeat either of the last two native posts.
3. The claim has a real receipt, visible example, or stated tradeoff.
4. The draft passes the plain-language gate in `VOICE_COMPOSITION_GUIDE.md`.
5. The post makes one useful point and gives a clear action.
6. No em dashes, hashtags, emoji, links in body, hype, stock praise, or generic ending.
7. Browser health and login are good.
8. Exact composer text is visible in the DOM before submission.

If any check fails, rewrite once. If it still fails, choose another topic. A missed post should be logged as a blocker, not replaced with filler.

## Browser publish flow

1. Create a fresh browser tab and navigate to the platform's native composer.
2. Confirm the account and the target platform.
3. Fill the final post text.
4. Re-read the exact visible composer text and compare it to the intended draft.
5. Submit only the native post. Do not click adjacent reply, media, audience, or profile controls.
6. Capture the post URL or stable platform identifier when it is visible. If it is not visible, log browser submission without inventing an identifier.
7. A post-submit re-read is helpful but not required. Do not create a duplicate post to compensate for a missing confirmation.

## Failure recovery

1. Stop on the target when a step fails. Record whether it failed at navigation, composer, text input, visible-text check, submit, or confirmation.
2. Diagnose the visible page state and retry once in a fresh tab.
3. Dry-run the repaired path before retrying: open the composer, confirm that it accepts and displays draft text, then clear the test text without posting it.
4. If the platform remains blocked, log the blocker and schedule the make-up post for the next safe evening slot. Do not use an API or a second platform as a substitute unless the user asks.
5. Never publish a rushed replacement just to keep a streak.

## Logging and reporting

After a post or meaningful blocker:

1. Update `post-stats-registry.md` and `tracker.csv` with verified evidence only.
2. Append a concise entry to `WORKLOG.md`.
3. Run practical CSV checks and `./scripts/validate_campaign.py` when changed files make it relevant.
4. Stage `distribution/`, commit, run `git pull --rebase`, and push.
5. Report in the README's `X`, `LinkedIn`, and `Status` format.
