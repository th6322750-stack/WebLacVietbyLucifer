import type { Metadata } from "next";
import { listLeads, countLeadsByStatus, type LeadStatus } from "@/lib/db/repositories/leads";
import { LeadTable } from "./LeadTable";
import { FilterBar } from "./FilterBar";
import { ExportLeadsButton } from "./ExportLeadsButton";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Đơn liên hệ" };
export const dynamic = "force-dynamic";

const STATUSES: LeadStatus[] = ["new", "contacted", "won", "lost"];

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const status = STATUSES.includes(sp.status as LeadStatus) ? (sp.status as LeadStatus) : undefined;
  const q = sp.q?.trim() || undefined;
  const [leads, counts] = await Promise.all([listLeads({ status, q }), countLeadsByStatus()]);

  return (
    <div className="space-y-4">
      <section className="admin-panel flex flex-col justify-between gap-5 px-5 py-6 md:flex-row md:items-center md:px-7">
        <div>
          <h1 className="font-heading text-[29px] font-bold leading-none text-[#08265a] md:text-[34px]">Quản lý Đơn liên hệ</h1>
          <p className="mt-3 text-[13px] text-[#60708a]">
            Hiển thị <strong className="text-[#143363]">{leads.length}</strong> đơn liên hệ trên tổng số <strong className="text-[#143363]">{counts.total}</strong> yêu cầu tư vấn
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ExportLeadsButton leads={leads} />
          <a href="#bo-loc" className="admin-action">
            <Icon name="filter" size="inline" />
            Bộ lọc nâng cao
          </a>
        </div>
      </section>

      <FilterBar active={status} q={q} counts={counts} />

      {leads.length === 0 ? (
        <section className="admin-panel px-6 py-16 text-center">
          <Icon name="package" size="feature" className="mx-auto text-[#9aabc1]" />
          <p className="mt-3 text-sm font-semibold text-[#243852]">
            {q || status ? "Không có đơn nào khớp với bộ lọc hiện tại." : "Chưa có đơn liên hệ nào trên hệ thống."}
          </p>
          <p className="mt-1 text-xs text-[#7e8ba0]">Thử xoá bộ lọc hoặc tìm kiếm theo số điện thoại khác.</p>
        </section>
      ) : (
        <LeadTable leads={leads} />
      )}
    </div>
  );
}
