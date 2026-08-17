import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { ProjectPreviewCard } from "@/components/content/ProjectPreviewCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { projects, getProjectBySlug } from "@/content/projects";
import { relatedProjectPreview } from "@/content/route-fixtures";
import { assetPath } from "@/lib/assets";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const TABS = [
  { id: "overview", label: "Tổng quan" },
  { id: "problem", label: "Vấn đề" },
  { id: "solution", label: "Giải pháp" },
  { id: "results", label: "Kết quả" },
  { id: "technology", label: "Công nghệ" },
];

// "Dịch vụ" must be the actual demo service label, not the demoOnly status — that status
// belongs only in the badge/disclosure per GD10 re-QA round 2 item 2.
const SERVICE_LABEL_BY_CATEGORY: Record<string, string> = {
  Website: "Thiết kế Website",
  Social: "Social Media",
  "Digital Services": "Dịch vụ số",
  "Landing Page": "Landing Page",
  "UI/UX": "Thiết kế UI/UX",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/du-an/${slug}`,
    // Demo project identities/results must not become indexed claims until verified
    // (CONTENT_TRUTH.json demoOnly + SEO_CONTRACT.json contentIntegrity). Hidden fixtures stay
    // noindex as direct-review-only routes. Both stay routable and visible in the UI.
    noindex: project.demoOnly || project.hidden,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // ASSET_USAGE_MAP.json "/du-an/[slug]".relatedProjects = project-cover-01..04, deterministic
  // — not a same-category derivation (GD10 re-QA round 3 item 7).
  const related = relatedProjectPreview.filter((p) => p.title !== project.title);

  // A project's own identity-bound cover is legitimate here; a detail-only fixture supplies its
  // own mapped DETAIL_VISUAL instead of borrowing one (GD10 re-QA round 4, R4-01). The device
  // master is presented `contain` per asset-manifest.json presentationByUsage, not `cover`.
  const showcaseAssetId = project.detailVisualAssetId ?? project.heroAssetId;
  const showcaseFit = showcaseAssetId === "project-detail-device-master" ? "object-contain" : "object-cover";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Trang chủ", path: "/" },
              { name: "Dự án", path: "/du-an" },
              { name: project.title, path: `/du-an/${project.slug}` },
            ]),
          ),
        }}
      />

      <Container className="py-4">
        <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Dự án", href: "/du-an" }, { label: project.title }]} />
      </Container>

      <section id="case-study-hero">
        <Container className="grid items-center gap-10 py-10 md:py-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {project.demoOnly ? (
              <span className="inline-flex items-center rounded-pill border border-gold-300 bg-ivory-100 px-3 py-1 text-caption uppercase text-gold-700">
                Dự án mẫu — minh hoạ
              </span>
            ) : null}
            <span className="mt-3 block text-eyebrow uppercase text-gold-700">{project.category}</span>
            <h1 className="mt-2 text-h1-mobile lg:text-h1-desktop font-heading text-ink-950">{project.title}</h1>
            <p className="mt-4 max-w-editorial text-body-lg text-text-secondary">{project.summary}</p>

            <dl id="project-meta" className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Icon name="map-pin" size="default" className="mt-px text-gold-600" />
                <div>
                  <dt className="text-caption text-text-muted">Lĩnh vực</dt>
                  <dd className="text-body font-medium text-ink-950">{project.category}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="briefcase" size="default" className="mt-px text-gold-600" />
                <div>
                  <dt className="text-caption text-text-muted">Dịch vụ</dt>
                  <dd className="text-body font-medium text-ink-950">{SERVICE_LABEL_BY_CATEGORY[project.category] ?? project.category}</dd>
                </div>
              </div>
              {project.durationLabel ? (
                <div className="flex items-start gap-3">
                  <Icon name="clock" size="default" className="mt-px text-gold-600" />
                  <div>
                    <dt className="text-caption text-text-muted">Thời gian</dt>
                    <dd className="text-body font-medium text-ink-950">{project.durationLabel}</dd>
                  </div>
                </div>
              ) : null}
              {project.completedLabel ? (
                <div className="flex items-start gap-3">
                  <Icon name="calendar" size="default" className="mt-px text-gold-600" />
                  <div>
                    <dt className="text-caption text-text-muted">Năm hoàn thành</dt>
                    <dd className="text-body font-medium text-ink-950">{project.completedLabel}</dd>
                  </div>
                </div>
              ) : null}
            </dl>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={assetPath("project-detail-device-master")}
              alt={`Minh hoạ giao diện ${project.title}`}
              fill
              priority
              className="object-contain"
            />
          </div>
        </Container>
      </section>

      <nav id="case-tabs" aria-label="Điều hướng nội dung dự án" className="sticky top-16 z-10 border-b border-border bg-ivory-50/95 backdrop-blur lg:top-[76px]">
        <Container>
          <ul className="no-scrollbar flex gap-6 overflow-x-auto py-3 text-small font-medium text-text-secondary">
            {TABS.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="whitespace-nowrap hover:text-gold-700">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Section id="overview">
        <Container width="editorial">
          <SectionHeading eyebrow="Tổng quan" title="Bối cảnh dự án" />
          <p className="mt-4 text-body-lg text-text-secondary">{project.summary}</p>
        </Container>
      </Section>

      {project.challenge ? (
        <Section id="problem" tone="ivory">
          <Container width="editorial">
            <SectionHeading eyebrow="Vấn đề" title="Thách thức ban đầu" />
            <p className="mt-4 text-body-lg text-text-secondary">{project.challenge}</p>
          </Container>
        </Section>
      ) : null}

      {project.solution ? (
        <Section id="solution">
          <Container width="editorial">
            <SectionHeading eyebrow="Giải pháp" title="Cách chúng tôi triển khai" />
            <p className="mt-4 text-body-lg text-text-secondary">{project.solution}</p>
          </Container>
        </Section>
      ) : null}

      {(project.resultMetrics && project.resultMetrics.length > 0) || (project.results && project.results.length > 0) ? (
        <Section id="results" tone="ivory">
          <Container width="editorial">
            <SectionHeading eyebrow="Kết quả" title="Kết quả đạt được" />
            {project.resultMetrics && project.resultMetrics.length > 0 ? (
              <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {project.resultMetrics.map((m) => (
                  <div key={m.label} className="rounded-md border border-border bg-white p-5 text-center shadow-sm">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="text-h3-mobile font-heading text-gold-700">{m.value}</dd>
                    <p className="mt-1 text-small text-text-secondary">{m.label}</p>
                  </div>
                ))}
              </dl>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {project.results?.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-body-lg text-text-secondary">
                    <Icon name="circle-check" size="default" className="mt-px shrink-0 text-state-success" />
                    {r}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-caption text-text-muted">Kết quả minh hoạ cho dự án mẫu, chưa phải số liệu thực tế xác nhận.</p>
          </Container>
        </Section>
      ) : null}

      {project.technology && project.technology.length > 0 ? (
        <Section id="technology">
          <Container width="editorial">
            <SectionHeading eyebrow="Công nghệ" title="Công nghệ sử dụng" />
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technology.map((t) => (
                <span key={t} className="rounded-pill border border-border px-3 py-1 text-small text-text-secondary">
                  {t}
                </span>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="visual-showcase" tone="dark">
        <Container>
          <SectionHeading onDark eyebrow="Giao diện" title="Giao diện website" align="center" />
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
            {showcaseAssetId ? (
              <Image src={assetPath(showcaseAssetId)} alt={`Minh hoạ giao diện ${project.title}`} fill className={showcaseFit} />
            ) : null}
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section id="related-projects">
          <Container>
            <SectionHeading eyebrow="Dự án liên quan" title="Xem thêm dự án cùng nhóm dịch vụ" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProjectPreviewCard key={p.title} preview={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCta sourceComponent="project-detail-final-cta" defaultService={project.category} />
    </>
  );
}
