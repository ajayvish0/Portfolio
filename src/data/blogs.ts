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

// Entries for /blogs. Year groups, counts, and filter pills are all derived
// from this list, so adding a post means adding one entry here.
export const BLOGS: BlogPost[] = [
  // 2026
  {
    title: "Two GitLab Accounts, One Machine, No Key Swapping",
    date: "2026-10-07",
    category: "DevOps",
    tags: ["git", "gitlab", "ssh", "devops"],
    summary:
      "The repository picks the SSH identity, not you. One host-alias block in ~/.ssh/config and one word in the remote URL route every clone, pull, and push to the right GitLab account. Covers the authentication chain link by link, Windows and macOS setup, and why the ssh your terminal runs is not proof of which ssh Git runs.",
    href: "https://medium.com/@ajayvisssh/two-gitlab-accounts-one-machine-no-key-swapping-5f82eeff05a6",
    sources: [
      { name: "Medium", href: "https://medium.com/@ajayvisssh/two-gitlab-accounts-one-machine-no-key-swapping-5f82eeff05a6" },
    ],
  },
  {
    title: "Why LLM Streaming Works Locally and Breaks in Production",
    date: "2026-10-03",
    category: "AI Systems",
    tags: ["llm", "streaming", "nodejs", "backend"],
    summary:
      "The model is rarely at fault. The proxy that buffers tokens, the closed tab that keeps generating, the error that arrives after 200 OK, and the split UTF-8 character are. Why your server is not a pipe, why chat should stream over fetch rather than EventSource, and how to catch each failure.",
    href: "https://medium.com/@ajayvisssh/why-llm-streaming-works-locally-and-breaks-in-production-ec1c079a3fb3",
    sources: [
      { name: "Medium", href: "https://medium.com/@ajayvisssh/why-llm-streaming-works-locally-and-breaks-in-production-ec1c079a3fb3" },
    ],
  },
];
