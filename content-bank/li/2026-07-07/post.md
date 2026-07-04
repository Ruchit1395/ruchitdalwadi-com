"How do we know a model change made this better?"

Week three of most LLM projects, someone asks it, and the room goes quiet. No labeled test set, no obvious right answer. So engineering eyeballs outputs for a quarter and quality becomes a matter of opinion.

You do not need ground truth. You need signals that move when quality moves.

Comparing two outputs is easier than scoring one: 50 pairwise judgments give real signal. A rubric written before you see results keeps you honest. A tiny suite of assertions, one per failure you have already fixed, catches regressions in minutes. A drift check on 1% of live traffic tells you something changed even when nobody can define correct.

None of these needs a dataset. All of them need one decision: evaluation is engineering, not a research project you get to eventually.

What is your team's current answer to "how would we know if it got worse?"
