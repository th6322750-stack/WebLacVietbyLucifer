"use client";

import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function HomeHeroCta() {
  const { open } = useConsultation();
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button size="lg" onClick={() => open("home-hero")}>
        Nhận tư vấn ngay
      </Button>
      <Button href="/du-an" size="lg" variant="outline" onDark>
        Xem dự án tiêu biểu
      </Button>
    </div>
  );
}
