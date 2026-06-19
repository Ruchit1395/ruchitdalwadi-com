import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Tag } from "@/components/Tag";
import { SectionLabel } from "@/components/SectionLabel";
import { CopyEmail } from "@/components/CopyEmail";
import { SITE } from "@/lib/site";
import { getAllEssays, getAllProjects } from "@/lib/content";
import { format } from "date-fns";

export default function HomePage() {
  const essays = getAllEssays().slice(0, 3);
  const projects = getAllProjects().slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-24">
        <Container>
          <div className="flex items-center gap-2 text-[0.78rem] text-[var(--fg-muted)] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span>Currently building — open to {SITE.availableFor.toLowerCase()}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-3xl">
            Building at the intersection of{" "}
            <span className="italic text-[var(--accent)]">AI</span>,{" "}
            <span className="italic text-[var(--accent)]">startups</span>, and{" "}
            <span className="italic text-[var(--accent)]">product</span>.
          </h1>

          <p className="mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-[var(--fg-muted)]">
            I&apos;m Ruchit — a builder who&apos;s shipped product across six industries, from AI-native consumer apps to regulated SaaS and emerging-market logistics. I write about what I&apos;ve learned, share frameworks I actually use, and ship demos for the patterns I claim work.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] !text-[var(--bg)] px-5 py-2.5 text-[0.95rem] font-medium hover:bg-[var(--accent)] transition-colors"
            >
              Read the writing →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] !text-[var(--fg)] px-5 py-2.5 text-[0.95rem] hover:border-[var(--accent)] hover:!text-[var(--accent)] transition-colors"
            >
              See the work
            </Link>
          </div>
        </Container>
      </section>

      {/* FEATURED WRITING */}
      <section className="py-16">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div className="flex flex-col gap-3">
              <SectionLabel>Featured writing</SectionLabel>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">
                Frameworks, not hot-takes.
              </h2>
            </div>
            <Link
              href="/writing"
              className="hidden sm:inline-flex text-[0.9rem] !text-[var(--fg-muted)] hover:!text-[var(--accent)]"
            >
              All essays →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {essays.map((e) => (
              <Card key={e.slug} href={`/writing/${e.slug}`}>
                <Tag variant="accent">{e.pillar}</Tag>
                <h3 className="font-serif text-[1.25rem] leading-snug mt-4 group-hover:text-[var(--accent)] transition-colors">
                  {e.title}
                </h3>
                <p className="mt-3 text-[0.92rem] text-[var(--fg-muted)] line-clamp-3">
                  {e.summary}
                </p>
                <div className="mt-5 text-[0.78rem] text-[var(--fg-subtle)] flex items-center gap-2">
                  <span>{format(new Date(e.date), "MMM yyyy")}</span>
                  <span>·</span>
                  <span>{e.readingTime}</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* DOMAINS / PROJECTS */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col gap-3 mb-10">
            <SectionLabel>Domains shipped across</SectionLabel>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight max-w-2xl">
              Six industries, one through-line: shipping product real users adopt.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Card key={p.slug} href={`/projects/${p.slug}`}>
                <div className="flex items-center justify-between">
                  <Tag>{p.domain}</Tag>
                  <span className="text-[0.7rem] text-[var(--fg-subtle)] uppercase tracking-wide">
                    {p.status}
                  </span>
                </div>
                <h3 className="font-serif text-[1.15rem] leading-snug mt-4 group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9rem] text-[var(--fg-muted)] line-clamp-3">
                  {p.problem}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTACT CTA */}
      <section className="py-16">
        <Container size="narrow">
          <div className="border-t border-[var(--border)] pt-12">
            <SectionLabel>Reach out</SectionLabel>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight mt-4 max-w-xl">
              If you&apos;re building something at this intersection, I want to hear about it.
            </h2>
            <p className="mt-4 text-[1rem] text-[var(--fg-muted)] max-w-xl">
              Open to advisory work, angel-investor intros, and conversations about AI-native product. The best inbound says specifically what you&apos;re working on and what stage you&apos;re stuck at.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CopyEmail />
              <Link href="/contact" className="text-[0.95rem] !text-[var(--fg-muted)] hover:!text-[var(--accent)]">
                Or use the contact page →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
