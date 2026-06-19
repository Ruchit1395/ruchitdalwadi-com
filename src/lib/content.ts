import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Pillar } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type EssayMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  summary: string;
  pullQuote?: string;
  pillar: Pillar;
  tags: string[];
  primaryQuery: string;
  readingTime: string;
  wordCount: number;
};

export type Essay = EssayMeta & { content: string };

export type ProjectUpdate = { date: string; note: string };

export type DiagramKey =
  | "fashion"
  | "content-editing"
  | "logistics"
  | "pharma"
  | "erp"
  | "edtech";

export type ProjectMeta = {
  slug: string;
  title: string;
  domain: string;
  diagram: DiagramKey;
  pillar: Pillar | "Multiple";
  problem: string;
  role: string;
  insight: string;
  signal?: string;
  status: "Building" | "Shipped" | "Archived";
  updates?: ProjectUpdate[];
};

export type Project = ProjectMeta & { content: string };

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

export type Note = NoteMeta & { content: string };

function readMdxDir<T>(
  subdir: string,
  parser: (slug: string, data: Record<string, unknown>, content: string) => T,
): T[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return parser(slug, data, content);
    });
}

export function getAllEssays(): Essay[] {
  return readMdxDir<Essay>("essays", (slug, data, content) => {
    const rt = readingTime(content);
    return {
      slug,
      title: String(data.title),
      date: String(data.date),
      updated: data.updated ? String(data.updated) : undefined,
      summary: String(data.summary),
      pillar: data.pillar as Pillar,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      pullQuote: data.pullQuote ? String(data.pullQuote) : undefined,
      primaryQuery: String(data.primaryQuery ?? ""),
      readingTime: rt.text,
      wordCount: rt.words,
      content,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEssay(slug: string): Essay | undefined {
  return getAllEssays().find((e) => e.slug === slug);
}

export function getAllProjects(): Project[] {
  return readMdxDir<Project>("projects", (slug, data, content) => ({
    slug,
    title: String(data.title),
    domain: String(data.domain),
    diagram: (data.diagram as DiagramKey) ?? "fashion",
    pillar: (data.pillar as Pillar | "Multiple") ?? "Multiple",
    problem: String(data.problem),
    role: String(data.role),
    insight: String(data.insight),
    signal: data.signal ? String(data.signal) : undefined,
    status: (data.status as Project["status"]) ?? "Shipped",
    updates: Array.isArray(data.updates) ? (data.updates as ProjectUpdate[]) : [],
    content,
  }));
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllNotes(): Note[] {
  return readMdxDir<Note>("notes", (slug, data, content) => ({
    slug,
    title: String(data.title),
    date: String(data.date),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    content,
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}
