"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
    >
      <span aria-hidden className="text-[15px] leading-none">
        {mounted ? (isDark ? "☾" : "☀") : "·"}
      </span>
    </button>
  );
}
