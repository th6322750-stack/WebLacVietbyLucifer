import type { Metadata } from "next";
import { Noto_Serif, Inter, Playfair_Display } from "next/font/google";
import { siteSettings } from "@/lib/site-settings";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

// Typography v2 (.webby/TYPOGRAPHY_AUTHORITY.json, revision pha1-typography-v2).
// Noto_Serif_Display + Be_Vietnam_Pro are DEPRECATED_FOR_VISUAL_MATCH: raster glyph matching
// against the approved master showed the visible serif is materially closer to Noto Serif and
// the body/UI face to Inter. Weights are exactly those the authority declares — no synthetic
// weights (qa.syntheticWeightForbidden).
const headingFont = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// V5 direction: the new design board sets headings in Playfair Display. Added alongside the
// v2 heading face rather than replacing it, so routes still on the old direction keep rendering
// exactly as approved while the V5 hero opts in via --font-display.
const displayFont = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.canonicalOrigin),
  title: {
    default: `${siteSettings.brandName} — Website, Support MXH & Dịch vụ số`,
    template: `%s — ${siteSettings.brandName}`,
  },
  description:
    "Lạc Việt Media Agency thiết kế website doanh nghiệp, hỗ trợ mạng xã hội và cung cấp dịch vụ số cho doanh nghiệp Việt Nam.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: siteSettings.brandName,
    images: [{ url: "/assets/v5/brand/og-thumbnail.jpg", width: 1200, height: 630, alt: siteSettings.brandName }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/v5/brand/og-thumbnail.jpg"],
  },
};

// Root layout stays minimal (fonts + shell only) so app/not-found.tsx can render its own
// minimal header/footer (.webby/section-map.json "site-header-minimal"/"site-footer-minimal")
// instead of inheriting the full SiteHeader/SiteFooter from the (site) route group.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${headingFont.variable} ${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
