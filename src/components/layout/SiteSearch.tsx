"use client";

import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { publishedServices, serviceHref } from "@/content/service-registry";
import { getVisibleArticles } from "@/content/articles";
import { industryShowcase } from "@/content/industry-showcase";
import { useBodyScrollLock, useEscapeClose, useFocusTrap } from "@/lib/a11y-hooks";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

type SearchItem = { kind: string; label: string; description: string; href: string };

// Static catalogue data is small enough to ship with the site shell. This keeps the Maxweb-style
// search lightbox instant and useful without adding a database or a second public API surface.
const SEARCH_ITEMS: SearchItem[] = [
  ...publishedServices()
    .filter((service) => !service.navHidden)
    .map((service) => ({ kind: "Dịch vụ", label: service.title, description: service.summary, href: serviceHref(service) })),
  ...getVisibleArticles().map((article) => ({ kind: "Kiến thức", label: article.title, description: article.excerpt, href: `/kien-thuc/${article.slug}` })),
  ...industryShowcase.map((concept) => ({ kind: "Concept", label: concept.title, description: `Concept giao diện ngành ${concept.industry}`, href: `/website/concept/${concept.slug}` })),
];

export function SiteSearch({ onDark = true, className = "" }: { onDark?: boolean; className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);
  useBodyScrollLock(open);
  useEscapeClose(open, () => setOpen(false));

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("vi");
    if (!needle) return SEARCH_ITEMS.slice(0, 8);
    return SEARCH_ITEMS.filter((item) => `${item.label} ${item.description}`.toLocaleLowerCase("vi").includes(needle)).slice(0, 10);
  }, [query]);

  return (
    <>
      <IconButton icon="search" label="Tìm kiếm" onDark={onDark} className={className} onClick={() => setOpen(true)} />
      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[90] overflow-y-auto bg-ink-950/80 px-4 py-20 backdrop-blur-sm">
              <button type="button" aria-label="Đóng tìm kiếm" className="absolute inset-0 cursor-default" onClick={() => setOpen(false)} />
              <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Tìm kiếm nội dung" tabIndex={-1} className="relative mx-auto max-w-2xl rounded-2xl border border-gold-500/25 bg-ivory-50 p-5 shadow-2xl md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-eyebrow uppercase text-gold-700">Khám phá Lạc Việt</p>
                    <h2 className="mt-2 font-heading text-h2-mobile text-ink-950 lg:text-h2-desktop">Bạn đang tìm gì?</h2>
                  </div>
                  <IconButton icon="close" label="Đóng tìm kiếm" onDark={false} onClick={() => setOpen(false)} />
                </div>
                <form className="relative mt-6" onSubmit={(event) => event.preventDefault()}>
                  <label htmlFor="site-search-input" className="sr-only">Từ khoá tìm kiếm</label>
                  <input
                    id="site-search-input"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Nhập dịch vụ, concept hoặc bài viết..."
                    autoComplete="off"
                    className="h-12 w-full rounded-xl border border-border bg-white px-4 pr-12 text-body text-ink-950 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                  <Icon name="search" size="default" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold-700" />
                </form>
                <div className="mt-5 max-h-[50vh] overflow-y-auto">
                  {results.length > 0 ? (
                    <ul className="divide-y divide-border" aria-live="polite">
                      {results.map((item) => (
                        <li key={`${item.kind}-${item.href}`}>
                          <Link href={item.href} onClick={() => setOpen(false)} className="flex gap-3 px-2 py-3 transition-colors hover:bg-gold-500/10">
                            <span className="mt-0.5 shrink-0 text-caption font-semibold uppercase tracking-wide text-gold-700">{item.kind}</span>
                            <span className="min-w-0">
                              <span className="block font-heading text-card-h3-mobile text-ink-950">{item.label}</span>
                              <span className="mt-1 block text-small text-text-secondary">{item.description}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-8 text-center text-body text-text-secondary">Chưa tìm thấy nội dung phù hợp. Hãy thử từ khoá khác.</p>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
