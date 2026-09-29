import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export type PageJumpItem = {
  href: string;
  label: ReactNode;
};

/** A quiet, keyboard-friendly way to scan long inner pages.
 *
 * The reference site's long service and content pages expose several meaningful sections. A
 * compact jump rail keeps those sections discoverable without adding another client-side state
 * machine or duplicating the global navigation. It intentionally remains a row of real links:
 * middle-click, keyboard focus and copy-link all work, while the horizontal overflow on mobile
 * preserves the full 44px tap target for every item.
 */
export function PageJumpNav({ items, label = "Đi nhanh trong trang" }: { items: PageJumpItem[]; label?: string }) {
  if (items.length < 2) return null;

  return (
    <div data-testid="page-jump-nav" className="border-y border-border bg-ivory-100/80 lg:sticky lg:top-[76px] lg:z-30 lg:bg-ivory-100/95 lg:shadow-sm lg:backdrop-blur-md">
      <Container>
        <nav aria-label={label} className="flex min-h-14 items-center gap-3 py-2">
          <span className="hidden shrink-0 text-eyebrow uppercase tracking-[0.14em] text-text-muted sm:block">
            {label}
          </span>
          <div className="relative min-w-0 flex-1">
            <div className="-mx-1 overflow-x-auto px-1 no-scrollbar">
              <ul className="flex w-max list-none gap-2 md:w-auto md:flex-wrap">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex min-h-touch items-center gap-1.5 whitespace-nowrap rounded-pill border border-gold-500/25 bg-white px-3.5 py-2 text-chip font-medium text-text-secondary shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-gold-500/55 hover:text-gold-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2"
                    >
                      {item.label}
                      <Icon name="arrow-right" size="inline" className="text-text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gold-700" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ivory-100/90 to-transparent sm:hidden"
            />
          </div>
        </nav>
      </Container>
    </div>
  );
}
