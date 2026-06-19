import Link from "next/link";
import { Container } from "@/components/Container";
import { DomainDiagram } from "@/components/DomainDiagram";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SITE } from "@/lib/site";
import { getAllEssays, getAllProjects } from "@/lib/content";
import { format } from "date-fns";

export default function HomePage() {
  const essays = getAllEssays().slice(0, 3);
  const projects = getAllProjects().slice(0, 6);

  return (
    <>
      {/* 1 — Identity */}
      <section className="pt-28 sm:pt-40 pb-20 sm:pb-32">
        <Container>
          <RevealOnScroll>
            <div className="font-mono text-[0.78rem] tracking-[0.2em] uppercase text-[var(--fg-subtle)]">
              {SITE.author}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h1 className="font-serif text-[2.6rem] sm:text-[4.4rem] leading-[1.04] tracking-tight mt-7 max-w-4xl">
              I help operators ship{" "}
              <span className="italic text-[var(--accent)]">AI-native</span> product.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={220}>
            <p className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-[var(--fg-muted)]">
              Frameworks, evals, and shipping playbooks from a decade of operator work across six industries — AI-native consumer, regulated SaaS, emerging-market logistics, vertical workflow software, and outcomes-driven learning.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 2 — Proof of work */}
      <section className="py-20 sm:py-28 border-t border-[var(--border)]">
        <Container>
          <RevealOnScroll>
            <div className="grid sm:grid-cols-[auto_1fr] gap-x-12 gap-y-2 items-baseline mb-14">
              <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)]">
                / Track record
              </div>
              <h2 className="font-serif text-[1.8rem] sm:text-[2.4rem] tracking-tight leading-tight">
                Six industries. One through-line.
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <div className="grid grid-cols-3 gap-6 sm:gap-12 border-y border-[var(--border)] py-7 mb-14">
              {SITE.trackRecord.map((r) => (
                <div key={r.label} className="text-left">
                  <div className="font-serif text-[1.8rem] sm:text-[2.4rem] leading-none text-[var(--fg)]">
                    {r.value}
                  </div>
                  <div className="mt-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-[var(--fg-subtle)]">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-md overflow-hidden">
            {projects.map((p, i) => (
              <RevealOnScroll key={p.slug} delay={i * 60}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="block group bg-[var(--bg)] !text-[var(--fg)] p-6 sm:p-7 h-full transition-colors hover:bg-[var(--bg-elevated)]"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-[var(--fg-subtle)]">
                      /{String(i + 1).padStart(2, "0")} · {p.domain}
                    </div>
                  </div>
                  <DomainDiagram kind={p.diagram} className="my-3 opacity-90 group-hover:opacity-100 transition-opacity" />
                  <h3 className="font-serif text-[1.05rem] leading-snug mt-5 text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] text-[var(--fg-muted)] line-clamp-2">
                    {p.insight}
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 — Proof of thinking */}
      <section className="py-20 sm:py-28 border-t border-[var(--border)]">
        <Container>
          <RevealOnScroll>
            <div className="grid sm:grid-cols-[auto_1fr] gap-x-12 gap-y-2 items-baseline mb-14">
              <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)]">
                / Writing
              </div>
              <h2 className="font-serif text-[1.8rem] sm:text-[2.4rem] tracking-tight leading-tight">
                Frameworks, not hot takes.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {essays.map((e, i) => (
              <RevealOnScroll key={e.slug} delay={i * 80}>
                <Link
                  href={`/writing/${e.slug}`}
                  className="block group !text-[var(--fg)] py-8 sm:py-10 hover:bg-[var(--bg-elevated)] transition-colors -mx-4 px-4"
                >
                  <div className="grid sm:grid-cols-[1fr_auto] gap-x-12 gap-y-3 items-baseline">
                    <h3 className="font-serif text-[1.4rem] sm:text-[1.8rem] leading-snug tracking-tight group-hover:text-[var(--accent)] transition-colors">
                      {e.title}
                    </h3>
                    <div className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--fg-subtle)] whitespace-nowrap">
                      {e.pillar} · {e.readingTime}
                    </div>
                  </div>
                  {e.pullQuote && (
                    <p className="font-serif italic text-[1.05rem] sm:text-[1.15rem] leading-relaxed text-[var(--fg-muted)] mt-5 max-w-3xl">
                      “{e.pullQuote}”
                    </p>
                  )}
                  <div className="mt-5 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-[var(--fg-subtle)]">
                    {format(new Date(e.date), "MMM yyyy")}
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* 4 — Through-line */}
      <section className="py-24 sm:py-36 border-t border-[var(--border)]">
        <Container size="narrow">
          <RevealOnScroll>
            <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)] mb-8 text-center">
              / The through-line
            </div>
            <blockquote className="font-serif text-[1.7rem] sm:text-[2.4rem] leading-[1.2] tracking-tight text-center text-[var(--fg)]">
              <span className="text-[var(--accent)]">“</span>
              {SITE.pullQuote}
              <span className="text-[var(--accent)]">”</span>
            </blockquote>
            <div className="mt-7 font-mono text-[0.72rem] tracking-[0.12em] uppercase text-[var(--fg-subtle)] text-center">
              {SITE.pullQuoteSource}
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
