The most expensive AI failures don't throw errors.

Picture it: an upstream API starts returning empty results. The model, helpful to a fault, fills the gap from general knowledge. Every output still reads well. Dashboards stay green. Three weeks later someone notices the recommendations have been generic since the 4th.

This is the failure class unique to LLM systems: the model papers over broken inputs instead of crashing on them. Traditional monitoring watches for exceptions. There are none.

What works is watching for change instead of correctness. Response lengths shifting. Hedging language creeping up. Retrieved context quietly shrinking to zero on some requests. You don't need to define a right answer to notice the distribution moved — and the distribution always moves before anyone files a complaint.

Crashes are a gift. Build alarms for the failures polite enough not to crash.
