# Cloud Routine — July 5–19, 2026

The campaign now runs **fully independent of the local machine**. GitHub Actions is the execution layer; the repo is the state store; the scoreboard is the single reporting surface Ruchit checks on return.

Target: 100,000 impressions **each** on X and LinkedIn by July 19.
Honest base case at current baseline (2,981 X impressions in 14 days): X 25–50k, LinkedIn 15–30k. Hitting 100k each requires a breakout post. The routine maximizes surface area and breakout attempts; it does not guarantee the tail.

## Daily cadence (all times IST, all cloud)

> X API policy note (learned Jul 4): the API forbids replying to or quoting
> posts by people who have not engaged you first. Cold replies are therefore
> browser-only (bonus tier). The cloud engagement engine answers inbound and
> rides trends instead.

| Time | What | Runner |
|---|---|---|
| 09:00 | X native post — slot 1 (short sharp teaching post) | `x-scheduled-posts.yml` |
| 09:45 | Signal post generation: fetch 31 watchlist authors + lanes live from X, one Gemini pass writes today's X slot3 + LI post (retry 11:30 if needed; Signal repo retired from the loop) | `signal-to-social.yml` |
| 12:30 | Inbound sweep 1 — answer everyone who replied to us (max 8) | `x-replies.yml` |
| 13:00 | Stats refresh + scoreboard commit | `daily-scoreboard.yml` |
| 14:00 | X native post — slot 2 (mini-framework or thread) | `x-scheduled-posts.yml` |
| 14:30 | LinkedIn native post | `li-scheduled-post.yml` (Composio proxy) |
| 16:00 | X trend post — original take on what's hot right now (Gemini, may skip) | `x-replies.yml` |
| 18:00 | Inbound sweep 2 | `x-replies.yml` |
| 19:00 | X native post — slot 3 (actionable or dry-comic) | `x-scheduled-posts.yml` |
| laptop-on | Cold replies + LinkedIn comments in big rooms (browser, Codex/Claude) | bonus tier |

All generated text obeys `CONTENT_RULES.md` (no em dashes, no repeated
patterns, sycophant openers rejected, completeness-checked before posting).

Weekly rhythm on top:
- **2 threads/week** (Tue, Fri slot 2) — the breakout attempts. Strongest hooks from hook-lab, 5–8 tweets, image on tweet 1 when possible.
- **2 image posts/week per platform** — domain diagrams / framework graphics.
- **1 X long-form post/week** (Premium) — mini-essay repurposed from the site.
- **Site compounding**: each day's best-performing theme becomes a short essay or frameworks entry (agent-assisted, in-session when Ruchit's agents run).

## Content source

`content-bank/x/YYYY-MM-DD/{slot1.txt, slot2.thread.json, slot3.txt}` — 15 days pre-generated, 6-axis rubric checked, no links in post bodies ($0.20/link post + algorithmic suppression). Bank is replenished by agents in interactive sessions; the publisher only posts what exists.

LinkedIn bank: `content-bank/li/YYYY-MM-DD/post.md` (+ optional image ref).

## Rules the agents enforce

- Replies: ≤240 chars, no links, no hashtags, add a frame/caveat/test, skip rooms with <30 likes or >120 replies, never reply to the same author twice in 3 days, max 5/run.
- Native posts: no URLs in body (bio link carries the site), threads capped at 8 parts.
- No DMs, no follows, no profile edits (blue-check review), no paid actions.
- Stats: read-only, daily, no guessing — blank over wrong.
- Kill-switch: if X API spend exceeds $15 total, publisher stops and flags.

## Reporting

- `SCOREBOARD.md` — rewritten daily at 13:00 IST: totals vs 100k, needed/day, top posts, 15-day history.
- `scoreboard-history.csv` — the raw daily series.
- `replied-log.csv` — every reply with target context.
- LinkedIn impressions: `li-manual-stats.csv` — updated from phone in ~5 min when convenient (API cannot read personal-profile stats; this is the one manual touch left).

## Mid-campaign checkpoint (July 11, automated flag)

If X cumulative < 15,000 on July 11, the scoreboard prints a **PIVOT** banner: shift slot 2+3 to pure thread/image formats and double reply volume. Agents in interactive sessions handle the pivot; the flag makes it unmissable.

## Cost envelope

- X API: ~$0.045/day natives + ~$0.15/day replies + ~$0.07/day owned reads ≈ **$4–6 total**
- twitterapi.io reads: ≈ **$0.30 total**
- Anthropic (reply drafting): ≈ **$1–2 total**
- Cap: $15 X API spend (kill-switch above)
