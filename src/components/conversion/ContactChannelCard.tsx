"use client";

import { BrandMark, type BrandName } from "@/components/ui/BrandMark";
import { Icon, type IconName } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

export function ContactChannelCard({
  brand,
  icon,
  title,
  value,
  href,
  disabled = false,
}: {
  brand?: BrandName;
  icon?: IconName;
  title: string;
  value: string;
  href?: string;
  disabled?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-ivory-100">
        {brand ? <BrandMark name={brand} size={24} /> : icon ? <Icon name={icon} size="feature" className="text-gold-600" /> : null}
      </span>
      <div>
        <p className="text-small font-semibold text-ink-950">{title}</p>
        <p className="text-body text-text-secondary">{value}</p>
      </div>
    </>
  );

  const className =
    "flex items-center gap-4 rounded-md border border-border bg-white p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-fast ease-standard";

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
