The scariest AI-generated code isn't the code that's wrong. It's the code that's plausible.

Wrong code fails a test. Plausible code sails through review because it looks like what a competent colleague would write — right style, right naming, one quietly invented assumption in the middle.

The fix isn't reading harder. It's changing what the agent hands you. I ask for four things with every change: intent in one sentence, the file list before any edit, the smallest relevant test actually run, and an explicit list of what was NOT verified.

That last one does the most work. "Not verified: whether this API paginates" turns a hidden assumption into a review item. The diff stops being a puzzle and becomes a checklist.

Don't measure a coding agent by how much code it writes. Measure it by how little of your attention each change safely needs.
