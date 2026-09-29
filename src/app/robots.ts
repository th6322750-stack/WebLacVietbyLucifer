import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/site-settings";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteSettings.canonicalOrigin}/sitemap.xml`,
  };
}
