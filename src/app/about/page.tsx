import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { CopyEmail } from "@/components/CopyEmail";
import { SITE } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Builder shipping product across six industries. Currently focused on AI-native product, advisory work, and writing about the craft.",
};

export default function AboutPage() {
  return (
    <Container size="narrow" className="py-20 sm:py-28">
      <SectionLabel>About</SectionLabel>
      <h1 className="font-serif text-3xl sm:text-5xl tracking-tight mt-5 leading-tight">
        I build products at the intersection of AI, startups, and product.
      </h1>

      <div className="mt-10 space-y-6 text-[1.05rem] leading-relaxed text-[var(--fg)]">
        <p>
          My background is unusual — I&apos;ve shipped across six industries: AI-native
          consumer apps in fashion and content creation, last-mile B2C logistics in an
          emerging market, regulated SaaS in pharma, vertical ERP for an underserved
          industry, and outcomes-driven ed-tech.
        </p>
        <p>
          The through-line: I care about whether real users adopt what we ship. Not just
          launches. Not just metrics. The unglamorous part — does the product earn its
          place in someone&apos;s actual day?
        </p>
        <p>
          I&apos;m in the AI space full-time now. I think about agents, evals, harness
          architecture, and the design choices that make AI products useful instead of
          impressive-on-Twitter. Most of what I write here is a framework I&apos;ve
          actually used, a pattern I&apos;ve seen work, or a demo I&apos;ve actually
          built.
        </p>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 gap-6 border-t border-[var(--border)] pt-10">
        <div>
          <SectionLabel>What I&apos;m good at</SectionLabel>
          <ul className="mt-4 space-y-2 text-[0.98rem] text-[var(--fg)]">
            <li>· Scoping AI features that ship without overengineering</li>
            <li>· Evaluating LLM systems when ground truth is fuzzy</li>
            <li>· Vertical SaaS — going deep on one industry&apos;s workflow</li>
            <li>· The PM-design-engineering hand-off, both directions</li>
            <li>· Writing specs that survive contact with reality</li>
          </ul>
        </div>
        <div>
          <SectionLabel>What I&apos;m not</SectionLabel>
          <ul className="mt-4 space-y-2 text-[0.98rem] text-[var(--fg)]">
            <li>· A pure researcher — I ship</li>
            <li>· A growth/marketing specialist</li>
            <li>· Someone who pretends every problem needs AI</li>
            <li>· Available for content-farm freelance work</li>
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-[var(--border)] pt-10">
        <SectionLabel>Currently available for</SectionLabel>
        <p className="mt-4 text-[1.05rem] text-[var(--fg)]">{SITE.availableFor}.</p>
        <p className="mt-4 text-[0.95rem] text-[var(--fg-muted)]">
          Send a specific note about what you&apos;re building or what you&apos;re stuck
          on — the more concrete, the better the response.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CopyEmail />
          <Link
            href="/contact"
            className="text-[0.95rem] !text-[var(--fg-muted)] hover:!text-[var(--accent)]"
          >
            More ways to reach me →
          </Link>
        </div>
      </div>
    </Container>
  );
}
