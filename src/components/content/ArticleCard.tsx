"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { assetPath } from "@/lib/assets";
import { track } from "@/lib/analytics";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/kien-thuc/${article.slug}`}
      onClick={() => track({ name: "article_open", props: { articleSlug: article.slug, category: article.category } })}
      // Demo state carried in markup only — the approved master's article cards have no badge
      // (GD10 re-QA round 5, R5-01 point 3).
      data-demo-only={article.demoOnly}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-fast ease-standard hover:-translate-y-[3px] hover:border-gold-300 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ivory-100">
        {article.coverAssetId ? (
          <Image
            src={assetPath(article.coverAssetId)}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-normal ease-standard group-hover:scale-[1.02]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-caption uppercase text-gold-700">{article.category}</span>
        <h3 className="mt-1 line-clamp-3 text-h4-mobile text-ink-950">{article.title}</h3>
        <p className="mt-2 flex-1 text-small text-text-secondary">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-caption text-text-muted">
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
      </div>
    </Link>
  );
}
