"use client";

import { useMemo, useState } from "react";
import type { IndustryShowcaseItem } from "@/content/industry-showcase";
import { IndustryShowcaseCard } from "@/components/content/IndustryShowcaseCard";

const ALL = "Tất cả";
// PRO V2.2 §2: mobile no longer renders all 30 at once — that read as an endless scroll. Same
// batch size on every breakpoint (simpler than a resize-aware split, and 9 already sits in
// brief's "8-12 initial" range while filling a clean 3-column row on desktop).
const BATCH_SIZE = 9;

/** Lưới concept giao diện web lọc theo ngành — bấm chip để lọc, bấm ảnh mở Zalo (xem
 * IndustryShowcaseCard). Danh sách chip tự sinh từ `industry` có trong dữ liệu, không hard-code,
 * nên thêm/bớt ảnh trong industry-showcase.ts không cần sửa gì ở đây. */
export function IndustryGallery({ items }: { items: IndustryShowcaseItem[] }) {
  const industries = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const item of items) {
      if (!seen.has(item.industry)) {
        seen.add(item.industry);
        list.push(item.industry);
      }
    }
    return list;
  }, [items]);

  const [active, setActive] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const filtered = active === ALL ? items : items.filter((item) => item.industry === active);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const selectFilter = (label: string) => {
    setActive(label);
    setVisibleCount(BATCH_SIZE); // PRO V2.2 §2: changing filter resets to the first batch.
  };

  return (
    <div className="mt-8">
      {/* PRO V2.2 §10: lightly sticky under the header while scrolling through the gallery —
          the header itself is 64/76px tall, so this docks just below it rather than under it. */}
      <div className="sticky top-16 z-10 -mx-4 bg-ivory-50 px-4 py-2 lg:top-[76px]">
        {/* PRO V2.1 §38: mobile no longer wraps chips into a centered block — that shrank each
            chip's tap target as more industries got added. Horizontal scroll keeps every chip at
            full size; `md:` restores the centered wrap once there's room. */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center md:overflow-visible">
          {[ALL, ...industries].map((label) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => selectFilter(label)}
                aria-pressed={isActive}
                className={`shrink-0 whitespace-nowrap rounded-pill px-4 py-2 text-small font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-gold-metallic text-ink-950"
                    : "border border-gold-500/20 bg-white text-text-secondary hover:border-gold-500/50 hover:text-ink-950"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRO V2.2 §13: visible result feedback — filtering used to give no confirmation beyond
          the grid itself changing, which read as a glitch when only 1-2 cards matched. */}
      <p className="mt-4 text-center text-caption text-text-muted">
        {active === ALL
          ? `${filtered.length} giao diện concept`
          : `${filtered.length} giao diện thuộc ${active}`}
      </p>

      {/* PRO V2.2 §2/§13: `auto-fit` + `justify-center` instead of fixed breakpoint columns —
          when there are only 1-2 results, the row centers itself instead of hugging the left
          edge with a large dangling gap on the right (confirmed bug, not a guess: the "Bất động
          sản" filter state screenshot showed exactly that). Columns still range 1 (narrow mobile)
          to 4 (wide desktop) exactly as the fixed breakpoints did — this is the same responsive
          behavior, just also correct when the result count is small. */}
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(280px,340px))] justify-center gap-4 md:gap-5">
        {visible.map((item) => (
          <IndustryShowcaseCard key={item.slug} item={item} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + 6)}
            className="rounded-pill border border-gold-500/30 bg-white px-6 py-3 text-small font-semibold text-gold-700 transition-colors duration-200 hover:border-gold-500/60 hover:bg-ivory-100"
          >
            Xem thêm giao diện
          </button>
        </div>
      ) : null}
    </div>
  );
}
