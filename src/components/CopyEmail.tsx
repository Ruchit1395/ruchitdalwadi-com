"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export function CopyEmail({ label = SITE.email }: { label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-mono text-[0.95rem] !text-[var(--accent)] hover:!text-[var(--accent-hover)] underline underline-offset-4 decoration-[var(--accent-soft)] hover:decoration-[var(--accent)] transition-colors"
      aria-label="Copy email to clipboard"
    >
      {copied ? "Copied to clipboard ✓" : label}
    </button>
  );
}
