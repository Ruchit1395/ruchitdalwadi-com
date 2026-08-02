The old LLM test was simple: "create an SVG of a pelican on a bicycle." We're past that now. 

Consider this: Opus 5 was given the opening paragraph of Lord of the Rings, a 1M token budget, and asked for a three.js render of it. The model spent two hours generating 5500 lines of procedural JavaScript code. 

The result was a "janky but fun" render of the story. The key takeaway here isn't the polish of the output, but the sheer complexity of the task. The LLM didn't just generate a static image; it orchestrated and placed various elements to procedurally render a narrative.

This points to a significant shift in LLM capabilities. They're moving from simple content generation to complex, generative code creation that builds worlds and orchestrates interactions. For product builders, this means thinking beyond basic prompt engineering. How do you evaluate models that are essentially building their own mini-applications? Your evaluation frameworks need to evolve to test for emergent, systemic behavior, not just isolated outputs.
