import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { CopyEmail } from "@/components/CopyEmail";
import { SITE } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "How to reach Ruchit Dalwadi — what I'd love to hear about, and what makes for a good first message.",
};

const prompts = [
  {
    label: "A wild AI product idea",
    desc: "Especially one where the AI part is non-obvious or genuinely hard.",
  },
  {
    label: "An unfair distribution edge",
    desc: "You&apos;ve found a channel that&apos;s working and want a sparring partner.",
  },
  {
    label: "A messy product scoping problem",
    desc: "You&apos;re drowning in scope and need help finding the cut.",
  },
  {
    label: "An angel-investor intro",
    desc: "Pre-seed or seed, ideally AI / product-first founders.",
  },
  {
    label: "What I should cook this weekend",
    desc: "Genuinely take recommendations.",
  },
];

export default function ContactPage() {
  return (
    <Container size="narrow" className="py-20 sm:py-28">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="font-serif text-3xl sm:text-5xl tracking-tight mt-5 leading-tight">
        What I&apos;d love to hear about.
      </h1>
      <p className="mt-6 text-[1.05rem] leading-relaxed text-[var(--fg-muted)]">
        The best inbound is specific. Generic &ldquo;love to chat&rdquo; messages tend to
        sit at the bottom of the inbox. Specific ones get replies within a day.
      </p>

      <ul className="mt-10 space-y-5">
        {prompts.map((p) => (
          <li
            key={p.label}
            className="border-l-2 border-[var(--accent)] pl-5 py-2"
          >
            <div className="font-serif text-[1.15rem] text-[var(--fg)]">
              {p.label}
            </div>
            <div
              className="text-[0.95rem] text-[var(--fg-muted)] mt-1"
              dangerouslySetInnerHTML={{ __html: p.desc }}
            />
          </li>
        ))}
      </ul>

      <div className="mt-14 border-t border-[var(--border)] pt-10 space-y-6">
        <SectionLabel>Reach me</SectionLabel>
        <div className="space-y-3">
          <div>
            <span className="text-[0.85rem] text-[var(--fg-subtle)] uppercase tracking-wide">
              Email — fastest
            </span>
            <div className="mt-1">
              <CopyEmail />
            </div>
          </div>
          <div>
            <span className="text-[0.85rem] text-[var(--fg-subtle)] uppercase tracking-wide">
              On X / Twitter
            </span>
            <div className="mt-1">
              <Link
                href={SITE.socials.twitter}
                className="font-mono text-[0.95rem] !text-[var(--accent)] hover:!text-[var(--accent-hover)]"
              >
                {SITE.twitter}
              </Link>
            </div>
          </div>
          <div>
            <span className="text-[0.85rem] text-[var(--fg-subtle)] uppercase tracking-wide">
              On LinkedIn
            </span>
            <div className="mt-1">
              <Link
                href={SITE.socials.linkedin}
                className="font-mono text-[0.95rem] !text-[var(--accent)] hover:!text-[var(--accent-hover)]"
              >
                /in/ruchitdalwadi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
