import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { runSeoAudit } from "@/lib/seo-audit";

export function AdminSeoHealth() {
  const { rows, summary } = runSeoAudit();
  const warnings = rows.filter((row) => row.status !== "pass" && row.indexable).slice(0, 4);
  return (
    <section className="admin-panel overflow-hidden" data-testid="admin-seo-health">
      <div className="flex flex-col justify-between gap-3 border-b border-[#e2e8f1] px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-[18px] font-bold text-[#0a2d65]"><Icon name="search" size="inline" /> Sức khoẻ SEO</h2>
          <p className="mt-1 text-[11px] text-[#718098]">Kiểm tra title, mô tả, trạng thái index và dữ liệu có cấu trúc.</p>
        </div>
        <Link href="/admin/seo" className="admin-action !min-h-9 !px-3">Mở bảng kiểm SEO <Icon name="arrow-right" size="inline" /></Link>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-4">
        {[
          { label: "URL index", value: summary.indexable, tone: "text-[#1760c7]" },
          { label: "Đạt", value: summary.pass, tone: "text-emerald-600" },
          { label: "Cần xem", value: summary.warnings, tone: "text-amber-600" },
          { label: "Noindex chủ ý", value: summary.noindex, tone: "text-[#718098]" },
        ].map((item) => <div key={item.label} className="rounded-xl border border-[#e2e8f1] bg-[#f8fafe] px-4 py-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#718098]">{item.label}</p><p className={`mt-1 font-heading text-[25px] font-bold ${item.tone}`}>{item.value}</p></div>)}
      </div>
      {warnings.length ? (
        <div className="border-t border-[#e2e8f1] px-5 py-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#a56b00]">Ưu tiên rà soát</p>
          <ul className="grid gap-2 md:grid-cols-2">
            {warnings.map((row) => <li key={row.path} className="flex min-w-0 items-center gap-2 text-[12px] text-[#52617a]"><Icon name="circle-alert" size="inline" className="shrink-0 text-amber-500" /><span className="truncate">{row.path}</span><span className="truncate text-[11px] text-[#8a96a8]">— {row.issues[0]}</span></li>)}
          </ul>
        </div>
      ) : <p className="border-t border-[#e2e8f1] px-5 py-4 text-[12px] text-emerald-700">Tất cả URL đang index đều có metadata trong ngưỡng khuyến nghị.</p>}
      <div className="flex flex-wrap gap-3 border-t border-[#e2e8f1] px-5 py-3 text-[11px]">
        <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="font-semibold text-[#1760c7]">Mở sitemap.xml</a>
        <a href="/robots.txt" target="_blank" rel="noreferrer" className="font-semibold text-[#1760c7]">Mở robots.txt</a>
      </div>
    </section>
  );
}
