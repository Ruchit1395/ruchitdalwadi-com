# Story Bank — raw material for mode-c posts

The factory (scripts/story-factory.mjs) reads this file every Sunday. Entries
under RAW MATERIAL become mode-c candidates: real stories, machine-shaped.
Three lines per entry is enough. Specifics beat polish: names of props, actual
numbers, what was said, what it cost.

## Ten questions that mine stories (answer any, anytime)

1. A hire, vendor, or tool that failed for a reason nobody named at the time. What was the reason?
2. A decision that looked wrong for weeks and turned out right. What did people say during the weeks?
3. The most expensive lesson of each company you ran. What did it cost, in a number?
4. A thing a customer said verbatim that changed what got built.
5. A metric everyone watched that turned out to be the wrong metric. What replaced it?
6. The dumbest process that survived the longest. Why did it survive?
7. A time cutting scope saved a launch. What got cut?
8. Something you believed strongly at 25 that running companies reversed.
9. A negotiation where the winning move was silence, patience, or walking.
10. The smallest change that produced the most disproportionate result.

## Format

- date: 2026-08-16
  status: unused
  story: >
    (three lines: situation, turn, cost or payoff, with real specifics)

## RAW MATERIAL

(Source: internal team call transcript, 2026-08. First ~25% captured before the
file was removed; ask Ruchit to re-share for the rest. All entries anonymized:
no company, product, or person names in posts. "The founder" = the founder
Ruchit works with; Ruchit speaks as himself for his own moments.)

- date: 2026-08-16
  status: used-manually-2026-08-17
  story: >
    The founder last wrote code 22 years ago (Java/C#, 90s). Few months ago
    started with AI coding tools: moved company site off WordPress, automated
    email marketing and blogging. April: opened the product codebase. Since:
    shipped a FULL accounting module (bank connections, reconciliation, payout
    matching from payment platforms) that sat on the roadmap for years.

- date: 2026-08-16
  status: used-manually-2026-08-17
  story: >
    Reporting arc: company tried customer-facing configurable reporting via
    Power BI. Hard for the company AND customers; "acceptance was poor."
    Founder rebuilt it with AI as a native, fully configurable module; replaces
    Power BI, ships to customers within weeks.

- date: 2026-08-16
  status: used-manually-2026-08-19
  story: >
    EDI: only 3 real trading partners needed. While AI was deep in the EDI
    build, founder told it to also wire up the big retailers customers
    typically deal with: 55-57 partners shipped. "It's cheap to add upfront
    rather than wait for somebody to request it." Inverse-YAGNI economics.

- date: 2026-08-16
  status: used-manually-2026-08-21
  story: >
    Ruchit's own moment: team call about moving sprints from Jira into sprint
    boards built inside their own product (dogfooding). A developer asks if
    tickets can show priority. Ruchit: "I'm raising a PR to add the priority
    right now, I just wanted this call to finish first." Feature request
    answered before the meeting ended.

- date: 2026-08-16
  status: unused
  story: >
    Ruchit told the team: "priority order will matter a lot lesser now."
    When shipping throughput explodes, ranking the queue stops being the
    valuable skill; deciding what belongs in it is. Prioritization as a
    scarcity artifact.

- date: 2026-08-16
  status: unused
  story: >
    Death of the MVP, per the founder: "In the past we always had to do an
    MVP, pick and choose, prioritize what is most important today. We couldn't
    think about what's needed in the future. Those limitations are going away.
    Build it inside out, build it fully, no piecemeal."

- date: 2026-08-16
  status: unused
  story: >
    The API grew one customer request at a time for years, never designed:
    "still missing fields, people keep asking can I get this here." Full
    redesign now underway because AI made the comprehensive rewrite affordable.
    Accretion debt vs designed surface.

- date: 2026-08-16
  status: unused
  story: >
    AI work-order specs in the sprint tool: CSM/product write the problem
    statement; an AI that knows the system generates the implementation plan,
    acceptance criteria, out-of-scope list, verification steps; a PM reviews
    and approves; devs build from it. Spec authorship moved to the machine,
    judgment stayed human.

