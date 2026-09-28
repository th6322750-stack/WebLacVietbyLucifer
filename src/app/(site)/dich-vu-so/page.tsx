import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark } from "@/components/ui/BrandMark";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { HeroDigitalStack } from "@/components/layout/HeroDigitalStack";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { DigitalHeroCta, DigitalProductCta, DigitalSupportCard } from "./DigitalInteractive";
import { getFaqsByScope } from "@/content/faqs";
import { visibleDigitalOffers } from "@/content/digital-offers";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Dịch vụ số & tài khoản doanh nghiệp | Lạc Việt Media",
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

// 5 icons per approved master — not 3.
const whyUs: { icon: IconName; label: string }[] = [
  { icon: "target", label: "Giao dịch nhanh chóng" },
  { icon: "badge-check", label: "Minh bạch – Rõ ràng" },
  { icon: "shield-check", label: "An toàn – Bảo mật" },
  { icon: "headset", label: "Hỗ trợ tận tâm" },
  { icon: "lightbulb", label: "Tư vấn đúng nhu cầu" },
];

// Quy trình mô tả đúng luồng đang tồn tại (PHUONG_AN §7.4). Bước "Thanh toán — thanh toán an
// toàn, xác nhận nhanh chóng" đã bị gỡ: trang này không có cổng thanh toán nào, mọi nút đều mở
// Zalo. Vẽ ra một bước thanh toán không tồn tại là hứa một trải nghiệm mà khách sẽ không gặp.
const processSteps = [
  { title: "Chọn nhu cầu", description: "Xác định công cụ và quy mô sử dụng phù hợp." },
  { title: "Trao đổi qua Zalo", description: "Nhắn Zalo để thống nhất phạm vi và chi phí." },
  { title: "Xác nhận phương án", description: "Chốt phương án trước khi triển khai." },
  { title: "Bàn giao & hỗ trợ", description: "Hướng dẫn thiết lập và hỗ trợ trong quá trình sử dụng." },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function DigitalServicesPage() {
  const faqs = getFaqsByScope("dich-vu-so");
  const offers = visibleDigitalOffers();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Dịch vụ số / tài khoản", path: "/dich-vu-so" },
        ])}
      />
      <PageHero
        eyebrow="Dịch vụ số"
        breadcrumbs={<Breadcrumbs onDark items={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ số" }]} />}
        // Broken deliberately rather than left to wrap: subject line white, promise line gold,
        // the same two-line shape every other hero uses.
        // PRO V2.1: at h1-desktop size this wrapped mid-unit ("TÀI KHOẢN & DỊCH" / "VỤ SỐ") —
        // break after "&" so "DỊCH VỤ SỐ" stays one line at every width.
        title={
          <>
            TÀI KHOẢN &<br />
            DỊCH VỤ SỐ
            <br />
            <span className="text-v5-gold">UY TÍN – AN TOÀN – NHANH CHÓNG</span>
          </>
        }
        // "chính hãng" đã bị gỡ — đó là tuyên bố về quan hệ với nhà cung cấp mà repo không có
        // bằng chứng nào, và là loại câu có hệ quả pháp lý nếu sai.
        description="Lạc Việt tư vấn và hỗ trợ tài khoản AI, App Premium và các công cụ số phục vụ công việc cho cá nhân và doanh nghiệp."
        heroSlot={<HeroDigitalStack className="w-[86%] max-w-[380px] lg:w-full lg:max-w-[420px]" />}
        cta={<DigitalHeroCta />}
      />

      <PageJumpNav
        items={[
          { href: "#service-category-strip", label: "Nhóm dịch vụ" },
          ...(offers.length > 0 ? [{ href: "#featured-digital-products", label: "Sản phẩm" }] : []),
          { href: "#why-lac-viet", label: "Vì sao Lạc Việt" },
          { href: "#purchase-process", label: "Quy trình" },
          { href: "#faq", label: "Câu hỏi" },
        ]}
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
          {/* Khi khối sản phẩm tự ẩn (giá chưa xác minh), category strip nối thẳng vào section
              tối phía dưới — hai nền tương phản mạnh chạm nhau không có gì đệm. Một câu dẫn ở
              đây vừa lấp nhịp vừa nói đúng việc trang này làm. */}
          <p className="mx-auto mt-8 max-w-editorial text-center text-body text-text-secondary">
            Mỗi nhu cầu được trao đổi trực tiếp để chọn đúng công cụ và phạm vi sử dụng trước khi
            triển khai.
          </p>
        </Container>
      </Section>

      {/* PHUONG_AN §7.4: section tự ẩn khi không có gói nào đủ điều kiện hiển thị. Hôm nay
          `visibleDigitalOffers()` trả về rỗng vì cả bốn gói còn `unverified`, nên khối này
          không render — thay vì render giá minh hoạ kèm một dòng đính chính nhỏ ở cuối, vốn là
          cách nói "giá này không thật" mà gần như không ai đọc. */}
      {offers.length > 0 ? (
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
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {offers.map((p, idx) => (
                <ScrollReveal key={p.name} direction="up" distance={24} duration={0.7} delay={idx * 100}>
                  <div className="flex h-full flex-col rounded-xl border border-gold-500/20 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lg sm:items-center sm:p-6 sm:text-center">
                    <div className="flex w-full items-center gap-3 sm:flex-col sm:gap-3">
                      <BrandMark name={p.brand} size={48} />
                      <div className="min-w-0 flex-1 sm:flex-none">
                        <h3 className="font-heading text-small text-ink-950 sm:mt-1 sm:text-body">{p.name}</h3>
                      </div>
                      <DigitalProductCta label="Nhận tư vấn" compact className="sm:hidden" />
                    </div>

                    <ul className="mt-4 flex w-full flex-col gap-1.5 self-start text-left">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-1 text-caption text-text-secondary">
                          <Icon name="check" size="inline" className="mt-px shrink-0 text-gold-600" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-3 text-small text-text-secondary sm:mt-4">{p.price}</p>

                    <div className="mt-3 hidden w-full sm:block">
                      <DigitalProductCta label="Nhận tư vấn" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="why-lac-viet" tone="dark">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading onDark eyebrow="Vì sao chọn Lạc Việt?" title="Nhanh – Rõ ràng – Hỗ trợ tận tâm" align="center" />
          </ScrollReveal>
          {/* Mobile 2 cột, mục thứ năm chiếm trọn hàng cuối — năm hàng đơn độc xếp dọc là
              khoảng trống nhiều hơn nội dung. */}
          <div className="mt-8 grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-5">
            {whyUs.map((item, idx) => (
              <ScrollReveal key={item.label} direction="up" distance={20} duration={0.6} delay={Math.min(idx, 3) * 100} className={idx === 4 ? "col-span-2 lg:col-span-1" : undefined}>
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

      {/* Section "trust-metrics" đã bị gỡ: 200+ khách hàng / 350+ giao dịch / 4+ năm / 99% hài
          lòng đều tự khai `demoOnly` trong chính dữ liệu của nó, tức là chưa có gì chứng minh.
          PHUONG_AN §6.7 cấm những con số này trên toàn site, không riêng trang chủ. */}

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
