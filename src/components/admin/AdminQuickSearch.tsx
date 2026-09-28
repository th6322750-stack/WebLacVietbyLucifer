"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Icon } from "@/components/ui/Icon";

/** Global admin search that lands in the lead list with a shareable URL. */
export function AdminQuickSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [term, setTerm] = useState(params.get("q") ?? "");
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = new URLSearchParams();
    const value = term.trim();
    if (value) next.set("q", value);
    const query = next.toString();
    startTransition(() => router.push(`/admin/don-hang${query ? `?${query}` : ""}`));
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className={`hidden w-[250px] items-center rounded-xl border border-[#dfe6f0] bg-[#f8fafe] px-3 py-2 xl:flex ${pending ? "opacity-70" : ""}`}
    >
      <input
        aria-label="Tìm kiếm nhanh"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Tìm đơn theo tên, SĐT..."
        className="min-w-0 flex-1 bg-transparent px-1 text-[12px] text-[#20334f] outline-none placeholder:text-[#94a0b4]"
      />
      <button type="submit" aria-label="Tìm kiếm quản trị" className="grid size-8 place-items-center rounded-lg text-[#42638f] hover:bg-[#eff5fd]">
        <Icon name="search" size="inline" />
      </button>
    </form>
  );
}
