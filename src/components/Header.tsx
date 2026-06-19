import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/notes", label: "Notes" },
  { href: "/now", label: "Now" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-[1.05rem] tracking-tight !text-[var(--fg)] hover:!text-[var(--accent)] transition-colors"
        >
          {SITE.shortName}
          <span className="text-[var(--accent)]">.</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-[0.92rem]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1.5 rounded-full !text-[var(--fg-muted)] hover:!text-[var(--fg)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <span className="hidden sm:block w-px h-4 bg-[var(--border)] mx-1" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
