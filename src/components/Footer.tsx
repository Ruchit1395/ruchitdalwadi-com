import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24 py-10">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col sm:flex-row gap-6 sm:gap-3 items-start sm:items-center justify-between text-[0.9rem] text-[var(--fg-muted)]">
        <div>
          <div className="font-serif text-[var(--fg)]">{SITE.name}</div>
          <div className="mt-1 italic">{SITE.tagline}</div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={SITE.socials.twitter} className="!text-[var(--fg-muted)] hover:!text-[var(--accent)]">X</Link>
          <Link href={SITE.socials.linkedin} className="!text-[var(--fg-muted)] hover:!text-[var(--accent)]">LinkedIn</Link>
          <Link href={SITE.socials.github} className="!text-[var(--fg-muted)] hover:!text-[var(--accent)]">GitHub</Link>
          <Link href="/feed.xml" className="!text-[var(--fg-muted)] hover:!text-[var(--accent)]">RSS</Link>
          <Link href={SITE.socials.email} className="!text-[var(--fg-muted)] hover:!text-[var(--accent)]">Email</Link>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-5 sm:px-8 mt-6 text-[0.78rem] text-[var(--fg-subtle)]">
        © {new Date().getFullYear()} {SITE.name}. Built with intention.
      </div>
    </footer>
  );
}
