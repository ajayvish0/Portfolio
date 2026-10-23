import { PERSON } from "@/lib/site";

export type SocialType = "email" | "linkedin" | "x" | "github";

export interface HomeProject {
  title: string;
  /** One or two lines; the card clamps it to two. */
  summary: string;
  /** Internal project page (/projects/slug) or an external URL. */
  href: string;
  /** Source repository. Always the project repo, never the GitHub profile. */
  github: string;
  /** Live demo. Leave it out when the project has no public deployment. */
  live?: string;
}

export interface HomeSocial {
  type: SocialType;
  label: string;
  href: string;
}

export interface HomeContent {
  name: string;
  /**
   * Path under /public. Until the file exists, the page shows an "AV"
   * placeholder circle in its place.
   */
  photo: string;
  /** 3–5 short paragraphs. Inline links use markdown syntax: [text](/path). */
  bio: string[];
  projects: HomeProject[];
  email: string;
  linkedinDm: string;
  xDm: string;
  /** Shown in this order in the footer. */
  socials: HomeSocial[];
}

// Everything the homepage says lives here.
export const home: HomeContent = {
  name: PERSON.name,
  photo: PERSON.photo,
  bio: [
    "I'm Ajay, an AI full stack engineer. I build real-time AI products end to end: voice and SMS agents that talk to leads, softphone and power-dialer infrastructure, and the APIs and background jobs that keep them fast.",
    "Right now I freelance for a property-tech CRM, where I've built lead pipelines, an AI call-training platform with configurable personas, and real-time voice agents that cut lead response time by 60%.",
    "Before that I was a full stack developer at Cloudnexus, leading Jobra AI, an ML-powered applicant tracking system, and working on LLM improvement projects with Anthropic, including Claude Code.",
    "You can see what I've built on the [projects page](/side-projects) or read my [resume](/resume). I studied Computer Science (AIML) at Oriental Institute of Science and Technology. If you're hiring or want to build something with voice AI, [get in touch](/contact).",
  ],
  projects: [
    {
      title: "Property Voice AI",
      summary:
        "A voice trainer for property negotiations, with an adaptive seller, live interruption, and a scored debrief.",
      href: "/projects/property-voice-ai",
      github: "https://github.com/Ajayvish0/prop-voice",
      live: "https://propvoice.netlify.app/",
    },
    {
      title: "PDF-Chat Application",
      summary:
        "Question-answering over uploaded PDFs, with retrieval, a React client, and documents stored in Google Drive.",
      href: "/projects/pdf-chat",
      github: "https://github.com/Ajayvish0/AI_PDF_CHAT",
    },
    {
      title: "Inkstack",
      summary:
        "A publishing platform for technical writing, with drafts, tags, and search on Cloudflare Workers.",
      href: "/projects/inkstack",
      github: "https://github.com/Ajayvish0/inkstack",
      live: "https://inkstack.inkstack-api.workers.dev",
    },
    {
      title: "Collab Whiteboard",
      summary:
        "A shared whiteboard for live collaboration, with synchronized strokes and durable boards.",
      href: "/projects/collab-whiteboard",
      github: "https://github.com/Ajayvish0/Collab_whiteboard",
      live: "https://collaoboard.netlify.app/",
    },
  ],
  email: PERSON.email,
  linkedinDm: PERSON.linkedin,
  xDm: PERSON.x,
  socials: [
    { type: "email", label: PERSON.email, href: `mailto:${PERSON.email}` },
    { type: "linkedin", label: "ajay-vishwakarma-3409a0225", href: PERSON.linkedin },
    { type: "x", label: "@AjayVish01", href: PERSON.x },
    { type: "github", label: "Ajayvish0", href: PERSON.github },
  ],
};
