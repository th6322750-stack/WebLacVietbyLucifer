import { PortfolioExperienceV2 } from "../(site)/du-an/preview/PortfolioExperienceV2";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  ...pageMetadata({
    title: "Hồ sơ năng lực 2026 | Lạc Việt",
    description: "Khám phá năng lực thiết kế thương hiệu, website và trải nghiệm số của Lạc Việt qua 18 chương và ba dự án concept. Xem online hoặc tải hồ sơ PDF.",
    path: "/ho-so-nang-luc",
    ogImagePath: "/assets/portfolio-2026/profile-share-v13.png",
  }),
  title: { absolute: "Hồ sơ năng lực 2026 | Lạc Việt Media Agency" },
};

export default function CompanyProfilePage() {
  return <>
    <a href="#main-content" className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:bg-white focus-visible:p-4 focus-visible:text-black">Đến hồ sơ năng lực</a>
    <main id="main-content">
      <PortfolioExperienceV2 />
    </main>
    <JsonLd data={breadcrumbJsonLd([{name:"Trang chủ",path:"/"},{name:"Hồ sơ năng lực",path:"/ho-so-nang-luc"}])} />
  </>;
}
