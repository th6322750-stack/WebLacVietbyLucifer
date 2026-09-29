"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function ContactQuestionCard() {
  const { open } = useConsultation();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-gold-300/60 bg-white p-8 text-center shadow-sm">
      <Icon name="messages-square" size="feature" className="text-gold-600" />
      <h3 className="text-h4-mobile text-ink-950">Bạn còn câu hỏi khác?</h3>
      <p className="text-small text-text-secondary">
        Đội ngũ Lạc Việt luôn sẵn sàng lắng nghe và giải đáp cụ thể.
      </p>
      <Button onClick={() => open("contact-question-card")}>Liên hệ ngay</Button>
    </div>
  );
}
