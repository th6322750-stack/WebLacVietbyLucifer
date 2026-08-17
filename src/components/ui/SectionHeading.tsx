import type { ReactNode } from "react";

export function SectionEyebrow({
  children,
  onDark = false,
}: {
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <p
      className={`text-eyebrow uppercase ${onDark ? "text-gold-300" : "text-gold-700"}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  onDark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? <SectionEyebrow onDark={onDark}>{eyebrow}</SectionEyebrow> : null}
      <h2
        className={`mt-3 text-h2-mobile lg:text-h2-desktop ${
          onDark ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-editorial text-body-lg ${
            align === "center" ? "mx-auto" : ""
          } ${onDark ? "text-white/75" : "text-text-secondary"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-t border-border ${className}`} />;
}
