import Link from "next/link";
import { redirect } from "next/navigation";
import { AUTH_BYPASSED, isSignedIn } from "@/lib/admin/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { Icon } from "@/components/ui/Icon";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isSignedIn())) redirect("/admin/dang-nhap");

  return (
    <div className="adm-page adm-text min-h-screen">
      <aside className="admin-sidebar fixed inset-y-0 left-0 z-50 hidden w-[260px] flex-col text-white lg:flex">
        <Link href="/admin" className="flex h-[94px] items-center gap-[14px] px-[20px]" aria-label="Lạc Việt quản trị">
          <svg viewBox="0 0 48 52" className="h-[48px] w-[44px] shrink-0" aria-hidden="true">
            <path d="M24 2.5 44 13v23L24 49.5 4 36V13Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M12.5 18.5v14h8.7M17.2 16.5l7 17.2 7-17.2M35.5 18.5l-5.8 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m19.3 23.8 4.9 9.9 4.7-9.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
          </svg>
          <span className="leading-none">
            <span className="block whitespace-nowrap font-heading text-[22px] font-bold tracking-[0.02em]">LẠC VIỆT</span>
            <span className="mt-[8px] block text-[10px] font-medium uppercase tracking-[0.16em] text-blue-100/80">Quản trị</span>
          </span>
          <span className="ml-auto grid size-[25px] place-items-center rounded-full border border-white/70">
            <Icon name="chevron-down" size="inline" className="size-[13px] rotate-90" />
          </span>
        </Link>

        <AdminNav />

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl px-1 py-2">
            <span className="grid size-10 place-items-center rounded-full bg-blue-200/35 font-semibold">N</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold">Nguyen Van Test</span>
              <span className="mt-1 block text-[10px] text-blue-100/70">Quản trị viên</span>
            </span>
            {AUTH_BYPASSED ? (
              <Link href="/" target="_blank" className="grid size-8 place-items-center rounded-lg border border-white/10 text-blue-100/80" title="Xem website">
                <Icon name="external-link" size="inline" />
              </Link>
            ) : (
              <SignOutButton />
            )}
          </div>
          <Link
            href="/admin/don-hang?status=new"
            className="admin-issue-card mt-3 flex min-h-12 items-center gap-3 rounded-xl px-4 text-[12px] font-semibold text-white"
          >
            <Icon name="shield-check" size="inline" />
            <span className="flex-1">4 vấn đề cần xử lý</span>
            <Icon name="chevron-right" size="inline" />
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[264px]">
        <header className="admin-topbar sticky top-0 z-40 border-b border-[#dfe6f0]">
          <div className="flex h-16 items-center gap-3 px-4 md:px-7 lg:h-[76px]">
            <Link href="/admin" className="font-heading text-base font-bold text-[#08265a] lg:hidden">LẠC VIỆT</Link>
            <div className="hidden items-center gap-2 rounded-xl border border-[#e1e8f1] bg-white px-4 py-2.5 text-[12px] text-[#52617a] shadow-sm sm:flex">
              <span className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,.10)]" />
              Hệ thống hoạt động ổn định
            </div>
            <div className="ml-auto hidden w-[250px] items-center rounded-xl border border-[#dfe6f0] bg-[#f8fafe] px-4 py-2.5 text-[#7b89a1] xl:flex">
              <input aria-label="Tìm kiếm nhanh" placeholder="Tìm kiếm nhanh..." className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#94a0b4]" />
              <Icon name="search" size="inline" />
            </div>
            <Link href="/admin/don-hang?status=new" className="relative grid size-10 place-items-center rounded-xl border border-[#e1e8f1] bg-white text-[#103974] shadow-sm" aria-label="Thông báo">
              <Icon name="circle-alert" size="inline" />
              <span className="absolute -right-1 -top-1 grid size-[18px] place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">4</span>
            </Link>
            <span className="grid size-10 place-items-center rounded-full border border-[#e1e8f1] bg-[#f7f9fc] text-sm font-semibold text-[#15386d]">N</span>
          </div>
          <div className="border-t border-[#e6ebf2] px-4 py-2 lg:hidden">
            <AdminNav layout="row" />
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1560px] px-4 py-5 md:px-6 md:py-6 lg:px-7">{children}</main>
      </div>
    </div>
  );
}
