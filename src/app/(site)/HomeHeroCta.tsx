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
      {/* Trước đây là "Xem dự án tiêu biểu" trỏ về /website. Sai hai lần: nội dung phía sau là
          CONCEPT minh hoạ chứ không phải dự án đã bàn giao cho khách — đúng loại tuyên bố vừa bị
          gỡ khắp site — và nút thì không dẫn tới gallery. Nay nói đúng thứ nó dẫn tới. */}
      <Button href="/website/concept" size="lg" variant="outline" onDark>
        Xem concept giao diện
      </Button>
    </div>
  );
}
