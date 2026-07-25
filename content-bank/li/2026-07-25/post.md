The release of Claude Opus 5 brings a critical lesson for anyone building with agents: sometimes, the best way to improve performance is to simplify your system prompts.

A team recently shared their experience removing ~80% of their Claude Code system prompt for their newest models, and the insights are gold for operators and product managers.

Here's what they found:

1.  **Shift complexity to skills**: Instead of packing every instruction into a monolithic system prompt, define discrete 'skills' for your agent. These are reusable functions or capabilities that the agent can call upon. This makes your agent's behavior more modular, easier to debug, and more predictable.

2.  **Leverage Claude.MD for output**: For structured outputs like JSON or specific report formats, using Claude.MD files as templates proved far more effective than trying to describe the format in the prompt. It's a declarative way to ensure consistency.

3.  **Enhanced security**: A leaner system prompt naturally reduces the attack surface for prompt injection. Combine this with Opus 5's reported improvements in prompt injection resistance, and you get a more secure and reliable agent.

This isn't just about Claude; it's a broader principle for agent design. If your agent is struggling, consider whether you're over-prompting. Often, a simpler, more focused system prompt, augmented by well-defined skills and structured output formats, will yield better and more consistent results. What are you removing from your prompts this week?
