import type { Metadata } from "next";
import { siteSettings } from "@/lib/site-settings";

/** Default share thumbnail — dark/gold brand card built from the approved logo lockup, the
 * real homepage tagline, and the real service list. Every route gets it unless it passes its
 * own `ogImagePath` (e.g. a future article cover). */
const DEFAULT_OG_IMAGE = "/assets/v5/brand/og-thumbnail.jpg";

export function pageMetadata({
  title,
  description,
  path,
  ogImagePath = DEFAULT_OG_IMAGE,
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
  const images = [{ url: ogImagePath, width: 1200, height: 630, alt: siteSettings.brandName }];
  const robotIndex = !noindex;
  return {
    title,
    description,
    alternates: { canonical: url },
    // Keep the directives identical for every route. `googleBot` is explicit because the
    // generic robots tag alone is easy to accidentally override in a nested layout.
    robots: {
      index: robotIndex,
      follow: robotIndex,
      googleBot: {
        index: robotIndex,
        follow: robotIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSettings.brandName,
      locale: "vi_VN",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
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
  };
}

/** WebSite data is intentionally limited to the verified brand and canonical origin. Search
 * actions are not emitted because the public search is a client lightbox, not a crawlable
 * `/search?q=` endpoint. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings.brandName,
    url: siteSettings.canonicalOrigin,
    inLanguage: "vi-VN",
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
  dateModified?: string;
  author: string;
  path: string;
  imagePath?: string;
}) {
  const image = article.imagePath
    ? `${siteSettings.canonicalOrigin}${article.imagePath}`
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    ...(image ? { image: [image] } : {}),
    datePublished: article.publishedAt,
    dateModified: article.dateModified ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
      url: siteSettings.canonicalOrigin,
    },
    publisher: {
      "@type": "Organization",
      name: siteSettings.brandName,
      url: siteSettings.canonicalOrigin,
    },
    mainEntityOfPage: `${siteSettings.canonicalOrigin}${article.path}`,
  };
}
