"use client";

import { useRouter, usePathname } from "next/navigation";
import { Chip } from "@/components/ui/Chip";
import { track } from "@/lib/analytics";

export function CategoryFilter({
  categories,
  active,
  allLabel = "Tất cả",
}: {
  categories: string[];
  active: string;
  allLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function setCategory(value: string) {
    router.push(value === "all" ? pathname : `${pathname}?category=${encodeURIComponent(value)}`, { scroll: false });
    track({ name: "filter_change", props: { route: pathname, filter: value } });
  }

  return (
    <div role="group" aria-label="Lọc theo danh mục" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      <Chip active={active === "all"} onClick={() => setCategory("all")}>
        {allLabel}
      </Chip>
      {categories.map((c) => (
        <Chip key={c} active={active === c} onClick={() => setCategory(c)}>
          {c}
        </Chip>
      ))}
    </div>
  );
}
