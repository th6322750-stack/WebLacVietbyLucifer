import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FinalCta } from "@/components/layout/FinalCta";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import {
  industryShowcase,
  findConcept,
  relatedConcepts,
  CONCEPT_DISCLOSURE,
} from "@/content/industry-showcase";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { claimAttrsFor } from "@/lib/content-truth";

/** Concept detail — PHUONG_AN §7.3.3.
 *
 * Structure follows a product-detail rhythm because that is what makes a gallery browsable, but
 * deliberately without the parts that would turn an illustration into a claim: no rating, no
 * review count, no warranty, no "delivered for" client name. Optional sections vanish when the
 * concept has no data for them rather than being padded out.
 */

export function generateStaticParams() {
  return industryShowcase.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = findConcept(slug);
  if (!concept) {
    return pageMetadata({ title: "Concept giao diện", description: "", path: `/website/concept/${slug}` });
  }
  return pageMetadata({
    title: `${concept.title} — Concept website | Lạc Việt Media`,
    description:
      concept.summary ??
      `Concept giao diện website ngành ${concept.industry} — minh hoạ phong cách thiết kế, không phải dự án đã triển khai.`,
    path: `/website/concept/${concept.slug}`,
  });
}

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = findConcept(slug);
  if (!concept) notFound();

  const related = relatedConcepts(concept.slug);

  return (
    <>
      {/* Breadcrumb only. No Product/Review/AggregateRating: this is a design concept, not an
          offer that can be bought, and fabricated ratings are exactly what Google's structured
          data policy forbids. */}
      <JsonLd data={breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: "Thiết kế website", path: "/website" },
        { name: "Concept giao diện", path: "/website/concept" },
        { name: concept.title, path: `/website/concept/${concept.slug}` },
      ])} />

      <Section id="concept-hero" tone="dark">
        <Container>
          <Breadcrumbs
            onDark
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Thiết kế website", href: "/website" },
              { label: "Concept", href: "/website/concept" },
              { label: concept.title },
            ]}
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="text-white">
              <span className="text-eyebrow uppercase tracking-[0.14em] text-gold-300">
                {concept.industry}
              </span>
              <h1 className="mt-3 font-heading text-h1-mobile text-white lg:text-h1-desktop">
                {concept.title}
              </h1>
              <p className="mt-5 max-w-editorial text-body-lg text-white/80">
                {concept.summary ??
                  `Concept giao diện cho lĩnh vực ${concept.industry.toLowerCase()}, thể hiện cách bố cục, màu sắc và luồng nội dung phù hợp với ngành.`}
              </p>
              <p className="mt-4 max-w-editorial text-small text-white/55" {...claimAttrsFor("demo")}>
                {CONCEPT_DISCLOSURE}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/website#website-packages"
                  className="inline-flex min-h-touch items-center gap-2 rounded-pill bg-gold-metallic px-6 py-3 text-button font-semibold text-ink-950"
                >
                  Xem bảng giá website
                  <Icon name="arrow-right" size="inline" />
                </Link>
                {/* Rendered only when a real preview exists. Never a placeholder href. */}
                {concept.demoUrl ? (
                  <a
                    href={concept.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-touch items-center gap-2 rounded-pill border border-white/25 px-6 py-3 text-button font-semibold text-white transition-colors hover:border-gold-500/60"
                  >
                    <Icon name="external-link" size="inline" />
                    Xem demo
                  </a>
                ) : null}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl">
              {/* Thanh trình duyệt tối giản dựng bằng CSS, không đụng vào pixel của ảnh concept.
                  Nó nói ngay đây là một giao diện web chứ không phải một tấm poster. */}
              <div
                aria-hidden="true"
                className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-2.5"
              >
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="ml-3 h-4 flex-1 rounded-sm bg-white/[0.06]" />
              </div>
              <Image
                src={concept.imagePath}
                alt={`Concept giao diện ${concept.title}`}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="h-auto w-full object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </Section>

      <PageJumpNav
        items={[
          ...(concept.suitableFor?.length || concept.modules?.length
            ? [{ href: "#phu-hop-va-hang-muc", label: "Phù hợp & hạng mục" }]
            : []),
          ...(concept.gallery?.length ? [{ href: "#hinh-anh", label: "Hình ảnh" }] : []),
          { href: "#nang-luc", label: "Năng lực triển khai" },
          ...(related.length > 0 ? [{ href: "#concept-lien-quan", label: "Concept liên quan" }] : []),
        ]}
      />

      {/* suitableFor và modules từng là hai section rời, mỗi cái một lưới card giống hệt cái
          kia — hai lưới nối nhau đọc như một trang bị lặp. Khi có cả hai, chúng vào một split;
          khi chỉ có một, nó chiếm đủ bề ngang thay vì để trống một nửa. */}
      {concept.suitableFor?.length || concept.modules?.length ? (
        <Section id="phu-hop-va-hang-muc" tone="ivory">
          <Container>
            <div
              className={`grid gap-8 ${
                concept.suitableFor?.length && concept.modules?.length ? "lg:grid-cols-2 lg:gap-12" : ""
              }`}
            >
              {concept.suitableFor?.length ? (
                <div>
                  <SectionHeading eyebrow="Phù hợp với" title="Concept này hợp với ai" />
                  <ul className="mt-6 flex list-none flex-col divide-y divide-border">
                    {concept.suitableFor.map((item) => (
                      <li key={item} className="flex items-start gap-3 py-3.5 first:pt-0">
                        <Icon name="circle-check" size="card" className="mt-px shrink-0 text-state-success" />
                        <span className="text-body text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {concept.modules?.length ? (
                <div>
                  <SectionHeading eyebrow="Hạng mục" title="Những phần chính trong concept" />
                  <ul className="mt-6 flex list-none flex-col divide-y divide-border">
                    {concept.modules.map((item) => (
                      <li key={item} className="flex items-start gap-3 py-3.5 first:pt-0">
                        <Icon name="check" size="card" className="mt-px shrink-0 text-gold-600" />
                        <span className="text-body text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {concept.gallery?.length ? (
        <Section id="hinh-anh" tone="ivory">
          <Container>
            <SectionHeading eyebrow="Hình ảnh" title="Một số màn hình" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {concept.gallery.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${concept.title} — màn hình ${index + 1}`}
                  width={900}
                  height={600}
                  loading="lazy"
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="h-auto w-full rounded-xl border border-border object-cover"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="nang-luc" tone="dark" texture>
        <Container>
          <SectionHeading onDark eyebrow="Năng lực triển khai" title="Từ concept đến website hoàn chỉnh" align="center" />
          {/* Divider thay cho bốn card nền: bốn dòng ngắn trong bốn hộp là bốn cái viền quanh
              bốn câu, và trên nền tối chúng còn làm loãng chính độ tương phản của section. */}
          <div className="mt-10 grid gap-x-10 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {[
              { icon: "monitor-smartphone" as const, title: "Responsive", body: "Hiển thị đúng trên điện thoại, tablet và desktop." },
              { icon: "search" as const, title: "Chuẩn SEO on-page", body: "Cấu trúc thẻ, tốc độ tải và metadata theo chuẩn." },
              { icon: "palette" as const, title: "Theo nhận diện", body: "Màu sắc, font và hình ảnh theo thương hiệu của bạn." },
              { icon: "headset" as const, title: "Bàn giao & hỗ trợ", body: "Hướng dẫn quản trị và hỗ trợ theo thoả thuận." },
            ].map((item, index) => (
              <ScrollReveal key={item.title} direction="up" distance={20} duration={0.6} delay={index * 100}>
                <div className="flex h-full flex-col gap-2 py-5 sm:py-0 lg:border-l lg:border-white/10 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                  <Icon name={item.icon} size="feature" className="text-gold-300" />
                  <h3 className="font-heading text-h4-mobile text-white lg:text-h4-desktop">{item.title}</h3>
                  <p className="text-small text-white/70">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section id="concept-lien-quan">
          <Container>
            <SectionHeading eyebrow="Xem thêm" title="Concept liên quan" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/website/concept/${item.slug}`}
                  {...claimAttrsFor("demo")}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-100">
                    <Image
                      src={item.imagePath}
                      alt={`Concept giao diện ${item.title}`}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <span className="text-caption font-semibold uppercase text-gold-700">{item.industry}</span>
                    <span className="font-heading text-card-h3-mobile text-ink-950">{item.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCta
        variant="strip"
        sourceComponent="concept-detail-final-cta"
        title="Muốn dựng website theo phong cách này?"
        description="Nhắn Zalo để trao đổi nhu cầu và nhận phương án phù hợp."
        secondaryHref="/website/concept"
        secondaryLabel="Xem concept khác"
      />
    </>
  );
}

export const dynamicParams = false;
