Adding tools to an agent feels like adding capability. Past a point, it's adding noise.

Every tool in the list is a description in the context window and a wrong option available at every decision. Give an agent forty of them and at each step it's not just doing the task — it's navigating a menu where most items are traps. The failure looks mysterious: right model, right prompt, and the agent picks web search when it should have read the database. Again.

The audit that fixes it is mundane. Read the last 20 run logs. Remove every tool that was never called. Rewrite the survivors' descriptions until each one answers "when do I pick this over the alternatives?" Merge the overlapping pairs — overlap is where agents flip-flop.

Tool count is a demo metric. Tool relevance is a production metric.

How many of your agent's tools were actually used in the last twenty runs?
