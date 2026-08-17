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
}) {
  return (
    <div className="group flex flex-col rounded-md border border-border bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-fast ease-standard hover:-translate-y-[3px] hover:border-gold-300 hover:shadow-md">
      <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-ivory-100 text-gold-700">
        {brand ? <BrandMark name={brand} size={24} /> : icon ? <Icon name={icon} size="feature" /> : null}
      </span>
      <h3 className="mt-5 text-h4-mobile lg:text-h4-desktop text-ink-950">{title}</h3>
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
