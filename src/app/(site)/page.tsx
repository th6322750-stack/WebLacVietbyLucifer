import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { DragScroller } from "@/components/ui/DragScroller";
import { ArticlePreviewCard } from "@/components/content/ArticlePreviewCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FinalCta } from "@/components/layout/FinalCta";
import { StarField } from "@/components/layout/StarField";
import { HomeHeroCta } from "./HomeHeroCta";
import { HeroVietnamScene } from "@/components/layout/HeroVietnamScene";
import { homeServices, publishedServices, serviceHref } from "@/content/service-registry";
import { industryShowcase, CONCEPT_DISCLOSURE } from "@/content/industry-showcase";
import { IndustryShowcaseCard } from "@/components/content/IndustryShowcaseCard";
import { PricingTabs } from "@/components/content/PricingTabs";
import {
  ProofMetricStrip,
  TestimonialsSection,
  TrustMarksSection,
} from "@/components/content/ProofSections";
import { pricingGroups, websitePackageCommitments } from "@/content/pricing";
import { getVisibleArticles } from "@/content/articles";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

// PRO V2.1 mobile hero crop — a sub-rectangle of the same 1672×941 VN scene canvas, computed
// from the bounding box of exactly the layers HeroVietnamScene keeps when `mobile` (map, flag,
// pole, pedestal, hero/bird, ringglow, lotusglow, sparkle). Fractions of the full canvas, not
// pixels, so this stays correct regardless of the rendered size.
const MOBILE_SCENE_CROP = { x: 0.465, y: 0.12, w: 0.53, h: 0.864 };

export const metadata = pageMetadata({
  title: `${siteSettings.brandName} — Website, Support MXH & Dịch vụ số`,
  description:
    "Lạc Việt Media Agency thiết kế website doanh nghiệp, hỗ trợ mạng xã hội và cung cấp dịch vụ số cho doanh nghiệp Việt Nam.",
  path: "/",
});

// 6-step process per approved V1 master (page-03: Tiếp nhận/Đề xuất/Thực hiện/Kiểm tra & QA/Bàn giao/Hỗ trợ).
const processSteps = [
  { title: "Tiếp nhận", description: "Lắng nghe nhu cầu và mục tiêu cụ thể của doanh nghiệp." },
  { title: "Đề xuất", description: "Xây dựng phương án phù hợp ngân sách và thời gian." },
  { title: "Thực hiện", description: "Triển khai đúng phạm vi đã thống nhất." },
  { title: "Kiểm tra & QA", description: "Rà soát chất lượng trước khi bàn giao." },
  { title: "Bàn giao", description: "Bàn giao đầy đủ, hướng dẫn sử dụng rõ ràng." },
  { title: "Hỗ trợ", description: "Đồng hành hỗ trợ kỹ thuật sau triển khai." },
];

/** §6.4. Ba nguyên tắc, không phải ba lời khoe. Mỗi câu mô tả một việc thực sự làm trong quy
 *  trình bên dưới — không có headcount, không có giải thưởng, không có con số. */
const workingPrinciples: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "target",
    title: "Hiểu đúng nhu cầu",
    description: "Xác định mục tiêu và đối tượng khách hàng trước khi đề xuất bất kỳ phương án nào.",
  },
  {
    icon: "badge-check",
    title: "Minh bạch phạm vi và chi phí",
    description: "Thống nhất rõ phạm vi công việc và chi phí trước khi bắt đầu triển khai.",
  },
  {
    icon: "headset",
    title: "Bàn giao rõ ràng",
    description: "Hướng dẫn quản trị khi bàn giao và hỗ trợ tiếp theo thoả thuận đã ký.",
  },
];

/** §6.7. Thay cho MetricStrip cũ (200+ / 1000+ / 4+ / 99%) — cả bốn con số đó tự khai
 *  `demoOnly` ngay trong dữ liệu, nghĩa là chính repo cũng không tin chúng. Bốn năng lực dưới
 *  đây mô tả việc làm được, kiểm chứng được bằng chính sản phẩm bàn giao. */
const capabilities: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "palette",
    title: "Thiết kế theo nhận diện",
    description: "Giao diện dựng riêng theo màu sắc, font và hình ảnh thương hiệu của bạn.",
  },
  {
    icon: "search",
    title: "SEO on-page và hiệu năng",
    description: "Cấu trúc thẻ, tốc độ tải và metadata được tối ưu ngay từ khi bàn giao.",
  },
  {
    icon: "monitor-smartphone",
    title: "Quản trị dễ dùng",
    description: "Tự cập nhật nội dung sau bàn giao, không phụ thuộc vào đội kỹ thuật.",
  },
  {
    icon: "headset",
    title: "Bàn giao và hỗ trợ",
    description: "Hướng dẫn sử dụng đầy đủ và hỗ trợ kỹ thuật theo thoả thuận.",
  },
];

/** §6.6. Teaser lấy 8 concept đầu; xem đủ bộ ở /website/concept. */
const conceptTeaser = industryShowcase.slice(0, 8);

const heroFeatures: { icon: "target" | "shield-check" | "users"; title: string; description: string }[] = [
  { icon: "target", title: "Hiệu quả", description: "Giải pháp tối ưu đúng mục tiêu" },
  { icon: "shield-check", title: "Uy tín", description: "Thống nhất rõ phạm vi và đầu ra" },
  { icon: "users", title: "Đồng hành", description: "Hỗ trợ nhanh, đội ngũ luôn sẵn sàng" },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { claimAttrsFor } from "@/lib/content-truth";

// Homepage article cards come from the real published set, newest first, capped at three so
// the row stays balanced. Mapped into ArticlePreview rather than passed raw: the card only
// needs these fields, and carrying `slug` is what lets it deep-link to the piece itself.
// coverAssetId is optional on Article but required by the card, which renders an image —
// so an article without one is filtered out rather than cast past the type. A cover-less
// card would render an empty image box, which is worse than one fewer card.
const homeArticles = getVisibleArticles()
  .filter((a): a is typeof a & { coverAssetId: string } => Boolean(a.coverAssetId))
  .slice(0, 3)
  .map((a) => ({
    title: a.title,
    publishedAt: a.publishedAt,
    coverAssetId: a.coverAssetId,
    demoOnly: a.demoOnly ?? false,
    slug: a.slug,
  }));

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero cao dần theo khổ màn hình. Cảnh phóng theo CHIỀU CAO hero, nên đây chính là nút
          chỉnh độ lớn của nó: màn 1920 mà hero chỉ 541px thì cảnh co lại còn nửa bề ngang. */}
      <section className="relative overflow-hidden bg-black lg:min-h-[600px] xl:min-h-[660px] ultra:min-h-[720px]">
        <StarField />
        {/* Cảnh phủ kín nền hero. Nằm ngoài Container vì nó phải chạm mép màn hình, còn
            Container thì có lề hai bên. Ẩn dưới khổ lớn: ở đó chữ chiếm gần hết bề ngang nên
            cảnh chỉ còn là một vệt sáng sau chữ, không đáng để tải thêm 540KB. */}
        {/* Cảnh vừa đúng chiều cao hero rồi dán mép phải, KHÔNG kéo theo chiều rộng.
            Tranh là 16:9 còn dải hero rộng hơn nhiều: phóng theo bề ngang thì con chim to lồ lộ,
            ngọn cờ cụt đầu và cây cầu đè lên chữ. Lấy chiều cao làm chuẩn thì toàn bộ bố cục —
            từ ngọn cờ xuống tới chân bệ và hoa sen — nằm trọn trong khung, không cắt mất gì. */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block"
          style={{ aspectRatio: "1672 / 941" }}
          aria-hidden="true"
        >
          <HeroVietnamScene className="h-full w-full" />
        </div>
        {/* Text is held to the left ~53% and the right cell is left deliberately empty: that
            is the slot the hero image drops into. Keeping it as a real grid cell (rather than
            just capping the text width) means the artwork can be added without re-laying out
            anything around it. */}
        <Container className="grid items-center gap-8 py-12 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:gap-12 lg:py-16">
          {/* z-10: cảnh nền tràn qua tận đây, chữ luôn phải nằm trên. */}
          <div className="relative z-10 text-white">
            {/* Approved master ui-000: "LẠC VIỆT" white, "MEDIA AGENCY" GOLD on the second line. */}
            <ScrollReveal direction="up" distance={20} duration={0.7} delay={100}>
              {/* PRO V2.1: was hard-coded 26/29/35px — the site's own #1 visual anchor rendering
                  smaller than a card heading. `display` is the token built for exactly this
                  role (72px desktop / 44px mobile); nothing on the homepage used it before. */}
              <h1 className="mt-3 text-display-mobile font-heading uppercase text-white lg:text-display-desktop">
                LẠC VIỆT
                <br />
                <span className="text-gold-metal">MEDIA AGENCY</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={16} duration={0.7} delay={200}>
              <p className="mt-5 max-w-editorial text-body-lg text-white/80">
                Giải pháp số giúp cá nhân và doanh nghiệp vận hành tốt hơn trên internet.
              </p>
            </ScrollReveal>
            {/* Three across on one row, tightened */}
            <ScrollReveal direction="up" distance={16} duration={0.7} delay={300}>
              <div className="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-3">
                {heroFeatures.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-v5-gold/25 bg-white/[0.04]">
                      <Icon name={f.icon} size="default" className="text-v5-gold" />
                    </span>
                    <div>
                      <p className="text-small font-semibold text-white">{f.title}</p>
                      <p className="text-caption text-white/70">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={16} duration={0.7} delay={400}>
              <HomeHeroCta />
            </ScrollReveal>

            {/* PRO V2.1 §11/12: mobile had ZERO hero visual — the whole scene was `hidden
                lg:block` with nothing standing in for it. This crops into the SAME approved
                1672×941 composition (no new positions/assets) down to just the monument cluster
                (map + flag + chim Lạc + pedestal + its glow), which is what survives once
                skyline/bridge/water-reflection layers are dropped — see HeroVietnamScene's
                `mobile` filter. Placed after the CTA, before social proof, per the brief. */}
            <div className="mt-6 lg:hidden" aria-hidden="true">
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{ aspectRatio: `${MOBILE_SCENE_CROP.w * 1672} / ${MOBILE_SCENE_CROP.h * 941}` }}
              >
                <div
                  className="absolute"
                  style={{
                    width: `${100 / MOBILE_SCENE_CROP.w}%`,
                    height: `${100 / MOBILE_SCENE_CROP.h}%`,
                    left: `${(-MOBILE_SCENE_CROP.x * 100) / MOBILE_SCENE_CROP.w}%`,
                    top: `${(-MOBILE_SCENE_CROP.y * 100) / MOBILE_SCENE_CROP.h}%`,
                  }}
                >
                  <HeroVietnamScene mobile className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
        </Container>
      </section>

      {/* §6.3 Solutions. Lưới auto-fit theo số dịch vụ publish, không phải `md:grid-cols-3`
          cứng — bản cũ chỉ đúng khi mảng có đúng ba phần tử, publish thêm một dịch vụ là bố cục
          vỡ. `homeServices()` cũng đã lọc sẵn dịch vụ bị loại theo chính sách. */}
      <Section id="service-overview">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              eyebrow="Dịch vụ của chúng tôi"
              title="Giải pháp toàn diện cho nhu cầu số của bạn"
              align="center"
            />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fit,minmax(300px,360px))] lg:justify-center">
            {homeServices().map((service, idx) => (
              <ScrollReveal key={service.slug} direction="up" distance={24} duration={0.7} delay={idx * 140}>
                <ServiceCard
                  mobileRow
                  icon={service.icon}
                  iconImage={service.iconImage}
                  title={service.title}
                  description={service.summary}
                  bullets={service.features?.slice(0, 4)}
                  ctaLabel="Xem chi tiết"
                  href={serviceHref(service)}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="specialized-services" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              eyebrow="Dịch vụ chuyên sâu"
              title="Đi sâu theo đúng bài toán"
              description="Ba trụ cột ở trên là điểm bắt đầu. Các dịch vụ dưới đây đi vào từng kênh, ngành và nhu cầu cụ thể."
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-x-8 gap-y-0 md:grid-cols-2">
            {publishedServices()
              .filter((service) => !service.featuredOnHome)
              .map((service, index) => (
                <ScrollReveal key={service.slug} direction="up" distance={16} duration={0.55} delay={Math.min(index, 3) * 80}>
                  <Link
                    href={serviceHref(service)}
                    className="group flex items-start gap-3 border-b border-border py-4 transition-colors hover:border-gold-500/50"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-gold-500/25 bg-white text-gold-600">
                      <Icon name={service.icon} size="inline" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-card-h3-mobile text-ink-950 transition-colors group-hover:text-gold-700 lg:text-card-h3-desktop">
                        {service.title}
                      </span>
                      <span className="mt-1 block text-small text-text-secondary">{service.summary}</span>
                    </span>
                    <Icon name="chevron-right" size="inline" className="mt-1 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gold-700" />
                  </Link>
                </ScrollReveal>
              ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/dich-vu" className="inline-flex min-h-touch items-center gap-2 rounded-pill border border-gold-500/35 px-5 py-3 text-small font-semibold text-gold-700 transition-colors hover:bg-white">
              Xem toàn bộ dịch vụ <Icon name="arrow-right" size="inline" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* §6.4 Working principles. Câu "nền tảng phát triển bền vững" từng là một section riêng
          (`hero-bridge`) chỉ chứa đúng một dòng chữ — một nhịp thừa giữa hero và nội dung. Nó
          được đưa vào đây làm câu mở của phần nguyên tắc, nơi nó thực sự có thứ để đứng cùng.

          Đây cũng là vị trí Maxweb đặt khối "Con Người Là Nền Tảng Cho Mọi Thành Công" — ngay
          sau lưới dịch vụ — và dải số liệu của họ nằm trong chính khối đó. `ProofMetricStrip`
          giữ đúng chỗ ấy, hôm nay không render vì chưa có số liệu nào được xác minh. */}
      <Section id="working-principles" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              eyebrow="Cách chúng tôi làm việc"
              title="Không chỉ là dịch vụ số — đó là nền tảng phát triển bền vững cho doanh nghiệp Việt"
              align="center"
            />
          </ScrollReveal>
          {/* Một panel có ba cột ngăn bằng divider, thay cho ba card trắng nổi trên nền ivory.
              Ba nguyên tắc là ba phần của một cách làm việc, không phải ba món tách rời — và ở
              mobile ba card có viền riêng chiếm gần trọn một màn hình cho ba câu ngắn. */}
          <div className="mt-8 rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm lg:mt-10 lg:p-8">
            <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {workingPrinciples.map((item, idx) => (
                <ScrollReveal key={item.title} direction="up" distance={20} duration={0.6} delay={idx * 120}>
                  <div className="flex h-full flex-col gap-2 py-5 first:pt-0 last:pb-0 md:px-6 md:py-0 md:first:pl-0 md:last:pr-0">
                    <Icon name={item.icon} size="feature" className="text-gold-600" />
                    <h3 className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">
                      {item.title}
                    </h3>
                    <p className="text-small text-text-secondary lg:text-body">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <ProofMetricStrip />
        </Container>
      </Section>

      {/* §6.5 Pricing. Bảng giá lên thẳng trang chủ thay vì bắt khách vào /website mới thấy —
          giá là câu hỏi đầu tiên của gần như mọi khách. Cùng nguồn dữ liệu với /website nên hai
          trang không thể lệch giá nhau. */}
      <Section id="home-pricing">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Bảng giá" title="Chi phí thiết kế website" align="center" />
          </ScrollReveal>
          <div className="mt-8">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={120}>
              <PricingTabs
                groups={pricingGroups}
                commitments={websitePackageCommitments}
                sourceComponent="home-pricing"
              />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* §6.6 Concepts teaser. */}
      <Section id="concept-teaser" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Concept đa ngành" title="Một số concept giao diện theo lĩnh vực" />
              <Button href="/website/concept" variant="outline">
                Xem tất cả concept
                <Icon name="arrow-right" size="inline" />
              </Button>
            </div>
            <p className="mt-3 max-w-editorial text-small text-text-muted" {...claimAttrsFor("demo")}>
              {CONCEPT_DISCLOSURE}
            </p>
          </ScrollReveal>
          {/* DragScroller giờ có nút Prev/Next 44px và track focus được bằng bàn phím — bản cũ
              chỉ kéo được bằng chuột/ngón tay, tức là không dùng được bằng bàn phím và vi phạm
              WCAG 2.5.7 (Dragging Movements). */}
          <DragScroller speed={72} className="mt-8 -mx-4 px-4" label="Concept giao diện theo lĩnh vực">
            {conceptTeaser.map((item) => (
              <div key={item.slug} className="w-[280px] shrink-0 sm:w-[300px]">
                <IndustryShowcaseCard item={item} />
              </div>
            ))}
          </DragScroller>
        </Container>
      </Section>

      {/* §6.7 Capability. Thay hẳn cho MetricStrip cũ — xem chú thích ở `capabilities`. */}
      <Section id="capability" tone="dark">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              onDark
              eyebrow="Năng lực triển khai"
              title="Những gì bạn nhận được khi làm việc cùng Lạc Việt"
              align="center"
            />
          </ScrollReveal>
          {/* Mobile 2 cột: bốn card cao xếp dọc chiếm gần hai màn hình cho bốn câu ngắn. */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-10 lg:grid-cols-4 lg:gap-5">
            {capabilities.map((item, idx) => (
              <ScrollReveal key={item.title} direction="up" distance={20} duration={0.6} delay={Math.min(idx, 3) * 110}>
                <div className="flex h-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:gap-3 lg:p-5">
                  <Icon name={item.icon} size="feature" className="text-gold-300" />
                  <h3 className="font-heading text-h4-mobile text-white lg:text-h4-desktop">{item.title}</h3>
                  <p className="text-small text-white/70">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* §6.8 Process. */}
      <Section id="work-process">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Quy trình làm việc" title="Minh bạch – Rõ ràng – Hiệu quả" align="center" />
          </ScrollReveal>
          <div className="mt-10">
            <ScrollReveal direction="up" distance={24} duration={0.8} delay={150}>
              <ProcessSteps steps={processSteps} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* §6.9 Knowledge. Tự ẩn khi không có bài nào đủ điều kiện, thay vì quảng cáo một thư
          viện rỗng. */}
      {homeArticles.length > 0 ? (
        <Section id="latest-knowledge" tone="ivory">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading eyebrow="Kiến thức" title="Bài viết mới nhất" />
                <Button href="/kien-thuc" variant="outline">
                  Xem tất cả bài viết
                  <Icon name="arrow-right" size="inline" />
                </Button>
              </div>
            </ScrollReveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {homeArticles.map((a, idx) => (
                <ScrollReveal key={a.slug} direction="up" distance={24} duration={0.7} delay={idx * 120}>
                  <ArticlePreviewCard preview={a} variant="card" />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* §6.10 Verified proof. Hai khối này là "khu chừa sẵn": cùng thứ tự Maxweb dùng
          (cảm nhận khách hàng, rồi logo), đặt giữa Kiến thức và CTA cuối. Cả hai đọc từ
          `src/content/proof.ts` và tự ẩn khi mảng còn rỗng — nên hôm nay chúng không render,
          và điền dữ liệu vào là chúng tự xuất hiện đúng chỗ mà không phải sửa bố cục. */}
      <TestimonialsSection />
      <TrustMarksSection />


      <FinalCta
        eyebrow="Sẵn sàng bắt đầu"
        sourceComponent="home-final-cta"
        variant="strip"
        glow
        secondaryHref="/website#website-packages"
        secondaryLabel="Xem bảng giá"
      />
    </>
  );
}
