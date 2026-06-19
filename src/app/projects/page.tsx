import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Tag } from "@/components/Tag";
import { SectionLabel } from "@/components/SectionLabel";
import { getAllProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description:
    "Six industries, one through-line: shipping product real users adopt. Anonymized domain cards by category.",
};

export default function ProjectsIndex() {
  const projects = getAllProjects();
  return (
    <Container className="py-20 sm:py-28">
      <SectionLabel>Projects — domains</SectionLabel>
      <h1 className="font-serif text-3xl sm:text-5xl tracking-tight mt-5 leading-tight max-w-3xl">
        Six industries, one through-line: shipping product real users adopt.
      </h1>
      <p className="mt-6 text-[1.05rem] text-[var(--fg-muted)] max-w-2xl">
        Each card is a domain I&apos;ve worked across. Names and specifics are kept light
        on purpose — the lesson generalizes; the logo doesn&apos;t. Click any card for the
        role, the insight, and the updates timeline.
      </p>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <Card key={p.slug} href={`/projects/${p.slug}`}>
            <div className="flex items-center justify-between">
              <Tag>{p.domain}</Tag>
              <span className="text-[0.7rem] uppercase tracking-wide text-[var(--fg-subtle)]">
                {p.status}
              </span>
            </div>
            <h2 className="font-serif text-[1.2rem] leading-snug mt-4 group-hover:text-[var(--accent)] transition-colors">
              {p.title}
            </h2>
            <p className="mt-3 text-[0.93rem] text-[var(--fg-muted)] line-clamp-4">
              {p.problem}
            </p>
            <div className="mt-5 text-[0.78rem] italic text-[var(--fg-subtle)]">
              {p.insight}
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
