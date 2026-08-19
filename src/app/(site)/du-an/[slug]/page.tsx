import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { ProjectPreviewCard } from "@/components/content/ProjectPreviewCard";
import { ProjectDetailTabs } from "@/components/content/ProjectDetailTabs";
import { FinalCta } from "@/components/layout/FinalCta";
import { projects, getProjectBySlug } from "@/content/projects";
import { relatedProjectPreview } from "@/content/route-fixtures";
import { assetPath, assetSize } from "@/lib/assets";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

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
  // ASSET_USAGE_MAP "/du-an/[slug]".visualShowcase = project-detail-showcase-approved-crop, an
  // identity-bound crop for item demo-project-01. Visible projects keep their own cover.
  const showcaseAssetId = project.hidden
    ? "project-detail-showcase-approved-crop"
    : (project.detailVisualAssetId ?? project.heroAssetId);

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
            <h1 className="mt-2 text-detail-h1-mobile lg:text-detail-h1-desktop font-heading text-ink-950">{project.title}</h1>
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

      {/* RECOVERY V2 (audit §8): a single tabbed content pane replaces the five stacked
          full-height sections. The anchor-link tab strip that used to sit here scrolled between
          those sections; it is now the tab control itself. */}
      <Section id="case-content">
        <Container>
          <ProjectDetailTabs
            panes={[
              {
                id: "overview",
                label: "Tổng quan",
                paragraphs: [project.summary],
                metrics: project.resultMetrics?.map((m) => ({ value: m.value, label: m.label })),
              },
              ...(project.challenge
                ? [{ id: "problem", label: "Vấn đề", paragraphs: [project.challenge] }]
                : []),
              ...(project.solution
                ? [{ id: "solution", label: "Giải pháp", paragraphs: [project.solution] }]
                : []),
              ...(project.resultMetrics?.length || project.results?.length
                ? [
                    {
                      id: "results",
                      label: "Kết quả",
                      metrics: project.resultMetrics?.map((m) => ({ value: m.value, label: m.label })),
                      bullets: project.resultMetrics?.length ? undefined : project.results,
                      note: "Kết quả minh hoạ cho dự án mẫu, chưa phải số liệu thực tế xác nhận.",
                    },
                  ]
                : []),
              ...(project.technology?.length
                ? [{ id: "technology", label: "Công nghệ", chips: project.technology }]
                : []),
            ]}
          />
        </Container>
      </Section>

      {/* V3 HD/4K supersedes the V2 source-limited 516x33 strip: the authority now delivers a
          full 1920x1080 lossless showcase, so the section renders it at proper editorial width
          instead of the tiny centred sliver the old cut-off source forced. Still never
          upscaled beyond native (V3 quality.noFakeUpscale). */}
      <section id="visual-showcase" className="bg-ink-950 py-12">
        <Container>
          <SectionHeading onDark eyebrow="Giao diện" title="Giao diện website" align="center" />
          <div className="mx-auto mt-6 w-full max-w-[960px] overflow-hidden rounded-lg">
            {showcaseAssetId ? (
              <Image
                src={assetPath(showcaseAssetId)}
                alt={`Minh hoạ giao diện ${project.title}`}
                width={assetSize(showcaseAssetId).width}
                height={assetSize(showcaseAssetId).height}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
            ) : null}
          </div>
        </Container>
      </section>

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
