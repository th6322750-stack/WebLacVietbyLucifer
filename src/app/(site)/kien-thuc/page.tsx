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
import { articles } from "@/content/articles";
import { assetPath } from "@/lib/assets";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kiến thức",
  description: "Bài viết chia sẻ kiến thức về website, mạng xã hội và công cụ số cho doanh nghiệp.",
  path: "/kien-thuc",
});

const categories = Array.from(new Set(articles.map((a) => a.category)));

export default async function KnowledgePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && categories.includes(category) ? category : "all";
  const featured = articles[0]!;
  const rest = articles.slice(1).filter((a) => active === "all" || a.category === active);

  return (
    <>
      <PageHero
        eyebrow="Kiến thức"
        title="Kiến thức về website, mạng xã hội & công cụ số"
        description="Chia sẻ kinh nghiệm thực tế giúp doanh nghiệp vận hành hiệu quả hơn trên môi trường số."
        imageAssetId="knowledge-hero-master"
        imageAlt="Kiến thức Lạc Việt Media"
      />

      <Section id="category-filters">
        <Container>
          <CategoryFilter categories={categories} active={active} />
        </Container>
      </Section>

      {active === "all" ? (
        <Section id="featured-article" tone="ivory">
          <Container>
            <SectionHeading eyebrow="Bài viết nổi bật" title="Đừng bỏ lỡ" />
            <Link
              href={`/kien-thuc/${featured.slug}`}
              className="mt-8 grid gap-6 overflow-hidden rounded-lg border border-border bg-white shadow-sm lg:grid-cols-2"
            >
              <div className="relative aspect-[16/9] w-full lg:aspect-auto">
                {featured.coverAssetId ? (
                  <Image src={assetPath(featured.coverAssetId)} alt={featured.title} fill className="object-cover" />
                ) : null}
                <span className="absolute left-4 top-4 rounded-pill bg-ink-950 px-3 py-1 text-caption uppercase text-gold-300">
                  Nổi bật
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="text-caption uppercase text-gold-700">{featured.category}</span>
                <h3 className="mt-2 text-h3-mobile lg:text-h3-desktop text-ink-950">{featured.title}</h3>
                <p className="mt-3 text-body text-text-secondary">{featured.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-caption text-text-muted">
                  <span>{featured.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-gold-700">
                  Đọc tiếp
                  <Icon name="arrow-right" size="inline" />
                </span>
              </div>
            </Link>
          </Container>
        </Section>
      ) : null}

      <Section id="article-grid">
        <Container>
          <SectionHeading eyebrow="Bài viết mới nhất" title="Kiến thức mới cập nhật" />
          <div className="mt-8">
            <ArticleGrid articles={rest} />
          </div>
        </Container>
      </Section>

      <Section id="newsletter" tone="ivory">
        <Container width="editorial">
          <div className="rounded-lg bg-ink-950 p-8 text-center md:p-10">
            <Icon name="mail" size="feature" className="mx-auto text-gold-300" />
            <h2 className="mt-4 text-h3-mobile text-white">Cập nhật kiến thức mới nhất mỗi tuần từ Lạc Việt</h2>
            <p className="mt-2 text-body text-white/76">Đăng ký để không bỏ lỡ bài viết mới về website, mạng xã hội và công cụ số.</p>
            <div className="mx-auto mt-6 max-w-md text-left">
              <NewsletterForm onDark />
            </div>
          </div>
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
