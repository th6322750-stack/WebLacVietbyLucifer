import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { ProjectPreviewCard } from "@/components/content/ProjectPreviewCard";
import { ArticlePreviewCard } from "@/components/content/ArticlePreviewCard";
import { MetricStrip } from "@/components/content/MetricStrip";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { HomeHeroCta } from "./HomeHeroCta";
import { services } from "@/content/services";
import { homeProjectShowcase, homeArticleShowcase } from "@/content/route-fixtures";
import { assetPath, assetSize } from "@/lib/assets";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${siteSettings.brandName} — Website, Support MXH & Dịch vụ số`,
  description:
    "Lạc Việt Media Agency thiết kế website doanh nghiệp, hỗ trợ mạng xã hội và cung cấp dịch vụ số cho doanh nghiệp Việt Nam.",
  path: "/",
});

// Demo testimonials — demoOnly:true per CONTENT_TRUTH.json, never a verified claim.
const testimonials = [
  {
    quote: "Website mới giúp khách hàng để lại thông tin nhiều hơn hẳn so với trước đây.",
    name: "Chị Minh Anh",
    role: "Chủ spa An Nhiên (dự án mẫu)",
    avatarAssetId: "demo-avatar-01",
    demoOnly: true as const,
  },
  {
    quote: "Đội ngũ hỗ trợ xử lý sự cố fanpage rất nhanh, không để gián đoạn lâu.",
    name: "Anh Quốc Bảo",
    role: "Chủ quán Quê Nhà (dự án mẫu)",
    avatarAssetId: "demo-avatar-02",
    demoOnly: true as const,
  },
  {
    quote: "Hướng dẫn sử dụng công cụ số rất dễ hiểu cho cả đội không rành kỹ thuật.",
    name: "Chị Thu Hà",
    role: "Việt Phát (dự án mẫu)",
    avatarAssetId: "demo-avatar-03",
    demoOnly: true as const,
  },
];

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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />

      <section className="relative overflow-hidden bg-ink-950 bg-dark-hero">
        {/* MASTER PARITY V4 / P0-HERO: the master gives the phoenix the dominant right-hand
            share, so the visual column is wider than the text column and the vertical padding
            is pulled back from the old lg:py-24. */}
        <Container className="grid items-center gap-8 py-12 md:py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:py-16">
          <div className="text-white">
            <p className="text-eyebrow uppercase text-gold-300">{siteSettings.slogan}</p>
            {/* Approved master ui-000: "LẠC VIỆT" white, "MEDIA AGENCY" GOLD on the second line.
                The gold span is part of the approved H1 composition, not optional decoration —
                rendering the whole headline white was a recovery-audit defect. */}
            <h1 className="mt-3 text-display-mobile lg:text-display-desktop font-heading uppercase text-white">
              LẠC VIỆT
              <br />
              <span className="text-gold-500">MEDIA AGENCY</span>
            </h1>
            <p className="mt-5 max-w-editorial text-body-lg text-white/80">
              Giải pháp số giúp cá nhân và doanh nghiệp vận hành tốt hơn trên internet.
            </p>
            {/* Approved master page-03 shows the three hero features on ONE row; a wrapping
                flex row broke to 2+1 at the hero column width. */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {heroFeatures.map((f) => (
                <div key={f.title} className="flex items-start gap-2">
                  <Icon name={f.icon} size="default" className="mt-px shrink-0 text-gold-300" />
                  <div>
                    <p className="text-small font-semibold text-white">{f.title}</p>
                    <p className="text-caption text-white/70">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <HomeHeroCta />
            <div className="mt-8 flex items-center gap-3">
              {/* Approved social-proof faces are a single master strip, not four separate
                  avatar files (globalAssetMap.socialProofFaces). Rendered at native size. */}
              <Image
                src={assetPath("social-proof-avatar-strip-approved")}
                alt=""
                aria-hidden="true"
                width={assetSize("social-proof-avatar-strip-approved").width}
                height={assetSize("social-proof-avatar-strip-approved").height}
                className="h-8 w-auto"
              />
              {/* Demo customer count per CONTENT_TRUTH.json demoOnly — tagged in markup. The
                  4.9/5 rating below already carries the master's own "(minh hoạ)" disclosure. */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-white/80" data-demo-only="true">
                <span>200+ khách hàng đã tin tưởng Lạc Việt</span>
                <span className="flex items-center gap-1 text-gold-300">
                  <Icon name="star" size="inline" />
                  4.9/5 <span className="text-white/50">(minh hoạ)</span>
                </span>
              </div>
            </div>
          </div>
          {/* Contained at native aspect — an exact master crop, so object-cover would clip the
              artwork. The universal max-w-[390px] cap is gone: P0-HERO calls out that it turned
              the dominant phoenix into a small boxed image. */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src={assetPath("home-hero-master")}
              alt="Lạc Việt Media Agency"
              width={assetSize("home-hero-master").width}
              height={assetSize("home-hero-master").height}
              priority
              sizes="(min-width: 1024px) 52vw, 78vw"
              className="h-auto w-[78%] max-w-[520px] lg:w-full lg:max-w-none"
            />
          </div>
        </Container>
      </section>

      <Section id="service-overview">
        <Container>
          <SectionHeading
            eyebrow="Dịch vụ của chúng tôi"
            title="Giải pháp toàn diện cho nhu cầu số của bạn"
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                icon={s.icon as IconName}
                title={s.title}
                description={s.summary}
                bullets={s.features?.slice(0, 4)}
                ctaLabel="Xem chi tiết"
                href={s.href}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="featured-projects" tone="ivory">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Dự án" title="Một số dự án tiêu biểu" />
            <Button href="/du-an" variant="outline">
              Xem tất cả dự án
              <Icon name="arrow-right" size="inline" />
            </Button>
          </div>
          {/* 390 master shows a single featured project; 1440 shows the four-card row. */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeProjectShowcase.map((p, i) => (
              <div key={p.title} className={i === 0 ? "" : "hidden sm:block"}>
                <ProjectPreviewCard preview={p} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="metrics-strip" tone="dark" density="band">
        <Container>
          <MetricStrip
            onDark
            metrics={[
              { value: "200+", label: "Khách hàng đã tin tưởng", demoOnly: true },
              { value: "350+", label: "Dự án hoàn thành thành công", demoOnly: true },
              { value: "4+", label: "Năm kinh nghiệm trong lĩnh vực số", demoOnly: true },
              { value: "99%", label: "Khách hàng hài lòng và giới thiệu lại", demoOnly: true },
            ]}
          />
        </Container>
      </Section>

      {/* MASTER PARITY V4 / P0-MOBILE-COMPOSITION: the approved 390 composition is
          hero -> 3 services -> 1 featured project -> metrics -> CTA -> footer. The
          process, testimonial and knowledge blocks are desktop-only by default rather
          than stacked into the mobile column. */}
      <Section id="work-process" className="hidden lg:block">
        <Container>
          <SectionHeading eyebrow="Quy trình làm việc" title="Minh bạch – Rõ ràng – Hiệu quả" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="testimonials" tone="ivory" className="hidden lg:block">
        <Container>
          <SectionHeading eyebrow="Khách hàng nói gì" title="Phản hồi từ doanh nghiệp đã đồng hành" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="latest-knowledge" className="hidden lg:block">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Kiến thức" title="Bài viết mới nhất" />
            <Button href="/kien-thuc" variant="outline">
              Xem tất cả bài viết
              <Icon name="arrow-right" size="inline" />
            </Button>
          </div>
          {/* RECOVERY V2: Home's knowledge row is a route-specific master image set
              (home-article-preview-01..04), not the /kien-thuc article covers. */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeArticleShowcase.map((a) => (
              <ArticlePreviewCard key={a.title} preview={a} variant="card" />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="home-final-cta" variant="strip" />
    </>
  );
}
