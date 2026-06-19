import { Container } from "@/components/Container";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "Operator and teacher in AI, startups, and product. A decade of shipping product across six industries.",
};

const helps = [
  {
    label: "Scoping AI features",
    body: "Cutting AI roadmaps down to the version that actually ships — and earning the right to build the next one.",
  },
  {
    label: "Evaluating LLM systems",
    body: "Building eval suites for tasks where there is no obvious ground truth and the deadline is real.",
  },
  {
    label: "Vertical SaaS workflows",
    body: "Going deep on one industry’s actual operating model — not the version the customer first describes.",
  },
  {
    label: "Product-engineering hand-off",
    body: "Specs that survive contact with reality. The PM ↔ design ↔ engineering loop, in both directions.",
  },
];

const teaches = [
  "Eval design when ground truth is fuzzy",
  "Scoping AI features without overengineering",
  "First-10-customers playbooks for B2B AI",
  "Vertical SaaS distribution motions",
];

export default function AboutPage() {
  return (
    <Container size="narrow" className="py-24 sm:py-32">
      <RevealOnScroll>
        <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)]">
          / About
        </div>
        <h1 className="font-serif text-[2.4rem] sm:text-[3.6rem] tracking-tight mt-5 leading-[1.08]">
          A decade of operator work, now teaching the patterns.
        </h1>
      </RevealOnScroll>

      <RevealOnScroll delay={120}>
        <div className="mt-10 space-y-6 text-[1.06rem] leading-relaxed text-[var(--fg)] max-w-2xl">
          <p>
            I&apos;ve shipped product across six industries: AI-native consumer in
            fashion and content creation, last-mile B2C logistics in an
            emerging market, regulated SaaS in pharma, vertical ERP for an
            underserved industry, and outcomes-driven ed-tech.
          </p>
          <p>
            The through-line: whether real users adopt what we ship. Not just
            launches. Not just metrics. The unglamorous part — does the product
            earn its place in someone&apos;s actual day?
          </p>
          <p>
            I work in AI now. I think about agents, evals, harness architecture,
            and the design choices that make AI products useful instead of just
            impressive on a demo reel. What I publish here is a framework I
            actually use, a pattern I&apos;ve seen work, or a demo I&apos;ve
            actually built.
          </p>
        </div>
      </RevealOnScroll>

      <div className="mt-20 border-t border-[var(--border)] pt-14">
        <RevealOnScroll>
          <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)]">
            / Where I help
          </div>
          <h2 className="font-serif text-[1.7rem] sm:text-[2rem] tracking-tight mt-4">
            Specifically, four kinds of work.
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-9">
          {helps.map((h, i) => (
            <RevealOnScroll key={h.label} delay={i * 70}>
              <div className="border-l-2 border-[var(--accent)] pl-5">
                <div className="font-serif text-[1.2rem] text-[var(--fg)]">
                  {h.label}
                </div>
                <p className="mt-2 text-[0.96rem] text-[var(--fg-muted)] leading-relaxed">
                  {h.body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <div className="mt-20 border-t border-[var(--border)] pt-14">
        <RevealOnScroll>
          <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)]">
            / What I teach
          </div>
          <h2 className="font-serif text-[1.7rem] sm:text-[2rem] tracking-tight mt-4">
            The frameworks worth handing forward.
          </h2>
          <ul className="mt-8 space-y-3">
            {teaches.map((t) => (
              <li key={t} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
                <span className="font-mono text-[0.72rem] text-[var(--fg-subtle)]">→</span>
                <span className="text-[1.02rem] text-[var(--fg)]">{t}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>

      <div className="mt-20 border-t border-[var(--border)] pt-14">
        <RevealOnScroll>
          <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)]">
            / Contact
          </div>
          <p className="mt-5 text-[1rem] text-[var(--fg-muted)] max-w-xl">
            Email is fastest:{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-[0.95rem] !text-[var(--accent)]"
            >
              {SITE.email}
            </a>
            . Specific notes about what you&apos;re building get faster replies than
            generic ones.
          </p>
        </RevealOnScroll>
      </div>
    </Container>
  );
}
