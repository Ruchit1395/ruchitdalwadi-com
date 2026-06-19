import Link from "next/link";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { SectionLabel } from "@/components/SectionLabel";
import { getAllEssays } from "@/lib/content";
import { format } from "date-fns";

export const metadata = {
  title: "Writing",
  description:
    "Essays on AI, startups, and product — frameworks, demos, and lessons from shipping across six industries.",
};

export default function WritingIndex() {
  const essays = getAllEssays();
  const byPillar = essays.reduce<Record<string, typeof essays>>((acc, e) => {
    (acc[e.pillar] ??= []).push(e);
    return acc;
  }, {});

  return (
    <Container className="py-20 sm:py-28">
      <SectionLabel>Writing</SectionLabel>
      <h1 className="font-serif text-3xl sm:text-5xl tracking-tight mt-5 leading-tight max-w-3xl">
        Frameworks I actually use. Demos for every claim.
      </h1>
      <p className="mt-6 text-[1.05rem] text-[var(--fg-muted)] max-w-2xl">
        I write to upgrade the reader&apos;s skill, not just inform them. Each essay
        clears a six-axis quality bar before it ships. Pillar essays are the canonical
        references; support essays sharpen specific patterns.
      </p>

      <div className="mt-16 space-y-16">
        {(["AI", "Startups", "Product"] as const).map((pillar) => {
          const list = byPillar[pillar] ?? [];
          if (list.length === 0) return null;
          return (
            <section key={pillar}>
              <div className="flex items-center gap-3 mb-7">
                <Tag variant="accent">{pillar}</Tag>
                <span className="text-[0.85rem] text-[var(--fg-subtle)]">
                  {list.length} essay{list.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="border-t border-[var(--border)]">
                {list.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/writing/${e.slug}`}
                    className="group !text-[var(--fg)] grid sm:grid-cols-[1fr_auto] gap-3 items-start py-5 border-b border-[var(--border)] hover:bg-[var(--bg-elevated)] -mx-3 px-3 rounded-md transition-colors"
                  >
                    <div>
                      <h3 className="font-serif text-[1.3rem] leading-snug group-hover:text-[var(--accent)] transition-colors">
                        {e.title}
                      </h3>
                      <p className="mt-2 text-[0.96rem] text-[var(--fg-muted)] max-w-2xl">
                        {e.summary}
                      </p>
                    </div>
                    <div className="text-[0.82rem] text-[var(--fg-subtle)] whitespace-nowrap sm:text-right">
                      <div>{format(new Date(e.date), "MMM d, yyyy")}</div>
                      <div>{e.readingTime}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
