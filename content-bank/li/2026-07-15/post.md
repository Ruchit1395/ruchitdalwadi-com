Forty tools, five ever used. That was the audit result on the first misbehaving agent I helped debug, and I have seen the same ratio since.

Every tool in the list is a description in the context window and a wrong option available at every decision. The failure looks mysterious: right model, right prompt, and the agent picks web search when it should have read the database. Again.

The fix is mundane. Read the last 20 run logs. Remove every tool that was never called. Rewrite the survivors' descriptions until each one answers "when do I pick this over the alternatives?" Merge the overlapping pairs, because overlap is where agents flip-flop.

On an AI fashion recommendation agent, cutting twelve tools down to five fixed more behavior in one afternoon than three weeks of prompt changes had. Nothing else changed.

Tool count is a demo metric. Tool relevance is a production metric.
