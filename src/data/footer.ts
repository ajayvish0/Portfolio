import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { PERSON } from "@/lib/site";

export interface FooterLink {
  label: string;
  /** Small grey descriptor after the label, e.g. "Essays". */
  hint?: string;
  /**
   * A site path or a full URL (full URLs open in a new tab with an ↗ icon).
   * Leave it out for a placeholder: it renders greyed out and unlinked.
   */
  href?: string;
  /** "cta" renders bold in the primary colour; "rss" adds the RSS icon. */
  variant?: "cta" | "rss";
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  icon: IconType;
  /** Leave it out for a placeholder. */
  href?: string;
}

// Site-wide footer. Only pages and profiles that exist. An entry without an
// href still renders greyed out, so a new link can be drafted without a dead URL.
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Work",
    links: [
      { label: "Projects", hint: "Systems", href: "/side-projects" },
      { label: "Blogs", hint: "Essays", href: "/blogs" },
      { label: "Writing", hint: "Notes", href: "/writing" },
    ],
  },
  {
    title: "Selected work",
    links: [
      { label: "Property Voice AI", href: "/projects/property-voice-ai" },
      { label: "PDF-Chat Application", href: "/projects/pdf-chat" },
      { label: "GitHub", href: "https://github.com/Ajayvish0" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const FOOTER_TAGLINE = "Built with Next.js.";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Twitter", icon: FaTwitter, href: PERSON.x },
  { label: "LinkedIn", icon: FaLinkedin, href: PERSON.linkedin },
  { label: "GitHub", icon: FaGithub, href: PERSON.github },
  { label: "Email", icon: FaEnvelope, href: `mailto:${PERSON.email}` },
];
