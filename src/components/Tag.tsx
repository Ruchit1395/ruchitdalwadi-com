import type { ReactNode } from "react";

type Variant = "default" | "accent" | "subtle";

export function Tag({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  const styles: Record<Variant, string> = {
    default:
      "border-[var(--border)] text-[var(--fg-muted)] bg-[var(--bg-elevated)]",
    accent:
      "border-transparent text-[var(--accent)] bg-[var(--accent-soft)]",
    subtle:
      "border-[var(--border)] text-[var(--fg-subtle)] bg-transparent",
  };
  return (
    <span
      className={`inline-flex items-center text-[0.72rem] tracking-wide uppercase px-2 py-0.5 rounded-full border ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
