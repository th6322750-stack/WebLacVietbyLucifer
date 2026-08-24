import Link from "next/link";
import { countLeadsByStatus, listLeads, type LeadStatus } from "@/lib/db/repositories/leads";
import { Icon, type IconName } from "@/components/ui/Icon";

export const dynamic = "force-dynamic";

const KPI: {
  key: "total" | LeadStatus;
  label: string;
  icon: IconName;
  tone: "blue" | "amber" | "green" | "red";
  trend: string;
  up: boolean;
}[] = [
  { key: "total", label: "Tổng đơn liên hệ", icon: "users", tone: "blue", trend: "12% so với tuần trước", up: true },
  { key: "new", label: "Đơn mới cần xử lý", icon: "sparkles", tone: "blue", trend: "8% so với tuần trước", up: false },
  { key: "contacted", label: "Đang tư vấn", icon: "messages-square", tone: "amber", trend: "5% so với tuần trước", up: true },
  { key: "won", label: "Chốt thành công", icon: "circle-check", tone: "green", trend: "18% so với tuần trước", up: true },
  { key: "lost", label: "Không thành công", icon: "circle-alert", tone: "red", trend: "3% so với tuần trước", up: false },
];

const STATUS: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "Mới", className: "admin-status-amber" },
  contacted: { label: "Đang tư vấn", className: "admin-status-blue" },
  won: { label: "Chốt thành công", className: "admin-status-green" },
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
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default async function AdminHome() {
  const [counts, recent] = await Promise.all([countLeadsByStatus(), listLeads({ limit: 6 })]);

  return (
    <div className="space-y-5">
      <section className="admin-panel admin-hero-panel px-5 py-6 md:px-8 md:py-7">
        <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-[#143363]">Chào mừng trở lại,</p>
            <h1 className="mt-2 font-heading text-[30px] font-bold uppercase leading-none text-[#08265a] md:text-[38px]">
              Quản trị viên
            </h1>
            <p className="mt-4 max-w-xl text-[13px] leading-5 text-[#52617a]">
              Tổng quan tình hình đơn tư vấn dịch vụ trên hệ thống Lạc Việt.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/don-hang" className="admin-action admin-action-primary">
              <Icon name="headset" size="inline" />
              Xử lý đơn liên hệ
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPI.map((item) => (
          <article key={item.key} className="admin-stat-card flex min-h-[122px] items-center gap-4 p-4">
            <span className="admin-icon-bubble" data-tone={item.tone === "blue" ? undefined : item.tone}>
              <Icon name={item.icon} size="card" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.025em] text-[#617089]">{item.label}</p>
              <p className="adm-num mt-1 font-heading text-[25px] font-bold leading-none text-[#0b2858]">{counts[item.key]}</p>
              <p className={`mt-3 text-[10px] ${item.up ? "text-emerald-600" : "text-red-500"}`}>
                <span className="mr-1 font-bold">{item.up ? "↑" : "↓"}</span>
                <span className="text-[#74829a]">{item.trend}</span>
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e2e8f1] px-5 py-4">
          <h2 className="flex items-center gap-2 font-heading text-[18px] font-bold text-[#0a2d65]">
            <Icon name="clock" size="inline" />
            Đơn liên hệ mới nhất
          </h2>
          <Link href="/admin/don-hang" className="hidden items-center gap-2 text-[12px] font-semibold text-[#0b438f] sm:flex">
            Xem tất cả đơn liên hệ
            <Icon name="arrow-right" size="inline" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-[#7d899c]">Chưa có yêu cầu tư vấn nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table w-full min-w-[980px] text-left text-[12px]">
              <thead>
                <tr>
                  <th className="px-5 py-3.5">Khách hàng</th>
                  <th className="px-5 py-3.5">Nhu cầu & Dịch vụ</th>
                  <th className="px-5 py-3.5">Kênh liên hệ</th>
                  <th className="px-5 py-3.5">Thời gian</th>
                  <th className="px-5 py-3.5">Trạng thái</th>
                  <th className="px-5 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((lead, index) => (
                  <tr key={lead.id}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="admin-avatar" data-tone={["", "violet", "green", "amber", "indigo"][index % 5] || undefined}>
                          {initials(lead.name)}
                        </span>
                        <span>
                          <span className="block font-semibold text-[#12213a]">{lead.name}</span>
                          <a href={`tel:${lead.phone}`} className="mt-0.5 block font-medium text-[#1760c7]">{lead.phone}</a>
                          {lead.email ? <span className="mt-0.5 block text-[10px] text-[#7f8ca1]">{lead.email}</span> : null}
                        </span>
                      </div>
                    </td>
                    <td className="max-w-[270px] px-5 py-3.5">
                      <p className="line-clamp-1 font-medium text-[#273750]">{lead.need || "Tư vấn dịch vụ Lạc Việt"}</p>
                      {lead.service ? <span className="mt-1.5 inline-flex rounded-full border border-[#dce6f5] bg-[#f5f8fd] px-2 py-0.5 text-[10px] text-[#315b96]">{lead.service}</span> : null}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dce4ef] px-2.5 py-1 text-[#273750]">
                        <Icon name="messages-square" size="inline" className="size-3 text-[#1760c7]" />
                        {CHANNEL[lead.preferredChannel] ?? lead.preferredChannel}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-[#617089]">{new Date(lead.createdAt).toLocaleString("vi-VN")}</td>
                    <td className="px-5 py-3.5"><span className={`admin-status ${STATUS[lead.status].className}`}>{STATUS[lead.status].label}</span></td>
                    <td className="px-5 py-3.5 text-right">
                      <Link href={`/admin/don-hang?q=${encodeURIComponent(lead.phone)}`} className="admin-action !min-h-9 !px-3" aria-label={`Xem đơn của ${lead.name}`}>
                        <Icon name="messages-square" size="inline" />
                        <Icon name="chevron-right" size="inline" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
