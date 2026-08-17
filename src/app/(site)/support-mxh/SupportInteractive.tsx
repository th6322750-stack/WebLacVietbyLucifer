"use client";

import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function SupportHeroCta() {
  const { open } = useConsultation();
  return (
    <Button size="lg" onClick={() => open("support-hero", "Support mạng xã hội")}>
      Nhận tư vấn miễn phí
    </Button>
  );
}

export function SupportLeadCta() {
  const { open } = useConsultation();
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-gold-300/60 bg-ivory-100 p-8 text-center md:flex-row md:justify-between md:text-left">
      <div>
        <h3 className="text-h4-mobile text-ink-950">Đang gặp sự cố cần xử lý gấp?</h3>
        <p className="mt-1 text-body text-text-secondary">Để lại thông tin, đội ngũ hỗ trợ sẽ liên hệ trong ngày làm việc.</p>
      </div>
      <Button onClick={() => open("support-lead-cta", "Support mạng xã hội")}>Yêu cầu hỗ trợ ngay</Button>
    </div>
  );
}
