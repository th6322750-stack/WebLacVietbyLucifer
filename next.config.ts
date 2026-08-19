import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
