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
    <Tag className={`mx-auto w-full px-4 md:px-6 xl:px-8 ultra:px-10 ${WIDTH_CLASS[width]} ${className}`}>
      {children}
    </Tag>
  );
}
