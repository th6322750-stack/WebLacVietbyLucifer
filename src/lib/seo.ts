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
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
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
