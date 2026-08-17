import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark, type BrandName } from "@/components/ui/BrandMark";
import { PageHero } from "@/components/layout/PageHero";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { MetricStrip } from "@/components/content/MetricStrip";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { DigitalHeroCta, DigitalProductCta } from "./DigitalInteractive";
import { getFaqsByScope } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dịch vụ số / tài khoản",
  description: "Cung cấp và hỗ trợ tài khoản, công cụ số: ChatGPT, Microsoft 365, Canva Pro và nhiều nền tảng khác.",
  path: "/dich-vu-so",
});

const categories: { icon: IconName; label: string }[] = [
  { icon: "sparkles", label: "Công cụ AI" },
  { icon: "monitor-smartphone", label: "Bộ công cụ văn phòng" },
  { icon: "palette", label: "Thiết kế & sáng tạo" },
];

const products: { brand: BrandName; name: string; description: string }[] = [
  { brand: "openai-chatgpt", name: "ChatGPT", description: "Tài khoản và thiết lập sử dụng ChatGPT cho công việc." },
  { brand: "microsoft", name: "Microsoft 365", description: "Bộ công cụ văn phòng đầy đủ cho doanh nghiệp." },
  { brand: "canva", name: "Canva Pro", description: "Công cụ thiết kế nhanh cho đội ngũ marketing." },
];

const whyUs: { icon: IconName; label: string }[] = [
  { icon: "badge-check", label: "Tài khoản chính hãng/uỷ quyền" },
  { icon: "headset", label: "Hỗ trợ trong suốt thời gian sử dụng" },
  { icon: "lightbulb", label: "Hướng dẫn sử dụng rõ ràng" },
];

const processSteps = [
  { title: "Chọn gói phù hợp", description: "Tư vấn công cụ phù hợp nhu cầu và quy mô đội ngũ." },
  { title: "Thiết lập tài khoản", description: "Bàn giao và hướng dẫn thiết lập ban đầu." },
  { title: "Đồng hành hỗ trợ", description: "Hỗ trợ xử lý khi có phát sinh trong quá trình sử dụng." },
];

export default function DigitalServicesPage() {
  const faqs = getFaqsByScope("dich-vu-so");

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ số"
        title="Tài khoản & công cụ số cho công việc hàng ngày"
        description="Cung cấp và hỗ trợ các tài khoản, công cụ số phổ biến giúp đội ngũ làm việc hiệu quả hơn."
        imageAssetId="digital-hero-master"
        imageAlt="Dịch vụ số Lạc Việt Media"
        cta={<DigitalHeroCta />}
      />

      <Section id="service-category-strip">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {categories.map((c) => (
              <div key={c.label} className="flex items-center gap-4 rounded-md border border-border bg-white p-6 shadow-sm">
                <Icon name={c.icon} size="feature" className="text-gold-600" />
                <p className="text-body-lg font-medium text-ink-950">{c.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="featured-digital-products" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Sản phẩm nổi bật" title="Công cụ số được yêu cầu nhiều nhất" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6 text-center shadow-sm">
                <BrandMark name={p.brand} size={40} />
                <h3 className="text-h4-mobile text-ink-950">{p.name}</h3>
                <p className="text-small text-text-secondary">{p.description}</p>
                <DigitalProductCta label="Nhận tư vấn" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="why-lac-viet">
        <Container>
          <SectionHeading eyebrow="Vì sao chọn chúng tôi" title="Cam kết khi sử dụng dịch vụ" align="center" />
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

      <Section id="purchase-process" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Quy trình đăng ký sử dụng" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="trust-metrics" tone="dark">
        <Container>
          <MetricStrip
            onDark
            metrics={[
              { value: "10+", label: "Công cụ hỗ trợ" },
              { value: "24h", label: "Thời gian phản hồi trung bình" },
            ]}
          />
        </Container>
      </Section>

      <Section id="faq">
        <Container width="editorial">
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp về dịch vụ số" align="center" />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </Section>

      <Section id="support-card" tone="ivory">
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-gold-300/60 bg-white p-8 text-center shadow-sm">
            <Icon name="headset" size="feature" className="text-gold-600" />
            <h3 className="text-h4-mobile text-ink-950">Cần hỗ trợ chọn công cụ phù hợp?</h3>
            <p className="max-w-editorial text-body text-text-secondary">
              Đội ngũ Lạc Việt Media sẵn sàng tư vấn công cụ số phù hợp với quy mô và ngân sách của bạn.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="digital-final-cta" defaultService="Dịch vụ số / tài khoản" />
    </>
  );
}
