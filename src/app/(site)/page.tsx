import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { ProjectCard } from "@/components/content/ProjectCard";
import { ArticleCard } from "@/components/content/ArticleCard";
import { MetricStrip } from "@/components/content/MetricStrip";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { HomeHeroCta } from "./HomeHeroCta";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";
import { assetPath } from "@/lib/assets";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${siteSettings.brandName} — Website, Support MXH & Dịch vụ số`,
  description:
    "Lạc Việt Media Agency thiết kế website doanh nghiệp, hỗ trợ mạng xã hội và cung cấp dịch vụ số cho doanh nghiệp Việt Nam.",
  path: "/",
});

const featuredProjects = projects.slice(0, 4);
const latestArticles = articles.slice(0, 4);

const testimonials = [
  {
    quote: "Website mới giúp khách hàng để lại thông tin nhiều hơn hẳn so với trước đây.",
    name: "Chị Minh Anh",
    role: "Chủ spa An Nhiên (dự án mẫu)",
    avatarAssetId: "demo-avatar-01",
  },
  {
    quote: "Đội ngũ hỗ trợ xử lý sự cố fanpage rất nhanh, không để gián đoạn lâu.",
    name: "Anh Quốc Bảo",
    role: "Chủ quán Quê Nhà (dự án mẫu)",
    avatarAssetId: "demo-avatar-02",
  },
  {
    quote: "Hướng dẫn sử dụng công cụ số rất dễ hiểu cho cả đội không rành kỹ thuật.",
    name: "Chị Thu Hà",
    role: "Việt Phát (dự án mẫu)",
    avatarAssetId: "demo-avatar-03",
  },
];

const processSteps = [
  { title: "Tiếp nhận & tư vấn", description: "Lắng nghe nhu cầu và mục tiêu cụ thể của doanh nghiệp." },
  { title: "Đề xuất giải pháp", description: "Xây dựng phương án phù hợp ngân sách và thời gian." },
  { title: "Triển khai", description: "Thực hiện đúng phạm vi đã thống nhất, cập nhật tiến độ rõ ràng." },
  { title: "Bàn giao & hỗ trợ", description: "Bàn giao đầy đủ và đồng hành hỗ trợ sau triển khai." },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />

      <section className="relative overflow-hidden bg-ink-950 bg-dark-hero">
        <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="text-white">
            <p className="text-eyebrow uppercase text-gold-300">{siteSettings.slogan}</p>
            <h1 className="mt-3 text-display-mobile lg:text-display-desktop font-heading text-white">
              Đối tác số toàn diện cho doanh nghiệp Việt
            </h1>
            <p className="mt-5 max-w-editorial text-body-lg text-white/80">
              Lạc Việt Media Agency đồng hành cùng doanh nghiệp từ website chuyên nghiệp, vận
              hành mạng xã hội đến các công cụ số cần thiết cho công việc hàng ngày.
            </p>
            <HomeHeroCta />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={assetPath("home-hero-master")}
              alt="Lạc Việt Media Agency"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section id="service-overview">
        <Container>
          <SectionHeading
            eyebrow="Dịch vụ"
            title="Giải pháp toàn diện cho hoạt động số của doanh nghiệp"
            description="Ba nhóm dịch vụ chính giúp doanh nghiệp xây dựng và vận hành hiện diện số một cách bài bản."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                icon="monitor-smartphone"
                title={s.title}
                description={s.summary}
                bullets={s.features?.slice(0, 3)}
                ctaLabel={s.ctaLabel}
                href={`/${s.category === "Website" ? "website" : s.category === "Support MXH" ? "support-mxh" : "dich-vu-so"}`}
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="metrics-strip" tone="dark">
        <Container>
          <MetricStrip
            onDark
            metrics={[
              { value: "200+", label: "Dự án đã triển khai" },
              { value: "350+", label: "Doanh nghiệp đồng hành" },
              { value: "3", label: "Nhóm dịch vụ cốt lõi" },
              { value: "24h", label: "Thời gian phản hồi trung bình" },
            ]}
          />
        </Container>
      </Section>

      <Section id="work-process">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Cách chúng tôi làm việc" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="testimonials" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Khách hàng nói gì" title="Phản hồi từ doanh nghiệp đã đồng hành" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="latest-knowledge">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Kiến thức" title="Bài viết mới nhất" />
            <Button href="/kien-thuc" variant="outline">
              Xem tất cả bài viết
              <Icon name="arrow-right" size="inline" />
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="home-final-cta" />
    </>
  );
}
