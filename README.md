# ruchitdalwadi.com

Personal site of [Ruchit Dalwadi](https://ruchitdalwadi.com) — builder writing about AI, startups, and product.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** strict
- **Tailwind CSS v4** with CSS-variable token system
- **MDX** content via `next-mdx-remote`
- **next-themes** for light/dark
- Fonts: **Newsreader** (serif display + prose), **Geist Sans** (UI), **Geist Mono** (code)
- Deployed on **Vercel**

## Local dev

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build
npm run lint
```

## Content

All content lives in `/content` as MDX:

- `content/essays/*.mdx` — long-form essays (pillar + support)
- `content/projects/*.mdx` — anonymized domain cards
- `content/notes/*.mdx` — short-form thoughts

Frontmatter schema for each lives in `src/lib/content.ts`.

## Routes

- `/` — home
- `/about`, `/contact`, `/now`
- `/writing`, `/writing/[slug]`
- `/projects`, `/projects/[slug]`
- `/notes`
- `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/llms.txt`
- `/og` — per-page OG image generator (use `?title=…&pillar=…`)

## Planning docs

- [PLAN.md](PLAN.md) — strategic plan (positioning, content, distribution, evals)
- [BUILDING_PLAN.md](BUILDING_PLAN.md) — implementation + automation roadmap
