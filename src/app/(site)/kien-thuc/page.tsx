import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { CategoryFilter } from "@/components/content/CategoryFilter";
import { NewsletterForm } from "@/components/conversion/NewsletterForm";
import { FinalCta } from "@/components/layout/FinalCta";
import { ArticleGrid } from "./ArticleGrid";
import { articles } from "@/content/articles";
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
            <SectionHeading eyebrow="Bài viết nổi bật" title={featured.title} />
            <div className="mt-6 max-w-editorial">
              <ArticleCard article={featured} />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="article-grid">
        <Container>
          <ArticleGrid articles={rest} />
        </Container>
      </Section>

      <Section id="newsletter" tone="ivory">
        <Container width="editorial" className="text-center">
          <SectionHeading eyebrow="Bản tin" title="Nhận bài viết mới qua email" align="center" />
          <div className="mx-auto mt-6 max-w-md text-left">
            <NewsletterForm />
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="knowledge-service-cta" />
    </>
  );
}
