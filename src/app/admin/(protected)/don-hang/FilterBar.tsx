"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { LeadStatus } from "@/lib/db/repositories/leads";
import { Icon, type IconName } from "@/components/ui/Icon";

const TABS: { key: LeadStatus | "all"; label: string; icon: IconName; tone: string }[] = [
  { key: "all", label: "Tất cả", icon: "users", tone: "text-[#1760c7]" },
  { key: "new", label: "Mới", icon: "sparkles", tone: "text-[#1760c7]" },
  { key: "contacted", label: "Đang tư vấn", icon: "messages-square", tone: "text-[#de8d00]" },
  { key: "won", label: "Thành công", icon: "circle-check", tone: "text-[#069d5d]" },
  { key: "lost", label: "Không thành công", icon: "circle-alert", tone: "text-[#e83d3d]" },
];

export function FilterBar({
  active,
  q,
  counts,
}: {
  active?: LeadStatus;
  q?: string;
  counts: Record<LeadStatus | "total", number>;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [term, setTerm] = useState(q ?? "");

  function search(e: React.FormEvent) {
    e.preventDefault();
    const next = new URLSearchParams(params.toString());
    if (term.trim()) next.set("q", term.trim());
    else next.delete("q");
    router.push(`/admin/don-hang?${next.toString()}`);
  }

  function tabHref(key: LeadStatus | "all") {
    const next = new URLSearchParams();
    if (key !== "all") next.set("status", key);
    if (q) next.set("q", q);
    const query = next.toString();
    return `/admin/don-hang${query ? `?${query}` : ""}`;
  }

  return (
    <section id="bo-loc" className="flex flex-col justify-between gap-3 py-1 xl:flex-row xl:items-center">
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const on = tab.key === "all" ? !active : active === tab.key;
          const count = tab.key === "all" ? counts.total : counts[tab.key];
          return (
            <Link
              key={tab.key}
              href={tabHref(tab.key)}
              className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[12px] font-semibold shadow-sm transition ${
                on ? "border-transparent bg-[#0a3a82] text-white" : "border-[#dfe6f0] bg-white text-[#31435e] hover:border-[#b8cbea]"
              }`}
            >
              <Icon name={tab.icon} size="inline" className={on ? "text-white" : tab.tone} />
              {tab.label}
              <span className={`adm-num grid min-w-7 place-items-center rounded-full px-1.5 py-0.5 text-[10px] ${on ? "bg-white/12 text-white" : "bg-[#f1f5fb] text-[#375174]"}`}>
                {count}
              </span>
            </Link>
          );
        })}
      </div>
      <form onSubmit={search} className="relative w-full xl:w-[260px]">
        <input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Tìm tên, SĐT, email..."
          className="h-11 w-full rounded-xl border border-[#dfe6f0] bg-white px-4 pr-11 text-[12px] text-[#20334f] shadow-sm outline-none placeholder:text-[#93a0b4] focus:border-[#8db6ef]"
        />
        <button type="submit" className="absolute right-1 top-1 grid size-9 place-items-center rounded-lg text-[#42638f] hover:bg-[#eff5fd]" aria-label="Tìm kiếm">
          <Icon name="search" size="inline" />
        </button>
      </form>
    </section>
  );
}
