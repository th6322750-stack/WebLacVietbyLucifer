"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  trackActive?: boolean;
};

// Bán hàng, Khách hàng, và mọi tab con của chúng chuyển sang dự án lacvietmedia-shop riêng
// (2026-08-23) — trang quản trị này giờ chỉ còn nội dung và đơn liên hệ.
const PRIMARY: NavItem[] = [
  { href: "/admin", label: "Tổng quan", icon: "target" },
  { href: "/admin/don-hang", label: "Đơn liên hệ", icon: "headset" },
  { href: "/admin/du-an", label: "Dự án & Portfolio", icon: "briefcase" },
  { href: "/admin/bai-viet", label: "Bài viết & Kiến thức", icon: "sparkles" },
];

const GROUPS: { label: string; items: NavItem[] }[] = [
  { label: "Tổng quan", items: PRIMARY },
  {
    label: "Nội dung",
    items: [
      { href: "/admin/du-an", label: "Dự án", icon: "briefcase", trackActive: false },
      { href: "/admin/bai-viet", label: "Bài viết", icon: "sparkles", trackActive: false },
    ],
  },
];

export function AdminNav({ layout = "sidebar" }: { layout?: "sidebar" | "row" }) {
  const pathname = usePathname();

  function isActive(item: NavItem) {
    if (item.trackActive === false) return false;
    if (item.href === "/admin") return pathname === "/admin";
    return pathname.startsWith(item.href);
  }

  if (layout === "row") {
    return (
      <nav className="no-scrollbar flex items-center gap-2 overflow-x-auto" aria-label="Điều hướng quản trị">
        {PRIMARY.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium ${
                active ? "adm-navy-bg" : "adm-dim"
              }`}
            >
              <Icon name={item.icon} size="inline" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-[12px] pb-5" aria-label="Điều hướng quản trị">
      {GROUPS.map((group) => (
        <div key={group.label} className="mb-[17px]">
          <p className="px-[7px] pb-[7px] text-[12px] font-medium uppercase tracking-[0.025em] text-blue-100/80">
            {group.label}
          </p>
          <div className="space-y-[1px]">
            {group.items.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={`${group.label}-${item.href}`}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group flex min-h-[44px] items-center gap-[15px] rounded-[11px] px-[13px] text-[14px] font-medium transition ${
                    active
                      ? "admin-nav-active text-white"
                      : "text-blue-50/95 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon name={item.icon} size="inline" className="size-[19px]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
