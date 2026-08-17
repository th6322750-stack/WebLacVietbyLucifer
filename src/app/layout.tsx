import type { Metadata } from "next";
import { Noto_Serif_Display, Be_Vietnam_Pro } from "next/font/google";
import { siteSettings } from "@/lib/site-settings";
import "./globals.css";

const headingFont = Noto_Serif_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Be_Vietnam_Pro({
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
  },
};

// Root layout stays minimal (fonts + shell only) so app/not-found.tsx can render its own
// minimal header/footer (.webby/section-map.json "site-header-minimal"/"site-footer-minimal")
// instead of inheriting the full SiteHeader/SiteFooter from the (site) route group.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
