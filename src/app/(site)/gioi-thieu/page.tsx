import { Container } from "@/components/ui/Container";
import { StarField } from "@/components/layout/StarField";
import { PageSignatureAsset } from "@/components/layout/PageSignatureAsset";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { siteSettings } from "@/lib/site-settings";
import { breadcrumbJsonLd, pageMetadata, organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

// Trang giới thiệu được mở lại trong điều hướng để tương đương điểm vào Profile/Giới thiệu của
// Maxweb. Nội dung chỉ dùng các nguyên tắc và năng lực đã có trong repo, không thêm mốc thời gian,
// số khách hàng hay giải thưởng chưa được xác minh.
export const metadata = pageMetadata({
  title: "Giới thiệu Lạc Việt Media Agency",
  description: `Tìm hiểu về ${siteSettings.brandName} — đối tác số toàn diện cho doanh nghiệp Việt Nam.`,
  path: "/gioi-thieu",
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
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Giới thiệu", path: "/gioi-thieu" },
        ])}
      />

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
            {/* V7 §6: thay composition logo/ring dựng bằng CSS bằng vật thể signature. Board
                cấm hiện đồng thời cả hai, nên ba vòng tròn và logo mờ 40% ở đây đã bị bỏ hẳn.

                `blendOnBlack`: file này là RGB nền đen — ngoại lệ duy nhất của bộ V7 — nên đặt
                thẳng lên hero vẫn thấy một hình vuông đen hơi khác tông. `mix-blend-lighten`
                làm nền ảnh tan vào nền trang, cùng cách `HeroVisual` đã xử lý. Chỉ đúng vì
                hero này thực sự là `bg-black`.

                Vẫn ẩn dưới `lg` như bố cục cũ: ở khổ nhỏ chữ đã chiếm gần hết bề ngang, và
                thêm 340px ảnh chỉ làm trang mobile dài lại. */}
            <div className="hidden lg:flex lg:items-center lg:justify-center" aria-hidden="true">
              <ScrollReveal direction="up" distance={16} duration={0.8} delay={250}>
                <PageSignatureAsset
                  assetId="v7-page-about-values"
                  blendOnBlack
                  className="w-[320px] rounded-2xl"
                />
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

      <PageJumpNav
        items={[
          { href: "#principles", label: "Giá trị" },
          { href: "#brand-story", label: "Câu chuyện" },
          { href: "#brand-journey", label: "Hành trình" },
          { href: "#service-ecosystem", label: "Năng lực" },
        ]}
      />

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
      {/* UI V6 §6.13: năm mốc trước đây dàn đều trên cả bề ngang trang, mỗi mốc là một cột
          hẹp có rất nhiều khoảng trắng quanh nó — trông như trang thiếu nội dung chứ không
          phải như một hành trình. Gom vào một panel có connector, và vì repo không có mốc thời
          gian thật nào nên vẫn không có năm tháng nào được bịa ra. */}
      <Section id="brand-journey" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Hành trình" title="Từ cội nguồn đến hôm nay" align="center" />
          </ScrollReveal>
          <div className="mt-8 rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm lg:p-8">
            <ol className="grid list-none gap-0 divide-y divide-border lg:grid-cols-5 lg:divide-x lg:divide-y-0">
              {journey.map((stage, index) => (
                <ScrollReveal
                  key={stage.stage}
                  direction="up"
                  distance={20}
                  duration={0.6}
                  delay={Math.min(index, 3) * 90}
                >
                  <li className="flex h-full gap-4 py-5 first:pt-0 last:pb-0 lg:flex-col lg:gap-2 lg:px-5 lg:py-0 lg:first:pl-0 lg:last:pr-0">
                    <span className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-2">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold-500/30 bg-ivory-50 font-heading text-caption tabular-nums text-gold-700">
                        {index + 1}
                      </span>
                      {/* Connector chỉ ở mobile — desktop đã có divider dọc giữa các cột. */}
                      <span aria-hidden="true" className="mt-1 w-px flex-1 bg-border lg:hidden" />
                    </span>
                    <div className="min-w-0 pb-1">
                      <p className="text-eyebrow uppercase tracking-[0.12em] text-gold-700">
                        {stage.stage}
                      </p>
                      <p className="mt-1 font-heading text-card-h3-mobile text-ink-950">
                        {stage.title}
                      </p>
                      <p className="mt-1 text-small text-text-secondary">{stage.description}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
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
