# Voice and value guide

Created: 2026-06-30T14:35:00+05:30.

Purpose: prevent campaign posts, X replies, and LinkedIn comments from sounding automated, while raising the practical value per public touch.

The campaign should now feel less like a quote-card machine and more like a sharp operator teaching in public.

## The current fingerprint to avoid

The recent native posts are too easy to pattern-match:

```text
Most [people/teams/demos] ...

[pause]

They need / A useful X:
- bullet
- bullet
- bullet

Final lesson line.
```

That shape is useful once. Repeating it makes the account feel automated.

Avoid overusing:

- "Most people..."
- "Most teams..."
- "The model is not the bottleneck..."
- "Prompts are not systems..."
- "X is not Y. It is Z."
- "The hard part is..."
- colon followed by the same 5-bullet checklist
- generic endings like "That is the real shift" or "This is the useful pattern"
- repeated words without new specificity: review loop, context, constraints, handoff, evals, harness

These ideas can stay. The packaging has to change.

## Value standard

Every post, reply, or comment must give the reader at least one thing they can use immediately:

- a concrete workflow example,
- a before/after,
- an exact template,
- a decision rule,
- a failure case,
- a tradeoff,
- a measurement/eval,
- a checklist with an owner,
- a "what I would do Monday" action,
- a teardown of why something worked or failed.

If the reader can only nod, it is not enough. They should be able to copy a sentence, ask a better question, change a workflow, or test a claim.

## Pre-post scoring gate

Score every drafted native post or comment before posting.

| Axis | 0 | 1 | 2 |
|---|---|---|---|
| Specific to the target | Generic AI advice | Topic-adjacent | Names the actual workflow/tool/problem in the post |
| Concrete artifact | No artifact | Implied advice | Gives template, rule, example, test, or next action |
| Human voice | Robotic | Clear but flat | Has a point of view, texture, or earned skepticism |
| Format freshness | Repeats recent pattern | Some variation | Clearly different shape from last two posts/comments |
| Reply potential | Closed statement | Mild prompt | Invites useful disagreement or implementation detail |

Minimum score:

- X/LinkedIn native post: 8/10.
- LinkedIn comment: 7/10.
- X reply: 7/10.

Do not post below the minimum. Rewrite once. If still below minimum, skip the target.

## Format rotation

Rotate shapes so the account does not feel programmatic.

Use these formats across a day:

1. Micro-scene: a small work moment, then the lesson.
2. Teardown: one concrete example, what breaks, what to change.
3. Operator memo: if I had to implement this, here is the exact sequence.
4. Question-first: ask the sharper question the team should answer.
5. Before/after: bad version, useful version.
6. Checklist with a named owner and failure mode.
7. Earned skepticism: what sounds good, what I would verify first.
8. Tiny template: a fill-in-the-blank prompt, workflow spec, eval, or review rule.
9. Analogy or joke, but only if it teaches a real distinction.
10. Field note: concise observation from watching teams use AI, without pretending to have a fake anecdote.

No two native posts in a 48-hour window should use the same visible structure.

In any 5-comment LinkedIn batch, use at least 4 different shapes.

In any 5-6 reply X batch, do not use the same opening structure more than twice.

## Better examples

### Rewrite: tiny eval

Instead of:

```text
Most AI demos fail at the same moment:

when nobody defines what "good" means.

A useful eval can be tiny:
- 3 good examples
- 3 bad examples
- allowed tools
- expected output
- failure cases
- review owner

Agents get better when the work becomes checkable.
```

Use:

```text
A demo can look great and still be useless on Monday.

My quick test before letting an agent touch real work:

1. Show it 3 outputs I would ship.
2. Show it 3 outputs I would reject.
3. Name the one mistake that would make the work unsafe.
4. Decide who reviews the first 20 runs.

That is not a big eval program. It is a seatbelt.
```

### Rewrite: prompt templates

Instead of:

```text
Most teams don't need more prompt templates.

They need a tiny workflow spec:
- when to use AI
- what context it gets
- what it may change
- how output is checked
- who owns exceptions

That turns AI productivity from vibes into an operating system.
```

Use:

```text
Open the last AI output your team rejected.

Do not ask, "what prompt would have fixed this?"

Ask:

- what context was missing?
- what decision did we outsource too early?
- what would a reviewer check in 30 seconds?
- what should the AI never change without asking?

That rejected output is usually a better training asset than a prompt library.
```

## Comment value patterns

### If the post is about agents

Do not say "agents need evals."

Add the operational layer:

```text
The part I would define first is the stop condition. If an agent can act but cannot say "I am unsure because X is missing," the team ends up reviewing surprises instead of decisions. A small spec helps: allowed tools, files/data it may touch, evidence it must return, and the exact moment a human takes over.
```

### If the post is about AI productivity

Do not say "workflows matter more than tools."

Give the next action:

```text
I would start with one annoying recurring task, not a tool list. Write the current steps, mark which steps require judgment, then let AI handle only the low-judgment parts first. The metric is not "time saved once." It is whether the same person would trust the workflow next week without re-explaining everything.
```

### If the post is about model choice

Do not say "depends on use case."

Make the decision concrete:

```text
The model choice gets easier when the eval is written in business language. For a support workflow, I would test: does it ask the right clarifying question, cite the right policy, avoid refunding when the case is ambiguous, and hand off cleanly? Then compare models against that, not vibes.
```

### If the post is about AI coding

Do not say "review loops are important."

Add the implementation detail:

```text
For coding agents, I like a boring contract: summarize intent, list touched files before editing, run the smallest relevant test, explain the diff in human language, and flag anything not verified. The autonomy is useful only when the review surface gets smaller, not when the patch gets bigger.
```

## Tone rules

- Be specific without sounding like a manual.
- Use "I would..." when it is a real judgment, not fake autobiography.
- Do not manufacture personal stories.
- Prefer one sharp implementation detail over five abstract nouns.
- Use short comments sometimes, but make them dense.
- Use longer Premium replies only when the target deserves a real mini-teardown.
- No link in first-touch comments unless explicitly part of the target ask.

## Batch QA

Before a batch goes live, check:

- Did at least 2 X replies include a specific implementation detail?
- Did at least 1 LinkedIn comment in the batch give a 4-6 sentence high-value explanation?
- Did any two comments start with the same rhythm?
- Is there at least one target-specific noun in each comment?
- Could the comment be pasted under any AI post? If yes, rewrite or skip.
