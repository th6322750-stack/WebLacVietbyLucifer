"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

/** CTA nổi trên mobile — UI V6 §5.6.
 *
 * Bản trước là một thanh vàng `inset-x-0` chiếm hết bề ngang đáy màn hình. Nó không bao giờ
 * biến mất, nên ở cuối mỗi trang nó nằm đè lên chính CTA cuối trang và một phần footer — hai
 * nút cùng mở Zalo chồng lên nhau, và cái ở dưới thì che mất nội dung.
 *
 * Hai thay đổi:
 *   1. Capsule ở góc phải thay cho thanh full-width, nên phần bị che còn lại rất nhỏ.
 *   2. Tự ẩn khi Final CTA hoặc footer vào viewport — lúc đó khách đã có nút thật trước mặt.
 *
 * `IntersectionObserver` chứ không phải đo `scrollY`: vị trí của footer đổi theo chiều dài từng
 * trang, nên một ngưỡng px cố định sẽ đúng ở trang này và sai ở trang khác.
 */
export function StickyMobileCta() {
  const { open } = useConsultation();
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    let ticking = false;
    const THRESHOLD = 480;
    const update = () => {
      setPastHero(window.scrollY > THRESHOLD);
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

  // Quan sát lại mỗi khi đổi route: các phần tử ở cuối trang là của trang cũ sau khi điều hướng.
  useEffect(() => {
    setNearEnd(false);
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-final-cta], footer"),
    );
    if (targets.length === 0) return;

    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        }
        setNearEnd(seen.size > 0);
      },
      // rootMargin âm ở đáy: ẩn khi khối cuối đã thực sự vào khung nhìn, không phải khi mép trên
      // của nó vừa chạm mép dưới màn hình — nếu không capsule sẽ chớp tắt giữa lúc cuộn.
      { rootMargin: "0px 0px -80px 0px", threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/lien-he") return null;

  const visible = pastHero && !nearEnd;

  return (
    <div
      data-testid="sticky-mobile-cta"
      data-state={visible ? "visible" : "hidden"}
      className={`fixed right-4 z-40 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <button
        type="button"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        onClick={() => open("sticky-mobile-cta")}
        className="flex min-h-12 max-w-[176px] items-center gap-2 rounded-pill bg-gold-metallic px-5 text-button font-semibold text-ink-950 shadow-lg active:bg-gold-600"
      >
        <Icon name="messages-square" size="inline" />
        Tư vấn Zalo
      </button>
    </div>
  );
}
