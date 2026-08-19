// Runtime asset registry.
//
// Recovery-v2 entries are exact source-limited crops of the approved master, produced by
// ChatGPT's locked crop rectangles in .webby/recovery-v2/RECOVERY_ASSET_MANIFEST_V2.json
// against the SHA-256-verified frozen ui-000..ui-010 bundle. Claude chose no crop and
// altered no pixel. Per-asset declared-vs-actual hashes:
// .webby/implementation/RECOVERY_ASSET_ACTUAL_HASHES.json
const ASSET_PATHS: Record<string, string> = {
  // --- recovery-v2: 15 new logical ids ---
  "lac-viet-logo-horizontal-approved": "/assets/recovery-v2/brand/lac-viet-logo-horizontal-approved.png",
  "home-project-preview-01": "/assets/recovery-v2/home/project/home-project-preview-01.png",
  "home-project-preview-02": "/assets/recovery-v2/home/project/home-project-preview-02.png",
  "home-project-preview-03": "/assets/recovery-v2/home/project/home-project-preview-03.png",
  "home-project-preview-04": "/assets/recovery-v2/home/project/home-project-preview-04.png",
  "home-article-preview-01": "/assets/recovery-v2/home/article/home-article-preview-01.png",
  "home-article-preview-02": "/assets/recovery-v2/home/article/home-article-preview-02.png",
  "home-article-preview-03": "/assets/recovery-v2/home/article/home-article-preview-03.png",
  "home-article-preview-04": "/assets/recovery-v2/home/article/home-article-preview-04.png",
  "social-proof-avatar-strip-approved": "/assets/recovery-v2/social-proof/social-proof-avatar-strip-approved.png",
  "website-project-preview-01": "/assets/recovery-v2/website/project/website-project-preview-01.png",
  "website-project-preview-02": "/assets/recovery-v2/website/project/website-project-preview-02.png",
  "website-project-preview-03": "/assets/recovery-v2/website/project/website-project-preview-03.png",
  "website-project-preview-04": "/assets/recovery-v2/website/project/website-project-preview-04.png",
  "project-featured-case-master": "/assets/recovery-v2/projects/project-featured-case-master.png",

  // --- recovery-v2: 30 replaced logical ids (superseded schematic rasters deleted) ---
  "home-hero-master": "/assets/recovery-v2/hero/home-hero-master.png",
  "website-hero-master": "/assets/recovery-v2/hero/website-hero-master.png",
  "support-hero-master": "/assets/recovery-v2/hero/support-hero-master.png",
  "support-client-logo-strip": "/assets/recovery-v2/client-logos/support-client-logo-strip.png",
  "digital-hero-master": "/assets/recovery-v2/hero/digital-hero-master.png",
  "projects-hero-master": "/assets/recovery-v2/hero/projects-hero-master.png",
  "project-cover-01": "/assets/recovery-v2/project/project-cover-01.png",
  "project-cover-02": "/assets/recovery-v2/project/project-cover-02.png",
  "project-cover-03": "/assets/recovery-v2/project/project-cover-03.png",
  "project-cover-04": "/assets/recovery-v2/project/project-cover-04.png",
  "project-cover-05": "/assets/recovery-v2/project/project-cover-05.png",
  "project-cover-06": "/assets/recovery-v2/project/project-cover-06.png",
  "project-cover-07": "/assets/recovery-v2/project/project-cover-07.png",
  "project-cover-08": "/assets/recovery-v2/project/project-cover-08.png",
  "project-cover-09": "/assets/recovery-v2/project/project-cover-09.png",
  "project-cover-10": "/assets/recovery-v2/project/project-cover-10.png",
  "project-cover-11": "/assets/recovery-v2/project/project-cover-11.png",
  "project-cover-12": "/assets/recovery-v2/project/project-cover-12.png",
  "knowledge-hero-master": "/assets/recovery-v2/hero/knowledge-hero-master.png",
  "article-cover-01": "/assets/recovery-v2/article/article-cover-01.png",
  "article-cover-02": "/assets/recovery-v2/article/article-cover-02.png",
  "article-cover-03": "/assets/recovery-v2/article/article-cover-03.png",
  "article-cover-04": "/assets/recovery-v2/article/article-cover-04.png",
  "article-cover-05": "/assets/recovery-v2/article/article-cover-05.png",
  "article-cover-06": "/assets/recovery-v2/article/article-cover-06.png",
  "article-cover-07": "/assets/recovery-v2/article/article-cover-07.png",
  "about-bird-master": "/assets/recovery-v2/detail/about-bird-master.png",
  "project-detail-device-master": "/assets/recovery-v2/detail/project-detail-device-master.png",
  "article-seo-hero-master": "/assets/recovery-v2/detail/article-seo-hero-master.png",
  "contact-hero-master": "/assets/recovery-v2/hero/contact-hero-master.png",

  // --- retained unchanged (PHA1 frozen approved crops + decorative vectors) ---
  "support-cta-device-shield-approved-crop": "/assets/cta/support-cta-device-shield-approved-crop.webp",
  "digital-cta-phoenix-approved-crop": "/assets/cta/digital-cta-phoenix-approved-crop.webp",
  "project-detail-showcase-approved-crop": "/assets/detail/project-detail-showcase-approved-crop.webp",
  "dong-son-ring": "/assets/decorative/dong-son-ring.svg",
  "gold-divider": "/assets/decorative/gold-divider.svg",
  "gold-noise": "/assets/decorative/gold-noise.svg",

  // --- retained: demo avatars + square brand mark (no longer the global header lockup) ---
  "demo-avatar-01": "/assets/avatars/demo-avatar-01.webp",
  "demo-avatar-02": "/assets/avatars/demo-avatar-02.webp",
  "demo-avatar-03": "/assets/avatars/demo-avatar-03.webp",
  "demo-avatar-04": "/assets/avatars/demo-avatar-04.webp",
  "lac-viet-logo-canonical": "/assets/brand/lac-viet-logo.webp",
};

/** Native pixel dimensions of each source-limited recovery crop. These are exact master
 * pixels; render at or below native size and never upscale beyond the source. */
export const RECOVERY_ASSET_SIZE: Record<string, { width: number; height: number }> = {
  "lac-viet-logo-horizontal-approved": { width: 122, height: 43 },
  "home-project-preview-01": { width: 159, height: 86 },
  "home-project-preview-02": { width: 159, height: 86 },
  "home-project-preview-03": { width: 159, height: 86 },
  "home-project-preview-04": { width: 165, height: 86 },
  "home-article-preview-01": { width: 161, height: 66 },
  "home-article-preview-02": { width: 161, height: 66 },
  "home-article-preview-03": { width: 161, height: 66 },
  "home-article-preview-04": { width: 161, height: 66 },
  "social-proof-avatar-strip-approved": { width: 63, height: 26 },
  "website-project-preview-01": { width: 146, height: 68 },
  "website-project-preview-02": { width: 145, height: 68 },
  "website-project-preview-03": { width: 146, height: 68 },
  "website-project-preview-04": { width: 146, height: 68 },
  "project-featured-case-master": { width: 235, height: 132 },
  "home-hero-master": { width: 390, height: 320 },
  "website-hero-master": { width: 307, height: 191 },
  "support-hero-master": { width: 251, height: 218 },
  "support-client-logo-strip": { width: 584, height: 35 },
  "digital-hero-master": { width: 225, height: 238 },
  "projects-hero-master": { width: 236, height: 212 },
  "project-cover-01": { width: 151, height: 86 },
  "project-cover-02": { width: 151, height: 86 },
  "project-cover-03": { width: 151, height: 86 },
  "project-cover-04": { width: 151, height: 86 },
  "project-cover-05": { width: 151, height: 91 },
  "project-cover-06": { width: 151, height: 91 },
  "project-cover-07": { width: 151, height: 91 },
  "project-cover-08": { width: 151, height: 91 },
  "project-cover-09": { width: 151, height: 90 },
  "project-cover-10": { width: 151, height: 90 },
  "project-cover-11": { width: 151, height: 90 },
  "project-cover-12": { width: 151, height: 90 },
  "knowledge-hero-master": { width: 325, height: 195 },
  "article-cover-01": { width: 245, height: 195 },
  "article-cover-02": { width: 194, height: 115 },
  "article-cover-03": { width: 194, height: 115 },
  "article-cover-04": { width: 195, height: 115 },
  "article-cover-05": { width: 194, height: 116 },
  "article-cover-06": { width: 194, height: 116 },
  "article-cover-07": { width: 195, height: 116 },
  "about-bird-master": { width: 197, height: 185 },
  "project-detail-device-master": { width: 255, height: 185 },
  "article-seo-hero-master": { width: 238, height: 124 },
  "contact-hero-master": { width: 233, height: 223 },
};

/** Resolves a pinned asset id to its runtime path. Throws on unknown ids by design —
 * there is no silent fallback/substitution per the asset manifest contract. */
export function assetPath(id: string): string {
  const path = ASSET_PATHS[id];
  if (!path) throw new Error(`Unknown asset id "${id}" — not present in the asset registry`);
  return path;
}

/** Native master-crop dimensions for a recovery asset. Throws on unknown ids for the same
 * reason assetPath does: a missing size must fail loudly, never silently render unsized. */
export function assetSize(id: string): { width: number; height: number } {
  const size = RECOVERY_ASSET_SIZE[id];
  if (!size) throw new Error(`No native size recorded for asset id "${id}"`);
  return size;
}
