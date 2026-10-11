export interface BlogPost {
  /** Title shown in the archive list. */
  title: string;
  /** Publish date as YYYY-MM-DD. Sets the year group and the sort order. */
  date: string;
  /** Primary category. Each distinct value becomes a filter pill on /blogs. */
  category: string;
  /** Topic tags, rendered as #tag under the title. */
  tags: string[];
  /** A short overview shown under the title. Leave it out to show only the title. */
  summary?: string;
  /** Platforms the post is published on. Each adds a "Read on <name>" link under the overview. */
  sources?: { name: string; href: string }[];
  /** "guide" marks a hands-on build guide: the overview shows as a TL;DR and `steps` as a numbered outline. */
  kind?: "guide";
  /** A build guide's steps, in order. */
  steps?: string[];
  /**
   * The post's main URL. Titles are plain text (readers use the "Read on …"
   * links); an href marks the entry as a real post rather than a placeholder,
   * which site search relies on. Leave it out while the entry is a placeholder.
   */
  href?: string;
}

// Placeholder entries for /blogs. When a post is ready, overwrite one entry's
// title, date, category, and tags and add its href. Year groups, counts, and
// filter pills are all derived from this list, so nothing else needs editing.
export const BLOGS: BlogPost[] = [
  { title: "Placeholder Post 01", date: "2026-09-01", category: "AI Systems", tags: ["voice-ai", "llm"] },
  { title: "Placeholder Post 02", date: "2026-07-14", category: "Backend Engineering", tags: ["nodejs", "async-jobs"] },
  { title: "Placeholder Post 03", date: "2026-05-05", category: "AI Systems", tags: ["rag", "langchain"] },
  { title: "Placeholder Post 04", date: "2026-03-10", category: "Full Stack", tags: ["react", "websockets"] },
  { title: "Placeholder Post 05", date: "2025-11-18", category: "AI Systems", tags: ["ai-agents", "tool-calling"] },
  { title: "Placeholder Post 06", date: "2025-08-26", category: "Backend Engineering", tags: ["postgresql", "indexing"] },
];
