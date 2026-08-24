"use client";

import { useMemo, useState } from "react";
import type { IndustryShowcaseItem } from "@/content/industry-showcase";
import { IndustryShowcaseCard } from "@/components/content/IndustryShowcaseCard";

const ALL = "Tất cả";

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
  const filtered = active === ALL ? items : items.filter((item) => item.industry === active);

  return (
    <div className="mt-8">
      {/* PRO V2.1 §38: mobile no longer wraps chips into a centered block — that shrank each
          chip's tap target as more industries got added. Horizontal scroll keeps every chip at
          full size; `md:` restores the centered wrap once there's room. */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 -mx-4 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
        {[ALL, ...industries].map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActive(label)}
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

      {/* PRO V2.1 §39: 2-column thumbnails at 360-430px read too small to show an actual website
          preview — 1 column until `sm` (480px), where there's enough width per card again. */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <IndustryShowcaseCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
