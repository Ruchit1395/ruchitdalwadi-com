# Cloud Routine — July 5–19, 2026

The campaign now runs **fully independent of the local machine**. GitHub Actions is the execution layer; the repo is the state store; the scoreboard is the single reporting surface Ruchit checks on return.

Target: 100,000 impressions **each** on X and LinkedIn by July 19.
Honest base case at current baseline (2,981 X impressions in 14 days): X 25–50k, LinkedIn 15–30k. Hitting 100k each requires a breakout post. The routine maximizes surface area and breakout attempts; it does not guarantee the tail.

## Daily cadence (all times IST, all cloud)

| Time | What | Runner |
|---|---|---|
| 09:00 | X native post — slot 1 (short sharp teaching post) | `x-scheduled-posts.yml` |
| 12:30 | X reply batch 1 — 5 scorecard-qualified replies | `x-replies.yml` |
| 13:00 | Stats refresh + scoreboard commit | `daily-scoreboard.yml` |
| 14:00 | X native post — slot 2 (mini-framework or thread) | `x-scheduled-posts.yml` |
| 14:30 | LinkedIn native post (text or image) | Composio (pending API key) or manual packet |
| 18:00 | X reply batch 2 — 5 more replies | `x-replies.yml` |
| 19:00 | X native post — slot 3 (signal-based or long-form Premium post) | `x-scheduled-posts.yml` |

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
