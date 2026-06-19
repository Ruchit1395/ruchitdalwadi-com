import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllEssays, getAllProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticRoutes = ["", "/about", "/contact", "/now", "/projects", "/writing", "/notes"].map(
    (p) => ({
      url: `${SITE.url}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1.0 : 0.7,
    }),
  );

  const essays = getAllEssays().map((e) => ({
    url: `${SITE.url}/writing/${e.slug}`,
    lastModified: e.updated ?? e.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projects = getAllProjects().map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...essays, ...projects];
}
