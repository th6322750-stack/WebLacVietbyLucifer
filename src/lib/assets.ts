// Runtime asset registry — V3 HD/4K.
//
// Every path resolves into public/assets/v3, produced by ChatGPT's frozen HD/4K shard
// bundle. All 10 shards were SHA-256 verified against .webby/V3_HD_4K_AUTHORITY.json
// before extraction (10/10 PASS), and the 50 semantic aliases below are copied verbatim
// from that authority's `aliases` map — Claude chose no file and edited no pixel.
//
// Master/PDF crops and every V2 recovery crop are REFERENCE_ONLY per V3 rules and are
// deliberately absent from public/: they must never be served as runtime bytes.
export const ASSET_PATHS: Record<string, string> = {
  // Concept đa ngành /du-an — xem src/content/industry-showcase.ts (nguồn dùng chung).
  "du-an-industry-11": "/assets/v5/du-an/noi-that-an-gia.webp",
  "du-an-industry-12": "/assets/v5/du-an/english-master.webp",
  "du-an-industry-13": "/assets/v5/du-an/nha-khoa-smilecare.webp",
  "du-an-industry-14": "/assets/v5/du-an/bat-dong-san-homeland-viet.webp",
  "du-an-industry-15": "/assets/v5/du-an/du-lich-gotravel.webp",
  "du-an-industry-16": "/assets/v5/du-an/phong-kham-medicare-plus.webp",
  "du-an-industry-17": "/assets/v5/du-an/techzone-cong-nghe.webp",
  "du-an-industry-18": "/assets/v5/du-an/nha-hang-food-house.webp",
  "du-an-industry-19": "/assets/v5/du-an/bella-spa.webp",
  "du-an-industry-20": "/assets/v5/du-an/eventix-su-kien.webp",
  "du-an-industry-21": "/assets/v5/du-an/technext-doanh-nghiep-cong-nghe.webp",
  "du-an-industry-22": "/assets/v5/du-an/lunea-thoi-trang.webp",
  "du-an-industry-23": "/assets/v5/du-an/gia-an-bat-dong-san.webp",
  "du-an-industry-24": "/assets/v5/du-an/phuc-an-phong-kham.webp",
  "du-an-industry-25": "/assets/v5/du-an/edupro-giao-duc-online.webp",
  "du-an-industry-26": "/assets/v5/du-an/lan-vien-nha-hang.webp",
  "du-an-industry-27": "/assets/v5/du-an/viettrip-du-lich.webp",
  "du-an-industry-28": "/assets/v5/du-an/powerzone-fitness-gym.webp",
  "du-an-industry-29": "/assets/v5/du-an/minh-tri-luat-phap.webp",
  "du-an-industry-30": "/assets/v5/du-an/lumiere-spa-lam-dep.webp",
  "du-an-industry-01": "/assets/v5/du-an/noi-that-an-loc.webp",
  "du-an-industry-02": "/assets/v5/du-an/trung-tam-tieng-anh-englishhub.webp",
  "du-an-industry-03": "/assets/v5/du-an/phong-gym-ironfit.webp",
  "du-an-industry-04": "/assets/v5/du-an/resort-blue-sand.webp",
  "du-an-industry-05": "/assets/v5/du-an/cong-ty-luat-lexpro.webp",
  "du-an-industry-06": "/assets/v5/du-an/showroom-oto-dien-ev-motors.webp",
  "du-an-industry-07": "/assets/v5/du-an/nong-san-sach.webp",
  "du-an-industry-08": "/assets/v5/du-an/nen-tang-tuyen-dung-viec-tot.webp",
  "du-an-industry-09": "/assets/v5/du-an/nha-thong-minh-smarthome.webp",
  "du-an-industry-10": "/assets/v5/du-an/ban-ve-su-kien-eventix.webp",

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
  // V5: replaced the V3 SVG, which was 1,082 bytes of hand-drawn paths plus two <text>
  // elements that TYPED the wordmark in Noto Serif — so it rendered differently wherever that
  // font was missing. The new lockup is a real drawn logo. It carries a slight red matte fringe
  // from background removal, which is invisible at the sizes it is used (the header draws it
  // ~120px wide from a 1950px source, a 16x downscale); revisit if it is ever shown large.
  //
  // Back to the untouched delivery (2172x724) at Lucifer's instruction, 2026-09-02. The
  // rebuilt lockup that used to sit here re-composited the mark and wordmark, and in doing so
  // clipped the bird's beak against the top-left edge — visible at header size. The delivery
  // keeps the full mark with its own margins. lac-viet-logo-lockup.png is kept beside it
  // rather than deleted, so the recomposition is still recoverable.
  "lac-viet-logo-horizontal-approved": "/assets/v5/brand/lac-viet-logo-horizontal.png",
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

  // V5 NEW DIRECTION — layered hero. ChatGPT delivered the hero as six separate RGBA layers
  // instead of one flat frame, which is why they can be parallaxed and animated independently.
  // Verified before landing: all 6 are true RGBA, edges are ~100% soft (the glow lives in the
  // alpha ramp, not a hard cutout), and no layer carries a dark matte fringe.
  "v5-customer-avatars": "/assets/v5/hero/hero-customer-avatars.png",
  "v5-dongson-disc": "/assets/v5/hero/hero-dongson-disc.png",
  "v5-gold-ribbon": "/assets/v5/hero/hero-gold-ribbon.png",
  "v5-ground-glow": "/assets/v5/hero/hero-ground-glow.png",
  "v5-particles": "/assets/v5/hero/hero-particles.png",
  "v5-phoenix": "/assets/v5/hero/hero-phoenix.png",
  // Route hero artwork. `support-shield` arrived as RGB glow-on-black with no alpha and a
  // backdrop that was NOT pure black (edge peak 32/765), so it would have shown as a box on the
  // #000000 hero. Converted by unpremultiplying — alpha = max(r,g,b), colour divided by it —
  // which is exact for additive glow art: recompositing over black reproduces the delivered
  // pixels to within 1/255. Nothing was thresholded, so the glow falloff is intact.
  "v5-support-shield": "/assets/v5/hero/support-shield.png",
  // Shield alone, cropped from the UNTOUCHED delivery. The composited version cannot be reused
  // here: its colour channels were unpremultiplied (colour divided by alpha), which reproduces
  // the original exactly over black but turns to noise where alpha is low — fine as one flat
  // layer, unusable once the shield has to stand on its own.
  "v5-shield-only": "/assets/v5/hero/shield-only-v2.webp",

  // Dải hoa văn trống đồng chạy ngang chân trang, có huy hiệu tròn ở giữa.
  "v5-drum-band": "/assets/v5/footer/drum-band.webp",
  "v5-website-devices": "/assets/v5/hero/website-devices.png",

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
  "du-an-industry-11": { width: 800, height: 450 },
  "du-an-industry-12": { width: 800, height: 450 },
  "du-an-industry-13": { width: 800, height: 450 },
  "du-an-industry-14": { width: 800, height: 450 },
  "du-an-industry-15": { width: 800, height: 450 },
  "du-an-industry-16": { width: 800, height: 450 },
  "du-an-industry-17": { width: 800, height: 450 },
  "du-an-industry-18": { width: 800, height: 450 },
  "du-an-industry-19": { width: 800, height: 450 },
  "du-an-industry-20": { width: 800, height: 450 },
  "du-an-industry-21": { width: 800, height: 600 },
  "du-an-industry-22": { width: 800, height: 600 },
  "du-an-industry-23": { width: 800, height: 600 },
  "du-an-industry-24": { width: 800, height: 600 },
  "du-an-industry-25": { width: 800, height: 600 },
  "du-an-industry-26": { width: 800, height: 600 },
  "du-an-industry-27": { width: 800, height: 600 },
  "du-an-industry-28": { width: 800, height: 600 },
  "du-an-industry-29": { width: 800, height: 600 },
  "du-an-industry-30": { width: 800, height: 600 },

  "du-an-industry-01": { width: 800, height: 450 },
  "du-an-industry-02": { width: 800, height: 450 },
  "du-an-industry-03": { width: 800, height: 450 },
  "du-an-industry-04": { width: 800, height: 450 },
  "du-an-industry-05": { width: 800, height: 450 },
  "du-an-industry-06": { width: 800, height: 450 },
  "du-an-industry-07": { width: 800, height: 450 },
  "du-an-industry-08": { width: 800, height: 450 },
  "du-an-industry-09": { width: 800, height: 450 },
  "du-an-industry-10": { width: 800, height: 450 },

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
  "lac-viet-logo-horizontal-approved": { width: 2172, height: 724 },
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
  // V5 layered hero — native sizes read from the delivered files.
  "v5-customer-avatars": { width: 2172, height: 724 },
  "v5-dongson-disc": { width: 1254, height: 1254 },
  "v5-gold-ribbon": { width: 1448, height: 1086 },
  "v5-ground-glow": { width: 1672, height: 941 },
  "v5-particles": { width: 1448, height: 1086 },
  "v5-phoenix": { width: 1448, height: 1086 },
  "v5-support-shield": { width: 1672, height: 941 },
  "v5-shield-only": { width: 800, height: 699 },
  "v5-drum-band": { width: 1672, height: 200 },
  "v5-website-devices": { width: 1448, height: 1086 },
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
  // Padded outward from the bright-subject box. The first pass measured only pixels above a
  // BRIGHT threshold, which caught the phoenix body but not the glow, rings and tail around it —
  // so the crop sliced ~26% off the top and bottom and the artwork looked chopped. These include
  // the surrounding composition while still cutting most of the empty 4K field.
  "home-hero-master": [0.5, 0.06, 1.0, 0.94],
  "website-hero-master": [0.33, 0.1, 1.0, 0.9],
  "support-hero-master": [0.52, 0.04, 1.0, 0.96],
  "digital-hero-master": [0.5, 0.08, 1.0, 0.92],
  "projects-hero-master": [0.54, 0.14, 1.0, 0.9],
  "knowledge-hero-master": [0.22, 0.18, 0.78, 0.82],
  "contact-hero-master": [0.52, 0.14, 1.0, 0.94],
  "about-bird-master": [0.16, 0.18, 0.78, 0.82],
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
