"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function DigitalHeroCta() {
  const { open } = useConsultation();
  return (
    <Button size="lg" onClick={() => open("digital-hero", "Dịch vụ số / tài khoản")}>
      Nhận tư vấn miễn phí
    </Button>
  );
}

/** PRO V2.2 §7: `compact` renders a small round arrow-button instead of the full labeled
 * button — the mobile product row had NO visible CTA at all before (the full button was
 * `hidden sm:block`), which is exactly the "CTA rõ hơn" gap the brief calls out. */
export function DigitalProductCta({
  label,
  compact = false,
  className = "",
}: {
  label: string;
  compact?: boolean;
  className?: string;
}) {
  const { open } = useConsultation();
  const onClick = () => open("featured-digital-products", "Dịch vụ số / tài khoản");

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`grid size-9 shrink-0 place-items-center rounded-full border border-gold-500/50 text-gold-700 transition-colors hover:border-gold-600 hover:bg-gold-500/10 ${className}`}
      >
        <Icon name="arrow-right" size="inline" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-3 inline-flex w-full items-center justify-center rounded-xs border border-gold-500/60 px-3 py-2 text-caption font-semibold text-gold-700 transition-colors hover:border-gold-600 hover:bg-gold-500/10 ${className}`}
    >
      {label}
    </button>
  );
}

export function DigitalSupportCard() {
  const { open } = useConsultation();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-gold-300/60 bg-white p-8 text-center shadow-sm">
      <Icon name="headset" size="feature" className="text-gold-600" />
      <h3 className="text-h4-mobile text-ink-950">Bạn cần hỗ trợ thêm?</h3>
      <p className="text-small text-text-secondary">
        Đội ngũ Lạc Việt Media sẵn sàng tư vấn công cụ số phù hợp với quy mô và ngân sách của bạn.
      </p>
      <Button onClick={() => open("digital-support-card", "Dịch vụ số / tài khoản")}>Liên hệ ngay</Button>
    </div>
  );
}
