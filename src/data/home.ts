import { PERSON } from "@/lib/site";

export type SocialType = "email" | "linkedin" | "x" | "github";

export interface HomeProject {
  title: string;
  /** One or two lines; the card clamps it to two. */
  summary: string;
  /** Internal project page (/projects/slug) or an external URL. */
  href: string;
  github: string;
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
  /** Exactly two. */
  projects: [HomeProject, HomeProject];
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
        "A real-time voice negotiation trainer: close a real-estate deal against an emotionally adaptive GPT-4o seller, with barge-in and post-call scoring.",
      href: "/projects/property-voice-ai",
      github: PERSON.github,
    },
    {
      title: "PDF-Chat Application",
      summary:
        "Conversational querying over your PDFs — FastAPI, LangChain, React and PostgreSQL, with documents stored in Google Drive.",
      href: "/projects/pdf-chat",
      github: PERSON.github,
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
