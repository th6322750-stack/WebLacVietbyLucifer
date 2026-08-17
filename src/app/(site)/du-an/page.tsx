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
import { getVisibleProjects } from "@/content/projects";
import { assetPath } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dự án",
  description: "Các dự án tiêu biểu Lạc Việt Media đã triển khai trong lĩnh vực website, support MXH và dịch vụ số.",
  path: "/du-an",
});

// Fixed taxonomy per approved master (page-07) — not derived only from current demo data,
// so Landing Page/UI-UX chips exist even before a demo project is tagged with them.
const categories = ["Website", "Social", "Digital Services", "Landing Page", "UI/UX"];
const visibleProjects = getVisibleProjects();
const featuredCaseStudy = visibleProjects[0]!;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && categories.includes(category) ? category : "all";
  const filtered = active === "all" ? visibleProjects : visibleProjects.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Dự án"
        title="Dự án tiêu biểu"
        description="Những giải pháp số đã tạo ra giá trị thật cho thương hiệu và doanh nghiệp."
        imageAssetId="projects-hero-master"
        imageAlt="Dự án Lạc Việt Media"
        metrics={[
          { value: "200+", label: "Dự án đã triển khai" },
          { value: "20+", label: "Lĩnh vực đa dạng" },
          { value: "99%", label: "Khách hàng hài lòng" },
        ]}
      />

      <Section id="category-filters">
        <Container>
          <CategoryFilter categories={categories} active={active} />
        </Container>
      </Section>

      <Section id="projects-grid">
        <Container>
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-body text-text-secondary">Chưa có dự án trong danh mục này.</p>
          )}
        </Container>
      </Section>

      <Section id="featured-case-study" tone="dark">
        <Container>
          <SectionHeading onDark eyebrow="Case study nổi bật" title={`${featuredCaseStudy.title} — case study chi tiết`} />
          <Link
            href={`/du-an/${featuredCaseStudy.slug}`}
            className="mt-8 grid gap-6 overflow-hidden rounded-lg border border-white/10 bg-white/5 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full lg:aspect-auto">
              {featuredCaseStudy.heroAssetId ? (
                <Image src={assetPath(featuredCaseStudy.heroAssetId)} alt={featuredCaseStudy.title} fill className="object-cover" />
              ) : null}
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="text-caption uppercase text-gold-300">{featuredCaseStudy.category}</span>
              <h3 className="mt-2 text-h3-mobile lg:text-h3-desktop text-white">{featuredCaseStudy.title}</h3>
              <p className="mt-3 text-body text-white/80">{featuredCaseStudy.summary}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { value: "+165%", label: "Khách hàng truy cập" },
                  { value: "+70%", label: "Thời gian trên trang" },
                  { value: "+30%", label: "Tương tác" },
                  { value: "35%", label: "Chi phí quảng cáo" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-h4-mobile font-heading text-gold-300">{stat.value}</dd>
                    <p className="text-caption text-white/60">{stat.label}</p>
                  </div>
                ))}
              </dl>
              <span className="mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-gold-300">
                Xem case study chi tiết
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
