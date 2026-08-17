"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBodyScrollLock, useEscapeClose, useFocusTrap } from "@/lib/a11y-hooks";
import { navLinks } from "@/lib/site-settings";
import { useConsultation } from "@/components/conversion/ConsultationProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/Icon";

export function SiteHeader() {
  const pathname = usePathname();
  const { open } = useConsultation();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(drawerRef, menuOpen);
  useBodyScrollLock(menuOpen);
  useEscapeClose(menuOpen, () => setMenuOpen(false));

  return (
    <header
      data-state={menuOpen ? "mobile-menu-open" : undefined}
      className="sticky top-0 z-50 h-16 bg-ink-950/90 backdrop-blur-md lg:h-[76px]"
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Lạc Việt Media Agency — Trang chủ">
          <Image
            src="/assets/brand/lac-viet-logo.webp"
            alt="Lạc Việt Media Agency"
            width={180}
            height={44}
            priority
            className="h-9 w-auto lg:h-11"
          />
        </Link>

        <nav aria-label="Chính" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-small font-medium text-white/90 hover:text-white ${
                      active ? "text-white after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-gold-500" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button size="sm" onClick={() => open("site-header")}>
            Nhận tư vấn
          </Button>
        </div>

        <IconButton
          icon="menu"
          label="Mở menu"
          onDark
          className="lg:hidden"
          onClick={() => setMenuOpen(true)}
        />
      </Container>

      {menuOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Đóng menu"
            className="absolute inset-0 bg-ink-950/70"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink-950 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-body-lg font-heading text-white">Menu</span>
              <IconButton icon="close" label="Đóng menu" onDark onClick={() => setMenuOpen(false)} />
            </div>
            <nav aria-label="Chính (di động)" className="mt-8 flex-1">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
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
                ))}
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
        </div>
      ) : null}
    </header>
  );
}
