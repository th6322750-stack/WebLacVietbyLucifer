"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

/** Mobile-only sticky action bar — every hero already has a CTA, but it scrolls out of reach
 * the moment a visitor starts reading. Appears once the visitor scrolls past the hero so it
 * doesn't duplicate the button already on screen at the top of the route. Hidden on /lien-he,
 * which already puts its own Zalo CTA front and center — a second one stacked at the bottom
 * would just be noise on the one page that's entirely about making that same contact. */
export function StickyMobileCta() {
  const { open } = useConsultation();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const THRESHOLD = 480;

    const update = () => {
      setVisible(window.scrollY > THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/lien-he") return null;

  return (
    <div
      data-testid="sticky-mobile-cta"
      className={`fixed inset-x-0 bottom-0 z-40 bg-gold-500 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <button
        type="button"
        onClick={() => open("sticky-mobile-cta")}
        className="flex w-full items-center justify-center gap-2 px-4 py-3 text-button font-semibold text-ink-950 active:bg-gold-600"
      >
        <Icon name="messages-square" size="inline" />
        Nhận tư vấn miễn phí
      </button>
    </div>
  );
}
