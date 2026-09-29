"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { SeoAuditRow } from "@/lib/seo-audit";

const statusLabel = { pass: "Đạt", warning: "Cần xem", blocked: "Bị chặn" } as const;
const statusClass = { pass: "admin-status-green", warning: "admin-status-amber", blocked: "admin-status-red" } as const;

export function SeoAuditTable({ rows }: { rows: SeoAuditRow[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | SeoAuditRow["status"]>("all");
  const [indexable, setIndexable] = useState<"all" | "index" | "noindex">("all");
  const shown = useMemo(() => rows.filter((row) => {
    const q = query.trim().toLocaleLowerCase();
    return (!q || `${row.path} ${row.title} ${row.description}`.toLocaleLowerCase().includes(q))
      && (status === "all" || row.status === status)
      && (indexable === "all" || (indexable === "index" ? row.indexable : !row.indexable));
  }), [indexable, query, rows, status]);
  return (
    <section className="admin-panel overflow-hidden" data-testid="seo-audit-table">
      <div className="grid gap-3 border-b border-[#e2e8f1] p-5 md:grid-cols-[1fr_170px_170px_auto]">
        <label className="relative"><Icon name="search" size="inline" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7890ad]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm URL, tiêu đề…" aria-label="Tìm URL hoặc tiêu đề" className="h-11 w-full rounded-xl border border-[#dce4ef] bg-white pl-[42px] pr-4 text-[12px] outline-none focus:border-[#8db6ef]" /></label>
        <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} aria-label="Lọc trạng thái" className="h-11 rounded-xl border border-[#dce4ef] bg-white px-3 text-[12px] text-[#52617a] outline-none"><option value="all">Tất cả trạng thái</option><option value="pass">Đạt</option><option value="warning">Cần xem</option><option value="blocked">Bị chặn</option></select>
        <select value={indexable} onChange={(event) => setIndexable(event.target.value as typeof indexable)} aria-label="Lọc index" className="h-11 rounded-xl border border-[#dce4ef] bg-white px-3 text-[12px] text-[#52617a] outline-none"><option value="all">Index & noindex</option><option value="index">Đang index</option><option value="noindex">Noindex chủ ý</option></select>
        <span className="grid h-11 place-items-center rounded-xl border border-[#dce4ef] bg-[#f8fafe] px-3 text-[11px] font-medium text-[#52617a]">{shown.length}/{rows.length} URL</span>
      </div>
      <div className="overflow-x-auto"><table className="admin-table w-full min-w-[1040px] text-left text-[12px]"><thead><tr><th className="px-5 py-4">URL</th><th className="px-5 py-4">Title / mô tả</th><th className="px-5 py-4">Structured data</th><th className="px-5 py-4">Index</th><th className="px-5 py-4">Trạng thái</th></tr></thead><tbody>{shown.map((row) => <tr key={row.path}><td className="px-5 py-4"><Link href={row.path} className="font-semibold text-[#1760c7] hover:underline">{row.path}</Link><span className="mt-1 block text-[10px] uppercase tracking-wide text-[#8a96a8]">{row.kind}</span></td><td className="max-w-[430px] px-5 py-4"><p className="truncate font-medium text-[#14243d]">{row.title || "(trống)"} <span className="text-[10px] text-[#8a96a8]">{row.titleLength}</span></p><p className="mt-1 line-clamp-2 text-[11px] text-[#718098]">{row.description || "(trống)"} <span className="text-[10px] text-[#8a96a8]">{row.descriptionLength}</span></p>{row.issues.length ? <p className="mt-1 text-[10px] text-amber-700">{row.issues.join(" · ")}</p> : null}</td><td className="px-5 py-4"><div className="flex flex-wrap gap-1">{row.structuredData.map((schema) => <span key={schema} className="rounded-full bg-[#edf4ff] px-2 py-1 text-[10px] text-[#315b96]">{schema}</span>)}</div></td><td className="px-5 py-4"><span className={`admin-status ${row.indexable ? "admin-status-blue" : "admin-status-amber"}`}>{row.indexable ? "index" : "noindex"}</span></td><td className="px-5 py-4"><span className={`admin-status ${statusClass[row.status]}`}>{statusLabel[row.status]}</span></td></tr>)}</tbody></table></div>
      {!shown.length ? <div className="px-5 py-14 text-center text-[12px] text-[#718098]">Không có URL phù hợp bộ lọc.</div> : null}
      <div className="border-t border-[#e5ebf3] px-5 py-3 text-[11px] text-[#718098]">Độ dài chỉ là ngưỡng kiểm tra vận hành; luôn ưu tiên tiêu đề tự nhiên, đúng ý định tìm kiếm và nội dung thực tế.</div>
    </section>
  );
}
