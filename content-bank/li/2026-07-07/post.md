Week three of most LLM projects, someone asks the question that decides whether it ships: "How do we know a model change made this better?"

The room goes quiet, because there's no labeled test set and no obvious right answer. So engineering eyeballs outputs for a quarter, and quality becomes a matter of opinion.

You don't need ground truth. You need signals that move when quality moves. Comparing two outputs is easier than scoring one. A rubric written before you see results keeps you honest. A tiny suite of assertions — one per failure you've already fixed — catches regressions in minutes. A drift check on live traffic tells you something changed even when nobody can define "correct."

None of these needs a dataset. All of them need one decision: that evaluation is engineering, not a research project you get to eventually.

What's your team's current answer to "how would we know if it got worse?"
