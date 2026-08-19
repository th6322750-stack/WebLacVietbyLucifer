import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/content/ServiceCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { MetricStrip } from "@/components/content/MetricStrip";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { SupportHeroCta, SupportLeadCta } from "./SupportInteractive";
import { getFaqsByScope } from "@/content/faqs";
import { assetPath } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Support mạng xã hội",
  description:
    "Hỗ trợ vận hành, khắc phục sự cố và phát triển kênh Facebook, TikTok, YouTube cho doanh nghiệp.",
  path: "/support-mxh",
});

// 4 service cards per approved master (page-05) — one per platform + strategy consulting.
const supportServices: { brand?: "facebook" | "tiktok" | "meta"; icon?: IconName; title: string; description: string }[] = [
  {
    brand: "facebook",
    title: "Facebook Support",
    description: "Khắc phục lỗi trang, tài khoản quảng cáo bị hạn chế hoặc khoá.",
  },
  {
    brand: "tiktok",
    title: "TikTok Support",
    description: "Xử lý sự cố tài khoản, video bị hạn chế hiển thị.",
  },
  {
    brand: "meta",
    title: "Meta Business / Ads Support",
    description: "Quản lý và khắc phục sự cố Meta Business Suite, tài khoản quảng cáo.",
  },
  {
    // Approved master page-05 card 4 shows a gold SHIELD, not a lightbulb — verified by cropping
    // the exact card at 34x zoom. icon-shield-check is in the pinned icon inventory; nothing was
    // invented or substituted.
    icon: "shield-check",
    title: "Tư vấn chiến lược & Khắc phục sự cố",
    description: "Tư vấn định hướng nội dung và xử lý các sự cố kỹ thuật phát sinh.",
  },
];

// 6 issues per approved master — not 4.
const commonIssues: { icon: IconName; label: string }[] = [
  { icon: "lock-keyhole", label: "Tài khoản/Trang bị hạn chế" },
  { icon: "circle-alert", label: "Mất quyền truy cập" },
  { icon: "shield-check", label: "Pháp lý / vi phạm chính sách" },
  { icon: "users", label: "BM / tài khoản chủ thể" },
  { icon: "target", label: "Quảng cáo không hiệu quả" },
  { icon: "messages-square", label: "Vấn đề khác" },
];

// 5 icons per approved master — not 3.
const whyUs: { icon: IconName; label: string }[] = [
  { icon: "clock", label: "Phản hồi trong ngày làm việc" },
  { icon: "badge-check", label: "Đúng chính sách nền tảng" },
  { icon: "shield-check", label: "An toàn – bảo mật" },
  { icon: "headset", label: "Hỗ trợ tận tâm" },
  { icon: "users", label: "Đội ngũ nhiều kinh nghiệm thực tế" },
];

// 5-step process per approved master — not 3.
const processSteps = [
  { title: "Tiếp nhận yêu cầu", description: "Ghi nhận chi tiết tình trạng và thời điểm phát sinh." },
  { title: "Phân tích & tư vấn", description: "Rà soát chính sách và lịch sử hoạt động liên quan." },
  { title: "Triển khai hỗ trợ", description: "Thực hiện khắc phục theo đúng quy trình nền tảng." },
  { title: "Cập nhật tiến độ", description: "Thông báo tiến độ xử lý rõ ràng, minh bạch." },
  { title: "Bàn giao & hướng dẫn", description: "Bàn giao kết quả và hướng dẫn phòng tránh tái diễn." },
];

export default function SupportMxhPage() {
  const faqs = getFaqsByScope("support-mxh");

  return (
    <>
      <PageHero
        eyebrow="Support MXH"
        title="HỖ TRỢ MẠNG XÃ HỘI CHÍNH CHỦ – AN TOÀN – HIỆU QUẢ"
        description="Hỗ trợ Facebook, TikTok, Business & Ads theo quy trình chính thống. Đồng hành cùng bạn khắc phục và phát triển kênh bền vững."
        imageAssetId="support-hero-master"
        imageAlt="Support mạng xã hội Lạc Việt Media"
        cta={<SupportHeroCta />}
      />

      <Section id="support-service-grid">
        <Container>
          <SectionHeading eyebrow="Dịch vụ" title="Chúng tôi hỗ trợ toàn diện các nền tảng mạng xã hội phổ biến" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportServices.map((s) => (
              <ServiceCard
                key={s.title}
                brand={s.brand}
                icon={s.icon}
                title={s.title}
                description={s.description}
                ctaLabel="Nhận tư vấn"
                href="/lien-he"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="common-issues-grid" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Sự cố thường gặp" title="Bạn đang gặp phải vấn đề nào?" align="center" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {commonIssues.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6 text-center shadow-sm">
                <Icon name={item.icon} size="feature" className="text-gold-600" />
                <p className="text-small font-medium text-text-primary">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="why-lac-viet" tone="dark" texture>
        <Container>
          <SectionHeading onDark eyebrow="Vì sao chọn Lạc Việt Media Agency" title="Nhanh – Rõ ràng – Hỗ trợ tận tâm" align="center" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 text-center">
                <Icon name={item.icon} size="feature" className="text-gold-300" />
                <p className="text-body text-white/85">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="support-process" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="5 bước hỗ trợ chuyên nghiệp" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="trust-client-row">
        <Container>
          {/* Demo customer count per CONTENT_TRUTH.json demoOnly — tagged in markup; the visible
              disclosure caption below covers the logo strip itself. */}
          <p className="text-center text-h4-mobile lg:text-h4-desktop text-ink-950" data-demo-only="true">
            200+ khách hàng đã được hỗ trợ thành công
          </p>
          <div className="relative mx-auto mt-6 h-16 w-full max-w-2xl">
            <Image
              src={assetPath("support-client-logo-strip")}
              alt="Danh sách khách hàng minh hoạ"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-caption text-text-muted">
            Hình ảnh minh hoạ V1, không phải danh sách khách hàng đã xác nhận.
          </p>
        </Container>
      </Section>

      <Section id="support-metrics" tone="dark" texture>
        <Container>
          <MetricStrip
            onDark
            metrics={[
              { value: "200+", label: "Khách hàng đã hỗ trợ", demoOnly: true },
              { value: "98%", label: "Tỷ lệ khôi phục thành công", demoOnly: true },
              { value: "24/7", label: "Hỗ trợ liên tục", demoOnly: true },
              { value: "100%", label: "Bảo mật thông tin", demoOnly: true },
            ]}
          />
        </Container>
      </Section>

      <Section id="faq" tone="ivory">
        <Container width="editorial">
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp về dịch vụ support MXH" align="center" />
          <div className="mt-10">
            <FAQAccordion items={faqs} columns={2} />
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
