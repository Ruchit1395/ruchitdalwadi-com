A pattern that keeps showing up in AI cost blowups: the team defaults every request to the flagship model because that is the one everyone trusted during the demo. The bill arrives six weeks later and becomes a board topic.

The saner default runs the other direction. Route everything to the cheap, fast model first. Escalate to the expensive one only on failure or low confidence.

Classification, extraction, formatting, routing, short summaries: cheap-tier work, provable with a small golden set in one afternoon. Long-horizon reasoning, complex refactors, and genuinely ambiguous judgment calls are what the flagship is for.

The number that matters is the escalation rate, not the sticker price per token. A pipeline that escalates one request in ten costs a fraction of one that starts every request at the top, with no measurable quality difference on the routine ninety percent.

Price the path, not the model. Then measure the escalation rate monthly, because it drifts, and drift in either direction is information.
