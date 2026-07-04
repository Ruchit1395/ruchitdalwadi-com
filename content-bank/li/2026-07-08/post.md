Wrong code fails a test. Plausible code sails through review.

The scariest thing an AI coding tool produces is not a bug. It is a diff that looks exactly like what a competent colleague would write: right style, right naming, one quietly invented assumption in the middle. On a vertical ERP build, the assumption was that an internal API paginated. It did not. The bug shipped, sat quiet for nine days, then dropped every invoice after row 100.

The fix is not reading harder. It is changing what the agent hands you. I ask for four things with every change: intent in one sentence, the file list before any edit, the smallest relevant test actually run, and an explicit list of what was NOT verified.

That last item does the most work. "Not verified: whether this API paginates" turns a hidden assumption into a review item. The diff stops being a puzzle and becomes a checklist.

Measure a coding agent by how little of your attention each change safely needs, not by how much code it writes.
