"use client";

import { useEffect, useRef, useState } from "react";
import type { ArticleSection } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

// Header is sticky at 64px (mobile) / 76px (desktop) — offset anchor scroll so the
// target heading isn't hidden underneath it (IMPLEMENTATION_CONTRACT: headerOffsetAnchorScroll).
const HEADER_OFFSET = 96;

export function ArticleTOC({ sections }: { sections: ArticleSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0]!.target.id);
        }
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -70% 0px` },
    );

    headings.forEach((h) => observerRef.current?.observe(h));
    return () => observerRef.current?.disconnect();
  }, [sections]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <nav aria-label="Mục lục bài viết">
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex min-h-touch w-full items-center justify-between rounded-sm border border-border bg-white px-4 text-body-lg font-medium text-ink-950"
        >
          Mục lục
          <Icon name="chevron-down" className={`transition-transform duration-normal ease-standard ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen ? <TocList sections={sections} activeId={activeId} onSelect={scrollToSection} /> : null}
      </div>

      <div className="hidden lg:sticky lg:top-24 lg:block">
        <p className="text-eyebrow uppercase text-text-muted">Mục lục</p>
        <TocList sections={sections} activeId={activeId} onSelect={scrollToSection} className="mt-3" />
      </div>
    </nav>
  );
}

function TocList({
  sections,
  activeId,
  onSelect,
  className = "",
}: {
  sections: ArticleSection[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <ul className={`flex flex-col gap-1 border-l border-border ${className}`}>
      {sections.map((s) => {
        const isActive = activeId === s.id;
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              aria-current={isActive ? "location" : undefined}
              className={`block w-full border-l-2 py-1.5 pl-4 text-left text-small transition-colors duration-fast ease-standard ${
                isActive ? "border-gold-500 font-semibold text-ink-950" : "border-transparent text-text-secondary hover:text-ink-900"
              }`}
              style={{ marginLeft: "-1px" }}
            >
              {s.heading}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
