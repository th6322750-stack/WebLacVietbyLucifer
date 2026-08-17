"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function FinalCta({
  title = "Sẵn sàng nâng tầm hiện diện số của bạn?",
  description = "Để lại thông tin, đội ngũ Lạc Việt Media sẽ liên hệ tư vấn giải pháp phù hợp trong ngày làm việc.",
  sourceComponent,
  defaultService,
}: {
  title?: string;
  description?: string;
  sourceComponent: string;
  defaultService?: string;
}) {
  const { open } = useConsultation();
  return (
    <section className="bg-ink-950 py-14 md:py-18 xl:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-editorial text-h2-mobile lg:text-h2-desktop text-white">{title}</h2>
        <p className="max-w-editorial text-body-lg text-white/75">{description}</p>
        <Button size="lg" onClick={() => open(sourceComponent, defaultService)}>
          Nhận tư vấn miễn phí
        </Button>
      </Container>
    </section>
  );
}
