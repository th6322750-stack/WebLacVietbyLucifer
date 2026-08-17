import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCard } from "@/components/content/ProjectCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { WebsiteHeroCta, WebsitePackages } from "./WebsiteInteractive";
import { projects } from "@/content/projects";
import { getFaqsByScope } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website doanh nghiệp",
  description:
    "Thiết kế và phát triển website doanh nghiệp chuyên nghiệp, chuẩn SEO, tối ưu tốc độ và chuyển đổi.",
  path: "/website",
});

const industries: { icon: IconName; label: string }[] = [
  { icon: "building", label: "Doanh nghiệp dịch vụ" },
  { icon: "shopping-bag", label: "Bán lẻ & thương mại" },
  { icon: "briefcase", label: "Tư vấn chuyên môn" },
  { icon: "package", label: "Sản xuất & phân phối" },
];

const benefits: { icon: IconName; label: string }[] = [
  { icon: "shield-check", label: "Bảo mật & ổn định" },
  { icon: "monitor-smartphone", label: "Tối ưu mọi thiết bị" },
  { icon: "percent", label: "Chuẩn SEO on-page" },
  { icon: "headset", label: "Hỗ trợ sau bàn giao" },
];

const websiteProjects = projects.filter((p) => p.category === "Website").slice(0, 4);

const processSteps = [
  { title: "Khảo sát nhu cầu", description: "Tìm hiểu mục tiêu kinh doanh và đối tượng khách hàng." },
  { title: "Thiết kế giao diện", description: "Xây dựng giao diện riêng theo nhận diện thương hiệu." },
  { title: "Phát triển & kiểm thử", description: "Lập trình và kiểm thử kỹ trước khi bàn giao." },
  { title: "Bàn giao & hỗ trợ", description: "Hướng dẫn quản trị và hỗ trợ kỹ thuật sau bàn giao." },
];

const packages = [
  {
    plan: "Cơ bản",
    description: "Phù hợp doanh nghiệp mới cần hiện diện website chuyên nghiệp.",
    features: ["Thiết kế theo mẫu tối ưu", "Tối đa 5 trang nội dung", "Chuẩn SEO cơ bản"],
  },
  {
    plan: "Chuyên nghiệp",
    description: "Phù hợp doanh nghiệp cần website riêng và nhiều tính năng hơn.",
    features: ["Thiết kế riêng theo thương hiệu", "Không giới hạn trang nội dung", "Tối ưu SEO nâng cao", "Hỗ trợ ưu tiên"],
    featured: true,
  },
  {
    plan: "Doanh nghiệp",
    description: "Phù hợp doanh nghiệp cần hệ thống phức tạp, tích hợp nhiều dịch vụ.",
    features: ["Kiến trúc tuỳ chỉnh", "Tích hợp hệ thống/API riêng", "Đội ngũ đồng hành dài hạn"],
  },
];

export default function WebsitePage() {
  const faqs = getFaqsByScope("website");

  return (
    <>
      <PageHero
        eyebrow="Website"
        title="Website doanh nghiệp chuyên nghiệp, chuẩn SEO"
        description="Thiết kế và phát triển website giúp doanh nghiệp xây dựng hình ảnh chuyên nghiệp và tăng chuyển đổi từ khách truy cập."
        imageAssetId="website-hero-master"
        imageAlt="Website doanh nghiệp Lạc Việt Media"
        cta={<WebsiteHeroCta />}
      />

      <Section id="industry-fit-grid">
        <Container>
          <SectionHeading eyebrow="Phù hợp với" title="Website phù hợp với nhiều lĩnh vực" align="center" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {industries.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6 text-center shadow-sm">
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
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {websiteProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
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
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="website-final-cta" defaultService="Website doanh nghiệp" />
    </>
  );
}
