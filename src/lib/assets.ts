// Runtime asset registry — V3 HD/4K.
//
// Every path resolves into public/assets/v3, produced by ChatGPT's frozen HD/4K shard
// bundle. All 10 shards were SHA-256 verified against .webby/V3_HD_4K_AUTHORITY.json
// before extraction (10/10 PASS), and the 50 semantic aliases below are copied verbatim
// from that authority's `aliases` map — Claude chose no file and edited no pixel.
//
// Master/PDF crops and every V2 recovery crop are REFERENCE_ONLY per V3 rules and are
// deliberately absent from public/: they must never be served as runtime bytes.
const ASSET_PATHS: Record<string, string> = {
  "home-hero-master": "/assets/v3/hero/home-hero-master-4k.png",
  "website-hero-master": "/assets/v3/hero/website-hero-master-4k.png",
  "support-hero-master": "/assets/v3/hero/support-hero-master-4k.png",
  "digital-hero-master": "/assets/v3/hero/digital-hero-master-4k.png",
  "projects-hero-master": "/assets/v3/hero/projects-hero-master-4k.png",
  "knowledge-hero-master": "/assets/v3/hero/knowledge-hero-master-4k.png",
  "contact-hero-master": "/assets/v3/hero/contact-hero-master-4k.png",
  "about-bird-master": "/assets/v3/detail/about-bird-master-2k.png",
  "article-seo-hero-master": "/assets/v3/detail/article-seo-hero-master-2k.png",
  "project-detail-device-master": "/assets/v3/detail/project-detail-device-master-4k.png",
  "project-featured-case-master": "/assets/v3/project/project-featured-case-master.png",
  "support-client-logo-strip": "/assets/v3/shared/support-client-logo-strip-hd.png",
  "social-proof-avatar-strip-approved": "/assets/v3/shared/social-proof-avatar-strip-hd.png",
  "lac-viet-logo-horizontal-approved": "/assets/v3/brand/lac-viet-logo-horizontal-approved.svg",
  "lac-viet-logo-canonical": "/assets/v3/brand/lac-viet-logo-mark.svg",
  "support-cta-device-shield-approved-crop": "/assets/v3/shared/support-cta-device-shield-fhd.png",
  "digital-cta-phoenix-approved-crop": "/assets/v3/shared/digital-cta-phoenix-fhd.png",
  "project-detail-showcase-approved-crop": "/assets/v3/detail/project-detail-showcase-fhd.png",
  "404-background": "/assets/v3/hero/404-background-4k.png",
  "project-cover-01": "/assets/v3/project/project-cover-01.png",
  "project-cover-02": "/assets/v3/project/project-cover-02.png",
  "project-cover-03": "/assets/v3/project/project-cover-03.png",
  "project-cover-04": "/assets/v3/project/project-cover-04.png",
  "project-cover-05": "/assets/v3/project/project-cover-05.png",
  "project-cover-06": "/assets/v3/project/project-cover-06.png",
  "project-cover-07": "/assets/v3/project/project-cover-07.png",
  "project-cover-08": "/assets/v3/project/project-cover-08.png",
  "project-cover-09": "/assets/v3/project/project-cover-09.png",
  "project-cover-10": "/assets/v3/project/project-cover-10.png",
  "project-cover-11": "/assets/v3/project/project-cover-11.png",
  "project-cover-12": "/assets/v3/project/project-cover-12.png",
  "article-cover-01": "/assets/v3/article/article-cover-01.png",
  "article-cover-02": "/assets/v3/article/article-cover-02.png",
  "article-cover-03": "/assets/v3/article/article-cover-03.png",
  "article-cover-04": "/assets/v3/article/article-cover-04.png",
  "article-cover-05": "/assets/v3/article/article-cover-05.png",
  "article-cover-06": "/assets/v3/article/article-cover-06.png",
  "article-cover-07": "/assets/v3/article/article-cover-07.png",
  "home-project-preview-01": "/assets/v3/project/project-cover-01.png",
  "website-project-preview-01": "/assets/v3/project/project-cover-01.png",
  "home-article-preview-01": "/assets/v3/article/article-cover-01.png",
  "home-project-preview-02": "/assets/v3/project/project-cover-02.png",
  "website-project-preview-02": "/assets/v3/project/project-cover-02.png",
  "home-article-preview-02": "/assets/v3/article/article-cover-02.png",
  "home-project-preview-03": "/assets/v3/project/project-cover-03.png",
  "website-project-preview-03": "/assets/v3/project/project-cover-03.png",
  "home-article-preview-03": "/assets/v3/article/article-cover-03.png",
  "home-project-preview-04": "/assets/v3/project/project-cover-04.png",
  "website-project-preview-04": "/assets/v3/project/project-cover-04.png",
  "home-article-preview-04": "/assets/v3/article/article-cover-04.png",

  // Demo avatars are unrelated to the V3 raster roles and remain unchanged.
  "demo-avatar-01": "/assets/avatars/demo-avatar-01.webp",
  "demo-avatar-02": "/assets/avatars/demo-avatar-02.webp",
  "demo-avatar-03": "/assets/avatars/demo-avatar-03.webp",
  "demo-avatar-04": "/assets/avatars/demo-avatar-04.webp",

  // Decorative vectors carried forward unchanged (not part of the V3 raster set).
  "dong-son-ring": "/assets/decorative/dong-son-ring.svg",
  "gold-divider": "/assets/decorative/gold-divider.svg",
  "gold-noise": "/assets/decorative/gold-noise.svg",
};

/** Native pixel dimensions of each V3 production asset, read from the delivered files.
 * Images render at or below these; nothing is fake-upscaled (V3 quality.noFakeUpscale). */
export const ASSET_SIZE: Record<string, { width: number; height: number }> = {
  "home-hero-master": { width: 3840, height: 2160 },
  "website-hero-master": { width: 3840, height: 2160 },
  "support-hero-master": { width: 3840, height: 2160 },
  "digital-hero-master": { width: 3840, height: 2160 },
  "projects-hero-master": { width: 3840, height: 2160 },
  "knowledge-hero-master": { width: 3840, height: 2160 },
  "contact-hero-master": { width: 3840, height: 2160 },
  "about-bird-master": { width: 2160, height: 2160 },
  "article-seo-hero-master": { width: 2560, height: 1440 },
  "project-detail-device-master": { width: 3840, height: 2160 },
  "project-featured-case-master": { width: 1920, height: 1080 },
  "support-client-logo-strip": { width: 2400, height: 320 },
  "social-proof-avatar-strip-approved": { width: 1200, height: 240 },
  "lac-viet-logo-horizontal-approved": { width: 1800, height: 420 },
  "lac-viet-logo-canonical": { width: 512, height: 512 },
  "support-cta-device-shield-approved-crop": { width: 1920, height: 1080 },
  "digital-cta-phoenix-approved-crop": { width: 1920, height: 1080 },
  "project-detail-showcase-approved-crop": { width: 1920, height: 1080 },
  "404-background": { width: 3840, height: 2160 },
  "project-cover-01": { width: 1920, height: 1080 },
  "project-cover-02": { width: 1920, height: 1080 },
  "project-cover-03": { width: 1920, height: 1080 },
  "project-cover-04": { width: 1920, height: 1080 },
  "project-cover-05": { width: 1920, height: 1080 },
  "project-cover-06": { width: 1920, height: 1080 },
  "project-cover-07": { width: 1920, height: 1080 },
  "project-cover-08": { width: 1920, height: 1080 },
  "project-cover-09": { width: 1920, height: 1080 },
  "project-cover-10": { width: 1920, height: 1080 },
  "project-cover-11": { width: 1920, height: 1080 },
  "project-cover-12": { width: 1920, height: 1080 },
  "article-cover-01": { width: 1920, height: 1080 },
  "article-cover-02": { width: 1920, height: 1080 },
  "article-cover-03": { width: 1920, height: 1080 },
  "article-cover-04": { width: 1920, height: 1080 },
  "article-cover-05": { width: 1920, height: 1080 },
  "article-cover-06": { width: 1920, height: 1080 },
  "article-cover-07": { width: 1920, height: 1080 },
  "home-project-preview-01": { width: 1920, height: 1080 },
  "website-project-preview-01": { width: 1920, height: 1080 },
  "home-article-preview-01": { width: 1920, height: 1080 },
  "home-project-preview-02": { width: 1920, height: 1080 },
  "website-project-preview-02": { width: 1920, height: 1080 },
  "home-article-preview-02": { width: 1920, height: 1080 },
  "home-project-preview-03": { width: 1920, height: 1080 },
  "website-project-preview-03": { width: 1920, height: 1080 },
  "home-article-preview-03": { width: 1920, height: 1080 },
  "home-project-preview-04": { width: 1920, height: 1080 },
  "website-project-preview-04": { width: 1920, height: 1080 },
  "home-article-preview-04": { width: 1920, height: 1080 },
};


/** MASTER PARITY V4 / P0-HERO — focal content box, measured from the delivered pixels.
 *
 * The V3 hero masters are 4K canvases with the artwork sitting small inside a large dark field:
 * measured content coverage is 10% (projects), 12-13% (home, digital, contact, knowledge) and
 * 26% (support). Rendering the whole canvas is what makes the hero read as "a small picture in
 * a box" instead of the dominant focal visual the approved master shows.
 *
 * Values are [x0, y0, x1, y1] as fractions of the canvas. Consumers crop to this box, which is a
 * COMPOSITION change only — the asset bytes are untouched, nothing is upscaled beyond native,
 * and no pixel is edited. */
export const ASSET_FOCAL: Record<string, [number, number, number, number]> = {
  "home-hero-master": [0.637, 0.267, 0.912, 0.748],
  "website-hero-master": [0.392, 0.23, 0.938, 0.793],
  "support-hero-master": [0.621, 0.148, 0.983, 0.852],
  "digital-hero-master": [0.637, 0.281, 0.9, 0.733],
  "projects-hero-master": [0.667, 0.326, 0.908, 0.741],
  "knowledge-hero-master": [0.312, 0.326, 0.692, 0.674],
  "contact-hero-master": [0.646, 0.348, 0.908, 0.8],
  "about-bird-master": [0.254, 0.287, 0.688, 0.713],
};

/** Focal box for an asset, or the full canvas when none is recorded. */
export function assetFocal(id: string): [number, number, number, number] {
  return ASSET_FOCAL[id] ?? [0, 0, 1, 1];
}

/** Resolves a pinned asset id to its runtime path. Throws on unknown ids by design —
 * there is no silent fallback/substitution per the asset manifest contract. */
export function assetPath(id: string): string {
  const path = ASSET_PATHS[id];
  if (!path) throw new Error(`Unknown asset id "${id}" — not present in the asset registry`);
  return path;
}

/** Native dimensions for a V3 production asset. Throws on unknown ids for the same
 * reason assetPath does: a missing size must fail loudly, never render unsized. */
export function assetSize(id: string): { width: number; height: number } {
  const size = ASSET_SIZE[id];
  if (!size) throw new Error(`No native size recorded for asset id "${id}"`);
  return size;
}
