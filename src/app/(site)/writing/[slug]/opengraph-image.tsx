import { getWritingPost, getWritingSlugs } from "@/lib/content";
import { PERSON } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

// The page sets its own openGraph metadata, which drops the root image, so each
// post gets a card of its own.
export const alt = `Writing by ${PERSON.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter } = getWritingPost(slug);
  return renderOgCard({
    title: frontmatter.title,
    subtitle: PERSON.name,
    text: frontmatter.tags.join(" · "),
  });
}
