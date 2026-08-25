import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { KnowledgeNetwork } from "@/components/layout/KnowledgeNetwork";
import { CategoryFilter } from "@/components/content/CategoryFilter";
import { NewsletterForm } from "@/components/conversion/NewsletterForm";
import { FinalCta } from "@/components/layout/FinalCta";
import { ArticleGrid } from "./ArticleGrid";
import { getVisibleArticles } from "@/content/articles";
import { assetPath } from "@/lib/assets";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kiến thức",
  description: "Bài viết chia sẻ kiến thức về website, mạng xã hội và công cụ số cho doanh nghiệp.",
  path: "/kien-thuc",
});

// Fixed order per approved master (page-08) — not derived from article insertion order.
const categories = ["Website", "TikTok", "Facebook", "AI", "SEO", "Marketing"];
const visibleArticles = getVisibleArticles();

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default async function KnowledgePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && categories.includes(category) ? category : "all";
  const featured = visibleArticles[0]!;
  // PRO V2.1 §53: editorial split — featured (large) + 2 secondary articles share the top
  // block; the grid below picks up from the 4th article. Only applies to the unfiltered "all"
  // view, same as the featured block itself — a filtered category grid shows every match.
  const secondary = active === "all" ? visibleArticles.slice(1, 3) : [];
  const grid = active === "all" ? visibleArticles.slice(3) : visibleArticles.filter((a) => a.category === active);

  return (
    <>
      <PageHero
        eyebrow="Kiến thức"
        title="Kiến thức"
        description="Chia sẻ kiến thức, kinh nghiệm và xu hướng mới nhất trong Digital Marketing, Mạng xã hội, AI và Truyền thông giúp doanh nghiệp bứt phá trong kỷ nguyên số."
        heroSlot={<KnowledgeNetwork className="hidden lg:block" />}
      />

      <Section id="category-filters" compact>
        <Container>
          <ScrollReveal direction="down" distance={16} duration={0.5}>
            <CategoryFilter categories={categories} active={active} />
          </ScrollReveal>
        </Container>
      </Section>

      {active === "all" ? (
        <Section id="featured-article" tone="ivory">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Bài viết nổi bật" title="Đừng bỏ lỡ" />
            </ScrollReveal>
            {/* PRO V2.1 §53: 60/40 editorial split — featured article large on the left, two
                secondary articles stacked right, instead of one oversized card alone above a
                flat grid. */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <ScrollReveal direction="up" distance={24} duration={0.8} delay={100}>
                <Link
                  href={`/kien-thuc/${featured.slug}`}
                  className="grid h-full gap-6 overflow-hidden rounded-2xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-xl sm:grid-cols-2"
                >
                  <div className="relative aspect-[16/9] w-full sm:aspect-auto">
                    {featured.coverAssetId ? (
                      <Image src={assetPath(featured.coverAssetId)} alt={featured.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                    ) : null}
                    <span className="absolute left-4 top-4 rounded-pill bg-ink-950 px-3 py-1 text-caption uppercase text-gold-300">
                      Nổi bật
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <span className="text-caption font-semibold uppercase text-gold-700">{featured.category}</span>
                    <h3 className="mt-2 text-h3-mobile font-heading text-ink-950 lg:text-h3-desktop">{featured.title}</h3>
                    <p className="mt-3 text-body text-text-secondary">{featured.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-caption text-text-muted">
                      <span>{featured.author}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1 text-small font-semibold text-gold-700">
                      Đọc tiếp
                      <Icon name="arrow-right" size="inline" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>

              <div className="flex flex-col gap-6">
                {secondary.map((a, idx) => (
                  <ScrollReveal key={a.slug} direction="up" distance={24} duration={0.7} delay={200 + idx * 100} className="h-full">
                    <Link
                      href={`/kien-thuc/${a.slug}`}
                      className="flex h-full items-center gap-4 rounded-2xl border border-gold-500/20 bg-white p-4 shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-xl"
                    >
                      {a.coverAssetId ? (
                        <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
                          <Image src={assetPath(a.coverAssetId)} alt={a.title} fill sizes="112px" className="object-cover" />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <span className="text-caption font-semibold uppercase text-gold-700">{a.category}</span>
                        <h4 className="mt-1 line-clamp-2 font-heading text-small font-semibold text-ink-950">{a.title}</h4>
                        <time dateTime={a.publishedAt} className="mt-2 block text-article-meta text-text-muted">
                          {formatDate(a.publishedAt)}
                        </time>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="article-grid">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Bài viết mới nhất" title="Kiến thức mới cập nhật" />
          </ScrollReveal>
          <div className="mt-8">
            <ArticleGrid articles={grid} />
          </div>
        </Container>
      </Section>

      {/* PRO V2.2 §8: was a narrow card centered in an "editorial"-width container — read as a
          box floating alone rather than part of the page. Full-width dark strip instead, copy
          left / form right, matching the same "band" rhythm FinalCta's `strip` variant already
          uses elsewhere on the site rather than inventing a new container shape. */}
      <Section id="newsletter" tone="dark">
        <Container>
          <ScrollReveal direction="up" distance={24} duration={0.7}>
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:gap-10 md:text-left">
              <div className="flex items-center gap-4">
                <Icon name="mail" size="feature" className="hidden shrink-0 text-gold-300 md:block" />
                <div>
                  <h2 className="text-h3-mobile font-heading text-white lg:text-h3-desktop">
                    Cập nhật kiến thức mới nhất mỗi tuần
                  </h2>
                  <p className="mt-2 max-w-md text-body text-white/75">
                    Đăng ký để không bỏ lỡ bài viết mới về website, mạng xã hội và công cụ số.
                  </p>
                </div>
              </div>
              <div className="w-full max-w-sm text-left">
                <NewsletterForm onDark />
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <FinalCta
        sourceComponent="knowledge-service-cta"
        title="Bạn cần giải pháp Digital Marketing tối ưu cho doanh nghiệp?"
        description="Đội ngũ Lạc Việt sẵn sàng đồng hành cùng doanh nghiệp xây dựng chiến lược nội dung hiệu quả."
      />
    </>
  );
}
