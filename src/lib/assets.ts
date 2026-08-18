// Exact destinationPath values from .webby/asset-manifest.json — do not invent paths.
const ASSET_PATHS: Record<string, string> = {
  "home-hero-master": "/assets/hero/home-hero-master.webp",
  "website-hero-master": "/assets/hero/website-hero-master.webp",
  "support-hero-master": "/assets/hero/support-hero-master.webp",
  "digital-hero-master": "/assets/hero/digital-hero-master.webp",
  "projects-hero-master": "/assets/hero/projects-hero-master.webp",
  "knowledge-hero-master": "/assets/hero/knowledge-hero-master.webp",
  "contact-hero-master": "/assets/hero/contact-hero-master.webp",
  "project-cover-01": "/assets/projects/project-cover-01.webp",
  "project-cover-02": "/assets/projects/project-cover-02.webp",
  "project-cover-03": "/assets/projects/project-cover-03.webp",
  "project-cover-04": "/assets/projects/project-cover-04.webp",
  "project-cover-05": "/assets/projects/project-cover-05.webp",
  "project-cover-06": "/assets/projects/project-cover-06.webp",
  "project-cover-07": "/assets/projects/project-cover-07.webp",
  "project-cover-08": "/assets/projects/project-cover-08.webp",
  "project-cover-09": "/assets/projects/project-cover-09.webp",
  "project-cover-10": "/assets/projects/project-cover-10.webp",
  "project-cover-11": "/assets/projects/project-cover-11.webp",
  "project-cover-12": "/assets/projects/project-cover-12.webp",
  "article-cover-01": "/assets/articles/article-cover-01.webp",
  "article-cover-02": "/assets/articles/article-cover-02.webp",
  "article-cover-03": "/assets/articles/article-cover-03.webp",
  "article-cover-04": "/assets/articles/article-cover-04.webp",
  "article-cover-05": "/assets/articles/article-cover-05.webp",
  "article-cover-06": "/assets/articles/article-cover-06.webp",
  "article-cover-07": "/assets/articles/article-cover-07.webp",
  "about-bird-master": "/assets/detail/about-bird-master.webp",
  "project-detail-device-master": "/assets/detail/project-detail-device-master.webp",
  "article-seo-hero-master": "/assets/detail/article-seo-hero-master.webp",
  "demo-avatar-01": "/assets/avatars/demo-avatar-01.webp",
  "demo-avatar-02": "/assets/avatars/demo-avatar-02.webp",
  "demo-avatar-03": "/assets/avatars/demo-avatar-03.webp",
  "demo-avatar-04": "/assets/avatars/demo-avatar-04.webp",
  "lac-viet-logo-canonical": "/assets/brand/lac-viet-logo.webp",
  "support-client-logo-strip": "/assets/client-logos/support-client-logo-strip.png",

  // PHA1 delta — the three approved-UI raster crops. SOURCE_LIMITED_APPROVED_CROP: exact pixels
  // from the approved composite, sha256-verified on download and again on disk. They must be
  // rendered at native size (contain, no upscale) — see ASSET_MANIFEST_DELTA_91.responsive.
  "support-cta-device-shield-approved-crop": "/assets/cta/support-cta-device-shield-approved-crop.webp",
  "digital-cta-phoenix-approved-crop": "/assets/cta/digital-cta-phoenix-approved-crop.webp",
  "project-detail-showcase-approved-crop": "/assets/detail/project-detail-showcase-approved-crop.webp",

  // PHA1 delta — the three source-controlled decorative vectors, now counted and mapped
  // (ASSET_MANIFEST_DELTA_91.json). Purely decorative: never identity-bound content.
  "dong-son-ring": "/assets/decorative/dong-son-ring.svg",
  "gold-divider": "/assets/decorative/gold-divider.svg",
  "gold-noise": "/assets/decorative/gold-noise.svg",
};

/** Resolves a pinned asset id to its runtime destinationPath. Throws on unknown ids by
 * design — there is no silent fallback/substitution per the asset manifest contract. */
export function assetPath(id: string): string {
  const path = ASSET_PATHS[id];
  if (!path) throw new Error(`Unknown asset id "${id}" — not present in asset-manifest.json`);
  return path;
}
