"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assetPath, assetSize } from "@/lib/assets";
import { footerLinks, siteSettings } from "@/lib/site-settings";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { BrandMark } from "@/components/ui/BrandMark";
import { track } from "@/lib/analytics";

// PRO V2.1: was missing a "Khám phá" (footerLinks.brand — Giới thiệu, Kiến thức) entry entirely,
// and the accordion below mapped every non-"services" key to `footerLinks.contact` — so even
// adding one here without fixing that mapping would have silently rendered the wrong links.
// Each group now carries its own `links` directly instead of being looked up by key.
const MOBILE_GROUPS = [
  { key: "discover", title: "Khám phá", links: footerLinks.brand },
  { key: "services", title: "Dịch vụ", links: footerLinks.services },
  { key: "contact", title: "Liên hệ", links: footerLinks.contact },
] as const;

export function SiteFooter({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="bg-ink-950 py-8 text-white/70">
        <Container className="flex flex-col items-center gap-3 text-center text-small">
          <Image
            src={assetPath("lac-viet-logo-horizontal-approved")}
            alt="Lạc Việt Media Agency"
            width={assetSize("lac-viet-logo-horizontal-approved").width}
            height={assetSize("lac-viet-logo-horizontal-approved").height}
            sizes="96px"
            className="h-8 w-auto"
          />
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName}. Mọi quyền được bảo lưu.
          </p>
        </Container>
      </footer>
    );
  }

  return (
    // PRO V2 (2026-08-25): footer treated as a brand moment, not just a link dump — a huge,
    // near-invisible "LẠC VIỆT" watermark sits behind the columns (brief §19). `overflow-hidden`
    // + `aria-hidden` keep it purely decorative: it never affects layout width or gets announced.
    <footer className="relative overflow-hidden bg-ink-950 pb-8 pt-12 text-white md:pt-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.12em] right-0 select-none whitespace-nowrap font-heading text-[18vw] font-bold leading-none tracking-tight text-white/[0.03] lg:text-[220px]"
      >
        LẠC VIỆT
      </span>
      <Container className="relative">
        <div className="hidden gap-10 md:grid md:grid-cols-4">
          <BrandColumn />
          <FooterLinkColumn title="Dịch vụ" links={footerLinks.services} />
          <FooterLinkColumn title="Khám phá" links={footerLinks.brand} />
          <FooterLinkColumn title="Liên hệ" links={footerLinks.contact} />
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <BrandColumn />
          <div className="mt-4 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {MOBILE_GROUPS.map((g) => (
              <FooterAccordionGroup key={g.key} title={g.title} links={g.links} />
            ))}
          </div>
        </div>

        <SocialRow />

        {/* Gold hairline instead of the old flat white/10 rule — footer §19 asked for a "gold
            divider" rather than a generic border between the columns and the copyright line. */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        <div className="pt-6 text-small text-white/70">
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName}. Mọi quyền được bảo lưu.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function BrandColumn() {
  return (
    <div>
      {/* PRO V2.2 §23: ~10% larger (40px → 44px) per the brief's mobile footer note. */}
      <Image
        src={assetPath("lac-viet-logo-horizontal-approved")}
        alt={siteSettings.brandName}
        width={assetSize("lac-viet-logo-horizontal-approved").width}
        height={assetSize("lac-viet-logo-horizontal-approved").height}
        sizes="120px"
        className="h-[44px] w-auto"
      />
      <p className="mt-4 max-w-xs text-small text-white/75">
        {siteSettings.brandName} — dịch vụ website, hỗ trợ mạng xã hội và tài khoản số cho doanh nghiệp Việt.
      </p>
    </div>
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-small font-semibold uppercase tracking-wide text-white/60">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-body text-white/85 hover:text-gold-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterAccordionGroup({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-touch w-full items-center justify-between py-3 text-body-lg font-medium text-white"
      >
        {title}
        <Icon name="chevron-down" className={`transition-transform duration-normal ease-standard ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul className="flex flex-col gap-3 pb-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-body text-white/85 hover:text-gold-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function SocialRow() {
  // `brand` drives the hover ring and tooltip via a CSS custom property, so adding a network
  // is one row here rather than another block of CSS.
  const items: {
    name: Parameters<typeof BrandMark>[0]["name"];
    label: string;
    brand: string;
    href: string;
  }[] = [
    { name: "zalo", label: "Zalo", brand: "#0068FF", href: `https://zalo.me/${siteSettings.zalo}` },
    {
      name: "telegram",
      label: "Telegram",
      brand: "#229ED9",
      href: `https://t.me/${siteSettings.telegram.replace("@", "")}`,
    },
    // Messenger intentionally absent: there is no Page username yet, and the placeholder
    // `https://m.me/` opened Messenger's own homepage rather than a conversation with Lac Viet.
    // /lien-he already shows this channel as "Sap cap nhat"; a live-looking icon here that goes
    // nowhere is worse than no icon. Restore with the real URL once the Page exists.
  ];
  return (
    <ul className="mt-10 flex list-none items-center gap-4">
      {items.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.label}
            onClick={() => track({ name: "contact_channel_click", props: { channel: item.name, sourceRoute: "footer" } })}
            className="social-icon"
            style={{ ["--brand" as string]: item.brand }}
          >
            {/* aria-hidden: the link already carries the name, so the tooltip would otherwise
                be announced twice. */}
            <span className="social-tip" aria-hidden="true">
              {item.label}
            </span>
            <BrandMark name={item.name} size={24} />
          </a>
        </li>
      ))}
    </ul>
  );
}
