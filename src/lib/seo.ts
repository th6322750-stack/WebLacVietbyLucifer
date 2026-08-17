import type { Metadata } from "next";
import { siteSettings } from "@/lib/site-settings";

export function pageMetadata({
  title,
  description,
  path,
  ogImagePath,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  ogImagePath?: string;
  /** Direct-review-only routes (hidden demo detail fixtures) — keeps them routable for QA while
   * preventing unverified demo content from becoming an indexed claim per SEO_CONTRACT.json. */
  noindex?: boolean;
}): Metadata {
  const url = `${siteSettings.canonicalOrigin}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      images: ogImagePath ? [{ url: ogImagePath }] : undefined,
    },
  };
}

/** Organization structured data — only verified factual fields per SEO_CONTRACT.json
 * ("forbidden: fake Review/AggregateRating, invented awards/client counts/ratings"). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.brandName,
    url: siteSettings.canonicalOrigin,
    slogan: siteSettings.slogan,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteSettings.canonicalOrigin}${item.path}`,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    mainEntityOfPage: `${siteSettings.canonicalOrigin}${article.path}`,
  };
}
