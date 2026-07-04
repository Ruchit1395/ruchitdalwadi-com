Three weeks after launch, someone in standup said the recommendations felt "a bit generic lately." The dashboards were green. Every response parsed. No errors since the 4th.

An upstream API had been returning empty results for eighteen days. The model, helpful to a fault, had been filling the gap from general knowledge the whole time.

This is the failure class unique to LLM systems: the model papers over broken inputs instead of crashing on them. Traditional monitoring watches for exceptions. There are none.

What works is watching for change instead of correctness. Response lengths shifting 20%. Hedging language creeping up. Retrieved context quietly dropping to zero tokens on some requests. You do not need to define a right answer to notice the distribution moved, and the distribution always moves before anyone files a complaint.

Crashes are a gift. Build alarms for the failures polite enough not to crash.
