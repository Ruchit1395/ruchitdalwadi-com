# Native Post Dry Run - 2026-08-08

Purpose: confirm the new native-post system before the first scheduled evening run. No browser composer was opened and no public post was made.

## Cadence check

| Platform | Schedule | Due in this dry run | Result |
| --- | --- | --- | --- |
| X | Daily, 19:00 IST | No, before the first evening slot | Pass |
| LinkedIn | Every other day, 19:20 IST, starting 2026-08-08 | No, before the first evening slot | Pass |

## Dry-run checks

- Separate ownership: native posting is in `NATIVE_POST_RUNBOOK.md`; comments remain in `COMMENT_SESSION_RUNBOOK.md`.
- Plain-language rule: required through `CONTENT_RULES.md` and `VOICE_COMPOSITION_GUIDE.md`.
- Topic gate: require one real receipt, visible example, or stated tradeoff.
- Duplicate gate: check the last 10 native-post records before drafting.
- Publish gate: browser only, exact visible composer text, no adjacent social actions.
- Recovery gate: one fresh-tab retry, then log a blocker and make up the post at the next safe evening slot.

## Sample topic test

Candidate: a short tutorial on using a simple stop rule for an AI task that starts going wrong.

Monday action: write down the one result that should make the task stop and send it to a person.

Why it passes: it is practical, easy to explain, and can use a real workflow detail. It does not require a trend claim or a made-up result.

Why it is not a draft: the scheduled run must first check the latest native posts and select a fresh angle. No copy is carried forward automatically.
