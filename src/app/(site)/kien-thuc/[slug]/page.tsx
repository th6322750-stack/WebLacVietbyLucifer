import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleTOC } from "@/components/content/ArticleTOC";
import { ArticlePreviewCard } from "@/components/content/ArticlePreviewCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { ArticleConsultCard } from "./ArticleConsultCard";
import { articles, getArticleBySlug } from "@/content/articles";
import { seoArticleRelatedPreview } from "@/content/route-fixtures";
import { assetPath, assetSize } from "@/lib/assets";
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
    // Demo reconstructions must not become indexed claims until their bodies are verified
    // (SEO_CONTRACT.json contentIntegrity; GD10 re-QA round 5, R5-01). Hidden fixtures stay
    // noindex for the round-4 reason as well.
    noindex: article.demoOnly || article.hidden,
  });
}

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const headerImageId = article.hidden ? "article-seo-hero-master" : article.coverAssetId;
  const related = article.hidden
    ? null
    : articles.filter((a) => a.slug !== article.slug && a.category === article.category && !a.hidden).slice(0, 3);

  return (
    <>
      {article.demoOnly ? null : (
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
      )}
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

      <Section id="article-layout">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr_280px]">
            <div id="article-toc">
              <ScrollReveal direction="left" distance={16} duration={0.6}>
                <ArticleTOC sections={article.content} />
              </ScrollReveal>
            </div>
            <div id="article-body" className="max-w-editorial">
              <header id="article-header">
                <ScrollReveal direction="down" distance={16} duration={0.5}>
                  <span className="text-eyebrow uppercase text-gold-700">{article.category}</span>
                </ScrollReveal>
                <ScrollReveal direction="up" distance={20} duration={0.6} delay={100}>
                  <h1 className="mt-3 text-detail-h1-mobile lg:text-detail-h1-desktop text-ink-950">{article.title}</h1>
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
                </ScrollReveal>
                {headerImageId ? (
                  <ScrollReveal direction="up" distance={20} duration={0.7} delay={150}>
                    <div className="overflow-hidden rounded-2xl border border-gold-500/20 shadow-lg">
                      <Image
                        src={assetPath(headerImageId)}
                        alt={article.title}
                        width={assetSize(headerImageId).width}
                        height={assetSize(headerImageId).height}
                        priority
                        sizes="(min-width: 1024px) 640px, 100vw"
                        className="mt-6 h-auto w-full transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                  </ScrollReveal>
                ) : null}
              </header>

              <div className="mt-10">
                {article.content.map((sec, idx) => (
                  <ScrollReveal key={sec.id} direction="up" distance={20} duration={0.6} delay={idx * 50}>
                    <div className="mb-8 scroll-mt-24">
                      <h2 id={sec.id} className="text-h3-mobile lg:text-h3-desktop font-heading text-ink-950">
                        {sec.heading}
                      </h2>
                      {sec.body.map((p, i) => (
                        <p key={i} className="mt-3 text-body-lg text-text-secondary leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <aside id="related-articles" className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              <ScrollReveal direction="right" distance={16} duration={0.6} delay={100}>
                {article.hidden ? (
                  <div>
                    <p className="text-eyebrow uppercase text-gold-700">Bài viết liên quan</p>
                    <ul className="mt-3 flex flex-col gap-4">
                      {seoArticleRelatedPreview.map((p) => (
                        <li key={p.title}>
                          <ArticlePreviewCard preview={p} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : related && related.length > 0 ? (
                  <div>
                    <p className="text-eyebrow uppercase text-gold-700">Bài viết liên quan</p>
                    <ul className="mt-3 flex flex-col gap-4">
                      {related.map((a) => (
                        <li key={a.slug}>
                          <Link href={`/kien-thuc/${a.slug}`} className="flex items-center gap-3 group">
                            {a.coverAssetId ? (
                              <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-gold-500/20">
                                <Image src={assetPath(a.coverAssetId)} alt={a.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
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
                <div className="mt-6">
                  <ArticleConsultCard category={article.category} />
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="article-service-cta" />
    </>
  );
}
