import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
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
  const grid = active === "all" ? visibleArticles.slice(1) : visibleArticles.filter((a) => a.category === active);

  return (
    <>
      <PageHero
        eyebrow="Kiến thức"
        title="Kiến thức"
        description="Chia sẻ kiến thức, kinh nghiệm và xu hướng mới nhất trong Digital Marketing, Mạng xã hội, AI và Truyền thông giúp doanh nghiệp bứt phá trong kỷ nguyên số."
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
            <ScrollReveal direction="up" distance={24} duration={0.8} delay={100}>
              <Link
                href={`/kien-thuc/${featured.slug}`}
                className="mt-8 grid gap-6 overflow-hidden rounded-2xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-xl lg:grid-cols-2"
              >
                <div className="relative aspect-[16/9] w-full lg:aspect-auto">
                  {featured.coverAssetId ? (
                    <Image src={assetPath(featured.coverAssetId)} alt={featured.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                  ) : null}
                  <span className="absolute left-4 top-4 rounded-pill bg-ink-950 px-3 py-1 text-caption uppercase text-gold-300">
                    Nổi bật
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
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

      <Section id="newsletter" tone="ivory">
        <Container width="editorial">
          <ScrollReveal direction="up" distance={24} duration={0.7}>
            <div className="rounded-2xl border border-gold-500/25 bg-ink-950 p-8 text-center shadow-xl md:p-10">
              <Icon name="mail" size="feature" className="mx-auto text-gold-300" />
              <h2 className="mt-4 text-h3-mobile font-heading text-white">Cập nhật kiến thức mới nhất mỗi tuần từ Lạc Việt</h2>
              <p className="mt-2 text-body text-white/75">Đăng ký để không bỏ lỡ bài viết mới về website, mạng xã hội và công cụ số.</p>
              <div className="mx-auto mt-6 max-w-md text-left">
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
