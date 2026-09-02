"use client";

import { BrandMark, type BrandName } from "@/components/ui/BrandMark";
import { Icon, type IconName } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

export function ContactChannelCard({
  brand,
  icon,
  title,
  value,
  description,
  ctaLabel,
  href,
  disabled = false,
}: {
  brand?: BrandName;
  icon?: IconName;
  title: string;
  value: string;
  /** MASTER PARITY V4: the approved channel card is a centred vertical card with a supporting
   * line and its own CTA link, not an icon-left row with just the handle. */
  description?: string;
  ctaLabel?: string;
  href?: string;
  disabled?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100">
        {brand ? <BrandMark name={brand} size={24} /> : icon ? <Icon name={icon} size="feature" className="text-gold-600" /> : null}
      </span>
      <span className="mt-3 block text-small font-semibold text-ink-950">{title}</span>
      {description ? (
        <span className="mt-1 block text-caption leading-snug text-text-secondary">{description}</span>
      ) : null}
      <span className="mt-1 block text-caption text-text-muted">{value}</span>
      {ctaLabel ? (
        <span className="mt-3 inline-flex items-center gap-1 rounded-pill border border-border px-3 py-1 text-caption font-semibold text-gold-700">
          {ctaLabel}
          <Icon name="arrow-right" size="inline" />
        </span>
      ) : null}
    </>
  );

  const className =
    "flex flex-col items-center rounded-md border border-border bg-white p-5 text-center shadow-sm transition-[transform,box-shadow,border-color] duration-fast ease-standard";

  if (disabled || !href) {
    return (
      <div className={`${className} opacity-48`} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => track({ name: "contact_channel_click", props: { channel: title, sourceRoute: "/lien-he" } })}
      className={`${className} hover:-translate-y-[3px] hover:border-gold-300 hover:shadow-md`}
    >
      {content}
    </a>
  );
}
