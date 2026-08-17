"use client";

import { Button } from "@/components/ui/Button";
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
