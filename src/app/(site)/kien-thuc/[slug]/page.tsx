import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleTOC } from "@/components/content/ArticleTOC";
import { FinalCta } from "@/components/layout/FinalCta";
import { ArticleConsultCard } from "./ArticleConsultCard";
import { articles, getArticleBySlug } from "@/content/articles";
import { assetPath } from "@/lib/assets";
import { formatDate } from "@/lib/format";
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    path: `/kien-thuc/${slug}`,
  });
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: article.title,
              excerpt: article.excerpt,
              publishedAt: article.publishedAt,
              author: article.author,
              path: `/kien-thuc/${article.slug}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Trang chủ", path: "/" },
              { name: "Kiến thức", path: "/kien-thuc" },
              { name: article.title, path: `/kien-thuc/${article.slug}` },
            ]),
          ),
        }}
      />

      <Container className="py-4">
        <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Kiến thức", href: "/kien-thuc" }, { label: article.title }]} />
      </Container>

      <section id="article-header">
        <Container width="editorial">
          <span className="text-eyebrow uppercase text-gold-700">{article.category}</span>
          <h1 className="mt-3 text-h1-mobile lg:text-h1-desktop text-ink-950">{article.title}</h1>
          <div className="mt-4 flex items-center gap-2 text-small text-text-muted">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.readMinutes ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.readMinutes} phút đọc</span>
              </>
            ) : null}
          </div>
        </Container>
        {article.coverAssetId ? (
          <Container className="mt-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image src={assetPath(article.coverAssetId)} alt={article.title} fill priority className="object-cover" />
            </div>
          </Container>
        ) : null}
      </section>

      <Section id="article-layout">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr_280px]">
            <div id="article-toc">
              <ArticleTOC sections={article.content} />
            </div>
            <div id="article-body" className="max-w-editorial">
              {article.content.map((sec) => (
                <div key={sec.id} className="mb-8 scroll-mt-24">
                  <h2 id={sec.id} className="text-h3-mobile lg:text-h3-desktop text-ink-950">
                    {sec.heading}
                  </h2>
                  {sec.body.map((p, i) => (
                    <p key={i} className="mt-3 text-body-lg text-text-secondary">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <aside id="related-articles" className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              {related.length > 0 ? (
                <div>
                  <p className="text-eyebrow uppercase text-gold-700">Bài viết liên quan</p>
                  <ul className="mt-3 flex flex-col gap-4">
                    {related.map((a) => (
                      <li key={a.slug}>
                        <Link href={`/kien-thuc/${a.slug}`} className="flex items-center gap-3 group">
                          {a.coverAssetId ? (
                            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
                              <Image src={assetPath(a.coverAssetId)} alt={a.title} fill className="object-cover" />
                            </div>
                          ) : null}
                          <div>
                            <p className="line-clamp-2 text-small font-medium text-ink-950 group-hover:text-gold-700">{a.title}</p>
                            <p className="text-caption text-text-muted">{formatDate(a.publishedAt)}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <ArticleConsultCard category={article.category} />
            </aside>
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="article-service-cta" />
    </>
  );
}
