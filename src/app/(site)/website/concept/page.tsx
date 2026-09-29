import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/layout/FinalCta";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { Icon } from "@/components/ui/Icon";
import { MobileLoadMore } from "@/components/content/MobileLoadMore";
import {
  industryShowcase,
  conceptIndustries,
  CONCEPT_DISCLOSURE,
} from "@/content/industry-showcase";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { claimAttrsFor } from "@/lib/content-truth";

export const metadata = pageMetadata({
  title: "Concept giao diện website theo ngành | Lạc Việt Media",
  description:
    "Bộ concept giao diện website theo từng lĩnh vực — minh hoạ phong cách thiết kế Lạc Việt Media có thể triển khai.",
  path: "/website/concept",
});

/** Full concept gallery — PHUONG_AN §7.3.2.
 *
 * Filtering lives in the URL (`?industry=`), not in component state. That makes a filtered view
 * shareable, linkable and server-rendered; a `useState` filter would have produced one page for
 * a crawler and a different one for everyone who follows a link.
 */
export default async function ConceptGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const { industry } = await searchParams;
  const industries = conceptIndustries();
  const active = industry && industries.includes(industry) ? industry : null;
  const visible = active ? industryShowcase.filter((c) => c.industry === active) : industryShowcase;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Thiết kế website", path: "/website" },
          { name: "Concept giao diện", path: "/website/concept" },
        ])}
      />
      <PageHero
        eyebrow="Concept đa ngành"
        breadcrumbs={
          <Breadcrumbs
            onDark
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Thiết kế website", href: "/website" },
              { label: "Concept giao diện" },
            ]}
          />
        }
        title="Concept giao diện theo lĩnh vực"
        description="Chọn lĩnh vực để xem phong cách thiết kế phù hợp. Mỗi concept thể hiện cách bố cục, màu sắc và luồng nội dung cho ngành đó."
      />

      <PageJumpNav
        items={[
          { href: "#concept-filter", label: "Lọc theo lĩnh vực" },
          { href: "#concept-grid", label: "Bộ sưu tập" },
        ]}
      />

      <Section id="concept-filter" compact>
        <Container>
          <p className="max-w-editorial text-small text-text-muted" {...claimAttrsFor("demo")}>
            {CONCEPT_DISCLOSURE}
          </p>

          {/* Real links, not buttons: each filter state is its own URL, so they must be
              navigable, middle-clickable and crawlable. */}
          {/* Dải mờ ở mép phải là tín hiệu duy nhất cho biết còn lĩnh vực ngoài khung — hàng
              chip cắt ngọt ở mép màn hình trông y hệt một hàng đã hết. */}
          <nav aria-label="Lọc theo lĩnh vực" className="relative mt-5">
            <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
            <ul className="flex w-max list-none gap-2 md:w-auto md:flex-wrap">
              <li>
                <FilterChip href="/website/concept" active={active === null}>
                  Tất cả
                </FilterChip>
              </li>
              {industries.map((name) => (
                <li key={name}>
                  <FilterChip
                    href={`/website/concept?industry=${encodeURIComponent(name)}`}
                    active={active === name}
                  >
                    {name}
                  </FilterChip>
                </li>
              ))}
            </ul>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ivory-50 to-transparent md:hidden"
            />
          </nav>
          <p className="mt-2 text-caption text-text-muted md:hidden">Vuốt để xem thêm lĩnh vực</p>

          <p className="mt-4 text-small text-text-muted" aria-live="polite">
            {visible.length} concept{active ? ` trong lĩnh vực ${active}` : ""}
          </p>
        </Container>
      </Section>

      <Section id="concept-grid" tone="ivory">
        <Container>
          {visible.length === 0 ? (
            <p className="py-10 text-center text-body text-text-secondary">
              Chưa có concept nào trong lĩnh vực này.{" "}
              <Link href="/website/concept" className="font-semibold text-gold-700 underline">
                Xem tất cả concept
              </Link>
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,340px))] justify-center gap-5">
              {/* Mobile chỉ hiện 8 card trước, desktop vẫn đủ. Ba mươi ảnh xếp dọc ở 390px cao
                  12.452px — không ai cuộn hết, mà mỗi ảnh vẫn phải tải. MobileLoadMore giữ
                  TOÀN BỘ card trong HTML (crawler và người không có JS vẫn thấy đủ), chỉ ẩn
                  bằng class ở khổ nhỏ. Nút không điều hướng nên bộ lọc ?industry= không mất. */}
              <MobileLoadMore initial={8} label="Xem thêm concept">
              {visible.map((concept, index) => (
                <ScrollReveal
                  key={concept.slug}
                  direction="up"
                  distance={20}
                  duration={0.6}
                  delay={Math.min(index, 3) * 80}
                  className="h-full"
                >
                  <Link
                    href={`/website/concept/${concept.slug}`}
                    {...claimAttrsFor("demo")}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-100">
                      <Image
                        src={concept.imagePath}
                        alt={`Concept giao diện ${concept.title}`}
                        fill
                        sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <span className="text-caption font-semibold uppercase text-gold-700">
                        {concept.industry}
                      </span>
                      <h2 className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">
                        {concept.title}
                      </h2>
                      <span className="mt-auto inline-flex items-center gap-1 text-small font-semibold text-gold-700">
                        Xem chi tiết
                        <Icon name="arrow-right" size="inline" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
              </MobileLoadMore>
            </div>
          )}
        </Container>
      </Section>

      <FinalCta
        variant="strip"
        sourceComponent="concept-gallery-final-cta"
        title="Thấy phong cách phù hợp với ngành của bạn?"
        description="Nhắn Zalo để trao đổi nhu cầu và nhận phương án phù hợp."
        secondaryHref="/website#website-packages"
        secondaryLabel="Xem bảng giá"
      />
    </>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-touch items-center whitespace-nowrap rounded-pill border px-4 py-2 text-chip font-medium transition-colors duration-normal ease-standard ${
        active
          ? "border-gold-500 bg-gold-metallic text-ink-950"
          : "border-gold-500/25 bg-white text-text-secondary hover:border-gold-500/50 hover:text-gold-700"
      }`}
    >
      {children}
    </Link>
  );
}
