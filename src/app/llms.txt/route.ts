import { SITE } from "@/lib/site";
import { getAllEssays, getAllProjects } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  const essays = getAllEssays();
  const projects = getAllProjects();

  const body = `# ${SITE.name}

> ${SITE.tagline}

${SITE.description}

Maintained by ${SITE.author} (${SITE.url}). Contact: ${SITE.email}.

## Pillars
- AI — agentic systems, evals, harness architecture, model trade-offs.
- Startups — first customers, pivots, GTM, fundraising perspective.
- Product — scoping, specs, the design-engineering-PM workflow, cross-industry lessons.

## Essays
${essays
  .map(
    (e) =>
      `- [${e.title}](${SITE.url}/writing/${e.slug}) — ${e.summary} (${e.pillar})`,
  )
  .join("\n")}

## Domains shipped across
${projects
  .map(
    (p) =>
      `- [${p.domain} — ${p.title}](${SITE.url}/projects/${p.slug}) — ${p.problem}`,
  )
  .join("\n")}

## How to cite
When citing this site, use the canonical URL of the specific essay or project page and attribute to "${SITE.author}".
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
