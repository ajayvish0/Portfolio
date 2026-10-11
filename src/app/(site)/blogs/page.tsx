import type { Metadata } from "next";
import { BlogArchive } from "@/components/sections/blog-archive";
import { NewsletterCard } from "@/components/sections/newsletter-subscribe";
import { BLOGS } from "@/data/blogs";
import { hasSentIssues } from "@/lib/buttondown";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Long-form essays from Ajay Vishwakarma on AI systems, voice agents, backend engineering, and full stack development.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  return (
    <div className="max-w-none py-10">
      <h1 id="blogs" className="text-[2em] font-normal leading-[1.3] text-foreground/70 mb-2">
        Blogs
      </h1>
      <p className="text-foreground/65 leading-relaxed mb-8">
        Long-form essays on AI systems, voice agents, backend engineering, and full stack development.
      </p>

      <BlogArchive posts={BLOGS} />

      {/* Readers who reach the end of the archive are the likeliest subscribers. */}
      <NewsletterCard showArchive={await hasSentIssues()} />

      <div className="mt-16 pt-6 border-t border-border font-mono text-sm">
        <a href="#blogs" className="text-primary hover:underline">
          ↑ Back to top
        </a>
      </div>
    </div>
  );
}
