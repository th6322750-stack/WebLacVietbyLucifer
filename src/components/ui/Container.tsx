import type { ElementType, ReactNode } from "react";

const WIDTH_CLASS = {
  standard: "max-w-container ultra:max-w-container-ultra",
  wide: "max-w-wide",
  editorial: "max-w-editorial",
} as const;

export function Container({
  as: Tag = "div",
  width = "standard",
  className = "",
  children,
}: {
  as?: ElementType;
  width?: keyof typeof WIDTH_CLASS;
  className?: string;
  children: ReactNode;
}) {
  return (
    // PRO V2 (2026-08-25): side padding ramps to the brief's 48-64px band at desktop widths
    // (was capped at 32/40px, noticeably tighter than "khoảng thở lớn hơn" calls for) — mobile
    // and tablet steps untouched since those weren't the complaint.
    <Tag className={`mx-auto w-full px-4 md:px-6 lg:px-10 xl:px-12 ultra:px-16 ${WIDTH_CLASS[width]} ${className}`}>
      {children}
    </Tag>
  );
}
