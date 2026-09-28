"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Small parity affordance with the reference site: once a visitor is deep in a long page,
 * offer a direct way back to the header without adding a second navigation drawer. */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Về đầu trang"
      data-back-to-top
      onClick={() => {
        // Keep the visible motion for normal users, but snap the final few pixels after the
        // browser's smooth-scroll animation. Some Chromium builds stop just short of zero when
        // a fixed header/reveal layer is settling, which leaves the user a few pixels below the
        // document start and makes the affordance feel unreliable.
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 700);
      }}
      className={`fixed bottom-24 right-4 z-40 grid size-11 place-items-center rounded-full border border-gold-500/45 bg-ink-950/90 text-gold-300 shadow-lg backdrop-blur transition-all duration-300 md:bottom-6 md:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="chevron-down" className="rotate-180" />
    </button>
  );
}
