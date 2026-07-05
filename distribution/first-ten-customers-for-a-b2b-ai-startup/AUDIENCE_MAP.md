# Audience Map — pain points and the 100+ topic curriculum

TG: founders, PMs, operators, AI builders. Busy people who ship. Every post starts from one of THEIR pains, not from what we want to say. Every post leaves one real skill behind: something they can do differently the same day.

## The 16 pain points

| # | Pain (in their words) | What they actually need |
|---|---|---|
| P1 | "The demo impressed everyone. Production is a mess." | The demo-to-production discipline |
| P2 | "I can't tell if the output is good." | Evals without ground truth |
| P3 | "The agent does random things and I can't trust it." | Control: permissions, stop conditions, handoffs |
| P4 | "I keep rewriting prompts and nothing improves." | The prompt plateau: context beats phrasing |
| P5 | "Which model? Which tool? It changes every week." | Decision frames that survive model churn |
| P6 | "AI coding tools make a mess of my repo." | Scoping, leashing, and reviewing AI code |
| P7 | "Everyone on my team uses AI differently. Nothing is repeatable." | From personal tricks to team workflows |
| P8 | "It worked at 10 users. The bill at 10,000 is absurd." | Cost and latency engineering |
| P9 | "Should we even build this with AI? Everyone says yes to everything." | Product judgment under hype |
| P10 | "My CEO expects magic. I have to explain reality." | Managing AI expectations upward |
| P11 | "Our data is a swamp and half of it is confidential." | Data readiness and privacy boundaries |
| P12 | "We shipped the AI feature. Users don't touch it." | Trust, UX, and adoption of AI features |
| P13 | "It broke silently three weeks after launch." | Drift, regressions, monitoring change |
| P14 | "Everyone else seems to get AI. I feel behind." | A learning path that compounds |
| P15 | "Who do I even hire for this? What does the team look like?" | Team shape for AI work |
| P16 | "We have 30 AI tools and no leverage." | Tool consolidation and the relevance audit |

## The curriculum — 100+ things they want to learn

Format: each item is one post-sized skill. Tag = pain point. Mix registers: playbook, war story, test-you-can-run, myth flip, dry comic.

### P1 Demo → production (8)
1. The surprise log: turning weird outputs into a test suite
2. Why demos lie: the 3 orders of magnitude of inputs you haven't seen
3. The Monday test: will this survive a normal workweek
4. Shadow mode: running AI alongside humans before cutover
5. The rollback plan nobody writes
6. Deciding what "good enough to ship" means before you see outputs
7. The first 50 production runs: what to log and what to ignore
8. Feature flags for AI: shipping to 5% before 100%

### P2 Evals (8)
9. Pairwise preference: the eval you can build this afternoon
10. Rubric scoring: 4-6 dimensions, written before you see outputs
11. Behavioral assertions: unit tests for LLM systems
12. LLM-as-judge: when to trust it, when it lies to you
13. The 20-case escalation set: smallest eval that catches real regressions
14. Eval-driven development: the loop that replaces vibe-checking
15. Positional bias and other ways your judge cheats
16. What to do the day your eval suite disagrees with your users

### P3 Agent control (8)
17. Stop conditions: teaching agents when to quit
18. Permission tiers: read, write, act, spend
19. The handoff card: what the agent passes to the human
20. Approval gates that don't kill velocity
21. When NOT to build an agent (the workflow test)
22. Deleting the planner: the demotion that improves reliability
23. Agent memory: what to persist, what to forget on purpose
24. The blast radius question: what's the worst this run can do

### P4 Prompt plateau (7)
25. Two-edit rule: when to stop editing words and change context
26. One good example beats ten instructions
27. The rejected-output audit: mining failures for requirements
28. Context inventory: the six things the model can know
29. Prompts as specs: versioning, ownership, review
30. Why your system prompt is 4,000 words and still ignored
31. Showing the standard vs describing the standard

### P5 Model/tool choice (7)
32. Choosing by failure mode, not leaderboard
33. The afternoon bake-off: comparing models on YOUR task in 3 hours
34. Cost-latency-quality: you get two
35. When the new model ships: the 20-minute evaluation
36. Small model + good context vs big model + lazy context
37. Routing: cheap model first, expensive model on escalation
38. The switching-cost audit before you commit to a stack

### P6 AI coding (8)
39. The 5-line task brief that keeps agents on target
40. Leash lengths: when to review every diff vs every feature
41. The repo rules file: teaching the agent your codebase
42. Reviewing AI code: what to check first
43. Scope creep: why agents refactor what you didn't ask about
44. Tests as guardrails: making the agent prove its own work
45. The reset discipline: when to throw away the session
46. Pairing patterns: driver, navigator, reviewer roles with AI

### P7 Team workflows (7)
47. From personal tricks to shared playbooks
48. The prompt library nobody uses (and the one people do)
49. Onboarding a teammate to an AI workflow in one hour
50. Review loops: who checks AI output and when
51. The workflow owner: why every AI process needs one name
52. Measuring whether AI actually saved time
53. What to standardize vs what to leave personal

### P8 Cost & latency (6)
54. Where the money goes: tokens, retries, and the long tail
55. Caching: the least sexy 10x in AI
56. Batch vs realtime: matching cost to urgency
57. The latency budget: how slow before users leave
58. Prompt compression without quality loss
59. The $0.20 link post: knowing your platform's pricing quirks

### P9 Product judgment (7)
60. The four questions before any AI feature
61. What happens to the user if this disappears tomorrow
62. Boring version first: earning the right to build the fancy one
63. AI-washing: features that exist for the press release
64. The smallest evidence of usefulness
65. When the answer is a dropdown, not a model
66. Kill criteria: deciding in advance what failure looks like

### P10 Managing upward (6)
67. Explaining nondeterminism to someone who wants a guarantee
68. The demo you should never show your CEO
69. Setting accuracy expectations: the 90/9/1 conversation
70. Translating "the model hallucinated" for a board deck
71. Why "just add AI" requests need a job statement
72. Budgeting AI projects when you can't estimate like software

### P11 Data readiness (6)
73. The data audit before the AI project
74. Confidential data: what never goes in a prompt
75. Synthetic examples: faking data safely for evals
76. The metadata that makes retrieval work
77. Cleaning less: which data quality issues actually matter
78. Access boundaries: agent permissions on company data

### P12 Trust & adoption (7)
79. Why users ignore your AI feature (it's not the accuracy)
80. Confidence displays: good/uncertain beats 87%
81. One-click accept, one-click undo: the adoption unlock
82. The first-run experience: earning trust in 30 seconds
83. Explaining vs performing: what users need to see
84. When to show the AI's reasoning and when to hide it
85. Recovering from a public AI mistake in your product

### P13 Drift & monitoring (6)
86. Monitoring change, not correctness
87. The 1% sample: production monitoring on a budget
88. Model update days: your riskiest deploys you didn't schedule
89. The drift board: one dashboard that catches silent failures
90. Regression tests from production incidents
91. Vendor changed the model under you: detection and response

### P14 Learning path (7)
92. The build-one-thing rule: projects beat courses
93. Reading model announcements without losing your week
94. What to ignore: 80% of AI news doesn't affect you
95. The T-shape: deep in your domain, fluent in AI
96. Learning from rejected outputs (yours and others')
97. The 30-day AI skill plan for a busy operator
98. Following 10 right people beats following 100

### P15 Team shape (5)
99. Do you need an AI engineer or an engineer who uses AI
100. The PM's new job: writing evals is product work
101. Who owns the prompt: eng, product, or domain expert
102. The review buddy system for AI-heavy teams
103. Contractors and AI: what to outsource now

### P16 Tool sprawl (5)
104. The 20-minute tool audit: relevance beats count
105. 12 tools to 5: a consolidation war story
106. The tool adoption test: would anyone notice if it vanished
107. Free-tier hopping vs committing: the real costs
108. One workflow, end to end, before any new tool

## Usage rules

- Every content-bank day maps to 1-2 curriculum items. Trend posts pick the item closest to the live conversation.
- Rotate pain points: never two consecutive days on the same P-number.
- Each item can be made 3 ways (playbook, war story, test-to-run) so the curriculum sustains 300+ posts before repeating a shape+topic pair.
- When a new pain surfaces in inbound replies or comments, add it here first, then write content.
