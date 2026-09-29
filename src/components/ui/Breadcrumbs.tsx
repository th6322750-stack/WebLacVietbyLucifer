import Link from "next/link";
import { Icon } from "./Icon";

export type Crumb = { label: string; href?: string };

/** `onDark` is needed because master pages 7 and 10 place the breadcrumb inside the dark hero,
 * where the default ink-on-ivory colours would be unreadable. */
export function Breadcrumbs({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-breadcrumb ${onDark ? "text-white/70" : "text-text-secondary"}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className={onDark ? "hover:text-gold-300" : "hover:text-gold-700"}>
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? (onDark ? "text-white" : "text-text-primary") : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <Icon name="chevron-right" size="inline" className={onDark ? "text-white/40" : "text-text-muted"} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
