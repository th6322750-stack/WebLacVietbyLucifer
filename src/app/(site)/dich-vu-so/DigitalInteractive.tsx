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

export function DigitalProductCta({ label }: { label: string }) {
  const { open } = useConsultation();
  return (
    <button
      type="button"
      onClick={() => open("featured-digital-products", "Dịch vụ số / tài khoản")}
      className="mt-4 inline-flex items-center text-small font-semibold text-gold-700 hover:text-gold-600"
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
