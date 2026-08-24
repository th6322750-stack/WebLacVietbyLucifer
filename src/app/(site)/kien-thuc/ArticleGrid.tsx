"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/content/ArticleCard";
import { Button } from "@/components/ui/Button";
import { assetPath } from "@/lib/assets";
import { formatDate } from "@/lib/format";

/** MASTER PARITY V4: the 1440 master shows SIX dense latest-article cards (3x2), not three
 * oversized ones — the spec calls the old count out explicitly. The 390 master shows roughly the
 * same six items as compact thumbnail rows rather than six full-height cards. */
const PAGE_SIZE = 6;

export function ArticleGrid({ articles }: { articles: Article[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  if (articles.length === 0) {
    return <p className="py-10 text-center text-body text-text-secondary">Chưa có bài viết trong danh mục này.</p>;
  }

  return (
    <div>
      {/* Desktop: dense 3-column card grid. */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>

      {/* Mobile: compact list rows, the approved 390 treatment. */}
      <ul className="flex flex-col divide-y divide-border sm:hidden">
        {visible.map((a) => (
          <li key={a.slug}>
            <Link href={`/kien-thuc/${a.slug}`} data-demo-only={a.demoOnly} className="flex items-center gap-3 py-3">
              {/* coverAssetId is optional on Article, and assetPath throws on an unknown id by
                  design — so the thumbnail is conditional rather than assuming one exists. */}
              {a.coverAssetId ? (
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-sm">
                  <Image src={assetPath(a.coverAssetId)} alt={a.title} fill sizes="80px" className="object-cover" />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="line-clamp-2 text-small font-medium text-ink-950">{a.title}</p>
                <p className="mt-1 text-article-meta text-text-muted">{formatDate(a.publishedAt)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div id="load-more" className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
            Xem thêm bài viết
          </Button>
        </div>
      ) : null}
    </div>
  );
}
