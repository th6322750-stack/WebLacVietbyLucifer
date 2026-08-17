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
import { DigitalHeroCta, DigitalProductCta, DigitalSupportCard } from "./DigitalInteractive";
import { getFaqsByScope } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dịch vụ số / tài khoản",
  description: "Cung cấp và hỗ trợ tài khoản, công cụ số: ChatGPT, Microsoft 365, Canva Pro và nhiều nền tảng khác.",
  path: "/dich-vu-so",
});

// 4 category icons per approved master (page-06) — not 3.
const categories: { icon: IconName; label: string }[] = [
  { icon: "sparkles", label: "Tài khoản AI" },
  { icon: "sparkles", label: "App Premium" },
  { icon: "shield-check", label: "Dịch vụ bảo mật" },
  { icon: "headset", label: "Gói hỗ trợ" },
];

// 4 products incl. YouTube Premium per approved master + ASSET_USAGE_MAP.json brandMarks
// (openai-chatgpt/youtube/microsoft/canva) — not 3. Demo pricing, demoOnly in data model.
const products: { brand: BrandName; name: string; price: string; features: string[]; demoOnly: boolean }[] = [
  {
    brand: "openai-chatgpt",
    name: "ChatGPT Plus",
    price: "Từ 199.000đ/tháng",
    features: ["Tài khoản uy tín", "Hàng đầu thị trường", "Bảo hành 24/7"],
    demoOnly: true,
  },
  {
    brand: "youtube",
    name: "YouTube Premium",
    price: "Từ 79.000đ/tháng",
    features: ["Không quảng cáo", "Nghe nhạc nền", "Bảo hành 1 đổi 1"],
    demoOnly: true,
  },
  {
    brand: "microsoft",
    name: "Microsoft 365",
    price: "Từ 349.000đ/tháng",
    features: ["Bản quyền chính hãng", "Đầy đủ ứng dụng", "Dung lượng đám mây"],
    demoOnly: true,
  },
  {
    brand: "canva",
    name: "Canva Pro",
    price: "Từ 89.000đ/tháng",
    features: ["Canva Pro chính chủ", "Đầy đủ tính năng", "Hỗ trợ nhanh chóng"],
    demoOnly: true,
  },
];

// 5 icons per approved master — not 3.
const whyUs: { icon: IconName; label: string }[] = [
  { icon: "target", label: "Giao dịch nhanh chóng" },
  { icon: "badge-check", label: "Minh bạch – Rõ ràng" },
  { icon: "shield-check", label: "An toàn – Bảo mật" },
  { icon: "headset", label: "Hỗ trợ tận tâm" },
  { icon: "lightbulb", label: "Tư vấn đúng nhu cầu" },
];

// 4-step process per approved master — already 3, add "Hỗ trợ sau bán".
const processSteps = [
  { title: "Chọn dịch vụ", description: "Chọn công cụ phù hợp nhu cầu và quy mô đội ngũ." },
  { title: "Thanh toán", description: "Thanh toán an toàn, xác nhận nhanh chóng." },
  { title: "Nhận tài khoản", description: "Bàn giao và hướng dẫn thiết lập ban đầu." },
  { title: "Hỗ trợ sau bán", description: "Đồng hành xử lý khi có phát sinh trong quá trình sử dụng." },
];

export default function DigitalServicesPage() {
  const faqs = getFaqsByScope("dich-vu-so");

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ số"
        title="TÀI KHOẢN & DỊCH VỤ SỐ UY TÍN – AN TOÀN – NHANH CHÓNG"
        description="Lạc Việt cung cấp tài khoản AI, App Premium và dịch vụ tiện ích chính hãng, hỗ trợ nhanh tận tình cho cá nhân và doanh nghiệp."
        imageAssetId="digital-hero-master"
        imageAlt="Dịch vụ số Lạc Việt Media"
        cta={<DigitalHeroCta />}
      />

      <Section id="service-category-strip">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6 text-center shadow-sm">
                <Icon name={c.icon} size="feature" className="text-gold-600" />
                <p className="text-body font-medium text-ink-950">{c.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="featured-digital-products" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Sản phẩm nổi bật" title="Lựa chọn hàng đầu của khách hàng" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6 text-center shadow-sm">
                <BrandMark name={p.brand} size={40} />
                <h3 className="text-h4-mobile text-ink-950">{p.name}</h3>
                <ul className="flex flex-col gap-1.5 self-start text-left">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-small text-text-secondary">
                      <Icon name="check" size="inline" className="mt-0.5 shrink-0 text-gold-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-h4-mobile font-heading text-gold-700">{p.price}</p>
                <DigitalProductCta label="Đăng ký ngay" />
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-caption text-text-muted">
            Giá minh hoạ, chưa phải bảng giá chính thức đang áp dụng.
          </p>
        </Container>
      </Section>

      <Section id="why-lac-viet" tone="dark">
        <Container>
          <SectionHeading onDark eyebrow="Vì sao chọn Lạc Việt?" title="Nhanh – Rõ ràng – Hỗ trợ tận tâm" align="center" />
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

      <Section id="purchase-process" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Đơn giản – Nhanh chóng chỉ với 4 bước" align="center" />
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
              { value: "200+", label: "Khách hàng tin tưởng", demoOnly: true },
              { value: "350+", label: "Giao dịch thành công", demoOnly: true },
              { value: "4+", label: "Năm kinh nghiệm", demoOnly: true },
              { value: "99%", label: "Khách hàng hài lòng", demoOnly: true },
            ]}
          />
        </Container>
      </Section>

      <Section id="faq">
        <Container>
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp nhanh những thắc mắc phổ biến" align="center" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <FAQAccordion items={faqs} />
            <div id="support-card">
              <DigitalSupportCard />
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="digital-final-cta" defaultService="Dịch vụ số / tài khoản" />
    </>
  );
}
