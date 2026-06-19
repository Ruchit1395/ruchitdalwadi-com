import { Container } from "@/components/Container";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata = {
  title: "Frameworks",
  description:
    "Operator frameworks — eval rubrics, scoping checklists, GTM playbooks. The patterns from a decade of shipping product across six industries.",
};

const frameworks = [
  {
    number: "01",
    title: "Six-axis content eval rubric",
    purpose: "Score any piece of writing — essay, post, doc — across six axes before publishing.",
    when: "Use before publishing anything you want to compound over time.",
    rubric: [
      { axis: "Authority building", question: "Would another expert cite this?" },
      { axis: "Genuinely useful", question: "Can the reader act in 24h?" },
      { axis: "Upgrades skill", question: "Did the reader gain something transferable?" },
      { axis: "SEO + AEO", question: "One target query identified, lead-with-the-answer?" },
      { axis: "Engaging", question: "First sentence makes the next inevitable?" },
      { axis: "Concise + clear", question: "Could this be 30% shorter without losing substance?" },
    ],
    gate: "Total ≥ 12 / 18, no axis below 2.",
  },
  {
    number: "02",
    title: "Four-question scoping frame",
    purpose: "Cut a sprawling spec down to its decisive moves before writing a line of code.",
    when: "Use the day a new product, feature, or initiative lands on your desk.",
    rubric: [
      { axis: "1.", question: "What is the user’s actual job? (Test: what happens to them if this disappears?)" },
      { axis: "2.", question: "What does the distribution channel reward? (Who pays vs. who uses?)" },
      { axis: "3.", question: "What is the smallest evidence we’re useful? (Evidence-generating, not shippable.)" },
      { axis: "4.", question: "Where is the team strongest? (Don’t fight the shape of the room.)" },
    ],
    gate: "If you can’t answer #1 in one sentence, scope is wrong.",
  },
  {
    number: "03",
    title: "LLM eval pattern stack",
    purpose: "Build a real eval suite when there is no ground truth and no labeled dataset.",
    when: "Use the week your AI demo starts crossing the chasm into product.",
    rubric: [
      { axis: "Pairwise preference", question: "Is A better than B? (Easier than scoring absolute.)" },
      { axis: "Rubric grading", question: "Score 4–6 named dimensions 0–3 with an LLM judge." },
      { axis: "Behavioral assertions", question: "Unit tests for every failure mode you’ve actually seen." },
      { axis: "Drift detection", question: "Sample 1% of prod outputs, alert on distribution shift." },
      { axis: "User feedback", question: "Thumbs + conversation completion as eventual ground truth." },
    ],
    gate: "No single signal is enough. Compose at least three.",
  },
  {
    number: "04",
    title: "First-10-customers playbook (B2B AI)",
    purpose: "Recruit ten customers who teach you a generalizable product, not ten logos.",
    when: "Use from day one of a B2B AI startup, until you can predict yes/no before a demo.",
    rubric: [
      { axis: "Move 1", question: "Pick a workflow you can run live in the meeting." },
      { axis: "Move 2", question: "Trade hand-built integrations for design-partner rights." },
      { axis: "Move 3", question: "Charge a small but real price — corporate card-and-forget." },
      { axis: "Move 4", question: "One founder, ten customers, no salespeople." },
    ],
    gate: "Ready for #11 when you can predict the close before the demo with 70% accuracy.",
  },
] as const;

export default function FrameworksPage() {
  return (
    <Container className="py-24 sm:py-32">
      <RevealOnScroll>
        <div className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-[var(--fg-subtle)]">
          / Frameworks
        </div>
        <h1 className="font-serif text-[2.4rem] sm:text-[3.6rem] tracking-tight mt-5 leading-[1.08] max-w-3xl">
          The operator frameworks I actually use.
        </h1>
        <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--fg-muted)]">
          Steal-able. Named. Versioned as I learn. Each one is a decision tree, checklist,
          or rubric I&apos;ve used to ship product across six industries. Copy the ones that
          fit your team.
        </p>
      </RevealOnScroll>

      <div className="mt-16 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-md overflow-hidden">
        {frameworks.map((f, i) => (
          <RevealOnScroll key={f.number} delay={i * 80}>
            <article className="bg-[var(--bg)] p-7 sm:p-10">
              <div className="grid sm:grid-cols-[auto_1fr] gap-x-10 gap-y-3 items-baseline">
                <div className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[var(--fg-subtle)]">
                  / {f.number}
                </div>
                <h2 className="font-serif text-[1.6rem] sm:text-[2rem] tracking-tight leading-snug">
                  {f.title}
                </h2>
              </div>

              <p className="mt-5 text-[1rem] text-[var(--fg-muted)] max-w-3xl sm:ml-[5.5rem]">
                {f.purpose}
              </p>
              <p className="mt-2 text-[0.9rem] italic text-[var(--fg-subtle)] sm:ml-[5.5rem]">
                {f.when}
              </p>

              <div className="mt-7 sm:ml-[5.5rem] border-l border-[var(--border-strong)] pl-6 space-y-3">
                {f.rubric.map((row, j) => (
                  <div
                    key={j}
                    className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 items-baseline"
                  >
                    <span className="font-mono text-[0.78rem] uppercase tracking-wide text-[var(--accent)] whitespace-nowrap">
                      {row.axis}
                    </span>
                    <span className="text-[0.96rem] text-[var(--fg)]">{row.question}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 sm:ml-[5.5rem] font-mono text-[0.78rem] text-[var(--fg-subtle)]">
                <span className="uppercase tracking-[0.14em]">gate&nbsp;→&nbsp;</span>
                <span>{f.gate}</span>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </Container>
  );
}
