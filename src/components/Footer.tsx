import Link from "next/link";
import { SITE } from "@/lib/site";

const links = [
  { href: SITE.socials.twitter, label: "X" },
  { href: SITE.socials.linkedin, label: "LinkedIn" },
  { href: SITE.socials.github, label: "GitHub" },
  { href: "/feed.xml", label: "RSS" },
  { href: SITE.socials.email, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-32 py-10">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-col sm:flex-row gap-5 sm:gap-3 items-start sm:items-center justify-between">
        <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-[var(--fg-subtle)]">
          © {new Date().getFullYear()} {SITE.name}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="!text-[var(--fg-subtle)] hover:!text-[var(--accent)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
