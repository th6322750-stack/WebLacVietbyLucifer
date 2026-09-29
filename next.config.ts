import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` and `next build` both write to .next by default, so running a production build
  // while a dev server is up wipes the chunks the dev server is serving and every route starts
  // returning 500 ("Cannot find module './331.js'"). Giving dev its own directory makes that
  // collision impossible instead of relying on remembering not to overlap them.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  images: {
    // V3 rules forbid converting production PNG to lossy WebP/AVIF "without user approval".
    // The user granted that approval explicitly (high-quality WebP) after being shown the
    // page-weight cost: the lossless masters are 24.9 MB per 4K hero and 6.2 MB per FHD card,
    // which would make /du-an roughly an 80 MB page load.
    //
    // Only the DELIVERED bytes are transcoded. The lossless 4K/FHD PNG masters stay in the
    // repo under public/assets/v3 exactly as ChatGPT froze them — nothing is re-encoded at
    // rest, and no source file is modified.
    formats: ["image/webp"],
    qualities: [90],
    // Device widths matter here because the masters are 4K: without these, Next would hand a
    // phone a needlessly large candidate.
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3840],
    imageSizes: [64, 96, 128, 256, 384, 512, 768],
    // The V3 global logo is an SVG vector (quality.logo), and next/image refuses SVG sources
    // unless this is set. Only first-party SVGs from the frozen bundle are served, and the
    // sandbox + CSP below keep an SVG from executing script if one were ever swapped in.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Preserve safe Maxweb bookmarks and campaign links while keeping one canonical Lạc Việt
  // destination for each capability. Policy-sensitive and unsafe catalogue URLs are deliberately
  // absent here; they must not become reachable through a redirect by accident.
  async redirects() {
    return [
      { source: "/profile-maxweb", destination: "/gioi-thieu", permanent: false },
      { source: "/content-quang-cao-facebook", destination: "/kien-thuc", permanent: false },
      {
        source: "/quang-cao-google-map-nganh-bat-dong-san",
        destination: "/dich-vu/quang-cao-google-ads",
        permanent: false,
      },
      { source: "/tieu-chi-xep-hang-google-maps", destination: "/kien-thuc", permanent: false },
      {
        source: "/bo-tu-khoa-google-ads-bat-dong-san-de-ra-chuyen-doi",
        destination: "/kien-thuc",
        permanent: false,
      },
      // The reference site has many category/product pages; the current catalogue intentionally
      // presents them as truth-labelled concepts, so all old variants land on that gallery.
      { source: "/danh-muc-website-:category", destination: "/website/concept", permanent: false },
      { source: "/thiet-ke-website-:category", destination: "/website/concept", permanent: false },
      { source: "/website-:category", destination: "/website/concept", permanent: false },
      { source: "/san-pham-website-:category", destination: "/website/concept", permanent: false },
      // News category pages are represented by the single filterable knowledge hub.
      { source: "/tin-tuc-:category", destination: "/kien-thuc", permanent: false },
      { source: "/chinh-sach-thanh-toan", destination: "/chinh-sach/thanh-toan", permanent: false },
      { source: "/thanh-toan", destination: "/chinh-sach/thanh-toan", permanent: false },
      { source: "/chinh-sach-van-chuyen-va-giao-nhan", destination: "/chinh-sach/van-chuyen-va-giao-nhan", permanent: false },
      { source: "/chinh-sach-bao-mat-thong-tin", destination: "/chinh-sach/bao-mat-thong-tin", permanent: false },
      { source: "/chinh-sach-xu-ly-khieu-nai", destination: "/chinh-sach/xu-ly-khieu-nai", permanent: false },
      { source: "/chinh-sach-bao-hanh", destination: "/chinh-sach/bao-hanh", permanent: false },
      { source: "/chinh-sach-doi-tra-va-hoan-tien", destination: "/chinh-sach/doi-tra-va-hoan-tien", permanent: false },
      { source: "/huong-dan-thanh-toan", destination: "/chinh-sach/thanh-toan", permanent: false },
    ];
  },
};

export default nextConfig;
