import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { MdxContent } from "@/components/MdxContent";
import { CopyEmail } from "@/components/CopyEmail";
import { getAllEssays, getEssay } from "@/lib/content";
import { SITE } from "@/lib/site";
import { format } from "date-fns";

export async function generateStaticParams() {
  return getAllEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.summary,
    alternates: { canonical: `${SITE.url}/writing/${essay.slug}` },
    openGraph: {
      title: essay.title,
      description: essay.summary,
      type: "article",
      publishedTime: essay.date,
      modifiedTime: essay.updated ?? essay.date,
      authors: [SITE.author],
      tags: essay.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: essay.title,
      description: essay.summary,
    },
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  const related = getAllEssays()
    .filter((e) => e.slug !== essay.slug && e.pillar === essay.pillar)
    .slice(0, 2);

  const mailtoSubject = encodeURIComponent(`Re: ${essay.title}`);
  const mailto = `mailto:${SITE.email}?subject=${mailtoSubject}`;

  return (
    <>
      <Container size="narrow" className="pt-16 pb-10 sm:pt-24">
        <div className="flex items-center gap-3 mb-7">
          <Tag variant="accent">{essay.pillar}</Tag>
          <span className="text-[0.82rem] text-[var(--fg-subtle)]">
            {format(new Date(essay.date), "MMMM d, yyyy")} · {essay.readingTime} · {essay.wordCount} words
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl tracking-tight leading-[1.1]">
          {essay.title}
        </h1>

        <p className="mt-6 text-[1.1rem] leading-relaxed text-[var(--fg-muted)] italic">
          {essay.summary}
        </p>
      </Container>

      <Container size="narrow" className="pb-20">
        <article className="prose">
          <MdxContent source={essay.content} />
        </article>

        {essay.tags.length > 0 && (
          <div className="mt-14 flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <Tag key={tag} variant="subtle">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-[var(--border)] pt-10">
          <h2 className="font-serif text-xl">Did this resonate?</h2>
          <p className="mt-3 text-[1rem] text-[var(--fg-muted)] max-w-xl">
            I write things like this monthly. If a specific section pushed your
            thinking, I&apos;d love to hear about it — the subject is pre-filled, so all
            you need is a sentence.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href={mailto}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] !text-[var(--bg)] px-5 py-2.5 text-[0.95rem] font-medium hover:bg-[var(--accent)] transition-colors"
            >
              Email Ruchit →
            </Link>
            <CopyEmail label="copy email" />
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-[var(--border)] pt-10">
            <div className="text-[0.78rem] tracking-[0.18em] uppercase text-[var(--fg-subtle)] mb-5">
              More on {essay.pillar}
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/writing/${r.slug}`}
                  className="block group !text-[var(--fg)] border border-[var(--border)] rounded-xl p-5 bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] transition-colors"
                >
                  <Tag>{r.pillar}</Tag>
                  <h3 className="font-serif text-[1.1rem] mt-3 group-hover:text-[var(--accent)] transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] text-[var(--fg-muted)] line-clamp-2">
                    {r.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: essay.title,
            description: essay.summary,
            author: { "@type": "Person", name: SITE.author, url: SITE.url },
            datePublished: essay.date,
            dateModified: essay.updated ?? essay.date,
            keywords: essay.tags.join(", "),
            url: `${SITE.url}/writing/${essay.slug}`,
            mainEntityOfPage: `${SITE.url}/writing/${essay.slug}`,
          }),
        }}
      />
    </>
  );
}
