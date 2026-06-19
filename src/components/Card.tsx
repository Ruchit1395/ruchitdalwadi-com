import Link from "next/link";
import type { ReactNode } from "react";

export function Card({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const base =
    "block group relative border border-[var(--border)] rounded-xl p-6 bg-[var(--bg-elevated)] transition-all duration-200 hover:border-[var(--border-strong)] hover:-translate-y-[1px] hover:shadow-[0_2px_18px_-12px_var(--accent)]";
  const inner = `${base} ${className}`;
  if (href) {
    return (
      <Link href={href} className={`${inner} !text-[var(--fg)]`}>
        {children}
      </Link>
    );
  }
  return <div className={inner}>{children}</div>;
}
