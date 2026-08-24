import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark, type BrandName } from "@/components/ui/BrandMark";
import { PageHero } from "@/components/layout/PageHero";
import { HeroDigitalStack } from "@/components/layout/HeroDigitalStack";
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

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function DigitalServicesPage() {
  const faqs = getFaqsByScope("dich-vu-so");

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ số"
        // Broken deliberately rather than left to wrap: subject line white, promise line gold,
        // the same two-line shape every other hero uses.
        title={
          <>
            TÀI KHOẢN & DỊCH VỤ SỐ
            <br />
            <span className="text-v5-gold">UY TÍN – AN TOÀN – NHANH CHÓNG</span>
          </>
        }
        description="Lạc Việt cung cấp tài khoản AI, App Premium và dịch vụ tiện ích chính hãng, hỗ trợ nhanh tận tình cho cá nhân và doanh nghiệp."
        heroSlot={<HeroDigitalStack className="w-[86%] max-w-[380px] lg:w-full lg:max-w-[420px]" />}
        cta={<DigitalHeroCta />}
      />

      <Section id="service-category-strip">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((c, idx) => (
              <ScrollReveal key={c.label} direction="up" distance={20} duration={0.6} delay={idx * 100}>
                <div className="flex flex-col items-center gap-3 rounded-xl border border-gold-500/20 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-md md:p-6">
                  <Icon name={c.icon} size="feature" className="text-gold-600" />
                  <p className="text-body font-medium text-ink-950">{c.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="featured-digital-products" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              eyebrow="Sản phẩm nổi bật"
              title="Lựa chọn hàng đầu của khách hàng"
              align="center"
              titleClassName="text-h3-mobile lg:text-h3-desktop"
            />
          </ScrollReveal>
          <div className="mt-6 grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, idx) => (
              <ScrollReveal key={p.name} direction="up" distance={24} duration={0.7} delay={idx * 100}>
                <div
                  className="rounded-xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lg sm:flex sm:flex-col sm:items-center sm:gap-2 sm:p-5 sm:text-center"
                >
                  <div className="flex items-center gap-3 p-3 sm:contents">
                    <span className="shrink-0 sm:contents">
                      <BrandMark name={p.brand} size={36} />
                    </span>
                    <span className="min-w-0 flex-1 sm:contents">
                      <h3 className="text-small font-semibold text-ink-950 sm:font-heading sm:text-body">{p.name}</h3>
                      <p className="text-caption font-semibold text-gold-700 sm:hidden">{p.price}</p>
                    </span>
                  </div>
                  <ul className="hidden flex-col gap-1 self-start text-left sm:flex">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1 text-caption text-text-secondary">
                        <Icon name="check" size="inline" className="mt-px shrink-0 text-gold-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1 hidden text-small text-text-secondary sm:block">
                    {(() => {
                      const m = /^(Từ\s+)?(\S+?)(\/.*)?$/.exec(p.price);
                      if (!m) return p.price;
                      return (
                        <>
                          {m[1]}
                          <span className="text-body font-semibold text-gold-700">{m[2]}</span>
                          {m[3] ? <span> {m[3].replace("/", "/ ")}</span> : null}
                        </>
                      );
                    })()}
                  </p>
                  <div className="hidden px-3 pb-3 sm:block sm:p-0 sm:mt-2">
                    <DigitalProductCta label="Đăng ký ngay" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-6 text-center text-caption text-text-muted">
            Giá minh hoạ, chưa phải bảng giá chính thức đang áp dụng.
          </p>
        </Container>
      </Section>

      <Section id="why-lac-viet" tone="dark">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading onDark eyebrow="Vì sao chọn Lạc Việt?" title="Nhanh – Rõ ràng – Hỗ trợ tận tâm" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item, idx) => (
              <ScrollReveal key={item.label} direction="up" distance={20} duration={0.6} delay={idx * 100}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <Icon name={item.icon} size="feature" className="text-gold-300" />
                  <p className="text-body text-white/85">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="purchase-process" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Quy trình" title="Đơn giản – Nhanh chóng chỉ với 4 bước" align="center" />
          </ScrollReveal>
          <div className="mt-10">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={150}>
              <ProcessSteps steps={processSteps} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section id="trust-metrics" tone="dark">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.7}>
            <MetricStrip
              onDark
              metrics={[
                { value: "200+", label: "Khách hàng tin tưởng", demoOnly: true },
                { value: "350+", label: "Giao dịch thành công", demoOnly: true },
                { value: "4+", label: "Năm kinh nghiệm", demoOnly: true },
                { value: "99%", label: "Khách hàng hài lòng", demoOnly: true },
              ]}
            />
          </ScrollReveal>
        </Container>
      </Section>

      <Section id="faq">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp nhanh những thắc mắc phổ biến" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:gap-8 lg:grid-cols-[1fr_320px]">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={100}>
              <FAQAccordion items={faqs} columns={2} />
            </ScrollReveal>
            <div id="support-card">
              <ScrollReveal direction="up" distance={24} duration={0.7} delay={200}>
                <DigitalSupportCard />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta
        decorated
        visualAssetId="digital-cta-phoenix-approved-crop"
        sourceComponent="digital-final-cta" defaultService="Dịch vụ số / tài khoản" />
    </>
  );
}
