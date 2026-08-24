import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark, type BrandName } from "@/components/ui/BrandMark";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ServiceCard({
  icon,
  iconImage,
  brand,
  title,
  description,
  bullets,
  ctaLabel,
  href,
  mobileRow = false,
}: {
  icon?: IconName;
  /** Full-colour illustration; takes precedence over `icon` when both are given. */
  iconImage?: string;
  brand?: BrandName;
  title: string;
  description: string;
  bullets?: string[];
  ctaLabel: string;
  href: string;
  mobileRow?: boolean;
}) {
  // Brand marks were drawn at 24px inside a 48px box — under half the tile, which read as a
  // small logo floating in a large empty square. 40px in a 64px box keeps a comfortable margin
  // while letting the mark actually carry the card.
  //
  // The full-colour illustrations are busier than a brand mark or a line icon — lots of small
  // detail (app logos, a shield, a headset) that reads as a fuzzy blob at 40px. They get their
  // own larger box so the detail is actually visible, rather than sharing the line-icon size.
  const icons = iconImage ? (
    <Image src={iconImage} alt="" width={96} height={96} className="h-full w-full object-contain" />
  ) : brand ? (
    <BrandMark name={brand} size={40} />
  ) : icon ? (
    <Icon name={icon} size="feature" />
  ) : null;
  const boxSize = iconImage ? "h-24 w-24" : "h-16 w-16";
  const boxSizeMobile = iconImage ? "h-16 w-16" : "h-12 w-12";

  if (mobileRow) {
    return (
      <>
        {/* Mobile: compact list row */}
        <div className="rounded-xl border border-gold-500/20 bg-white p-3 shadow-sm md:hidden">
          <Link href={href} className="flex items-center gap-3">
            <span className={`flex ${boxSizeMobile} shrink-0 items-center justify-center rounded-sm bg-ivory-100 p-1.5 text-gold-700`}>
              {icons}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-small font-semibold text-ink-950">{title}</span>
              <span className="mt-0 line-clamp-2 block text-caption text-text-secondary">{description}</span>
            </span>
            <Icon name="chevron-right" size="inline" className="shrink-0 text-text-muted" />
          </Link>
        </div>

        {/* Desktop: Luxury Spotlight Card with 3D Tilt & Cursor Border Glow */}
        <SpotlightCard className="hidden h-full md:block">
          <div className="flex h-full flex-col justify-between p-6">
            <div>
              <span className={`mx-auto flex ${boxSize} items-center justify-center rounded-md bg-ivory-100 p-2 text-gold-700 shadow-sm`}>
                {icons}
              </span>
              <h3 className="mt-5 text-card-h3-mobile lg:text-card-h3-desktop font-heading text-ink-950">{title}</h3>
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
            </div>
            <Link
              href={href}
              className="mt-6 inline-flex items-center gap-1 text-small font-semibold text-gold-700 transition-colors hover:text-gold-600"
            >
              {ctaLabel}
              <Icon
                name="arrow-right"
                size="inline"
                className="transition-transform duration-fast ease-standard group-hover:translate-x-1"
              />
            </Link>
          </div>
        </SpotlightCard>
      </>
    );
  }

  return (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col justify-between p-5 md:p-6">
        <div>
          <span className={`mx-auto flex ${boxSize} items-center justify-center rounded-md bg-ivory-100 p-2 text-gold-700 shadow-sm`}>
            {icons}
          </span>
          <h3 className="mt-5 text-card-h3-mobile lg:text-card-h3-desktop font-heading text-ink-950">{title}</h3>
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
        </div>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1 text-small font-semibold text-gold-700 transition-colors hover:text-gold-600"
        >
          {ctaLabel}
          <Icon
            name="arrow-right"
            size="inline"
            className="transition-transform duration-fast ease-standard group-hover:translate-x-1"
          />
        </Link>
      </div>
    </SpotlightCard>
  );
}
