"use client";

import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function ArticleConsultCard({ category }: { category: string }) {
  const { open } = useConsultation();
  return (
    <div className="rounded-md border border-gold-300/60 bg-ivory-100 p-5">
      <h3 className="text-body-lg font-heading text-ink-950">Cần tư vấn thêm?</h3>
      <p className="mt-1 text-small text-text-secondary">
        Lạc Việt sẽ giúp bạn phân tích và đưa ra chiến lược phù hợp.
      </p>
      <Button className="mt-4 w-full" size="sm" onClick={() => open("article-consult-card", category)}>
        Nhận tư vấn ngay
      </Button>
    </div>
  );
}
