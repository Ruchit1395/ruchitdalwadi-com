# Daily Native Post Runbook

## Scope

This runbook owns one daily native X post and one daily native LinkedIn post for the AI-Native Team Work campaign. It does not authorize comments, replies, DMs, likes, reposts, follows, uploads, profile edits, paid actions, or account and security changes.

## Before drafting

1. Read `README.md`, `PRIVACY_AND_LANGUAGE_RULES.md`, `POST_BANK.md`, `POST_QUEUE.csv`, and this runbook.
2. Read the shared `CONTENT_RULES.md`, `VOICE_COMPOSITION_GUIDE.md`, `HOOK_PLAYBOOK.md`, and `AUDIENCE_MAP.md` in `../first-ten-customers-for-a-b2b-ai-startup/`.
3. Read the last 10 native-post rows in the shared `post-stats-registry.md`, `tracker.csv`, and `WORKLOG.md`.
4. Check the target platform's live profile when available and the local records. Stop if that platform already has a native post for the current IST day.
5. Select the lowest numbered queue row whose platform status is not `posted`. X reads `x_status`; LinkedIn reads `linkedin_status`. A `blocked` row remains first in line for recovery and must not be skipped for a later topic.

## Drafting

`POST_BANK.md` contains a finished core draft for each lesson. Treat it as source copy, not permission to cross-post verbatim.

- Keep the lesson, practical steps, boundary, and tradeoff.
- X should be compact and direct.
- LinkedIn should use a different opening, paragraph order, and closing action. It may add one clearly labeled hypothetical example.
- Do not add a private receipt. The stated tradeoff or visible workflow example in the core post is the evidence.
- Run every hard ban in `PRIVACY_AND_LANGUAGE_RULES.md` and the shared language files.
- Confirm the final body contains no company, team, customer, database, vendor, system, or incident detail from the source note.

## Browser publishing

1. Publish through the browser only.
2. Open a fresh native composer and confirm the correct account.
3. Run a clean composer test: enter harmless text, clear it fully, and confirm it is empty. Never submit test text.
4. Open a separate fresh composer for the real draft.
5. Fill the final draft and re-read the exact visible composer text immediately before submission.
6. Submit only through the unique enabled native Post control.
7. Record the success alert, stable URL, or visible live-profile proof. Never invent an identifier.
8. Do not retry when an earlier submission may have landed. Resolve duplicate uncertainty first.

Authentication, CAPTCHA, safety interstitials, required user approval, and unresolved duplicate risk are hard stops.

## After a post or meaningful blocker

1. Update the selected `POST_QUEUE.csv` platform status, timestamp, URL, and note. Use verified evidence only.
2. Add the public asset to the shared campaign's `post-stats-registry.md` and `tracker.csv` so daily stats checks still find it.
3. Append a concise entry to this campaign's `WORKLOG.md` and the shared campaign's `WORKLOG.md`.
4. Run CSV parsing, privacy and language checks, the shared campaign validator, and `git diff --check`.
5. Stage `distribution/`, commit, run `git pull --rebase`, and push.
6. Report with the `README.md` X, LinkedIn, and Status contract.
