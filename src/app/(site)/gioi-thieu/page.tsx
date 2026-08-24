import { Container } from "@/components/ui/Container";
import { StarField } from "@/components/layout/StarField";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Giới thiệu",
  description: `Tìm hiểu về ${siteSettings.brandName} — đối tác số toàn diện cho doanh nghiệp Việt Nam.`,
  path: "/gioi-thieu",
});

// 3 principles per approved master (page-09): Liêm + Chính are one combined item, not two.
const principles: { word: string; meaning: string; icon: IconName }[] = [
  { word: "Cần", meaning: "Làm việc tận tâm, chăm chỉ, luôn nỗ lực hơn mỗi ngày.", icon: "clock" },
  { word: "Kiệm", meaning: "Tối ưu chi phí, tối ưu thời gian, mang lại giá trị xứng đáng.", icon: "package" },
  { word: "Liêm Chính", meaning: "Minh bạch, trung thực, đặt lợi ích khách hàng lên hàng đầu.", icon: "shield-check" },
];

// 4-card ecosystem per approved master — not 3; adds a consulting/strategy card with its
// own icon so no card reuses another's icon.
const ecosystem: { title: string; description: string; icon: IconName; href: string }[] = [
  { title: "Thiết kế Website", description: "Web doanh nghiệp, landing page, booking, web app...", icon: "monitor-smartphone", href: "/website" },
  { title: "Support Mạng Xã Hội", description: "Hỗ trợ khôi phục, bảo mật, phát triển kênh Facebook, TikTok...", icon: "messages-square", href: "/support-mxh" },
  { title: "Dịch vụ số", description: "Cung cấp tài khoản, phần mềm và dịch vụ số uy tín, giá tốt.", icon: "package", href: "/dich-vu-so" },
  { title: "Tư vấn & Chiến lược", description: "Tư vấn giải pháp số, marketing, xây dựng thương hiệu online.", icon: "lightbulb", href: "/lien-he" },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />

      <Container className="py-4">
        <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]} />
      </Container>

      {/* about-hero + principles are one composition per approved master (page-09) */}
      <section id="about-hero">
        <div className="relative overflow-hidden bg-black">
          <StarField />
          <Container className="relative py-10 md:py-12 lg:py-16">
            <ScrollReveal direction="down" distance={16} duration={0.6}>
              <p className="text-eyebrow uppercase text-v5-gold">{siteSettings.brandName}</p>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={20} duration={0.7} delay={100}>
              <h1 className="mt-3 text-h2-mobile font-heading uppercase text-white lg:text-[26px] lg:leading-[1.16] xl:text-[29px] ultra:text-[35px]">
                Giải pháp số được xây dựng bằng
                <br />
                <span className="text-v5-gold">sự tận tâm và minh bạch</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={16} duration={0.7} delay={200}>
              <p className="mt-5 max-w-editorial text-body-lg text-white/80">
                Chúng tôi tin rằng, sự tử tế và minh bạch là nền tảng để tạo nên những sản phẩm
                chất lượng và mối quan hệ bền vững.
              </p>
            </ScrollReveal>
          </Container>
        </div>

        <Container>
          <div id="principles" className="grid gap-6 border-t border-border py-10 md:grid-cols-3">
            {principles.map((p, idx) => (
              <ScrollReveal key={p.word} direction="up" distance={20} duration={0.6} delay={idx * 100}>
                <div className="flex items-start gap-4">
                  <Icon name={p.icon} size="feature" className="mt-1 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-h4-mobile font-heading text-ink-950">{p.word}</p>
                    <p className="mt-1 text-small text-text-secondary">{p.meaning}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <Section id="service-ecosystem" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Hệ sinh thái dịch vụ" title="Chúng tôi cung cấp giải pháp toàn diện cho cá nhân & doanh nghiệp" align="center" />
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.map((s, idx) => (
              <ScrollReveal key={s.title} direction="up" distance={24} duration={0.7} delay={idx * 100}>
                <ServiceCard mobileRow icon={s.icon} title={s.title} description={s.description} ctaLabel="Xem chi tiết" href={s.href} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="brand-story">
        <Container width="editorial">
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Câu chuyện thương hiệu" title={`Vì sao là "${siteSettings.brandName}"`} />
            <p className="mt-4 text-body-lg text-text-secondary">
              Tên gọi Lạc Việt gắn với cội nguồn văn hoá Việt Nam — biểu tượng chim Lạc và trống
              đồng trong bộ nhận diện là lời nhắc về gốc rễ đó, đặt trong một hình ảnh hiện đại,
              gọn gàng và dễ tiếp cận cho doanh nghiệp hôm nay.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      <FinalCta sourceComponent="about-final-cta" />
    </>
  );
}
