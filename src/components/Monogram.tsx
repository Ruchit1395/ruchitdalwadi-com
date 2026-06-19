export function Monogram({ size = "default" }: { size?: "default" | "small" }) {
  const fontSize = size === "small" ? "0.85rem" : "0.95rem";
  return (
    <span
      className="font-mono inline-flex items-baseline"
      style={{ fontSize, letterSpacing: "-0.02em" }}
      aria-label="Ruchit Dalwadi"
    >
      <span className="text-[var(--fg)]">rd</span>
      <span className="text-[var(--accent)]">.</span>
    </span>
  );
}
