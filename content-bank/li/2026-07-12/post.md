A failure you fixed in March will apply for its old job in July.

Traditional software has a comforting property: fix a bug, add a test, and it stays dead. LLM systems do not play by that rule. A model update, a reworded prompt, a new retrieval source, and the old failure returns wearing slightly different words.

On an AI content-editing product, we fixed "invents a source for statistics" three separate times before admitting the pattern. The fourth time, the fix became a test: every output with a number gets checked against the provided sources, on every deploy. It has caught the same regression twice since. Total cost: one afternoon.

The teams that handle this well borrow the oldest idea in software: regression tests, rebuilt for probabilistic systems. Each real incident becomes a tiny assertion. Cheap to write, cheap to run, and the suite grows exactly in proportion to what has actually hurt you.

Nobody can predict every LLM failure. You only have to make sure you never pay for the same one twice.
