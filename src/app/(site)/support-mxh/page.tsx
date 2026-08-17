import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/content/ServiceCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { MetricStrip } from "@/components/content/MetricStrip";
import { TrustLogoRow } from "@/components/content/TrustLogoRow";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { SupportHeroCta, SupportLeadCta } from "./SupportInteractive";
import { getFaqsByScope } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Support mạng xã hội",
  description:
    "Hỗ trợ vận hành, khắc phục sự cố và phát triển kênh Facebook, TikTok, YouTube cho doanh nghiệp.",
  path: "/support-mxh",
});

const supportServices = [
  {
    icon: "shield-check" as IconName,
    title: "Xử lý sự cố tài khoản",
    description: "Khắc phục lỗi trang, nhóm, tài khoản quảng cáo bị hạn chế hoặc khoá.",
  },
  {
    icon: "sparkles" as IconName,
    title: "Tối ưu nội dung",
    description: "Tư vấn nội dung và tần suất đăng bài để tăng tương tác tự nhiên.",
  },
  {
    icon: "target" as IconName,
    title: "Chiến lược kênh",
    description: "Xây dựng định hướng nội dung phù hợp mục tiêu kinh doanh.",
  },
];

const commonIssues: { icon: IconName; label: string }[] = [
  { icon: "lock-keyhole", label: "Tài khoản bị khoá/hạn chế" },
  { icon: "circle-alert", label: "Quảng cáo bị từ chối duyệt" },
  { icon: "messages-square", label: "Tương tác sụt giảm bất thường" },
  { icon: "shield-check", label: "Nghi ngờ vi phạm chính sách" },
];

const whyUs: { icon: IconName; label: string }[] = [
  { icon: "clock", label: "Phản hồi trong ngày làm việc" },
  { icon: "badge-check", label: "Đúng chính sách nền tảng" },
  { icon: "users", label: "Đội ngũ nhiều kinh nghiệm thực tế" },
];

const processSteps = [
  { title: "Tiếp nhận sự cố", description: "Ghi nhận chi tiết tình trạng và thời điểm phát sinh." },
  { title: "Phân tích nguyên nhân", description: "Rà soát chính sách và lịch sử hoạt động liên quan." },
  { title: "Xử lý & theo dõi", description: "Thực hiện khắc phục và theo dõi đến khi ổn định." },
];

export default function SupportMxhPage() {
  const faqs = getFaqsByScope("support-mxh");

  return (
    <>
      <PageHero
        eyebrow="Support MXH"
        title="Vận hành mạng xã hội ổn định, xử lý sự cố kịp thời"
        description="Hỗ trợ khắc phục sự cố và phát triển các kênh Facebook, TikTok, YouTube cho doanh nghiệp."
        imageAssetId="support-hero-master"
        imageAlt="Support mạng xã hội Lạc Việt Media"
        cta={<SupportHeroCta />}
      />

      <Section id="support-service-grid">
        <Container>
          <SectionHeading eyebrow="Dịch vụ" title="Chúng tôi hỗ trợ những gì" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {supportServices.map((s) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} ctaLabel="Nhận tư vấn" href="/lien-he" />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="common-issues-grid" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Sự cố thường gặp" title="Những vấn đề chúng tôi thường xử lý" align="center" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {commonIssues.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6 text-center shadow-sm">
                <Icon name={item.icon} size="feature" className="text-gold-600" />
                <p className="text-small font-medium text-text-primary">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="why-lac-viet">
        <Container>
          <SectionHeading eyebrow="Vì sao chọn chúng tôi" title="Lý do doanh nghiệp tin tưởng Lạc Việt Media" align="center" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {whyUs.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 text-center">
                <Icon name={item.icon} size="feature" className="text-gold-600" />
                <p className="text-body text-text-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="support-process" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Quy trình xử lý sự cố" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="trust-client-row">
        <Container>
          <p className="text-center text-eyebrow uppercase text-text-muted">Nền tảng chúng tôi hỗ trợ</p>
          <div className="mt-6">
            <TrustLogoRow brands={["facebook", "tiktok", "meta", "youtube"]} />
          </div>
        </Container>
      </Section>

      <Section id="support-metrics" tone="dark">
        <Container>
          <MetricStrip
            onDark
            metrics={[
              { value: "24h", label: "Thời gian phản hồi trung bình" },
              { value: "100+", label: "Sự cố đã xử lý" },
              { value: "4", label: "Nền tảng hỗ trợ chính" },
            ]}
          />
        </Container>
      </Section>

      <Section id="faq" tone="ivory">
        <Container width="editorial">
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp về dịch vụ support MXH" align="center" />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </Section>

      <Section id="support-lead-cta">
        <Container>
          <SupportLeadCta />
        </Container>
      </Section>

      <FinalCta sourceComponent="support-impact-cta" defaultService="Support mạng xã hội" />
    </>
  );
}
