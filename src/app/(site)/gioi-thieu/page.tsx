import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { StarField } from "@/components/layout/StarField";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { siteSettings } from "@/lib/site-settings";
import { assetPath, assetSize } from "@/lib/assets";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

// Ẩn khỏi menu, footer và sitemap (2026-09-02). Route giữ nguyên để link đã phát tán hoặc
// kết quả tìm kiếm cũ không rơi vào 404; `noindex` để trang rụng dần khỏi Google thay vì
// vẫn kéo khách vào một trang không còn được dẫn tới từ đâu trong site.
export const metadata = pageMetadata({
  title: "Giới thiệu",
  description: `Tìm hiểu về ${siteSettings.brandName} — đối tác số toàn diện cho doanh nghiệp Việt Nam.`,
  path: "/gioi-thieu",
  noindex: true,
});

// 3 principles per approved master (page-09): Liêm + Chính are one combined item, not two.
const principles: { word: string; meaning: string; icon: IconName }[] = [
  { word: "Cần", meaning: "Làm việc tận tâm, chăm chỉ, luôn nỗ lực hơn mỗi ngày.", icon: "clock" },
  { word: "Kiệm", meaning: "Tối ưu chi phí, tối ưu thời gian, mang lại giá trị xứng đáng.", icon: "package" },
  { word: "Liêm Chính", meaning: "Minh bạch, trung thực, đặt lợi ích khách hàng lên hàng đầu.", icon: "shield-check" },
];

// PRO V2.2 §3: a "brand journey" without inventing dates the business doesn't have. No founding
// year, no milestone dates exist to tell honestly, so this is staged by IDEA (cội nguồn → tinh
// thần → cách làm việc → năng lực hôm nay → hướng phát triển) rather than a fabricated timeline —
// each stage restates something already said elsewhere on this page/site in real terms, not a
// new claim.
const journey: { stage: string; title: string; description: string }[] = [
  {
    stage: "Cội nguồn",
    title: "Tên gọi Lạc Việt",
    description: "Gắn với cội nguồn văn hoá Việt Nam — chim Lạc và trống đồng là lời nhắc về gốc rễ đó.",
  },
  {
    stage: "Tinh thần",
    title: "Cần – Kiệm – Liêm Chính",
    description: "Tận tâm, tối ưu giá trị, minh bạch và trung thực trong từng việc làm với khách hàng.",
  },
  {
    stage: "Cách làm việc",
    title: "Đặt lợi ích khách hàng lên trước",
    description: "Tư vấn đúng nhu cầu thực tế, báo giá minh bạch theo phạm vi, đồng hành sau bàn giao.",
  },
  {
    stage: "Năng lực hôm nay",
    title: "Hệ sinh thái dịch vụ số",
    description: "Website, support mạng xã hội, dịch vụ số và tư vấn chiến lược cho doanh nghiệp Việt.",
  },
  {
    stage: "Hướng phát triển",
    title: "Đồng hành dài hạn",
    description: "Mở rộng năng lực và chất lượng dịch vụ theo đúng nhu cầu thực tế của khách hàng.",
  },
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
          <Container className="relative grid gap-8 py-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:items-center lg:py-16">
            <div>
              <ScrollReveal direction="down" distance={16} duration={0.6}>
                <p className="text-eyebrow uppercase text-v5-gold">{siteSettings.brandName}</p>
              </ScrollReveal>
              {/* PRO V2.1 §4: same hard-coded-to-26px bug as PageHero.tsx, just in this page's own
                  hand-rolled hero instead of the shared component — missed in the first P0 pass
                  because it never calls <PageHero>. */}
              <ScrollReveal direction="up" distance={20} duration={0.7} delay={100}>
                <h1 className="mt-3 text-h1-mobile font-heading uppercase text-white lg:text-h1-desktop">
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
            </div>

            {/* PRO V2.2 §3: the right column was empty on wide desktop — nothing invented here,
                just the already-approved canonical chim Lạc mark (public/assets/v3/brand/
                lac-viet-logo-mark.svg) at low opacity over two faint concentric rings (a quiet
                nod to Đông Sơn drum geometry) and a thin gold accent line. Hidden below `lg`
                rather than shrunk — at hero scale it added nothing on narrow screens the way it
                does here, and the brief's own examples call for "one light, intentional
                composition," not a second copy scaled down. */}
            <div className="hidden lg:flex lg:items-center lg:justify-center" aria-hidden="true">
              <ScrollReveal direction="up" distance={16} duration={0.8} delay={250}>
                <div className="relative flex h-[320px] w-[320px] items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-v5-gold/10" />
                  <div className="absolute inset-10 rounded-full border border-v5-gold/15" />
                  <div className="absolute inset-20 rounded-full border border-v5-gold/20" />
                  <Image
                    src={assetPath("lac-viet-logo-canonical")}
                    alt=""
                    width={assetSize("lac-viet-logo-canonical").width}
                    height={assetSize("lac-viet-logo-canonical").height}
                    className="h-36 w-36 opacity-40"
                  />
                  <span className="absolute -bottom-1 h-px w-40 bg-gradient-to-r from-transparent via-v5-gold/50 to-transparent" />
                </div>
              </ScrollReveal>
            </div>
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

      {/* PRO V2.1 §50/51: storytelling flow — hero → brand statement → story → philosophy →
          capability → CTA. Was hero+philosophy, then capability, then story LAST — the story of
          the name came after the reader already saw the full service list, so it read as an
          afterthought instead of the thing everything else stands on. The statement below is the
          existing brand-story fact (Lạc Việt = cultural origin) condensed into one line, not a
          new claim; §51 says use the chim Lạc/trống đồng motif as the visual story rather than
          adding another card grid, so this is typography + the existing dark/gold treatment,
          nothing new to build. */}
      <Section id="brand-statement" tone="dark" density="band">
        <Container>
          <ScrollReveal direction="up" distance={12} duration={0.7}>
            <p className="mx-auto max-w-editorial text-center font-heading text-h3-mobile leading-snug text-white/90 lg:text-h3-desktop">
              Tên gọi mang cội nguồn Lạc Việt.{" "}
              <span className="text-gold-300">Cách làm việc mang tinh thần hôm nay.</span>
            </p>
          </ScrollReveal>
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

      {/* PRO V2.2 §3: "brand journey" — a timeline structure without inventing dates. Desktop
          alternates left/right along a center spine; mobile collapses to a single left-aligned
          rail (§3 explicitly allows either alternating or single-column, mobile stays single). */}
      <Section id="brand-journey">
        <Container width="editorial">
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Hành trình" title="Từ cội nguồn đến hôm nay" align="center" />
          </ScrollReveal>
          <ol className="relative mt-12 flex flex-col gap-10 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border md:before:left-1/2">
            {journey.map((step, idx) => {
              const alignRight = idx % 2 === 1;
              return (
                <ScrollReveal key={step.stage} direction="up" distance={16} duration={0.6} delay={idx * 80}>
                  <li
                    className={`relative pl-8 md:w-1/2 md:pl-0 ${
                      alignRight ? "md:ml-auto md:pl-12 md:text-left" : "md:pr-12 md:text-right"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1.5 size-4 rounded-full border-2 border-gold-500 bg-ivory-50 md:top-1.5 ${
                        alignRight ? "md:-left-2" : "md:-right-2 md:left-auto"
                      }`}
                      aria-hidden="true"
                    />
                    <p className="text-caption font-semibold uppercase tracking-wide text-gold-700">{step.stage}</p>
                    <p className="mt-1 font-heading text-card-h3-mobile text-ink-950">{step.title}</p>
                    <p className="mt-1 text-small text-text-secondary">{step.description}</p>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section id="service-ecosystem" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Năng lực" title="Chúng tôi cung cấp giải pháp toàn diện cho cá nhân & doanh nghiệp" align="center" />
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

      <FinalCta sourceComponent="about-final-cta" />
    </>
  );
}
