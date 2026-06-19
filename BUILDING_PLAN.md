# BUILDING_PLAN.md — what we ship next

A living roadmap for automations, pipelines, and quality systems on ruchitdalwadi.com. The strategic plan lives in [PLAN.md](PLAN.md); this file tracks *what we'll automate next* and the state of each pipeline.

---

## Status snapshot

| Capability | Status | Notes |
|---|---|---|
| Static site (Next.js + MDX) | ✅ shipped | Home, About, Contact, Now, Projects, Writing, Notes |
| SEO foundations | ✅ shipped | sitemap.xml, robots.txt, RSS, canonical URLs, Person + Article schema |
| GEO foundations | ✅ shipped | `llms.txt`, lead-with-the-answer essay format, info-dense Q&A blocks |
| OG image generator | ✅ shipped | `@vercel/og` route at `/og` — per-page titles + pillar tag |
| Dark / light theme | ✅ shipped | next-themes, light-first, calming palette |
| Content evals | ⏳ checklist exists | Add per-essay `EVAL.md` files; build a CLI scorer next |
| Analytics | ⏳ not wired | Plausible (preferred) + Vercel Analytics |
| Newsletter | ⏳ not wired | Buttondown or Resend; signup component scaffolded later |
| Social cross-posting | ⏳ manual | See "Auto-pipeline 1" below |
| Search (Cmd+K) | ⏳ not built | Phase 2 |
| Search Console / Bing Webmaster Tools | ⏳ post-deploy | Submit sitemap once DNS is live |

---

## Auto-pipeline 1 — content → socials

**Goal:** publishing a new essay automatically queues platform-native posts on X and LinkedIn.

Phases:

1. **Manual + checklist** (now) — when an essay ships, the author fills out a `SOCIAL.md` template (thread for X, post for LinkedIn) and schedules via Typefully/Hypefury.
2. **Semi-auto draft generator** (next) — a GitHub Action runs on push to `main`; for each new MDX file in `content/essays/`, it calls an LLM to draft platform-native posts and opens a PR with the drafts in `social-drafts/<slug>/`.
3. **Scheduled publishing** (later) — integrate with Typefully API to queue scheduled posts directly.

Files to add:
- `.github/workflows/draft-socials.yml`
- `scripts/draft-socials.ts` (LLM-prompted draft generator)
- `social-drafts/` (gitignored or PR-managed)
- `templates/SOCIAL.md` (manual fallback)

---

## Auto-pipeline 2 — content → newsletter

**Goal:** monthly "Letter from the lab" automatically assembled from the month's notes + project updates + the featured essay.

Phases:

1. **Manual write** (now) — Ruchit drafts in MDX, sends via Buttondown's editor.
2. **Auto-assembled draft** (later) — GitHub Action on the last Friday of the month runs `scripts/build-letter.ts`, which pulls all content updated that month and assembles a Buttondown-ready draft.
3. **One-click send** — the action posts the draft to Buttondown's API; Ruchit reviews and sends.

---

## Auto-pipeline 3 — content evals as CI gate

**Goal:** every PR adding an essay runs the six-axis eval rubric automatically; failing scores block merge.

Phases:

1. **Per-essay `EVAL.md`** (now) — every essay PR includes the filled-out eval file.
2. **LLM-graded eval CI** (next) — GitHub Action invokes Claude (or other LLM) with the rubric prompt from PLAN.md §3c. Posts the score as a PR comment. Fails the check if total < 12/18 or any axis < 2.
3. **Eval-driven publishing** — site only renders essays whose latest eval score passes the gate.

Files to add:
- `.github/workflows/eval-check.yml`
- `scripts/eval-essay.ts`
- `templates/EVAL.md`

---

## Auto-pipeline 4 — performance + SEO regression CI

**Goal:** every PR runs Lighthouse + sitemap validation; bad regressions block merge.

- Lighthouse CI on the preview URL Vercel posts on each PR.
- Targets: LCP < 2.0s, INP < 200ms, CLS < 0.1, SEO score = 100.
- Schema markup validator (`@schemaorg/schema-tools`) against each essay page.

---

## Auto-pipeline 5 — OG image regeneration on essay updates

**Goal:** when an essay's title or pillar changes, the cached OG image is invalidated automatically.

- Add a `cache-tag` to the OG route based on slug + version hash.
- Hook into Vercel's cache-invalidation API when MDX files change.
- Phase 2; not blocking.

---

## Phase 2 — content infrastructure

- [ ] Cmd+K search (across writing, projects, notes — Fuse.js or `pagefind`)
- [ ] `/letters` index + monthly archive
- [ ] `/library` page (books read + reading list)
- [ ] Per-essay updates / changelog (so essays evolve like projects do)
- [ ] Backlinks between essays (`[[wiki-style]]` references rendered as graph)
- [ ] Per-essay "interactive demo" MDX components (`<Demo>`, `<Compare>`, `<Eval>`)
- [ ] Substack mirror with canonical → ruchitdalwadi.com

---

## Phase 3 — product layer

- [ ] `/learn` section
- [ ] Auth (NextAuth or Clerk)
- [ ] Stripe checkout for paid content
- [ ] Member-only RSS feed
- [ ] Tutorial format (video + companion essay)

---

## Operational rituals (manual until automated)

These are listed in `PLAN.md` §8h. Until pipelines exist, ritualize manually:

- **Monday** — Write (essay or note)
- **Tuesday** — Engage (X + LinkedIn replies)
- **Wednesday** — Post (LinkedIn + 2–3 tweets)
- **Friday** — Push one project update
- **Last Friday of month** — Send the Letter
- **Quarterly** — Ship a deep essay + coordinated distribution push

---

## Open infrastructure decisions

1. **Newsletter platform** — Buttondown (indie, simple) vs Resend Audiences (more dev-friendly). Decision needed before Auto-pipeline 2.
2. **Analytics** — Plausible (paid, beautiful) vs PostHog (free tier, more features) vs Vercel Analytics only. Likely Plausible + Vercel.
3. **Eval LLM** — Claude (preferred, my default judge) vs GPT vs running two and averaging. Decision before Auto-pipeline 3.
4. **Social-queueing tool** — Typefully (clean, X-focused) vs Hypefury (X + LinkedIn).
5. **Search backend** — `pagefind` (static, fast, no JS at runtime) vs Algolia DocSearch (free for OSS).
