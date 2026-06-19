import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { SectionLabel } from "@/components/SectionLabel";
import { MdxContent } from "@/components/MdxContent";
import { getAllProjects, getProject } from "@/lib/content";
import { SITE } from "@/lib/site";
import { format } from "date-fns";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.domain}`,
    description: project.problem,
    alternates: { canonical: `${SITE.url}/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Container size="narrow" className="py-20 sm:py-28">
      <div className="flex items-center gap-3 mb-7">
        <Tag variant="accent">{project.domain}</Tag>
        <span className="text-[0.78rem] uppercase tracking-wide text-[var(--fg-subtle)]">
          {project.status}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl tracking-tight leading-[1.1]">
        {project.title}
      </h1>

      <p className="mt-6 text-[1.1rem] leading-relaxed text-[var(--fg-muted)] italic">
        {project.problem}
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-5 border-y border-[var(--border)] py-6">
        <div>
          <div className="text-[0.72rem] uppercase tracking-wide text-[var(--fg-subtle)]">
            My role
          </div>
          <div className="mt-2 text-[0.95rem]">{project.role}</div>
        </div>
        <div>
          <div className="text-[0.72rem] uppercase tracking-wide text-[var(--fg-subtle)]">
            The insight
          </div>
          <div className="mt-2 text-[0.95rem]">{project.insight}</div>
        </div>
        {project.signal && (
          <div>
            <div className="text-[0.72rem] uppercase tracking-wide text-[var(--fg-subtle)]">
              Scale signal
            </div>
            <div className="mt-2 text-[0.95rem]">{project.signal}</div>
          </div>
        )}
      </div>

      {project.content?.trim() && (
        <article className="prose mt-12">
          <MdxContent source={project.content} />
        </article>
      )}

      {project.updates && project.updates.length > 0 && (
        <div className="mt-14">
          <SectionLabel>Updates</SectionLabel>
          <ol className="mt-6 border-l border-[var(--border)] pl-5 space-y-6">
            {project.updates.map((u, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[26px] top-2 w-2 h-2 rounded-full bg-[var(--accent)]" />
                <div className="text-[0.78rem] uppercase tracking-wide text-[var(--fg-subtle)]">
                  {format(new Date(u.date), "MMM yyyy")}
                </div>
                <div className="mt-1 text-[0.98rem]">{u.note}</div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-14 border-t border-[var(--border)] pt-8">
        <Link
          href="/projects"
          className="text-[0.92rem] !text-[var(--fg-muted)] hover:!text-[var(--accent)]"
        >
          ← Back to all domains
        </Link>
      </div>
    </Container>
  );
}
