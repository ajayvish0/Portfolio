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
  /** Live site or demo, shown as [website]. */
  website?: string;
}

// Cards on the Projects page (/side-projects). When a new project is ready,
// add it here — the page and the count in its heading update on their own.
export const SIDE_PROJECTS: SideProject[] = [
  {
    title: "Property Voice AI",
    description:
      "A real-time voice negotiation trainer against an emotionally adaptive GPT-4o seller persona — token streaming over Socket.IO, sentence-level TTS, barge-in, and a 5-dimension scoring engine.",
    language: "JavaScript",
    href: "/projects/property-voice-ai",
    code: "https://github.com/Ajayvish0",
  },
  {
    title: "PDF-Chat Application",
    description:
      "Chat with your PDF documents — FastAPI, LangChain, React and PostgreSQL, with secure document storage in Google Drive.",
    language: "Python",
    href: "/projects/pdf-chat",
    code: "https://github.com/Ajayvish0",
  },
  {
    title: "Jobra AI",
    description:
      "An ML-powered applicant tracking system built at Cloudnexus — 45% better applicant matching and 60% less recruiter screening time.",
    language: "TypeScript",
  },
  {
    title: "AI Call Training Platform",
    description:
      "Trainees practise real-world sales calls against configurable AI personas and scenarios, then get an automated post-call evaluation from OpenAI models.",
    language: "TypeScript",
  },
  {
    title: "Power Dialer",
    description:
      "Automatically starts campaign calls, tracks call state and dispositions, and moves to the next eligible lead without manual input.",
    language: "TypeScript",
  },
  {
    title: "Threat Management System",
    description:
      "2FA, RBAC, Excel data ingestion and dynamic visualization, built with React, Redux Toolkit, Node.js and MongoDB.",
    language: "JavaScript",
  },
];
