"use client";

import type { LeadRow } from "@/lib/db/repositories/leads";
import { Icon } from "@/components/ui/Icon";

const quote = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export function ExportLeadsButton({ leads }: { leads: LeadRow[] }) {
  function download() {
    const header = ["Khách hàng", "Số điện thoại", "Email", "Dịch vụ", "Nhu cầu", "Kênh", "Trạng thái", "Thời gian"];
    const rows = leads.map((lead) => [
      lead.name,
      lead.phone,
      lead.email,
      lead.service,
      lead.need,
      lead.preferredChannel,
      lead.status,
      lead.createdAt,
    ]);
    const csv = "\uFEFF" + [header, ...rows].map((row) => row.map(quote).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `don-lien-he-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={download} className="admin-action admin-action-primary">
      <Icon name="external-link" size="inline" />
      Xuất dữ liệu
    </button>
  );
}
