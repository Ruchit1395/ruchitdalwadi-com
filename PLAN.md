# ruchitdalwadi.com — Planning Doc

A living plan for building Ruchit's personal site. Recommendations are opinionated so they're easy to react to — push back on anything that doesn't fit.

---

## 1. Why this site exists

**Primary goal:** flip the dynamic from outbound to inbound. Today Ruchit reaches out to people; the site should make interesting people reach out to him.

**Secondary goals:**
- A living testimonial of work, skill, and taste — not a static resume.
- A home for thinking-in-public: project updates, essays, lessons.
- An eventual platform for tutorials and paid/free courses.

**What success looks like (12 months out):**
- Cold inbound: 1–2 quality DMs/emails per week from founders, investors, or collaborators citing something on the site.
- 1–2 essays compounding traffic via search/social (the "I keep getting people who say they read X" effect).
- A clear "this is what Ruchit does" answer that lands in <10 seconds on the homepage.

---

## 2. Audience & positioning

**Primary audiences (ranked):**
1. **Founders & operators** scoping a collaborator/advisor/hire on AI + product.
2. **Investors / scouts** doing diligence after a warm intro.
3. **Builders & learners** who'll later become course/tutorial customers.
4. **Future Ruchit** — the archive of what you were thinking when.

**Positioning hypothesis:** *Builder at the intersection of AI, startups, and product — ships fast, writes about what he learns, occasionally teaches it.*

The site should feel like *a builder's workshop*, not a portfolio. Workshops have works-in-progress, tools laid out, evidence of craft. Portfolios feel finished and corporate.

---

## 3. Content pillars

| Pillar | What it is | Cadence |
|---|---|---|
| **Projects** | Each project = a living page. Built, shipped, learned. Updated as it evolves. | Update when there's something to share |
| **Writing** | Essays + short notes. AI, startups, product, building. | 1–2 long / month, short notes ad hoc |
| **Now / Updates** | A single page answering "what is Ruchit working on right now?" | Refresh monthly |
| **Personal** (Phase 2) | Cooking, travel, photography. | When inspired |
| **Learn** (Phase 3) | Tutorials, courses (free + paid). | Productized later |

**Key principle:** *projects update over time.* Don't treat them as ship-and-forget. Each project page has a reverse-chronological changelog of milestones — this is what makes the site feel *alive* and shows trajectory, not just outcomes.

---

## 3a. AI pillar — content guardrails

Goal: useful + informative without leaking insider info. Build authority by teaching from public ground.

**The principle:** stay **one abstraction up**. Frameworks, not implementations. Public references, not internal ones. Side projects, not employer code.

**Safe sources to teach from:**
- Public APIs (Anthropic / OpenAI / Google) — anything anyone can replicate
- Open-source repos, public papers, public benchmarks (SWE-bench, MMLU, GAIA)
- Side projects + builds outside work
- Public blog posts and talks from labs

**Content shapes that build authority without leaking:**
- *"How I think about X"* — frameworks, decision trees, mental models
- *"N trade-offs when choosing X"* — comparison grounded in public data
- *"I built [side project] — here's what I learned"* — first-person, your repo
- *"Anti-patterns I see in X"* — generalized observations, never employer-specific
- *"What I'd ask if I were buying an X"* — buyer-side framework
- *Reading list with commentary* — your interpretation of canonical papers

**Topic-by-topic framing:**

| Sub-topic | Safe angle |
|---|---|
| **Architecture** | RAG vs fine-tuning vs eval-driven loops — patterns with public reference implementations |
| **Models** | Comparative analyses using public benchmarks + own evals on side projects |
| **Trade-offs** | Cost / latency / quality / safety frameworks — the *axes*, not your employer's chosen point |
| **Objective / training** | First-principles content using public papers (RLHF, DPO, constitutional AI) |
| **Harness** | Own agent builds; reference public frameworks (LangGraph, Mastra) |
| **Tools / function calling** | Design patterns from own implementations |
| **Skills / orchestration** | Workflow patterns illustrated on own demo projects |

**Pre-publish gut check (3 questions):**
1. Could someone *not* at my employer write this from public info? → safe.
2. Am I citing internal numbers, roadmaps, code, names? → cut.
3. Am I describing how my employer *specifically* does this? → generalize or skip.

**One lever to lean on:** build a small public demo for every abstract claim. *"Here's a 200-line repo that shows what I mean."* Demos are the highest-trust signal in AI content right now, and they're impossible to confuse with insider info.

---

## 3b. Product pillar — domain cards (breadth-as-positioning)

Goal: surface range across very different industries without naming companies, products, or identifiable specifics. Reader sees range; insiders recognize the work; positioning stays safe.

**Vignette template (consistent across cards):**
- **Domain tag** — the intersection (e.g., "AI × Fashion")
- **The problem space** — 1 sentence on what category of problem this product solved
- **My role + lens** — 1 sentence on what was owned (PM / design / build / launch)
- **The insight** — 1 sentence on what made this interesting from a product-craft POV
- **Anonymized signal** — scale or shape ("shipped across N markets" / "B2B SaaS at multi-million ARR scale") *only if non-identifying*

**The six domain cards:**

| Domain card | Framing angle |
|---|---|
| **AI × Fashion** | Personalization and discovery in a visual-first category — taste, recommendation, and shoppable UX |
| **AI × Content editing** | Reducing creator friction — applying AI to the post-capture workflow |
| **B2C last-mile logistics** | Operating-tech in an emerging market — unreliable infra, cash-first economies, dense urban delivery |
| **Pharma content SaaS** | Regulated-industry SaaS — compliance, audit trails, editorial workflow under high-stakes constraints |
| **ERP SaaS** | Vertical SaaS for an underserved industry — replacing spreadsheets with workflow software for a specific operator persona |
| **Ed-tech** | Outcomes-driven learning at scale — designing for completion, not just enrollment |

**How it lives on the site:**
- **/projects** opens with a "Domains" grid: 6 small cards with just *Domain tag + 1-sentence problem space*. Visual, scannable, signals breadth in <5 seconds.
- Each card optionally clicks through to a longer vignette (still anonymized): role, insight, lesson. **The lesson is the part that builds authority** — not "I shipped X feature," but e.g., *"in regulated SaaS, audit trails are the real product."*
- Above the grid, one line: *"Six industries, one through-line: shipping product that real users adopt."*

**Breadth-as-positioning move:** end the page with a pillar essay titled something like *"What I've learned shipping across 6 industries."* This is the **Product pillar essay** referenced in §8d — it earns the right to all the surrounding case cards.

**Safety guardrails (mirror of the AI guardrails):**
- No company names, product names, or team-member names.
- No metrics specific enough to identify ("47% Q3 retention lift" → "double-digit retention improvement").
- No exact dates that pin to a launch event.
- Round geography up ("emerging-market logistics" not city names).
- When in doubt: would a former employer's legal team flinch? → generalize.

---

## 3c. Content publish evals — the rubric every piece must clear

Every essay, project page, note, letter, headline, and OG image gets scored against **six axes** before publish. Goal: clear, testable gates that prevent mediocre work from going live, force honesty on AI-assisted drafts, and let Ruchit (or a reviewer) spot the weakest link in 60 seconds.

**The publishing gate:** Total **≥ 12 / 18**, with **no axis below 2**. Any single 0 blocks publish.

---

### Axis 1 — Authority building (for Ruchit)
*Does this piece make a thoughtful reader trust Ruchit more after reading?*

| Score | What it looks like |
|---|---|
| 3 | Reader thinks *"this person clearly does this; I want to talk to them"* |
| 2 | Reader thinks *"this is well-reasoned, knows the space"* |
| 1 | Neutral — well-written but generic |
| 0 | No detectable expertise; could be from a content farm |

Tests:
- Is there a *specific* claim grounded in original experience or data, not synthesis?
- Does the piece have an opinion the reader can disagree with?
- Would another expert in the field cite this when asked?

Red flags: reads like an LLM summary of public info, no original lens, generic advice that fits any industry, hedges everywhere with no opinion to push against.

---

### Axis 2 — Genuinely useful to audience
*Does the reader leave with something they can act on?*

| Score | What it looks like |
|---|---|
| 3 | Reader can act within 24h (framework, checklist, code, decision) |
| 2 | Reader gains a mental model they'll reuse |
| 1 | Interesting but no behavior change |
| 0 | Nothing actionable; entertainment or self-promotion |

Tests:
- Can you name the *one* thing the reader walks away with?
- Could you write the "if you remember nothing else, remember this" line?
- Would a founder / investor / builder forward this to a colleague?

Red flags: no clear takeaway, reads as inspiration ("believe in yourself") not information, useful only as humble-brag.

---

### Axis 3 — Upgrades audience skill
*Does the reader become more capable, not just more informed?*

| Score | What it looks like |
|---|---|
| 3 | Gains a transferable skill they can practice |
| 2 | Gains a vocabulary or framework that improves future thinking |
| 1 | Better-informed, no more capable |
| 0 | Nothing transferable |

Tests:
- Is there a decision tree, checklist, demo, or pattern they can apply elsewhere?
- Would a junior person in the field measurably level up after reading?
- Does it teach the *how* (process), not just the *what* (outcome)?

Red flags: "I did X and it worked" without reasoning, outcome-only with no process, demo without commentary or commentary without demo.

---

### Axis 4 — SEO + AEO boosting
*Does this piece actually have a path to ranking on Google AND being cited by AI?*

| Score | What it looks like |
|---|---|
| 3 | Targets one specific high-intent query; structured for both Google + LLM extraction |
| 2 | Targets a real query, structurally clean |
| 1 | Vaguely on-topic, no specific query in mind |
| 0 | No SEO/AEO consideration; written into a void |

Tests:
- ONE primary query identified? (Real query a real person types — see §8e2 query maps.)
- Title literally answers that query?
- Lead-with-the-answer in the first paragraph?
- H2/H3 hierarchy an LLM can extract cleanly?
- Schema markup applied (`Article` + `FAQPage` where relevant)?
- At least one citation-friendly chunk (numbered list, table, sharp definition)?
- Internal links to the pillar essay and 1–2 support essays?

Red flags: no target query, buried lede (5+ paragraphs to the answer), vague headline ("Thoughts on AI"), no internal links, no structured data.

---

### Axis 5 — Engaging (stop-the-scroll AND finish-reading)
*Does this earn the click AND the read-through?*

| Score | What it looks like |
|---|---|
| 3 | Strong hook, varied rhythm, at least one moment that lands hard |
| 2 | Holds attention through to the end |
| 1 | Reader skims; finishes only if motivated by topic |
| 0 | Reader bounces in the first paragraph |

Tests:
- Does the first sentence make the next sentence inevitable?
- Variation in sentence and paragraph length?
- At least one concrete image, story, or specific number every ~3 paragraphs?
- Headline passes the *"would I click this in a feed of 30 things?"* test?
- OG image clears the §8e2 bar (no stock, no generic gradient, mobile-legible)?

Red flags: throat-clearing opener ("In today's fast-paced world…"), wall of text with no subheads, internal-jargon headline, stock or generic OG image.

---

### Axis 6 — Concise + clear
*Is every word doing work? Could a smart reader misunderstand?*

| Score | What it looks like |
|---|---|
| 3 | Nothing to cut; each sentence load-bearing; impossible to misread |
| 2 | Tight; one or two minor cuts possible |
| 1 | Several paragraphs would benefit from trimming |
| 0 | Bloated, ambiguous, or jargon without definitions |

Tests:
- Could this be 30% shorter without losing substance?
- Sentences over 25 words? (Some are fine; flag if >20% cross that bar.)
- Any jargon used without first definition (harness, eval, agentic, RAG, etc.)?
- Read-aloud test — do any sentences stumble?

Red flags: long preamble before the substance, same idea repeated in different words, mixed metaphors, pronouns without clear antecedents.

---

### Applying the evals

**Pre-publish ritual** (live in the repo as `EVAL.md` template; copy per draft):

```
Draft: [title]
Primary query: [the one query this targets]

Axis 1 — Authority:    [0–3]  — why:
Axis 2 — Useful:       [0–3]  — why:
Axis 3 — Upgrades:     [0–3]  — why:
Axis 4 — SEO/AEO:      [0–3]  — why:
Axis 5 — Engaging:     [0–3]  — why:
Axis 6 — Concise:      [0–3]  — why:

Total: __ / 18
Lowest axis: __
Strongest revision: [one specific change that would lift the lowest axis by 1]

Ship? [Y / N]
```

Gate: **≥ 12/18, no axis below 2.** If any axis scores 1, write an explicit *"shipping anyway because…"* line — forces honesty.

**Self-eval AI prompt** (run on every draft):

> *"You are a brutally honest reviewer of personal-brand content for an AI / product / startups builder. Score the attached draft 0–3 on each of these six axes: Authority-building, Useful-to-audience, Upgrades-audience-skill, SEO+AEO, Engaging, Concise+clear. For each, give one-sentence reasoning. Flag the weakest axis and propose the single revision that would raise it by 1 point."*

**Applies to:**
- Essays (full rubric)
- Project pages and updates (full rubric, with Axis 3 read as "skill upgrade for someone wanting to ship in this domain")
- Headlines (Axes 4, 5, 6 only — Authority/Useful/Skill scored at the piece level)
- OG images (Axis 5 only, plus brand consistency check)
- Notes / short-form (Axes 1, 2, 5, 6 — drop SEO and Skill-upgrade for short-form)
- Newsletter editions (full rubric)

**The compound principle:** consistency beats peaks. **30 essays at 14/18 outperform 5 essays at 17/18.** Ship at the gate, iterate after publishing.

---

## 4. Information architecture

```
/                       ← Home: hook, manifesto line, live signal, featured work
/projects               ← Index of all projects with status (live, building, archived)
/projects/[slug]        ← Project page with updates timeline
/writing                ← Essays index
/writing/[slug]         ← Essay
/notes                  ← Short-form thoughts (Twitter-without-Twitter)
/letters                ← Monthly "Letter from the lab" — what I built / learned this month
/now                    ← What I'm focused on right now
/library                ← Books read + reading list (taste-by-curation)
/about                  ← Story, principles, what I'm looking for
/contact                ← Email + socials + "what I'd love to hear about"

Phase 2:
/kitchen                ← Cooking
/travel                 ← Trips

Phase 3:
/learn                  ← Course catalog
/learn/[slug]           ← Course landing pages
```

> **Naming tradeoff:** `/notes` (short-form) and `/letters` (monthly) can feel redundant. If shipping both feels like too much, start with `/notes` only and roll `/letters` in once there's a backlog of 2–3 to launch with. Better to have one alive surface than two stale ones.

Every page should have **one clear next action** at the bottom — "read another essay," "see all projects," "reach out."

---

## 5. Visual & UX direction

**Feel:** confident, opinionated, visual. Not minimalist-Notion-clone, not maximalist-y2k. Closer to *Linear meets a designer's portfolio*.

**Specifics worth committing to:**
- **Typography first.** A strong serif (or distinctive sans) at large sizes sets the tone before any image loads.
- **Editorial density on essays** — wide images, pull quotes, footnotes, code blocks that look loved.
- **Project pages are visual** — cover image, demo video/GIF, screenshots, architecture sketches. Show, don't just tell.
- **Subtle motion** — hover states, scroll reveals, but no auto-playing showreels. Performance matters; motion is seasoning.
- **Dark mode** — yes, with a thoughtful palette (not just inverted).
- **Personality moments** — a hand-drawn doodle, an unexpected micro-interaction, a 404 page worth screenshotting.

**Anti-patterns to avoid:** corporate stock photos, generic "I'm a passionate developer" copy, AI-generated headshots, walls of icons for tech logos, "skills bar" rating systems.

---

## 5b. Research — reference sites & what to steal from each

Six archetypes of personal sites that work. None of them are templates to copy 1:1 — they're each doing something specific worth understanding.

### Archetype A — The technical builder with prolific writing
> Closest fit for Ruchit's positioning.

- **[leerob.com](https://leerob.com)** (Lee Robinson, Cursor / ex-Vercel)
  - *What works:* minimal, fast, identity in 1 line ("developer and writer"). Featured posts as the homepage hero, not a giant headshot. Dynamic "currently listening to" pulls live Spotify data — small but signals *the site is alive*.
  - *Steal:* the live-data personal touch, the "featured writing on the homepage" pattern, the multiple subtle CTAs (read writing, see code, reach out).
- **[paco.me](https://paco.me)** (Paco Coursey, Linear / ex-Vercel)
  - *What works:* sections are exactly the right ones: **Building, Projects, Writing, Now, Connect**. Strong identity line ("Crafting interfaces"). Manifesto: *"All I want to do is build websites…"*
  - *Steal:* the sectioning template — that's *almost exactly* what Ruchit needs. A "Now" page is a high-leverage 5-min build.
- **[thesephist.com](https://thesephist.com)** (Linus Lee, AI researcher / ex-Notion / Replit)
  - *What works:* leads with research identity, has 100+ projects + "half a million words" — overwhelming evidence of output. Has a **/stream** for short posts (a low-bar publishing surface), separate domains for separate projects (oaklang.org, dotink.co, linus.coffee). Music + digital art mixed in — holistic identity, not just engineer.
  - *Steal:* the **/stream** as a low-bar publishing surface; mixing in non-work signals (music, art) to feel human; the "evidence by volume" approach for projects.

### Archetype B — The designer with editorial polish
- **[brianlovin.com](https://brianlovin.com)** (Brian Lovin, GitHub / ex-Figma)
  - *What works:* designer/podcaster/writer wrapped in one site. Notable extras like **/design-details** (annotated screenshots of great UI he's noticed), **/books**, **/podcasts**. The site feels lived-in.
  - *Steal:* small **curated lists** beyond writing (books, design details, tools you love) — they signal taste and make the site re-visitable.
- **[rauno.me](https://rauno.me)** (Rauno Freiberg, Vercel design)
  - *What works:* minimal homepage as a *design manifesto*. Click-to-copy email with a "Copied" confirmation — the kind of detail that makes other builders go "ah, this person cares." Yearly archived versions of his site preserved.
  - *Steal:* one signature **microinteraction** the visitor will tweet. Archive past site versions over time — shows evolution.

### Archetype C — The visual essayist / digital gardener
- **[maggieappleton.com](https://maggieappleton.com)** (Maggie Appleton, Anthropic / ex-Ought)
  - *What works:* sections like **Essays, Notes, Patterns, Smidgeons, Talks, Podcasts, Library, Antilibrary**. Custom illustrations on every essay — instantly recognizable. Embraces incompleteness ("notes growing slowly over time").
  - *Steal:* the **Library / Antilibrary** idea (books you've read / books on your shelf to read) — taste signal at almost zero effort. Custom hero illustration per essay is high-effort but high-payoff for memorability.
- **[andymatuschak.org](https://andymatuschak.org)** (Andy Matuschak, independent researcher)
  - *What works:* **"Letters from the lab"** — monthly updates as a content format that lowers the bar to publishing while feeling intimate. Working notes are *deliberately* shown as WIP. Patrons-only content as a soft monetization layer.
  - *Steal:* **monthly "Letter from the lab"** format — perfect fit for Ruchit's "update when there's something to share" instinct. Frame it as transparent process, not polished output.

### Archetype D — The interactive blogger / educator
- **[joshwcomeau.com](https://www.joshwcomeau.com)** (Josh Comeau, indie educator)
  - *What works:* every blog post has **custom interactive components** — sliders that show how `transform: scale()` works, animation playgrounds embedded inline. Dual-theme illustrations (light + dark mode of his cartoon avatar). Direct path from posts → paid courses.
  - *Steal:* the **interactive blog post pattern** for AI / product writing — a slider showing how a model temperature affects output is 10× more memorable than a screenshot. Build a small set of reusable MDX components (Demo, Aside, Compare) and use them everywhere.

### Archetype E — The awwwards-style visual statement
- **[bruno-simon.com](https://bruno-simon.com)** — drive a 3D car around a portfolio. Iconic. *Not what Ruchit should build* — too one-trick — but useful as a reminder that **the homepage can be a memorable interaction, not just a layout.**
- Recent Awwwards winners: Pacôme Pertant, Adcker, Cassie Evans (SVG animations as nav cues), Samsy Ninja (3D + computational design), Cappen (scroll-driven layer animations).
- *Steal sparingly:* one moment of "what just happened?" delight on the homepage. Not the whole site.

### Archetype F — The founder / investor
- **[rauchg.com](https://rauchg.com)** (Guillermo Rauch, Vercel CEO) — text-first, opinionated essays, almost no decoration. Authority through restraint.
- *Steal:* the confidence to *not* over-design. A confident essayist's site can outperform a flashy portfolio for inbound from sophisticated audiences.

---

## 5c. Patterns worth stealing (the shortlist)

After looking across all of these, these are the features with the highest payoff-to-effort ratio for Ruchit's site:

1. **A `/now` page.** Single page, refreshed monthly, "here's what I'm focused on." Paco / Maggie / many builders have this. 30 minutes to build, instant signal of an active builder.
2. **A `/stream` or `/notes` short-form surface.** Linus has it, Andy has it. Lowers the bar from "write essay" to "post a thought." Keeps the site alive between essays.
3. **Live data on the homepage.** Lee's "currently listening" (Spotify). Could be: currently reading, latest GitHub commit, latest project update. *One* dynamic element signals the site is alive.
4. **Monthly "Letter from the lab" format.** Andy Matuschak's framing. Lower stakes than an essay, more substantial than a tweet. Perfect cadence to commit to.
5. **Project pages with an updates timeline.** Already in the plan, but worth flagging — none of the reference sites do this *well*. This is Ruchit's chance to do something differentiated.
6. **One signature microinteraction.** Rauno's click-to-copy. Could be a custom cursor on project cards, an Easter-egg keyboard shortcut, a 404 page worth screenshotting.
7. **Library / Antilibrary / Books / Tools.** A page that signals taste through curation, not creation. Re-visitable, evergreen, low maintenance.
8. **Custom MDX components for essays.** Josh Comeau's interactive demos. Build 3–5 (`<Demo>`, `<Aside>`, `<Compare>`, `<Pullquote>`, `<Footnote>`) and use them everywhere.
9. **Editorial illustrations per major essay.** Maggie-style. Optional but extremely memorable; a single custom illustration per essay is a brand-building investment.
10. **Manifesto / philosophy line on the homepage.** Rauno's "Make it fast. Make it beautiful…" Paco's "All I want to do is build websites." A *short* statement of taste pre-empts the visitor's "who is this person?" question.

---

## 5e. Craft details — typography, color, motion, engagement

The research above is about *what* to build. This section is about *how it should feel* at the pixel level. Specific enough to start building.

### Typography

**The shortlist of fonts that builders are actually using in 2026:**

| Font | Use | Why |
|---|---|---|
| **Inter** | UI / body fallback | The "default white shirt" — neutral, ultra-legible, free. Safe but slightly *too* common; pairs well with a more characterful display face. |
| **Geist Sans / Geist Mono** | UI + code | Vercel's family. Sharp, geometric, distinctly 2026. Code reviewers will recognize it — and that's a plus on a builder's site. |
| **PP Editorial New** | Display / hero | The "cool indie portfolio" serif. High contrast, editorial. Used by Vercel, Linear, half of high-end portfolios. *Paid* (€60+) but distinctive. |
| **Newsreader** | Long-form body | Free Google font, designed for screens, comfortable for essays. Pairs well with Inter/Geist. |
| **Tiempos / GT Sectra** | Display / hero | Commercial alternatives to PP Editorial. Workhorse editorial serifs. |
| **JetBrains Mono / Berkeley Mono** | Code blocks | JetBrains is free; Berkeley is paid and the cult favorite for personal sites. |

**Recommended pairing for ruchitdalwadi.com:**

> **Display:** PP Editorial New (or Newsreader if avoiding paid fonts at launch)
> **UI / body:** Geist Sans
> **Code:** Geist Mono or JetBrains Mono

Reason: editorial serif for essay titles + manifesto signals seriousness and taste; Geist for UI signals "I build with modern tooling"; the pairing is uncommon enough to feel intentional but not weird.

**Sizing & hierarchy (the boring stuff that makes sites feel good):**
- Body: 17–18px on desktop, 16px on mobile. Most sites use 16; bumping to 17 reads as "considered."
- Line-height 1.55–1.7 on body. 1.1–1.25 on display.
- Fluid type with `clamp(2rem, 5vw + 1rem, 5rem)` for hero — scales naturally across viewports without breakpoint cliffs.
- Letter-spacing -0.02em on large display text (counteracts wide spacing at large sizes).
- Max essay measure: 65–75 characters. Past that, reading speed drops.

**Trend signal:** "expressive minimalism" — distinctive display fonts paired with neutral body. The era of every site running Inter-only is ending.

### Color & dark mode

**Architecture before colors.** Define tokens, not hex codes scattered through CSS.

Five semantic color roles, each as a scale from 50 to 950:
- `neutral` — text, backgrounds, borders
- `primary` — brand color (the *one* color the site is known for)
- `accent` — secondary interactive (links, highlights)
- `success` — positive feedback
- `warning` — negative / destructive

Use `oklch()` color space instead of `hex` — perceptually uniform scales, predictable lightness across hues, plays well with dark mode.

**Dark-mode defaults that matter:**
- Background: not pure black (`#000`). Use `oklch(0.18 0.005 240)` — near-black with a hint of cool blue. Pure black causes screen halation.
- Body text: not pure white. Off-whites like `#E0E0E0` or `#C9D1D9` reduce eye strain.
- Accent colors lose perceived weight on dark backgrounds — desaturate to ~70–80% and brighten slightly so they feel the same as on light.
- Borders/dividers are easy to miss in dark — use `oklch(0.25 ...)` not `oklch(0.22 ...)`.
- **Build dark mode first**, then derive light mode. Dark-first is the 2026 default for developer-facing sites.

**Brand-color recommendation for Ruchit:** pick ONE distinctive accent and use it sparingly. Possibilities tied to "AI + builder + warmth":
- A warm orange (`oklch(0.72 0.18 60)`) — feels human, optimistic
- A confident violet (`oklch(0.62 0.22 290)`) — AI-coded without being clichéd "blue tech"
- An unexpected teal (`oklch(0.7 0.13 195)`) — distinctive, calm, builder-coded

One accent. Used on link hovers, the live-status dot, the newsletter button, the cursor highlight on projects. *That's the brand color.* Not "we use 7 colors."

### Motion & microinteractions

The principle: **motion should confirm or reveal, never decorate.** Every animation answers a question — "did my click register?" "what's behind this?" "where am I in the page?"

**Specific microinteractions to build (priority order):**

1. **Click-to-copy email** with inline "Copied" confirmation (Rauno's signature). Trivial to build, beloved by visitors.
2. **Cursor follow on project cards** — a subtle ring or color that follows the cursor on hover. Used by Linear, Vercel, Paco.
3. **Magnetic CTAs** — buttons that subtly pull toward the cursor on near-hover. Use sparingly (1–2 spots).
4. **Live status dot** on the homepage next to "currently building X" — pulsing green = active.
5. **Page transitions** with Motion's `<AnimatePresence>` + shared layout — essay cards expand into the article view.
6. **Scroll-triggered reveals** — body content fades up by 8px over 400ms as it enters viewport. Subtle, not Cassie Evans–levels of choreography.
7. **Hover states on essay/project cards** — image scales 1.02 over 300ms, title underline animates in left-to-right. Borrowed from every great editorial site.
8. **Theme toggle with circle reveal** — clicking light/dark toggle expands a circle from the cursor point, revealing the other theme. Wow-moment for ~30 lines of code.
9. **404 page worth screenshotting** — interactive easter egg (a working terminal? a game? Ruchit's choice).
10. **Cmd+K search** — modal search across writing/projects/notes. Linear-coded; signals "this person uses keyboard shortcuts."

**Motion specs:**
- Default duration: **200–300ms** for UI; **400–600ms** for layout shifts.
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material-standard) or Motion's `spring({ stiffness: 200, damping: 25 })` for natural feel.
- **`prefers-reduced-motion`** respected everywhere. Disable scroll triggers, page transitions, magnetic effects when set. This is table-stakes accessibility.
- **No autoplay video on homepage.** No carousels. No parallax beyond subtle background drift.

**Tools:** Motion (formerly Framer Motion) for React-driven motion. CSS transitions for everything else. GSAP only if doing something genuinely complex (don't).

### Engagement & retention specifics

The structural patterns from §5c (now/letters/library/etc.) bring people back. These are the *page-level* patterns that keep them on each page once they arrive.

**On every essay page:**
- **Reading time + word count** in the header. Signals "this is a real piece, not filler."
- **Inline newsletter CTA** mid-essay (after the first ~600 words, when interest is highest, not at the top). Single sentence, no popup.
- **Footnotes** as hover-cards rather than jumping to the bottom (better reading flow).
- **Related essays** at the end — by tag, not by recency. 2–3 max. The single highest-leverage engagement pattern.
- **"Did this resonate?" line at the end** linking to /contact with a pre-filled subject line: `Re: [essay title]`. Removes the friction of "what do I even say?"

**On every project page:**
- **Live status badge** (Building / Shipped / Archived).
- **Updates timeline** (the differentiator). Each update dated, optionally with a screenshot.
- **Tech stack tags** — clickable, leading to projects-by-tag.
- **Outcome metrics** if applicable ("12k users in 3 months"). Numbers > adjectives.

**On the homepage:**
- **One live signal** (currently building / listening / reading). Lee Robinson's Spotify is the canonical example.
- **3 featured posts + 3 featured projects** — not "latest." Featured = chosen, signals editing not feed.
- **Inline "available for" line** — updates quarterly. ("Available for advisory and angel intros this quarter.")
- **A single, strong newsletter CTA** above the fold or right after the featured grid.

**Newsletter mechanics:**
- One clear value prop ("Monthly: what I shipped, what I learned, what I'm reading"). Not "subscribe for updates."
- **No popups.** Inline only. Popups are a cheap conversion bump that signals desperation on a builder site.
- Send to the list *immediately* on signup with the 3 best essays + an intro from Ruchit. Welcome sequence does more than launch-day virality.
- Resend's React Email + Buttondown for sending, or Resend's own audiences feature.

**Performance & SEO (the engagement tax most personal sites pay):**
- **LCP < 2.0s, INP < 200ms, CLS < 0.1.** Vercel Analytics tracks these natively.
- **Self-host fonts** with `next/font` — eliminates the FOUT/FOIT flash, removes a Google dependency.
- **Per-essay OG images** generated at build time with `@vercel/og`. Single biggest social-share lever.
- **RSS feed** from day one. The audience that matters reads via RSS.
- **Structured data** (Article schema) on essays. Google's article rich-results lift.
- **Sitemap.xml + robots.txt** auto-generated by Next.js.

**Anti-patterns observed in mediocre personal sites:**
- "Loading…" intro screens (death).
- Auto-playing video heroes (data + attention killer).
- Cookie banners for a site with no cookies (just don't track invasively).
- "Subscribe" popups on first scroll (signal: this is a content farm).
- Skills bars / proficiency ratings (signal: junior).
- Tech-logo walls (signal: padding).
- AI-generated stock illustrations (signal: didn't care).

---

## 5d. What NOT to copy

- **Bruno Simon-level 3D.** Cool, but it's a one-trick that ages and overshadows content. Ruchit's edge is *thinking*, not *3D craft*.
- **Awwwards-style scroll-jacking and forced animations.** Looks amazing in a screen recording, frustrating in real use, terrible for SEO.
- **Digital garden bidirectional-link maze** (full Andy Matuschak treatment). Beautiful for a researcher with 200 interlinked notes; premature for a new site. Add backlinks only when content density justifies it.
- **Loading screens and "enter site" intros.** A retention killer.
- **Too many sections out of the gate.** Maggie has 8 because she's filled them; an empty Patterns/Smidgeons/Library/Antilibrary on day one reads as aspirational, not impressive.

---

## 6. Tech stack — recommended

| Layer | Choice | Why |
|---|---|---|
| **Framework** | **Next.js 15 (App Router)** | Best balance of DX, ecosystem, and runway toward paid courses (auth, payments, gated content) |
| **Styling** | **Tailwind + shadcn/ui** | Fast to build, easy to keep consistent, easy to customize away from default look |
| **Content** | **MDX in-repo** (with `contentlayer` or `fumadocs/source`) | Posts are git-versioned, deployable from your editor, no CMS overhead |
| **Hosting** | **Vercel** | Zero-config for Next.js, free tier covers MVP, easy domain attach |
| **Domain** | `ruchitdalwadi.com` via Vercel | Already purchased — point nameservers or A/CNAME |
| **Analytics** | **Vercel Analytics + Plausible** | Privacy-friendly, no cookie banners needed |
| **Email capture** | **Resend + Buttondown** (or ConvertKit) | Newsletter from day one — start collecting before you "need" it |
| **Comments** (later) | none, or Cusdis/Giscus | Defer; comments are mostly noise on a personal site |

**Alternative considered: Astro.** Lighter, ships less JS, beautiful for content sites. But Next.js wins because of Phase 3 (courses → auth + payments + member areas). Not worth migrating later.

**The boring stack tax:** spend 1 day picking, then stop. The site you ship in 2 weeks beats the perfect stack you debate for 2 months.

---

## 7. Content & publishing workflow

Goal: *zero friction between "I want to share this" and it being live.*

- All content as MDX files in the repo: `content/projects/`, `content/writing/`, `content/notes/`.
- Each file has frontmatter: `title`, `date`, `status`, `tags`, `cover`, `summary`.
- **Projects support a `updates:` array** — append a new entry whenever the project moves forward. This is the "living project" mechanic.
- Push to `main` → Vercel deploys.
- A `/notes` page for short-form: 1–3 paragraph posts, ~Twitter-length thoughts. Lowers the bar to publish.

**Suggested rituals:**
- Weekly: write 1 note (5 min) — captures momentum without forcing essays.
- Monthly: update `/now` + ship one project update.
- Quarterly: publish one long-form essay.

---

## 8. Distribution — SEO, GEO, and social authority

The site itself doesn't generate inbound. *Distribution* does. The site is what closes the loop.

This section is the engine — everything before it is the chassis. Three discovery channels feed the site; the site converts visitors into inbound conversations.

### 8a. The three discovery channels in 2026

1. **SEO** — Google's blue links. Still ~53% of trackable web traffic in 2026 despite the AI panic. Compounds slowly (6–12 months) but durably.
2. **GEO (Generative Engine Optimization)** — being cited by ChatGPT, Perplexity, Claude, Gemini when users ask AI for sources. AI engines now handle ~12–18% of English informational queries (up from <2% a year ago). **Only 11% of domains get cited by both ChatGPT and Perplexity** — early authority compounds aggressively while competition is low.
3. **Social** — distribution velocity. SEO + GEO take months; social puts Ruchit in front of people *this week.* On builder-coded platforms (X for discovery, LinkedIn for professional reach) this is where the first 100 inbound conversations come from.

The site is the destination. Search and socials are the road.

### 8b. The conversion mechanics (what makes visitors reach out)

These are the page-level patterns that turn arriving traffic into actual messages.

- **Every page has a clear contact CTA** — not just `/contact` buried in nav. End essays with "if this resonated, here's how to reach me."
- **`/contact` is specific.** Not "say hi" — list what you'd love to hear about ("a wild AI product idea," "an unfair distribution edge," "what to cook this weekend"). Specific asks get specific responses.
- **An "available for" line on the homepage** — advising, consulting, collaborating, whatever's true that quarter. Update it.
- **Pre-filled mailto links** on essay CTAs — `?subject=Re: [essay title]` removes the friction of "what do I write?"
- **Newsletter from day one** — the people who'd reach out today are 10× more likely to a year from now if they're on a list.

### 8c. Technical SEO — the table-stakes

Missing any of these costs traffic. Next.js handles most automatically; the rest needs explicit setup.

**Per-page essentials:**
- Unique `<title>` + `<meta description>` per page; never reuse.
- Canonical URLs (`<link rel="canonical">`) — protects against duplicate-content penalties when essays are syndicated to Substack/Medium.
- Open Graph + Twitter Card meta tags for rich previews.
- One `<h1>` per page; clear `<h2>`/`<h3>` hierarchy (AI engines parse this to extract content).
- Image `alt` text on everything — real descriptions, not "screenshot.png."

**Site-level:**
- `sitemap.xml` auto-generated, submitted to Google Search Console + Bing Webmaster Tools.
- `robots.txt` allowing crawlers; blocking `/api/*`.
- RSS feed (`/feed.xml`) — auto-discovered via `<link rel="alternate">`.
- HTTPS, HTTP/2, brotli (Vercel handles).

**Core Web Vitals** (confirmed Google ranking signals):
- **LCP < 2.0s** — biggest levers: self-hosted fonts via `next/font`, `next/image`, Vercel edge cache.
- **INP < 200ms** — keep client-side JS minimal; use Server Components.
- **CLS < 0.1** — explicit `width`/`height` on every image.

**Schema.org structured data** (huge for both SEO *and* GEO):
- `Person` schema on `/about` + homepage — claims Ruchit's identity in Google's Knowledge Graph.
- `Article` schema on every essay (author, datePublished, headline).
- `BreadcrumbList` on nested pages.
- `FAQPage` on essays with explicit Q&A sections — surfaces in AI Overviews.
- Structured data boosts AI citation rates by **~61%**.

### 8d. Content SEO — topic clusters around the three pillars

The 2026 strategy is **pillar pages + topic clusters**, not random posts. Google and AI models both reward this structure as a signal of topical authority.

For each pillar, write **one canonical pillar essay** that's the comprehensive reference, then **6–10 support essays** linking back to it.

| Pillar | Pillar essay candidate | Support essay angles |
|---|---|---|
| **AI** | "How I think about building with LLMs in 2026" | RAG patterns, evals without ground truth, agentic flows, model selection, failure stories |
| **Startups** | "What I've learned shipping [n] startup builds" | First-10-customers, distribution edges, fundraising-or-not, pivots, hiring |
| **Product** | "My framework for shipping fast" | Spec-writing, scope cuts, working with designers, AI in the build loop |

**Keyword approach:**
- Don't chase head terms ("AI tools"). Chase intent-specific long-tails ("how to evaluate LLM outputs without ground truth").
- Mine **Google's "People also ask"** and **Perplexity's follow-up questions** for the question list to answer.
- Title formats that work on both Google and X: *"How to [outcome] without [common pain]"* or *"[Number] mistakes I made building [thing]."*

### 8e. GEO — getting cited by ChatGPT, Perplexity, and Claude

The newest and most under-exploited channel. Practical patterns:

- **Lead with the answer.** Open every essay with a direct, copy-pasteable answer (1–2 sentences) before context. LLMs preferentially cite content that gives them ready-to-quote chunks.
- **Information density per paragraph.** ChatGPT extracts at the paragraph level. Don't bury the lede in a 6-paragraph windup.
- **Explicit Q&A blocks.** Sections titled with the literal question ("How do you evaluate LLM outputs?") + a direct answer rank dramatically better in AI citations. Mark them up with `FAQPage` schema.
- **Numbered lists and tables.** LLMs reproduce these directly. A "5 patterns for X" list with each entry titled + explained is GEO catnip.
- **Data + citations.** Original numbers ("12k users in 3 months") get cited; vague claims don't. Cite your own sources too — models trust content that does.
- **Update timestamps visible.** "Last updated 2026-06-15" boosts trust signals across the board.
- **Author byline + Person schema.** Models cite identifiable humans more than anonymous content.
- **`llms.txt`** at the site root — a 2025/2026 convention (like robots.txt for LLMs) summarizing the site's content for AI crawlers. Adopted by Anthropic, Vercel, Stripe. Ship one.

**Per-platform tuning:**
- **ChatGPT / Perplexity:** information density, structured H2/H3, FAQPage schema.
- **Perplexity specifically:** prioritizes backlinks from high-authority domains. Guest posts on Indie Hackers, Lenny's, dev.to syndication (with canonical) move the needle.
- **Gemini:** still gates on Google organic rank as a prerequisite. SEO underpins it.

### 8e2. Content that engages AND ranks — the double bar

Every piece of content must clear two tests:
1. **Click test** — would a stranger scrolling a feed stop and click?
2. **Compounding test** — does this answer a real query well enough that it still ranks 6+ months from now?

Headlines that hit one and miss the other lose. The patterns below are tuned for both.

#### Headline formulas that work for clicks + SEO + AEO

| Pattern | Example | Why it works |
|---|---|---|
| *How to [outcome] without [pain]* | "How to evaluate LLM outputs without ground truth" | Answers a literal search query AND hooks the scroller |
| *[N] [things] I learned from [context]* | "5 patterns I learned shipping AI across 6 industries" | Listicle = AI-citable; first-person = trust |
| *Why [counterintuitive claim]* | "Why your RAG system probably doesn't need fine-tuning" | Curiosity hook + opinion = X/LinkedIn engagement |
| *I built [thing]. Here's what I learned.* | "I built a 200-line agent harness. Here's what broke." | Demo-backed = unbeatable trust signal |
| *[Common belief] is wrong. Here's [take].* | "Prompt engineering is dead. Eval engineering isn't." | Contrarian + specific = high share rate |
| *What I'd ask before [decision]* | "What I'd ask before hiring an AI engineer" | Buyer-side framework = magnet for founders |

**Headline rules:**
- 8–12 words max (Twitter card readability + Google SERP truncation at ~60 chars)
- Specific noun in the first 4 words (search engines weight early terms)
- Numbers where honest ("3 patterns" not "some patterns")
- No "ultimate guide" inflation — sophisticated readers tune that out
- The headline should literally be a query a real person would type into Google or paste into ChatGPT

#### Cover image / OG strategy

Auto-generated OG image per essay via `@vercel/og` with a consistent template:
- **Large title** in display serif (PP Editorial New / Newsreader)
- **Accent color underline or block** — the *one* brand color, instantly recognizable in a feed
- **Pillar tag** (small text: AI / Startups / Product)
- **Author mark** — initials, headshot crop, or logo (consistency > variation)
- **Last updated badge** when the essay was refreshed (trust signal)

Rules:
- **No stock photos.** No AI-generated art. No generic abstract gradients. No code screenshots without context.
- Mobile preview check: if the title isn't legible at 320px wide, it fails.
- Aim for a template the reader recognizes after 3 exposures — that recognition *is* brand-building.

#### The actionable bar — content quality test

Every essay passes **at least one** of these tests, or it's not ready to publish:

1. **Steal-able framework** — reader can copy a decision tree, checklist, or mental model
2. **Concrete demo** — runnable code, working repo, or live thing linked
3. **Original data** — *your* numbers from *your* build; no one else has them
4. **Sharp opinion** — contrarian take backed with evidence, not vibes
5. **Edge-case insight** — what you learned at the boundary that the docs don't tell you

> Anti-pattern: *"Top 10 tips for X"* with no opinion, no data, no demo. Better to write one thing with depth than ten things with breadth.

#### Query maps — what each pillar should rank for

Map every essay to **one primary search query** AND **one AI prompt** it should rank for. Two essays never share a primary query — they'll cannibalize each other.

**AI pillar — queries to win:**
- "how to evaluate LLM outputs without ground truth"
- "RAG vs fine-tuning when to use which"
- "choosing between Claude and GPT for [task]"
- "agentic workflow architecture patterns"
- "prompt design patterns for production"
- "how to build evals for an AI product"
- "agent harness architecture"

**Startups pillar — queries to win:**
- "first 10 customers for B2B AI startup"
- "when to pivot a startup"
- "GTM playbook for AI startups"
- "what to do before fundraising"
- "should I raise or bootstrap"
- "early-stage hiring AI startup"

**Product pillar — queries to win:**
- "spec template for AI feature"
- "scoping a product without overengineering"
- "PRD format for AI features"
- "designer-engineer-PM workflow"
- "shipping product across multiple industries"
- "product audit checklist"

**Personal pillars (Phase 2):**
- "[dish] recipe [specific variation]"
- "best [city] for [traveler type]"

**How to source real queries (not guesses):**
- Google Search Console queries (post-launch)
- Perplexity's "follow-up questions" while researching the topic
- AnswerThePublic (free tier)
- Ahrefs free question tool
- **Try the query in ChatGPT and Perplexity yourself** — read the cited sources; that's the bar you're competing against

#### Return-visit mechanics

People come back when there's a reason. Build the reason in:
- **Series tagging** — when an essay is part 1 of a series, the next part is a hook
- **Update timestamps** — essays revisited monthly (with a "Last updated" badge) get re-shared and re-indexed
- **Newsletter as the return loop** — the highest ROI return mechanism; every reader → subscriber is the conversion to optimize
- **Cmd+K search** — signals "there's enough here to search through," which itself invites exploration

---

### 8f. Social authority — playbook by platform

Ruchit's audience (founders, investors, builders) lives on **X for discovery** and **LinkedIn for professional reach**. YouTube enters in Phase 3 with tutorials/courses.

> Stat to anchor on: professionals with **active personal brands receive 47% more inbound** than dormant profiles.

#### X (Twitter) — the discovery engine
- *Format:* short, opinionated, hooks. Threads for essays. Quote-tweets for commentary on industry takes.
- *Cadence:* **1–2 posts/day** to maintain presence. Quality > volume but presence is non-negotiable.
- *Bio:* one line answering "what does this person do?" Pin a tweet that captures the best take of the quarter.
- *Reply strategy:* 15 min/day replying *thoughtfully* on tweets from 5–10 people in your space. **Replies > original tweets** for the first 1,000 followers — that's the discovery flywheel.
- *Auto-share* every new essay + project update with a custom intro thread, not just a link.

#### LinkedIn — the inbound engine
- *Format:* longer narrative posts, personal opening + clear takeaway. Carousels for visual breakdowns.
- *Cadence:* **3–5 posts/week.** Daily posting often hurts reach.
- *Profile:* headline answers "what specifically," not generically. About section reads like the homepage manifesto. Featured section pins 3 essays/projects.
- *DMs:* this is where the actual ROI lands. Each post should make a relevant founder/investor want to DM. Specific asks in posts ("I'm looking for X — DM if you know someone") work.

#### Substack / cross-posting
- Newsletter lives on Buttondown or Resend (controlled infra). Cross-post each essay to Substack with **canonical pointing to ruchitdalwadi.com**. Substack's social graph drives discovery; the canonical preserves SEO authority.

#### YouTube (Phase 3)
- Don't start until there's a productized angle (tutorials, courses).
- When started: 1 video/month minimum, tutorial-format with companion essay on the site.

### 8g. Cross-platform — the "one essay, six pieces" repurposing flow

Every essay becomes:

1. The essay on **ruchitdalwadi.com** (canonical home).
2. An **X thread** (5–8 tweets): hook + key takes + link.
3. A **LinkedIn post** (~200 words, narrative intro + insight + link).
4. A **newsletter blurb** in the next monthly letter.
5. 1–2 **quote graphics** for IG/LinkedIn carousels (Phase 2).
6. (Phase 3) a **YouTube short or full video** version.

Same idea, native to each platform. **Don't copy-paste across platforms** — algorithms penalize it and audiences notice.

### 8h. The weekly distribution ritual

Without a ritual, distribution dies after week 3. A protected calendar block beats willpower.

| Day | Block | What |
|---|---|---|
| **Monday** | 90 min | Write — ship one note OR progress the monthly essay |
| **Tuesday** | 60 min | Engage — 30 min X replies + 30 min LinkedIn comments |
| **Wednesday** | 45 min | Post — LinkedIn post + 2–3 tweets from the week's work |
| **Friday** | 30 min | Update — push one project page update; tweet it |
| **Last Friday/month** | 90 min | Ship the monthly "Letter from the lab" |
| **Quarterly** | 1 day | One deep essay + coordinated distribution push |

### 8i. Distribution tooling

- **Plausible** — analytics, privacy-first (no cookie banner needed).
- **Google Search Console + Bing Webmaster Tools** — SEO performance.
- **Ahrefs Webmaster Tools** (free tier) — backlinks + GEO citation tracking.
- **Typefully** or **Hypefury** — queue X threads and LinkedIn posts in advance.
- **Resend + React Email** — newsletter sending; **Buttondown** or **Beehiiv** for hosting + landing pages (pick one).
- **`@vercel/og`** — auto-generate per-essay OG images at build time. Single biggest social-share lever.

---

## 9. Phased roadmap

### Phase 0 — Foundation (Week 1)
- [ ] Next.js + Tailwind + shadcn scaffold
- [ ] MDX pipeline + frontmatter schema
- [ ] Design system: typography, color, spacing tokens
- [ ] Deploy to Vercel + connect `ruchitdalwadi.com`

### Phase 1 — MVP launch (Week 2–3)
- [ ] Home, About, Contact, Now
- [ ] Projects index + 3 seeded project pages with updates
- [ ] Writing index + **1 seeded pillar essay per content pillar** (AI / Startups / Product)
- [ ] Notes index + 3 seeded notes
- [ ] Newsletter signup (Resend or Buttondown)
- [ ] OG image generation (`@vercel/og`)
- [ ] Analytics (Plausible + Vercel)
- [ ] **SEO foundations:** sitemap.xml, robots.txt, RSS, canonical URLs, Person + Article schema
- [ ] **GEO foundations:** `llms.txt`, FAQPage schema on relevant essays, lead-with-the-answer essay format
- [ ] **Social setup:** X + LinkedIn profile rewrite to match site positioning, pinned post on X, Featured section on LinkedIn
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools

### Phase 2 — Personal & polish (Month 2)
- [ ] `/kitchen` and `/travel` sections
- [ ] Custom 404, hover states, motion polish
- [ ] RSS feed
- [ ] Search (Cmd+K)

### Phase 3 — Productize (Month 3+)
- [ ] `/learn` section
- [ ] Auth + Stripe for paid content
- [ ] Tutorial format / video embeds
- [ ] Community/comments (only if there's demand)

---

## 10. Open decisions — need input

These are the calls that change the build. Picking now saves rework.

1. **Tone of voice** — clinical/precise (Rauchg), warm/conversational (Lee Robinson), bold/contrarian (Paul Graham), or playful/visual (Maggie Appleton)? Pick one to anchor on.
2. **Hero treatment on home** — bold typographic statement (Rauno style), photo-of-Ruchit (Lee style), or animated/interactive piece (awwwards style)?
3. **Manifesto line** — what's the 5–10 word statement of taste that goes on the homepage? (Rauno: "Make it fast. Make it beautiful…" Paco: "All I want to do is build websites.") This unlocks a lot of the visual direction.
4. **Tech stack confirmation** — Next.js as recommended, or push back?
5. **Newsletter platform** — Buttondown (indie, simple) vs ConvertKit (more features, more bloat) vs Substack (own audience but less control)?
6. **First 3 projects to seed** — which ones make the cut for launch?
7. **Live signal on homepage** — what dynamic data shows the site is alive? (Currently listening / reading / building / latest commit / latest project update)
8. **Signature microinteraction** — one detail that makes other builders go "huh, that's cool." (Custom cursor on project cards? Easter-egg keyboard shortcut? 404 worth screenshotting?)
9. **Section naming** — "Notes" vs "Thoughts" vs "Logs"? "Writing" vs "Essays"? "Letters from the lab" or rename?
10. **Custom illustration ambition** — invest in per-essay custom illustrations (Maggie/Josh style), or use strong typography + occasional images instead?
11. **Font pairing** — recommended is PP Editorial New (display) + Geist (UI). Push back if you want all-free (Newsreader + Geist) or all-sans (Geist only).
12. **Accent color** — warm orange, confident violet, or unexpected teal? (Or something else entirely.) This becomes the one color the site is known for.
13. **Dark-first or light-first?** — recommended dark-first (the 2026 default for builder sites). Override if you want light-first as primary.
14. **First pillar essays** — which three topics (one per pillar: AI / Startups / Product) get written as the canonical anchors? These shape the topic clusters and the GEO bet.
15. **Distribution ritual commitment** — can Ruchit protect the weekly blocks in §8h? If not, scope down to a minimum viable cadence (e.g., 1 LinkedIn post + 1 X thread / week, monthly letter) before launch.
16. **Primary social platform** — X for discovery or LinkedIn for inbound conversion as the #1 channel? Resource allocation follows.
17. **Newsletter naming** — "Letters from the lab" (Andy Matuschak homage) vs something distinct ("Ruchit's Notebook" / "Building, Out Loud" / etc).
18. **First 3 priority queries** — one per pillar — that the launch essays *must* rank for. These anchor the whole content roadmap.
19. **Headline voice** — bold-contrarian ("X is wrong"), buyer-side framework ("What I'd ask before X"), or first-person-builder ("I built X"). Pick the dominant note.
20. **OG image template** — exact composition: serif title + accent underline + pillar tag + author mark? Or simpler (title-only)?

---

## 11. What this plan deliberately leaves out

- A detailed component-by-component spec — premature; will emerge during build.
- Specific copy — better written when designing the actual page.
- A long brand identity exercise — the site itself will reveal the brand.

The risk to manage isn't picking wrong tech. It's spending months in planning and never shipping. **Optimize for "live and embarrassing" over "perfect and unreleased."**
