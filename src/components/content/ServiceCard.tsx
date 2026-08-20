import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark, type BrandName } from "@/components/ui/BrandMark";

export function ServiceCard({
  icon,
  brand,
  title,
  description,
  bullets,
  ctaLabel,
  href,
  mobileRow = false,
}: {
  icon?: IconName;
  /** Use for platform-specific cards (Facebook/TikTok/Meta) where the master shows the
   * real platform mark rather than a generic icon. */
  brand?: BrandName;
  title: string;
  description: string;
  bullets?: string[];
  ctaLabel: string;
  href: string;
  /** MASTER PARITY V4 / P0-MOBILE-COMPOSITION. The 390 masters show these as compact list rows,
   * not the desktop card stacked to full height — the spec calls for a "list-based mobile
   * treatment ... not desktop grid cards stacked unchanged". With this on, mobile renders an
   * icon-left row with the bullets and CTA link suppressed, while >= md is the unchanged card. */
  mobileRow?: boolean;
}) {
  const icons = brand ? <BrandMark name={brand} size={24} /> : icon ? <Icon name={icon} size="feature" /> : null;

  if (mobileRow) {
    return (
      <div className="group rounded-md border border-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-fast ease-standard hover:border-gold-300 hover:shadow-md md:hover:-translate-y-[3px]">
        {/* mobile: compact row */}
        <Link href={href} className="flex items-center gap-3 p-3 md:hidden">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-ivory-100 text-gold-700">
            {icons}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-small font-semibold text-ink-950">{title}</span>
            <span className="mt-0.5 line-clamp-2 block text-caption text-text-secondary">{description}</span>
          </span>
          <Icon name="chevron-right" size="inline" className="shrink-0 text-text-muted" />
        </Link>

        {/* >= md: the approved desktop card, unchanged */}
        <div className="hidden flex-col p-6 md:flex">
          <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-ivory-100 text-gold-700">{icons}</span>
          <h3 className="mt-5 text-card-h3-mobile lg:text-card-h3-desktop text-ink-950">{title}</h3>
          <p className="mt-2 text-body text-text-secondary">{description}</p>
          {bullets && bullets.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-small text-text-secondary">
                  <Icon name="check" size="inline" className="mt-px shrink-0 text-gold-600" />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-1 text-small font-semibold text-gold-700 hover:text-gold-600"
          >
            {ctaLabel}
            <Icon name="arrow-right" size="inline" className="transition-transform duration-fast ease-standard group-hover:translate-x-px" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col rounded-md border border-border bg-white p-4 shadow-sm md:p-6 transition-[transform,box-shadow,border-color] duration-fast ease-standard hover:-translate-y-[3px] hover:border-gold-300 hover:shadow-md">
      <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-ivory-100 text-gold-700">{icons}</span>
      <h3 className="mt-5 text-card-h3-mobile lg:text-card-h3-desktop text-ink-950">{title}</h3>
      <p className="mt-2 text-body text-text-secondary">{description}</p>
      {bullets && bullets.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-small text-text-secondary">
              <Icon name="check" size="inline" className="mt-px shrink-0 text-gold-600" />
              {b}
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 text-small font-semibold text-gold-700 hover:text-gold-600"
      >
        {ctaLabel}
        <Icon name="arrow-right" size="inline" className="transition-transform duration-fast ease-standard group-hover:translate-x-px" />
      </Link>
    </div>
  );
}
