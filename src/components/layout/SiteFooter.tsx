"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { footerLinks, siteSettings } from "@/lib/site-settings";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { BrandMark } from "@/components/ui/BrandMark";
import { track } from "@/lib/analytics";

const GROUPS = [
  { key: "brand" as const, title: "Lạc Việt" },
  { key: "services" as const, title: "Dịch vụ" },
  { key: "contact" as const, title: "Liên hệ" },
];

export function SiteFooter({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="bg-ink-950 py-8 text-white/70">
        <Container className="flex flex-col items-center gap-3 text-center text-small">
          <Image src="/assets/brand/lac-viet-logo.webp" alt="Lạc Việt Media Agency" width={36} height={36} />
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName}. Mọi quyền được bảo lưu.
          </p>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-ink-950 pb-8 pt-14 text-white md:pt-18">
      <Container>
        <div className="hidden gap-10 md:grid md:grid-cols-4">
          <BrandColumn />
          <FooterLinkColumn title="Dịch vụ" links={footerLinks.services} />
          <FooterLinkColumn title="Liên kết" links={footerLinks.brand} />
          <FooterLinkColumn title="Liên hệ" links={footerLinks.contact} />
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <BrandColumn />
          <div className="mt-4 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {GROUPS.filter((g) => g.key !== "brand").map((g) => (
              <FooterAccordionGroup
                key={g.key}
                title={g.title}
                links={g.key === "services" ? footerLinks.services : footerLinks.contact}
              />
            ))}
          </div>
        </div>

        <SocialRow />

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-small text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName}. Mọi quyền được bảo lưu.
          </p>
          <p>{siteSettings.slogan}</p>
        </div>
      </Container>
    </footer>
  );
}

function BrandColumn() {
  return (
    <div>
      <Image src="/assets/brand/lac-viet-logo.webp" alt={siteSettings.brandName} width={160} height={48} className="h-12 w-auto" />
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
  const items: { name: Parameters<typeof BrandMark>[0]["name"]; href: string }[] = [
    { name: "zalo", href: `https://zalo.me/${siteSettings.zalo}` },
    { name: "telegram", href: `https://t.me/${siteSettings.telegram.replace("@", "")}` },
    { name: "messenger", href: "https://m.me/" },
  ];
  return (
    <div className="mt-10 flex items-center gap-4">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={item.name}
          onClick={() => track({ name: "contact_channel_click", props: { channel: item.name, sourceRoute: "footer" } })}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-sm bg-white/10 p-2 hover:bg-white/20"
        >
          <BrandMark name={item.name} size={20} />
        </a>
      ))}
    </div>
  );
}
