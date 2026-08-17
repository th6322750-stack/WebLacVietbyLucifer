"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/content/ArticleCard";
import { Button } from "@/components/ui/Button";

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
      {hasMore ? (
        <div id="load-more" className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
            Xem thêm bài viết
          </Button>
        </div>
      ) : null}
    </div>
  );
}
