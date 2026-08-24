import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/site-settings";
import { getIndexableProjects } from "@/content/projects";
import { getIndexableArticles } from "@/content/articles";

const STATIC_ROUTES = [
  "/",
  "/website",
  "/support-mxh",
  "/dich-vu-so",
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
  // Detail routes are advertised for indexing only when they are neither direct-review-only
  // fixtures nor unverified demo content: SEO_CONTRACT.json forbids demo preview data becoming
  // indexed claims, and CONTENT_TRUTH.json marks every GĐ1 project/article identity as demo
  // until verified. Both lists are therefore empty by design today and populate themselves as
  // soon as content is verified and flipped to demoOnly: false. The listing routes (/du-an,
  // /kien-thuc) stay in STATIC_ROUTES above — only the unverified detail URLs are withheld, and
  // those routes additionally carry noindex in their own metadata.
  const projectEntries = getIndexableProjects().map((p) => ({
    url: `${origin}/du-an/${p.slug}`,
    lastModified: new Date(),
  }));
  const articleEntries = getIndexableArticles().map((a) => ({
    url: `${origin}/kien-thuc/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
