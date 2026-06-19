import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-[var(--fg-subtle)]">
      <span className="w-6 h-px bg-[var(--border-strong)]" />
      <span>{children}</span>
    </div>
  );
}
