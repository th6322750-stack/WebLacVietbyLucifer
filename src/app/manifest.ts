import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/site-settings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSettings.brandName,
    short_name: "Lạc Việt",
    description:
      "Thiết kế website doanh nghiệp, hỗ trợ mạng xã hội và dịch vụ số cho doanh nghiệp Việt Nam.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0B",
    theme_color: "#0B0B0B",
    icons: [{ src: "/icon.png", type: "image/png", sizes: "512x512" }],
  };
}
