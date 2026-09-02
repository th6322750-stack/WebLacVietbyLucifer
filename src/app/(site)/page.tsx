import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { ProjectPreviewCard } from "@/components/content/ProjectPreviewCard";
import { DragScroller } from "@/components/ui/DragScroller";
import { ArticlePreviewCard } from "@/components/content/ArticlePreviewCard";
import { MetricStrip } from "@/components/content/MetricStrip";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FinalCta } from "@/components/layout/FinalCta";
import { StarField } from "@/components/layout/StarField";
import { HomeHeroCta } from "./HomeHeroCta";
import { HeroVietnamScene } from "@/components/layout/HeroVietnamScene";
import { services } from "@/content/services";
import { homeProjectShowcase } from "@/content/route-fixtures";
import { getVisibleArticles } from "@/content/articles";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

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

const heroFeatures: { icon: "target" | "shield-check" | "users"; title: string; description: string }[] = [
  { icon: "target", title: "Hiệu quả", description: "Giải pháp tối ưu đúng mục tiêu" },
  { icon: "shield-check", title: "Uy tín", description: "Làm việc minh bạch, cam kết rõ kết quả" },
  { icon: "users", title: "Đồng hành", description: "Hỗ trợ nhanh, đội ngũ luôn sẵn sàng" },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />

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

      {/* PRO V2 (2026-08-25): hero ends hard into a card grid otherwise — this bridge (brief §9,
          "section sau hero") keeps the dark tone one beat longer with a single bold statement,
          so the service cards arrive as a scene change instead of a jump cut. `tone="dark"` +
          `density="band"` matches the hero's own background so no new seam appears above it. */}
      <Section id="hero-bridge" tone="dark" density="band">
        <Container>
          <ScrollReveal direction="up" distance={12} duration={0.7}>
            <p className="mx-auto max-w-editorial text-center font-heading text-h3-mobile leading-snug text-white/90 lg:text-h3-desktop">
              Không chỉ là dịch vụ số.{" "}
              <span className="text-gold-300">Đó là nền tảng phát triển bền vững cho doanh nghiệp Việt.</span>
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      <Section id="service-overview">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              eyebrow="Dịch vụ của chúng tôi"
              title="Giải pháp toàn diện cho nhu cầu số của bạn"
              align="center"
            />
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s, idx) => (
              <ScrollReveal key={s.slug} direction="up" distance={24} duration={0.7} delay={idx * 150}>
                <ServiceCard
                  mobileRow
                  icon={s.icon as IconName}
                  iconImage={s.iconImage}
                  title={s.title}
                  description={s.summary}
                  bullets={s.features?.slice(0, 4)}
                  ctaLabel="Xem chi tiết"
                  href={s.href}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section tự ẩn khi homeProjectShowcase rỗng, thay vì hiện tiêu đề với thanh cuộn trống.
          Hiện mảng KHÔNG rỗng: 10 concept theo lĩnh vực, tất cả demoOnly — comment cũ ở đây nói
          mảng đã trống và không còn đúng từ lâu (bắt được trong QA trước ra mắt 2026-09-02). */}
      {homeProjectShowcase.length > 0 ? (
        <Section id="featured-projects" tone="ivory">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              {/* Relabelled 2026-09-02. These ten entries are all `demoOnly` concepts, but the
                  heading called them "dự án tiêu biểu" and the only marker that they were not
                  delivered client work was a hidden `data-demo-only` attribute. A visitor
                  reading the page had no way to tell. Wording now matches the disclosure
                  /website already carries for the same content. */}
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading eyebrow="Concept đa ngành" title="Một số concept giao diện theo lĩnh vực" />
                <Button href="/website" variant="outline">
                  Xem tất cả concept
                  <Icon name="arrow-right" size="inline" />
                </Button>
              </div>
              <p className="mt-3 max-w-editorial text-small text-text-muted" data-demo-only="true">
                Concept minh hoạ phong cách thiết kế theo từng ngành, không phải dự án đã triển
                khai cho khách hàng cụ thể.
              </p>
            </ScrollReveal>
            {/* Drifts on its own, and can be grabbed and flung to skim ahead. ScrollReveal is
                dropped here — its per-card entrance transform fights the track, and the cards are
                already in motion. */}
            <DragScroller speed={72} className="mt-8 -mx-4 px-4">
              {homeProjectShowcase.map((p) => (
                <div key={p.title} className="w-[280px] shrink-0 sm:w-[300px]">
                  <ProjectPreviewCard preview={p} />
                </div>
              ))}
            </DragScroller>
          </Container>
        </Section>
      ) : null}

      <Section id="metrics-strip" tone="dark" density="band">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.7}>
            <MetricStrip
              onDark
              metrics={[
                { value: "200+", label: "Khách hàng đã tin tưởng", demoOnly: true },
                { value: "1000+", label: "Dự án hoàn thành thành công", demoOnly: true },
                { value: "4+", label: "Năm kinh nghiệm trong lĩnh vực số", demoOnly: true },
                { value: "99%", label: "Khách hàng hài lòng và giới thiệu lại", demoOnly: true },
              ]}
            />
          </ScrollReveal>
        </Container>
      </Section>

      {/* PRO V2.1: was `hidden lg:block` — the entire process section simply didn't exist for
          mobile visitors. ProcessSteps already renders a vertical rail + stacked steps below
          `md:`, so nothing here needed building, only un-hiding. */}
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

      {/* PRO V2.1: was `hidden lg:block` — mobile visitors never saw this section at all. The
          grid below is already responsive (1 col → sm:2 → lg:4), so un-hiding is the fix. */}
      <Section id="latest-knowledge">
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
          {/* Was homeArticleShowcase: four hard-coded captions, three of which named articles
              that do not exist, every card linking to the listing rather than a piece. Clicking
              a headline landed the visitor somewhere that did not contain it. Now built from the
              real published articles, deep-linked, and the section disappears if there are none
              rather than advertising an empty library. */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeArticles.map((a, idx) => (
              <ScrollReveal key={a.slug} direction="up" distance={24} duration={0.7} delay={idx * 120}>
                <ArticlePreviewCard preview={a} variant="card" />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

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
