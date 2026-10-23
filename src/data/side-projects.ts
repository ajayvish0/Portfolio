export interface SideProject {
  /** Card title. */
  title: string;
  /** One or two sentences on what the project does. */
  description: string;
  /** Main language, shown in the grey line under the description. */
  language?: string;
  /** GitHub star count. Leave it out to hide the count. */
  stars?: number;
  /**
   * Where the title links: a site path ("/projects/my-project") or a full URL.
   * Leave it out when there is no detail page — the title stays plain text.
   */
  href?: string;
  /** Source repository, shown as [code]. */
  code?: string;
  /** Live site or demo, shown as [live]. */
  website?: string;
}

// Cards on the Projects page (/side-projects). When a new project is ready,
// add it here — the page and the count in its heading update on their own.
export const SIDE_PROJECTS: SideProject[] = [
  {
    title: "Property Voice AI",
    description:
      "A voice trainer for property negotiations. An adaptive seller responds in real time, callers can interrupt, and each session ends with a scored debrief.",
    language: "JavaScript",
    href: "/projects/property-voice-ai",
    code: "https://github.com/Ajayvish0/prop-voice",
    website: "https://propvoice.netlify.app/",
  },
  {
    title: "PDF-Chat Application",
    description:
      "Question-answering over uploaded PDFs. Retrieval and answers run through FastAPI and LangChain, with documents stored in Google Drive.",
    language: "Python",
    href: "/projects/pdf-chat",
    code: "https://github.com/Ajayvish0/AI_PDF_CHAT",
  },
  {
    title: "Inkstack",
    description:
      "A publishing platform for technical writing. Markdown, private drafts, tags, and search, served from a single Cloudflare Worker.",
    language: "TypeScript",
    href: "/projects/inkstack",
    code: "https://github.com/Ajayvish0/inkstack",
    website: "https://inkstack.inkstack-api.workers.dev",
  },
  {
    title: "Collab Whiteboard",
    description:
      "A shared whiteboard for live collaboration. Strokes and cursors stay in sync, and each board is stored in Postgres.",
    language: "JavaScript",
    href: "/projects/collab-whiteboard",
    code: "https://github.com/Ajayvish0/Collab_whiteboard",
    website: "https://collaoboard.netlify.app/",
  },
];
