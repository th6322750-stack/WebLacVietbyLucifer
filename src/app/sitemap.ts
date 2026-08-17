import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/site-settings";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";

const STATIC_ROUTES = [
  "/",
  "/website",
  "/support-mxh",
  "/dich-vu-so",
  "/du-an",
  "/kien-thuc",
  "/gioi-thieu",
  "/lien-he",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteSettings.canonicalOrigin;
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date(),
  }));
  const projectEntries = projects.map((p) => ({
    url: `${origin}/du-an/${p.slug}`,
    lastModified: new Date(),
  }));
  const articleEntries = articles.map((a) => ({
    url: `${origin}/kien-thuc/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
