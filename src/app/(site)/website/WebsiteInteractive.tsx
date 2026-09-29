"use client";

import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function WebsiteHeroCta() {
  const { open } = useConsultation();
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" onClick={() => open("website-hero", "Website doanh nghiệp")}>
        Nhận tư vấn
      </Button>
      {/* Neo trong-trang, không phải href="/website": nút này đã nằm ngay trên /website, một
          liên kết trỏ về chính trang đang xem sẽ không làm gì cả. */}
      <Button href="#website-projects" size="lg" variant="outline" onDark>
        Xem các dự án
      </Button>
    </div>
  );
}
