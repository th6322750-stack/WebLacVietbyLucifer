import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { runSeoAudit } from "@/lib/seo-audit";
import { SeoAuditTable } from "./SeoAuditTable";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "SEO & Sitemap" };

export default function AdminSeoPage() {
  const audit = runSeoAudit();
  return (
    <div className="space-y-5" data-testid="admin-seo-page">
      <section className="flex flex-col justify-between gap-5 px-1 py-2 md:flex-row md:items-center">
        <div className="flex items-start gap-4"><span className="admin-icon-bubble rounded-xl"><Icon name="search" size="card" /></span><div><h1 className="font-heading text-[29px] font-bold leading-none text-[#08265a] md:text-[34px]">SEO & Sitemap</h1><p className="mt-3 max-w-2xl text-[13px] text-[#60708a]">Bảng kiểm tập trung cho toàn bộ URL public: độ dài metadata, trùng lặp, index/noindex và structured data.</p></div></div>
        <div className="flex flex-wrap gap-2"><a href="/sitemap.xml" target="_blank" rel="noreferrer" className="admin-action"><Icon name="external-link" size="inline" /> Sitemap</a><a href="/robots.txt" target="_blank" rel="noreferrer" className="admin-action"><Icon name="external-link" size="inline" /> Robots</a><Link href="/admin/bai-viet" className="admin-action admin-action-primary"><Icon name="sparkles" size="inline" /> Quản lý bài viết</Link></div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Tổng URL", audit.summary.total, "text-[#0b2858]"],
          ["Đang index", audit.summary.indexable, "text-[#1760c7]"],
          ["Đạt", audit.summary.pass, "text-emerald-600"],
          ["Cần rà soát", audit.summary.warnings, "text-amber-600"],
          ["Noindex chủ ý", audit.summary.noindex, "text-[#718098]"],
        ].map(([label, value, tone]) => <article key={String(label)} className="admin-stat-card min-h-[104px] p-4"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#697890]">{label}</p><p className={`mt-2 font-heading text-[28px] font-bold ${tone}`}>{value}</p><p className="mt-1 text-[10px] text-[#75839a]">Cập nhật theo mã nguồn hiện tại</p></article>)}
      </section>
      <SeoAuditTable rows={audit.rows} />
    </div>
  );
}
