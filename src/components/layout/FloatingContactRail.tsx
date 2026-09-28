"use client";

import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { siteSettings } from "@/lib/site-settings";
import { zaloUrl, ZALO_LINK_ATTRS } from "@/lib/zalo";

/** Desktop quick-contact rail for long inner pages.
 *
 * The reference experience keeps a low-friction contact action visible while a visitor is
 * comparing a long service page. Lạc Việt only exposes channels already marked as verified in
 * site settings (Zalo and Telegram); the rail disappears on the homepage and contact page where
 * the same actions are already part of the primary composition.
 */
export function FloatingContactRail() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/lien-he") return null;

  const telegramUrl = `https://t.me/${siteSettings.telegram.replace("@", "")}`;

  return (
    <aside
      aria-label="Kênh liên hệ nhanh"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex xl:left-6"
    >
      <p className="sr-only">Kênh liên hệ nhanh</p>
      <a
        href={zaloUrl()}
        {...ZALO_LINK_ATTRS}
        aria-label="Nhắn tin qua Zalo"
        className="group pointer-events-auto relative grid size-12 place-items-center rounded-full border border-gold-500/30 bg-white/95 shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500/70 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      >
        <BrandMark name="zalo" size={25} />
        <span className="pointer-events-none absolute left-full ml-3 rounded-pill bg-ink-950 px-3 py-1.5 text-caption font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          Zalo
        </span>
      </a>
      <a
        href={telegramUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Nhắn tin qua Telegram"
        className="group pointer-events-auto relative grid size-12 place-items-center rounded-full border border-gold-500/30 bg-white/95 shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500/70 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      >
        <BrandMark name="telegram" size={25} />
        <span className="pointer-events-none absolute left-full ml-3 rounded-pill bg-ink-950 px-3 py-1.5 text-caption font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          Telegram
        </span>
      </a>
    </aside>
  );
}
