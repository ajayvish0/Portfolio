import Link from "next/link";
import type { Metadata } from "next";
import { SIDE_PROJECTS, type SideProject } from "@/data/side-projects";
import { slugify } from "@/lib/site-search";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Property Voice AI, PDF-Chat, Inkstack, and Collab Whiteboard — four projects by Ajay Vishwakarma, with source and live demos.",
  alternates: { canonical: "/side-projects" },
};

function ProjectTitle({ project }: { project: SideProject }) {
  const className = "text-foreground hover:text-primary transition-colors";

  if (!project.href) return <>{project.title}</>;

  if (/^https?:\/\//.test(project.href)) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>
        {project.title}
      </a>
    );
  }

  return (
    <Link href={project.href} className={className}>
      {project.title}
    </Link>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
      [{label}]
    </a>
  );
}

export default function SideProjectsPage() {
  return (
    <div className="max-w-none py-10">
      <h1 id="projects" className="text-[2em] font-normal leading-[1.3] text-foreground/70 mb-2">
        Projects{" "}
        <small className="font-mono text-[0.5em] text-muted-foreground">({SIDE_PROJECTS.length})</small>
      </h1>
      <p className="text-foreground/65 leading-relaxed mb-8">
        Selected work across voice systems, document intelligence, and collaborative software.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {SIDE_PROJECTS.map((project) => {
          const meta = [
            project.language,
            project.stars !== undefined ? `${project.stars.toLocaleString("en-US")} stars` : undefined,
          ].filter(Boolean);

          return (
            <article
              key={project.title}
              id={`project-${slugify(project.title)}`}
              className="flex flex-col rounded-lg border border-border bg-card p-5"
              data-search-item=""
              data-search-title={project.title}
              data-search-tags={project.language ?? ""}
            >
              <h3 data-toc-skip="true" className="text-[1.25em] font-bold leading-snug mb-2">
                <ProjectTitle project={project} />
              </h3>
              <p className="text-foreground/65 leading-relaxed mb-3">{project.description}</p>
              {meta.length > 0 && (
                <p data-search-ignore className="font-mono text-xs text-muted-foreground mb-3">
                  {meta.join(" · ")}
                </p>
              )}
              {(project.code || project.website) && (
                <p data-search-ignore className="ui-font mt-auto flex gap-3 text-sm">
                  {project.code && <ExternalLink href={project.code} label="code" />}
                  {project.website && <ExternalLink href={project.website} label="live" />}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
