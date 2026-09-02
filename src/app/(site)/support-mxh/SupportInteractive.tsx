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
