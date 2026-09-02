"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { LeadRow, LeadStatus } from "@/lib/db/repositories/leads";
import { Icon } from "@/components/ui/Icon";

const STATUS: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "Mới", className: "admin-status-amber" },
  contacted: { label: "Đang tư vấn", className: "admin-status-blue" },
  won: { label: "Thành công", className: "admin-status-green" },
  lost: { label: "Không thành công", className: "admin-status-red" },
};

const CHANNEL: Record<string, string> = {
  phone: "Điện thoại",
  zalo: "Zalo",
  telegram: "Telegram",
  messenger: "Messenger",
  email: "Email",
  website: "Website",
};

function initials(name: string) {
  return name.trim().split(/\s+/).slice(-2).map((word) => word[0]?.toUpperCase()).join("");
}

export function LeadTable({ leads }: { leads: LeadRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function patch(id: string, body: { status?: LeadStatus; note?: string }) {
    setError(null);
    const response = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    });
    const data = (await response.json()) as { ok: boolean; error?: string };
    if (!data.ok) {
      setError(data.error ?? "Không lưu được thay đổi.");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <section className="admin-panel overflow-hidden">
      {error ? (
        <div role="alert" className="m-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
          <Icon name="circle-alert" size="inline" />
          {error}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="admin-table w-full min-w-[1180px] text-left text-[12px]">
          <thead>
            <tr>
              <th className="px-5 py-4">Khách hàng</th>
              <th className="px-5 py-4">Nhu cầu & Dịch vụ</th>
              <th className="px-5 py-4">Kênh liên hệ</th>
              <th className="px-5 py-4">Thời gian gửi</th>
              <th className="px-5 py-4">Ghi chú nội bộ</th>
              <th className="px-5 py-4">Trạng thái</th>
              <th className="px-5 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead.id} className="align-top">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="admin-avatar" data-tone={["", "violet", "green", "amber", "indigo"][index % 5] || undefined}>{initials(lead.name)}</span>
                    <span>
                      <span className="block font-semibold text-[#12213a]">{lead.name}</span>
                      <a href={`tel:${lead.phone}`} className="mt-1 block font-medium text-[#1760c7]">{lead.phone}</a>
                      {lead.email ? <span className="mt-1 block max-w-[165px] truncate text-[10px] text-[#7e8ba0]">{lead.email}</span> : null}
                    </span>
                  </div>
                </td>
                <td className="max-w-[250px] px-5 py-4">
                  <p className="line-clamp-2 font-medium leading-5 text-[#263852]">{lead.need || "Tư vấn dịch vụ Lạc Việt"}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {lead.service ? <span className="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[10px] text-[#245a9e]">{lead.service}</span> : null}
                    <span className="rounded-full bg-[#f5f7fa] px-2 py-0.5 text-[10px] text-[#66758c]">{lead.sourceRoute.replace(/^\//, "") || "website"}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#dce4ef] px-3 py-1.5 text-[#263852]">
                    <Icon name="messages-square" size="inline" className="size-3 text-[#1760c7]" />
                    {CHANNEL[lead.preferredChannel] ?? lead.preferredChannel}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 leading-5 text-[#617089]">{new Date(lead.createdAt).toLocaleString("vi-VN")}</td>
                <td className="max-w-[230px] px-5 py-4">
                  <button type="button" onClick={() => setOpen(open === lead.id ? null : lead.id)} className="inline-flex items-center gap-1 font-semibold text-[#294c7e] hover:text-[#0b438f]">
                    <Icon name="messages-square" size="inline" className="size-3" />
                    {lead.note ? "Sửa ghi chú nội bộ" : "Thêm ghi chú nội bộ"}
                  </button>
                  {lead.note && open !== lead.id ? <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-[#718098]">{lead.note}</p> : null}
                  {open === lead.id ? (
                    <NoteBox
                      initial={lead.note ?? ""}
                      onSave={(note) => {
                        setOpen(null);
                        void patch(lead.id, { note });
                      }}
                    />
                  ) : null}
                </td>
                <td className="px-5 py-4">
                  <label className={`admin-status ${STATUS[lead.status].className} relative pr-8`}>
                    <select
                      aria-label={`Trạng thái đơn của ${lead.name}`}
                      value={lead.status}
                      disabled={pending}
                      onChange={(event) => void patch(lead.id, { status: event.target.value as LeadStatus })}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    >
                      {(Object.keys(STATUS) as LeadStatus[]).map((key) => <option key={key} value={key}>{STATUS[key].label}</option>)}
                    </select>
                    {STATUS[lead.status].label}
                    <Icon name="chevron-down" size="inline" className="absolute right-2 size-3" />
                  </label>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="inline-flex gap-2">
                    <button type="button" onClick={() => setOpen(open === lead.id ? null : lead.id)} className="admin-action !min-h-9 !px-3" aria-label={`Ghi chú cho ${lead.name}`}>
                      <Icon name="messages-square" size="inline" />
                    </button>
                    <a href={`tel:${lead.phone}`} className="admin-action !min-h-9 !px-3" aria-label={`Gọi ${lead.name}`}>
                      <Icon name="chevron-right" size="inline" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-[#e5ebf3] px-5 py-3 text-[11px] text-[#718098]">
        <span>Hiển thị 1 – {leads.length} trong {leads.length} đơn liên hệ</span>
        <span className="rounded-lg border border-[#dce4ef] bg-white px-3 py-2">{leads.length} / trang</span>
      </div>
    </section>
  );
}

function NoteBox({ initial, onSave }: { initial: string; onSave: (value: string) => void }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="mt-2 rounded-xl border border-[#d8e3f0] bg-white p-2 shadow-lg">
      <textarea
        value={value}
        autoFocus
        rows={3}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Nhập tiến độ trao đổi..."
        className="w-full resize-none rounded-lg bg-[#f6f9fd] p-2 text-[11px] text-[#20334f] outline-none"
      />
      <button type="button" onClick={() => onSave(value)} className="mt-2 rounded-lg bg-[#0a3a82] px-3 py-1.5 text-[10px] font-semibold text-white">Lưu ghi chú</button>
    </div>
  );
}
