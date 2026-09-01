"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetPath, assetSize } from "@/lib/assets";
import { useBodyScrollLock, useEscapeClose, useFocusTrap } from "@/lib/a11y-hooks";
import { navLinks, serviceMenu } from "@/lib/site-settings";
import { useConsultation } from "@/components/conversion/ConsultationProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/Icon";

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

  const isServiceRoute = serviceMenu.some((s) => pathname === s.href || pathname.startsWith(`${s.href}/`));

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
                    <ServiceDropdown active={isServiceRoute} />
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
                              <ul className="flex flex-col gap-1 pl-4">
                                {link.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="flex min-h-touch items-center rounded-sm px-2 text-body text-white/80 hover:bg-white/5 hover:text-white"
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
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

function ServiceDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative flex items-center gap-1 py-2 text-nav text-white/90 transition-colors duration-fast hover:text-white after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:origin-left after:bg-gold-500 after:transition-transform after:duration-[220ms] after:ease-standard ${
          active ? "font-semibold text-white after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
        }`}
      >
        Dịch vụ
        <Icon name="chevron-down" size="inline" className={`transition-transform duration-fast ease-standard ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul
          role="menu"
          aria-label="Dịch vụ"
          className="absolute left-0 top-full mt-2 min-w-[220px] rounded-md border border-white/10 bg-ink-950 p-2 shadow-lg"
        >
          {serviceMenu.map((item) => (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-3 py-2 text-nav text-white/85 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
