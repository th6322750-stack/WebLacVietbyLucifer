"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetPath, assetSize } from "@/lib/assets";
import { useBodyScrollLock, useEscapeClose, useFocusTrap } from "@/lib/a11y-hooks";
import { mainNavLinks, isServiceRoute, type NavServiceGroup } from "@/lib/navigation";
import { useConsultation } from "@/components/conversion/ConsultationProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/Icon";
import { SiteSearch } from "@/components/layout/SiteSearch";

// Sinh một lần ở module scope: registry là dữ liệu tĩnh, không có lý do tính lại mỗi lần
// header re-render (mà header re-render theo cả scroll).
const navLinks = mainNavLinks();

export function SiteHeader() {
  const pathname = usePathname();
  const { open } = useConsultation();
  const [menuOpen, setMenuOpen] = useState(false);
  // PRO V2.2 §11: the drawer used to mount/unmount instantly with `menuOpen` itself, which
  // meant no exit transition was possible — there was nothing left in the DOM to fade out by
  // the time a "closing" animation would run. `everOpened` keeps it mounted (invisible, inert)
  // after the first open so `menuOpen` can drive a real opacity/transform transition instead.
  const [everOpened, setEverOpened] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setEverOpened(true);
    setMenuOpen(true);
  };

  useFocusTrap(drawerRef, menuOpen);
  useBodyScrollLock(menuOpen);
  useEscapeClose(menuOpen, () => setMenuOpen(false));

  // PRO V2 (2026-08-25): header shrinks + darkens past a small threshold, matching the brief's
  // "khi scroll: giảm chiều cao, background đậm hơn". Threshold at 24px (not 0) so the very top
  // of the page — where the header sits over the hero, not page background — never flickers
  // between states from a 1px scroll jitter.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serviceRouteActive = isServiceRoute(pathname);

  return (
    // PRO V2.1 §14: exact rgba/blur values from the brief, using the `surface-0` token (#07080A
    // ≈ rgb(7,8,10)) rather than `ink-950` so the header sits on the same depth scale as other
    // cinematic surfaces. Added the bottom hairline the brief asks for — a header this close in
    // tone to the hero behind it had no edge to separate from it at all before.
    // PRO V2.2 §10: scrolled opacity bumped .94→.97 — `backdrop-filter` always blends with
    // whatever's behind it, so even at .94 the header read as "greyish" over lighter body
    // sections instead of matching the hero's own near-black. Less bleed-through at .97.
    <header
      data-state={menuOpen ? "mobile-menu-open" : undefined}
      className={`sticky top-0 z-50 border-b border-white/5 backdrop-blur-lg transition-[height,background-color] duration-normal ease-standard ${
        scrolled ? "h-14 bg-surface-0/[.97] lg:h-16" : "h-16 bg-surface-0/75 lg:h-[76px]"
      }`}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Lạc Việt Media Agency — Trang chủ">
          {/* PRO V2.1 §74/perf: no `sizes` here meant Next assumed up to 100vw and Lighthouse
              caught the browser fetching the 1920px srcset candidate for a logo rendered at
              ~110px tall — ~300KB wasted on every page load, sitewide, and flagged as the LCP
              bottleneck since this is the header's own priority image. */}
          <Image
            src={assetPath("lac-viet-logo-horizontal-approved")}
            alt="Lạc Việt Media Agency"
            width={assetSize("lac-viet-logo-horizontal-approved").width}
            height={assetSize("lac-viet-logo-horizontal-approved").height}
            priority
            sizes="132px"
            // PRO V2.2 §10: ~10% larger at every state (32/40px → 36/44px unscrolled,
            // 28/32px → 32/36px scrolled). Arbitrary pixel values, not `h-9`/`h-11` — this
            // project's spacing scale has no "9" or "11" step, and an off-scale utility here
            // would silently emit no CSS at all (the exact bug class tailwind.config.ts's own
            // comments warn about).
            className={`w-auto transition-[height] duration-normal ease-standard ${
              scrolled ? "h-[32px] lg:h-[36px]" : "h-[36px] lg:h-[44px]"
            }`}
          />
        </Link>

        <nav aria-label="Chính" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              if (link.href === null) {
                return (
                  <li key={link.label}>
                    <ServiceDropdown active={serviceRouteActive} groups={link.groups} />
                  </li>
                );
              }
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <li key={link.href}>
                  {/* PRO V2.1 §15: underline used to only exist for the active page — every other
                      link had no hover feedback at all. Now every link carries the same
                      pseudo-element, resting at `scale-x-0`; hover (or the active state, which
                      just starts already-scaled) animates it in from the left in 220ms. */}
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-nav text-white/90 transition-colors duration-fast hover:text-white after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:origin-left after:bg-gold-500 after:transition-transform after:duration-[220ms] after:ease-standard ${
                      active ? "font-semibold text-white after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SiteSearch />
          <Button size="sm" onClick={() => open("site-header")}>
            Nhận tư vấn
          </Button>
        </div>

        <IconButton
          icon="menu"
          label="Mở menu"
          onDark
          className="lg:hidden"
          onClick={openMenu}
        />
      </Container>

      {/* PRO V2.1 bug fix: `<header>` carries `backdrop-blur-*`, and CSS `backdrop-filter` (like
          `filter`/`transform`) establishes a containing block for `position: fixed` descendants.
          This drawer is nested inside `<header>` in the JSX, so its `fixed inset-0` was resolving
          against the HEADER's own box (64/76px tall) instead of the viewport — the drawer
          collapsed to header-height, its nav links rendered squished into that sliver, and the
          real page showed through everywhere below it. `createPortal` mounts this subtree onto
          `document.body` directly, outside the header's DOM subtree entirely, so its `fixed`
          positioning has no filtered ancestor to get trapped by. Nothing about the header's own
          styling changes. */}
      {everOpened
        ? createPortal(
            // PRO V2.2 §11: stays mounted after first open (see `everOpened`) so `menuOpen` can
            // drive a real 200ms fade/slide instead of an instant mount/unmount with nothing to
            // transition. `motion-reduce:` collapses both to 0ms — reduced-motion users get the
            // same instant show/hide as before, nothing new to opt out of.
            <div
              className={`fixed inset-0 z-[70] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
              aria-hidden={!menuOpen}
            >
              <button
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                aria-label="Đóng menu"
                className={`absolute inset-0 bg-ink-950/70 transition-opacity duration-200 motion-reduce:duration-0 ${
                  menuOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => setMenuOpen(false)}
              />
              <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menu điều hướng"
                data-state="mobile-menu-open"
                tabIndex={-1}
                /* Approved state master: an opaque full-viewport black drawer. It must cover the
                 * page entirely — an earlier partial-width drawer let the Home hero show through,
                 * which the recovery audit flagged. `inset-0` + solid bg is what makes the state
                 * screenshot honest. */
                className={`absolute inset-0 flex w-full flex-col overflow-y-auto bg-ink-950 p-6 transition-[opacity,transform] duration-200 ease-out motion-reduce:duration-0 ${
                  menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Image
                    src={assetPath("lac-viet-logo-horizontal-approved")}
                    alt="Lạc Việt Media Agency"
                    width={assetSize("lac-viet-logo-horizontal-approved").width}
                    height={assetSize("lac-viet-logo-horizontal-approved").height}
                    sizes="96px"
                    className="h-8 w-auto"
                  />
                  <IconButton icon="close" label="Đóng menu" onDark onClick={() => setMenuOpen(false)} />
                </div>
                <nav aria-label="Chính (di động)" className="mt-8 flex-1">
                  <ul className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      if (link.href === null) {
                        return (
                          <li key={link.label}>
                            <button
                              type="button"
                              aria-expanded={mobileServicesOpen}
                              onClick={() => setMobileServicesOpen((v) => !v)}
                              className="flex min-h-touch w-full items-center justify-between rounded-sm px-2 text-body-lg text-white/90 hover:bg-white/5 hover:text-white"
                            >
                              {link.label}
                              <Icon
                                name="chevron-down"
                                className={`text-white/40 transition-transform duration-normal ease-standard ${mobileServicesOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            {mobileServicesOpen ? (
                              <div className="flex flex-col gap-3 pb-2 pl-4 pt-1">
                                {link.groups.map((group) => (
                                  <div key={group.id}>
                                    <p className="px-2 text-caption uppercase tracking-[0.12em] text-gold-300/70">
                                      {group.label}
                                    </p>
                                    <ul className="mt-1 flex flex-col gap-1">
                                      {group.items.map((item) => (
                                        <li key={item.href}>
                                          <Link
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="flex min-h-touch items-center gap-2 rounded-sm px-2 text-body text-white/80 hover:bg-white/5 hover:text-white"
                                          >
                                            <span aria-hidden="true" className="text-gold-300/60">›</span>
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                <Link
                                  href="/dich-vu"
                                  onClick={() => setMenuOpen(false)}
                                  className="flex min-h-touch items-center gap-2 rounded-sm px-2 text-body font-semibold text-gold-300 hover:bg-white/5"
                                >
                                  Tất cả dịch vụ
                                  <Icon name="arrow-right" size="inline" />
                                </Link>
                              </div>
                            ) : null}
                          </li>
                        );
                      }
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex min-h-touch items-center justify-between rounded-sm px-2 text-body-lg text-white/90 hover:bg-white/5 hover:text-white"
                          >
                            {link.label}
                            <Icon name="chevron-right" className="text-white/40" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="mb-3 flex justify-end">
                  <SiteSearch />
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    open("mobile-nav-drawer");
                  }}
                >
                  Nhận tư vấn
                </Button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}

/** Mega menu dịch vụ — nội dung sinh từ service registry.
 *
 * Dùng disclosure pattern (button `aria-expanded` + danh sách link thường), không phải
 * `role="menu"`. `role="menu"` là dành cho menu lệnh kiểu ứng dụng: nó bắt trình đọc màn hình
 * công bố các mục là "menu item" và buộc điều hướng bằng phím mũi tên với Tab thoát ra ngoài.
 * Đây là các liên kết điều hướng bình thường — khai báo sai vai trò làm người dùng screen reader
 * mất chính thông tin hữu ích nhất (đây là link, đi tới đâu) để đổi lấy một hợp đồng bàn phím
 * mà chúng ta không thực sự cài đặt.
 */
function ServiceDropdown({ active, groups }: { active: boolean; groups: NavServiceGroup[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Escape mà bỏ focus lơ lửng trong panel vừa biến mất thì người dùng bàn phím mất dấu
      // hoàn toàn — trả focus về đúng nút vừa mở.
      triggerRef.current?.focus();
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Tab ra khỏi phần tử cuối trong panel phải đóng panel, nếu không nó vẫn mở trong khi focus
  // đã sang mục nav kế tiếp.
  const onBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  if (groups.length === 0) {
    // Không có dịch vụ nào được publish: hiện link tới hub thay vì một nút mở ra khoảng trắng.
    return (
      <Link
        href="/dich-vu"
        className="relative py-2 text-nav text-white/90 transition-colors duration-fast hover:text-white"
      >
        Dịch vụ
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative" onBlurCapture={onBlurCapture}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="service-mega-menu"
        onClick={() => setOpen((v) => !v)}
        className={`relative flex items-center gap-1 py-2 text-nav text-white/90 transition-colors duration-fast hover:text-white after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:origin-left after:bg-gold-500 after:transition-transform after:duration-[220ms] after:ease-standard ${
          active ? "font-semibold text-white after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
        }`}
      >
        Dịch vụ
        <Icon
          name="chevron-down"
          size="inline"
          className={`transition-transform duration-fast ease-standard ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id="service-mega-menu"
        hidden={!open}
        className="absolute left-1/2 top-full z-10 mt-2 w-[min(92vw,640px)] -translate-x-1/2 rounded-md border border-white/10 bg-ink-950 p-5 shadow-lg xl:w-[min(92vw,860px)]"
      >
        {/* Số cột theo số nhóm thực tế, không cố định. Registry mở thêm năm dịch vụ ngày
            2026-09-08 nên menu nhảy từ 2 nhóm lên 6; giữ nguyên hai cột sẽ thành một danh sách
            dọc dài hơn cả màn hình. Đây đúng là loại bố cục "chỉ đúng với đúng chừng ấy phần
            tử" mà §6.3 yêu cầu bỏ ở lưới dịch vụ — menu cũng không ngoại lệ. */}
        <div
          className={`grid gap-x-8 gap-y-5 ${
            groups.length > 4 ? "sm:grid-cols-2 xl:grid-cols-3" : groups.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {groups.map((group) => (
            <div key={group.id}>
              <p className="text-caption uppercase tracking-[0.12em] text-gold-300/70">{group.label}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-sm px-3 py-2 text-nav text-white/85 transition-colors duration-fast hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="/dich-vu"
          onClick={() => setOpen(false)}
          className="mt-5 flex items-center gap-2 border-t border-white/10 px-3 pt-4 text-nav font-semibold text-gold-300 transition-colors duration-fast hover:text-gold-100"
        >
          Xem tất cả dịch vụ
          <Icon name="arrow-right" size="inline" />
        </Link>
      </div>
    </div>
  );
}
