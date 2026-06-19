import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Tag } from "@/components/Tag";
import { MdxContent } from "@/components/MdxContent";
import { getAllNotes } from "@/lib/content";
import { format } from "date-fns";

export const metadata = {
  title: "Notes",
  description:
    "Short-form thoughts on AI, startups, and product — between the essays.",
};

export default function NotesIndex() {
  const notes = getAllNotes();
  return (
    <Container size="narrow" className="py-20 sm:py-28">
      <SectionLabel>Notes</SectionLabel>
      <h1 className="font-serif text-3xl sm:text-5xl tracking-tight mt-5 leading-tight">
        Short-form. Between the essays.
      </h1>
      <p className="mt-6 text-[1.05rem] text-[var(--fg-muted)]">
        Faster cadence than essays, lower stakes. Things I&apos;m noticing,
        half-formed takes, demo snippets.
      </p>

      <div className="mt-14 space-y-12">
        {notes.length === 0 && (
          <div className="text-[var(--fg-muted)] italic">First notes ship this week.</div>
        )}
        {notes.map((n) => (
          <article
            key={n.slug}
            className="border-b border-[var(--border)] pb-12 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-[0.78rem] uppercase tracking-wide text-[var(--fg-subtle)]">
                {format(new Date(n.date), "MMM d, yyyy")}
              </span>
              {n.tags.map((t) => (
                <Tag key={t} variant="subtle">
                  {t}
                </Tag>
              ))}
            </div>
            <h2 className="font-serif text-2xl mt-3">{n.title}</h2>
            <div className="prose mt-4">
              <MdxContent source={n.content} />
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
