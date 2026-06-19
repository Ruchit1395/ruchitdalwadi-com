import { SITE } from "@/lib/site";
import { getAllEssays } from "@/lib/content";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const essays = getAllEssays();
  const items = essays
    .map(
      (e) => `
    <item>
      <title>${esc(e.title)}</title>
      <link>${SITE.url}/writing/${e.slug}</link>
      <guid>${SITE.url}/writing/${e.slug}</guid>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      <description>${esc(e.summary)}</description>
      <category>${esc(e.pillar)}</category>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} — Writing</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.description)}</description>
    <language>en-us</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
