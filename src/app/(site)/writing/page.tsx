import Link from "next/link";
import type { Metadata } from "next";
import { getAllPersonalPosts, getAllWritingPosts } from "@/lib/content";
import { PERSON } from "@/lib/site";
import { hasSentIssues } from "@/lib/buttondown";
import { NewsletterCard, NewsletterSubscribe } from "@/components/sections/newsletter-subscribe";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on voice AI, LLM apps, and backend systems from Ajay Vishwakarma — streaming, barge-in, and async processing.",
  alternates: { canonical: "/writing" },
};

function TechnicalBlogs() {
  const notes = getAllWritingPosts();
  if (notes.length === 0) return null;
  return (
    <>
      <p className="font-medium text-foreground mb-2">Technical notes</p>
      <ul className="list-disc ml-5 space-y-1.5 text-foreground/80 leading-relaxed">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link href={`/writing/${note.slug}`} className="font-medium text-foreground hover:text-primary hover:underline">
              {note.frontmatter.title}
            </Link>{" "}
            — {note.frontmatter.summary}
          </li>
        ))}
      </ul>
    </>
  );
}

function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatFeedDate(date: string): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd}`;
}

const buttonBase =
  "ui-font inline-flex items-center rounded-sm border px-4 py-1 text-sm font-medium transition-colors";
// The homepage's button styles: neutral outline, and a near-black primary.
const buttonOutline = `${buttonBase} border-border bg-card text-foreground hover:border-foreground/30`;
const buttonFilled = `${buttonBase} border-[var(--md-primary)] bg-[var(--md-primary)] text-[var(--md-primary-fg)] hover:opacity-90`;

export default async function WritingPage() {
  const showArchive = await hasSentIssues();
  const personalPosts = getAllPersonalPosts().filter(
    (post) => post.frontmatter.date && !post.frontmatter.placeholder
  );

  return (
    <div className="max-w-none py-10">
      <h1 id="writing" className="text-[2em] font-normal leading-[1.3] text-foreground/70 mb-4">
        Writing
      </h1>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        <a href="#technical-popular-blogs" className={buttonOutline}>
          Popular posts
        </a>
        <NewsletterSubscribe className={buttonFilled} showArchive={showArchive} />
        <a
          href={PERSON.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonOutline}
        >
          Follow me on LinkedIn
        </a>
      </div>

      {/* scroll-mt clears the sticky header when jumping here from "Popular posts". */}
      <section id="technical-popular-blogs" className="mb-8 scroll-mt-28">
        <TechnicalBlogs />
        <NewsletterCard showArchive={showArchive} />
      </section>

      {/* Personal writing: published posts in content/personal/*.mdx. A file with
          placeholder: true, or without a date, stays off this page. */}
      {personalPosts.length > 0 && (
        <section aria-labelledby="personal-writing" className="mt-12">
          <h2
            id="personal-writing"
            className="scroll-mt-28 text-[1.5625em] font-light tracking-[-0.01em] text-foreground mb-4"
          >
            Personal writing
          </h2>
          <div className="flex flex-col divide-y divide-border">
            {personalPosts.map((post) => {
              const { title, summary, date } = post.frontmatter;
              if (!date) return null;
              return (
                <Link
                  key={post.slug}
                  href={`/writing/personal/${post.slug}`}
                  className="group block py-6 first:pt-2"
                >
                  <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <time dateTime={date}>{formatFeedDate(date)}</time> · {readingTime(post.body)}{" "}
                    min read
                  </p>
                  <h3
                    data-toc-skip="true"
                    className="text-[1.25em] font-normal tracking-[-0.01em] text-foreground mb-2 transition-colors group-hover:text-primary"
                  >
                    {title}
                  </h3>
                  <p className="text-foreground/65 leading-relaxed mb-3">{summary}</p>
                  <span className="ui-font text-primary text-sm font-medium group-hover:underline">
                    Continue reading →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
