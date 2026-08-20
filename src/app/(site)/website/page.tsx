import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectPreviewCard } from "@/components/content/ProjectPreviewCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { WebsiteHeroCta, WebsitePackages } from "./WebsiteInteractive";
import { websiteProjectShowcase } from "@/content/route-fixtures";
import { getFaqsByScope } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website doanh nghiệp",
  description:
    "Thiết kế và phát triển website doanh nghiệp chuyên nghiệp, chuẩn SEO, tối ưu tốc độ và chuyển đổi.",
  path: "/website",
});

// 6 industries per approved master (page-04) — not 4.
const industries: { icon: IconName; label: string }[] = [
  { icon: "building", label: "Doanh nghiệp nhỏ & vừa" },
  { icon: "shopping-bag", label: "Cửa hàng, bán lẻ" },
  { icon: "map-pin", label: "Bất động sản" },
  { icon: "calendar", label: "Dịch vụ, sự kiện" },
  { icon: "lightbulb", label: "Giáo dục, đào tạo" },
  { icon: "users", label: "Doanh nghiệp, phi lợi nhuận" },
];

// 5 benefits per approved master — not 4.
const benefits: { icon: IconName; label: string }[] = [
  { icon: "badge-check", label: "Tăng uy tín thương hiệu" },
  { icon: "target", label: "Tối ưu chuyển đổi" },
  { icon: "percent", label: "Chuẩn SEO – bứt phá top tìm kiếm" },
  { icon: "shield-check", label: "Bảo mật & ổn định" },
  { icon: "headset", label: "Bàn giao – đào tạo" },
];

// 6-step process per approved master — not 4.
const processSteps = [
  { title: "Tư vấn & khảo sát", description: "Tìm hiểu mục tiêu kinh doanh và đối tượng khách hàng." },
  { title: "Đề xuất giải pháp", description: "Xây dựng phương án phù hợp ngân sách và thời gian." },
  { title: "Thiết kế giao diện", description: "Xây dựng giao diện riêng theo nhận diện thương hiệu." },
  { title: "Lập trình & tối ưu", description: "Phát triển và tối ưu hiệu năng, chuẩn SEO." },
  { title: "Kiểm thử và bàn giao", description: "Kiểm thử kỹ trước khi bàn giao chính thức." },
  { title: "Hỗ trợ & bảo trì", description: "Đồng hành hỗ trợ kỹ thuật sau bàn giao." },
];

// 4 packages with demo pricing per approved master (demoOnly — .webby/CONTENT_TRUTH.json;
// real production prices require Lucifer verification before PRODUCTION_READY).
const packages = [
  {
    plan: "Website Doanh nghiệp",
    demoOnly: true as const,
    description: "Phù hợp doanh nghiệp cần hiện diện website chuyên nghiệp.",
    price: "Từ 8.900.000đ",
    features: ["Thiết kế theo mẫu tối ưu", "Tối đa 5 trang nội dung", "Chuẩn SEO cơ bản"],
  },
  {
    plan: "Landing Page",
    demoOnly: true as const,
    description: "Phù hợp chiến dịch quảng cáo, giới thiệu sản phẩm/dịch vụ.",
    price: "Từ 4.900.000đ",
    features: ["1 trang chuyển đổi cao", "Tối ưu tốc độ tải", "Tích hợp form thu lead"],
  },
  {
    plan: "Website Bán hàng",
    demoOnly: true as const,
    description: "Phù hợp doanh nghiệp cần bán hàng trực tuyến đầy đủ tính năng.",
    price: "Từ 13.900.000đ",
    features: ["Giỏ hàng & thanh toán", "Quản trị sản phẩm", "Tối ưu SEO nâng cao", "Hỗ trợ ưu tiên"],
    featured: true,
  },
  {
    plan: "Website Theo Yêu Cầu",
    demoOnly: true as const,
    description: "Phù hợp hệ thống phức tạp, tích hợp nhiều dịch vụ riêng.",
    price: "Liên hệ báo giá",
    features: ["Kiến trúc tuỳ chỉnh", "Tích hợp hệ thống/API riêng", "Đội ngũ đồng hành dài hạn"],
  },
];

export default function WebsitePage() {
  const faqs = getFaqsByScope("website");

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ Website"
        title="Thiết kế Website chuẩn đẹp – hiệu quả cho doanh nghiệp"
        description="Lạc Việt tạo ra những website chuyên nghiệp, chuẩn SEO, tối ưu trải nghiệm người dùng và chuyển đổi — giúp doanh nghiệp bứt phá xây dựng thương hiệu vững chắc trên môi trường số."
        imageAssetId="website-hero-master"
        imageAlt="Website doanh nghiệp Lạc Việt Media"
        cta={<WebsiteHeroCta />}
      />

      <Section id="industry-fit-grid">
        <Container>
          <SectionHeading eyebrow="Doanh nghiệp ở mọi quy mô" title="Doanh nghiệp ở mọi quy mô, mọi lĩnh vực" align="center" />
          <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-4 text-center shadow-sm md:p-6">
                <Icon name={item.icon} size="feature" className="text-gold-600" />
                <p className="text-small font-medium text-text-primary">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="website-packages" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Gói dịch vụ" title="Chọn gói phù hợp nhu cầu của bạn" align="center" />
          <WebsitePackages packages={packages} />
        </Container>
      </Section>

      <Section id="benefit-strip" tone="dark">
        <Container>
          <SectionHeading onDark eyebrow="Lợi ích khi tạo website cùng Lạc Việt" title="Tạo nền tảng số vững chắc – bứt phá tăng trưởng" align="center" />
          <div className="mt-8 grid grid-cols-2 gap-5 md:gap-8 md:grid-cols-3 lg:grid-cols-5">
            {benefits.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-3 text-center">
                <Icon name={b.icon} size="feature" className="text-gold-300" />
                <p className="text-small text-white/85">{b.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="website-projects">
        <Container>
          <SectionHeading eyebrow="Dự án" title="Website đã triển khai" align="center" />
          <div className="mt-8 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {websiteProjectShowcase.map((p) => (
              <ProjectPreviewCard key={p.title} preview={p} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="website-process" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Quy trình triển khai website" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="faq">
        <Container width="editorial">
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp về dịch vụ website" align="center" />
          <div className="mt-10">
            <FAQAccordion items={faqs} columns={2} />
          </div>
        </Container>
      </Section>

      <FinalCta variant="strip" sourceComponent="website-final-cta" defaultService="Website doanh nghiệp" />
    </>
  );
}
