There is a five-minute test worth running before any team adds a planning layer to an automation.

Pull the logs from the last 50 runs. Write down the step sequence each one took.

When all 50 sequences are identical, that system is a workflow. The right move is to hardcode the sequence and keep a single model call inside it. The planning layer was adding latency, cost, and nondeterminism while making zero decisions. Deleting it is not a downgrade. It is the difference between a system that can be debugged and one that improvises.

When the sequences genuinely diverge, and the next step depends on what the previous step found, an agent earns its complexity. Research across messy sources. Triage on ambiguous input. Paths nobody can enumerate in advance.

Teams argue about agents versus workflows in the abstract for weeks. The logs settle it in five minutes, and the logs already exist. The boring version runs all week without surprising anyone, which is precisely what production is for.
