import type { MetadataRoute } from "next";
import { getAllPersonalPosts, getAllProjects, getAllWritingPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/side-projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.frontmatter.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const writingRoutes: MetadataRoute.Sitemap = getAllWritingPosts().map((p) => ({
    url: `${SITE_URL}/writing/${p.slug}`,
    lastModified: p.frontmatter.updated ?? p.frontmatter.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const personalRoutes: MetadataRoute.Sitemap = getAllPersonalPosts()
    .filter((p) => p.frontmatter.date && !p.frontmatter.placeholder)
    .map((p) => ({
      url: `${SITE_URL}/writing/personal/${p.slug}`,
      lastModified: p.frontmatter.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes, ...personalRoutes];
}
