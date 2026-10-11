// NOTE: No production domain is configured yet. This is env-driven via NEXT_PUBLIC_SITE_URL;
// set that env var to the real production domain when it exists. Falls back to a
// placeholder for local/dev.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajayvishwakarma.dev";

export const SITE_NAME = "Ajay Vishwakarma";

// Buttondown newsletter username (the name in buttondown.com/<username>). It is
// public, not a secret: the embed form needs no API key. Fixed on purpose so no
// environment setting can send signups to another newsletter.
export const BUTTONDOWN_USERNAME = "ajayvisssh";

export const PERSON = {
  name: "Ajay Vishwakarma",
  email: "ajayvisssh@gmail.com",
  jobTitle: "AI Full Stack Engineer",
  location: "India",
  github: "https://github.com/Ajayvish0",
  linkedin: "https://linkedin.com/in/ajay-vishwakarma-3409a0225",
  /** X (Twitter) profile URL. */
  x: "https://x.com/AjayVish01",
  alumniOf: "Oriental Institute of Science and Technology",
};

export function personId() {
  return `${SITE_URL}/#person`;
}

export function absoluteUrl(pathname: string) {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
