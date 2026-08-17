import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/site-settings";
import { getVisibleProjects } from "@/content/projects";
import { getVisibleArticles } from "@/content/articles";

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
  // Hidden detail-only fixtures stay routable for direct QA review but must never be advertised
  // for indexing — SEO_CONTRACT.json forbids unverified demo previews becoming indexed claims
  // (GD10 re-QA round 4, R4-03). They are additionally marked noindex in their own metadata.
  const projectEntries = getVisibleProjects().map((p) => ({
    url: `${origin}/du-an/${p.slug}`,
    lastModified: new Date(),
  }));
  const articleEntries = getVisibleArticles().map((a) => ({
    url: `${origin}/kien-thuc/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
