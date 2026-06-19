import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import Link from "next/link";

export const metadata = {
  title: "Now",
  description:
    "What Ruchit is focused on right now — current work, current thinking, current questions.",
};

const lastUpdated = "June 2026";

export default function NowPage() {
  return (
    <Container size="narrow" className="py-20 sm:py-28">
      <SectionLabel>Now — {lastUpdated}</SectionLabel>
      <h1 className="font-serif text-3xl sm:text-5xl tracking-tight mt-5 leading-tight">
        What I&apos;m focused on right now.
      </h1>
      <p className="mt-5 text-[0.95rem] text-[var(--fg-subtle)]">
        A{" "}
        <Link href="https://nownownow.com/about" className="!text-[var(--fg-muted)] hover:!text-[var(--accent)]">
          /now page
        </Link>
        {" "}— refreshed monthly. The snapshot, not the highlight reel.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <SectionLabel>Building</SectionLabel>
          <ul className="mt-4 space-y-3 text-[1.02rem]">
            <li>
              <span className="font-serif text-[var(--fg)]">Agent harness experiments</span> —
              comparing patterns for tool-using agents across model families. Notes coming.
            </li>
            <li>
              <span className="font-serif text-[var(--fg)]">This site</span> — the writing surface and project changelog you&apos;re reading. Iterating on /letters next.
            </li>
            <li>
              <span className="font-serif text-[var(--fg)]">A small public demo</span> for every abstract AI claim I make. The first one ships with the first AI essay.
            </li>
          </ul>
        </section>

        <section>
          <SectionLabel>Reading</SectionLabel>
          <ul className="mt-4 space-y-3 text-[1.02rem]">
            <li>Anthropic&apos;s and DeepMind&apos;s recent posts on agent evals.</li>
            <li>
              Working through a re-read of <em>The Innovator&apos;s Solution</em> — the jobs framing keeps holding up.
            </li>
            <li>Founder writing — quietly skimming first-person build logs over thinkpieces.</li>
          </ul>
        </section>

        <section>
          <SectionLabel>Thinking about</SectionLabel>
          <ul className="mt-4 space-y-3 text-[1.02rem]">
            <li>How small a demo can be while still being convincing.</li>
            <li>What &ldquo;eval-driven product&rdquo; looks like as a discipline, not a buzzword.</li>
            <li>The shape of personal sites in the AI search era.</li>
          </ul>
        </section>

        <section>
          <SectionLabel>Open for</SectionLabel>
          <p className="mt-4 text-[1.02rem]">
            Advisory conversations on AI-native product, angel-investor intros, and people building the unglamorous infra around agents.
          </p>
        </section>
      </div>

      <div className="mt-14 border-t border-[var(--border)] pt-8 text-[0.85rem] text-[var(--fg-subtle)]">
        Last updated: {lastUpdated}. Next refresh: the first week of next month.
      </div>
    </Container>
  );
}
