import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCard } from "@/components/content/ProjectCard";
import { CategoryFilter } from "@/components/content/CategoryFilter";
import { FinalCta } from "@/components/layout/FinalCta";
import { projects } from "@/content/projects";
import { assetPath } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dự án",
  description: "Các dự án tiêu biểu Lạc Việt Media đã triển khai trong lĩnh vực website, support MXH và dịch vụ số.",
  path: "/du-an",
});

const categories = Array.from(new Set(projects.map((p) => p.category)));
const featuredCaseStudy = projects[0]!;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && categories.includes(category) ? category : "all";
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Dự án"
        title="Dự án tiêu biểu Lạc Việt Media"
        description="Một số dự án mẫu minh hoạ năng lực triển khai website, hỗ trợ mạng xã hội và dịch vụ số."
        imageAssetId="projects-hero-master"
        imageAlt="Dự án Lạc Việt Media"
      />

      <Section id="category-filters">
        <Container>
          <CategoryFilter categories={categories} active={active} />
        </Container>
      </Section>

      <Section id="projects-grid">
        <Container>
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-body text-text-secondary">Chưa có dự án trong danh mục này.</p>
          )}
        </Container>
      </Section>

      <Section id="featured-case-study" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Case study nổi bật" title="Xem chi tiết một dự án tiêu biểu" />
          <Link
            href={`/du-an/${featuredCaseStudy.slug}`}
            className="mt-8 grid gap-6 overflow-hidden rounded-lg border border-border bg-white shadow-sm lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full lg:aspect-auto">
              {featuredCaseStudy.heroAssetId ? (
                <Image src={assetPath(featuredCaseStudy.heroAssetId)} alt={featuredCaseStudy.title} fill className="object-cover" />
              ) : null}
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="text-caption uppercase text-gold-700">{featuredCaseStudy.category}</span>
              <h3 className="mt-2 text-h3-mobile lg:text-h3-desktop text-ink-950">{featuredCaseStudy.title}</h3>
              <p className="mt-3 text-body text-text-secondary">{featuredCaseStudy.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-gold-700">
                Xem chi tiết dự án
                <Icon name="arrow-right" size="inline" />
              </span>
            </div>
          </Link>
        </Container>
      </Section>

      <FinalCta
        sourceComponent="project-cta"
        title="Muốn có một dự án như thế này cho doanh nghiệp của bạn?"
        description="Để lại thông tin, chúng tôi sẽ tư vấn giải pháp phù hợp với nhu cầu của bạn."
      />
    </>
  );
}
