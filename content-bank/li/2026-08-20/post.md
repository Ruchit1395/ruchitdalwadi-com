The most cost-effective piece of AI infrastructure a team can build this quarter is a spreadsheet with 20 rows.

Twelve typical cases. Five hard ones. Three that actually failed in production recently. Next to each, the expected outcome, written plainly enough that anyone on the team can judge pass or fail.

That is a golden set, and running it by hand before every prompt change, model upgrade, or vendor switch catches regressions before customers do. Twenty is deliberate: small enough that the set gets maintained instead of abandoned, large enough that a quiet breakage shows up.

The failure mode it replaces is common and expensive. A team spends a quarter evaluating eval frameworks, ships prompt changes on vibes the entire time, and a routine model upgrade silently breaks a case that had worked for months.

Cases first, tooling second. When a proper eval harness arrives later, the spreadsheet becomes its seed data, so nothing is wasted. Tooling without cases measures nothing at all.
