"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import type { IndustryShowcaseItem } from "@/content/industry-showcase";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

/** Ảnh giao diện web theo ngành — không dẫn tới trang chi tiết dự án, vì đây không phải case
 * study có kết quả thật để kể. Bấm vào mở thẳng Zalo, đúng như mọi CTA "Nhận tư vấn" khác trên
 * site (xem ConsultationProvider). */
export function IndustryShowcaseCard({ item }: { item: IndustryShowcaseItem }) {
  const { open } = useConsultation();
  // PRO V2 (2026-08-25): cursor-follow "XEM" badge on desktop hover (brief §35). Pointer position
  // is tracked only while the mouse is over the image, so the badge never renders (and this
  // component never re-renders on every mousemove) anywhere else on the page.
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <button
      type="button"
      onClick={() => open("industry-showcase", item.title)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-gold-500/20 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
    >
      <div
        className="relative aspect-[16/9] w-full overflow-hidden bg-ivory-100 lg:cursor-none"
        onMouseMove={handleMove}
        onMouseLeave={() => setCursor(null)}
      >
        <Image
          src={item.imagePath}
          alt={`Concept giao diện web ngành ${item.industry}`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {cursor ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/85 text-caption font-semibold uppercase tracking-wide text-gold-300 backdrop-blur-sm lg:flex"
            style={{ left: cursor.x, top: cursor.y }}
          >
            Xem
          </span>
        ) : null}
      </div>
      <div className="flex flex-col p-4">
        <span className="inline-flex w-fit items-center rounded-pill bg-ivory-100 px-2 py-1 text-caption font-medium text-text-secondary">
          {item.industry}
        </span>
        <span className="mt-2 font-heading text-card-h3-mobile text-ink-950 transition-colors duration-200 group-hover:text-gold-700">
          {item.title}
        </span>
      </div>
    </button>
  );
}
