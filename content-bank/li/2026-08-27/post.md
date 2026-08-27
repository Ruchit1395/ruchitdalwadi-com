The demo worked in week one. The product took six more months. That gap keeps surprising teams, and the surprising part is that the gap was never about the model.

The demo skipped: retries with backoff. Timeouts. A fallback for when the model returns garbage. Validation on the way in and on the way out. Rate limit handling. Logs complete enough to replay yesterday's failure. Cost tracking per feature. A named owner for the eval set.

Each item is unglamorous. None is intellectually hard. Together they are the actual work of turning a model call into something a customer can rely on, and they are where the schedule lives.

The planning mistake is budgeting for the model and treating the rest as detail. The teams that ship on time budget it the other way: the model is the detail, the checklist is the project.

A useful exercise for any AI feature currently in flight: walk that list and count the unchecked items. The count is the honest distance to production, in a way the demo never is.
