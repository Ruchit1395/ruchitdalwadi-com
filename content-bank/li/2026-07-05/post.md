I watched a logistics team spend six weeks building an "agent" that routed shipment exceptions. Then someone printed the run logs. Same seven steps, same order, every single run.

They rebuilt it as a plain pipeline with one LLM call for the messy classification step. Error rate dropped from 9% to under 2%, and debugging went from archaeology to reading a stack trace.

An agent earns its complexity in one situation: the next step depends on what the last step found, and you cannot enumerate the paths upfront. Research across messy sources. Triage on ambiguous inputs. Debugging.

My test before any build: write the task as a numbered list. Circle the steps where the branch is genuinely unknowable. Zero circles means no agent. Ship the boring version and let it run all week without surprises.

The demo will look less impressive. The pager will look much better.
