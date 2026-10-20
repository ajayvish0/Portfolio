import { PERSON } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

// The link preview for every page that has no opengraph-image of its own.
export const alt = `${PERSON.name} — ${PERSON.jobTitle}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    title: PERSON.name,
    subtitle: PERSON.jobTitle,
    text: "Real-time voice and SMS agents, LLM-powered products, and fast backend APIs with Node.js, FastAPI and React.",
  });
}
