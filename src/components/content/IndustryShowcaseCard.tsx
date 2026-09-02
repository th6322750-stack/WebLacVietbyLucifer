"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import type { IndustryShowcaseItem } from "@/content/industry-showcase";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

/** Ảnh giao diện web theo ngành — không dẫn tới trang chi tiết dự án, vì đây không phải case
 * study có kết quả thật để kể. Bấm vào mở thẳng Zalo, đúng như mọi CTA "Nhận tư vấn" khác trên
 * site (xem ConsultationProvider).
 *
 * PRO V2.2 §15: cursor-follow "XEM" badge — was a `useState` written on every `mousemove`,
 * re-rendering this component per pixel of cursor travel. Rewritten to match SpotlightCard's
 * pattern: position writes straight to a CSS custom property on the DOM node (rAF-coalesced),
 * and the badge's own opacity comes from `group-hover` in CSS, not JS state. Zero re-renders
 * from pointer movement. */
export function IndustryShowcaseCard({ item }: { item: IndustryShowcaseItem }) {
  const { open } = useConsultation();
  const frameRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  return (
    <button
      type="button"
      onClick={() => open("industry-showcase", item.title)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-gold-500/20 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
    >
      <div
        ref={frameRef}
        className="relative aspect-[16/9] w-full overflow-hidden bg-ivory-100 lg:cursor-none"
        onMouseMove={handleMove}
      >
        <Image
          src={item.imagePath}
          alt={`Concept giao diện web ngành ${item.industry}`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          aria-hidden="true"
          className="cursor-badge pointer-events-none absolute hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/85 text-caption font-semibold uppercase tracking-wide text-gold-300 opacity-0 backdrop-blur-sm transition-opacity duration-150 lg:flex lg:group-hover:opacity-100"
        >
          Xem
        </span>
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
