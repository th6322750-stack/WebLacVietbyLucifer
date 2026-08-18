"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";
import { assetPath } from "@/lib/assets";

export function FinalCta({
  title = "Sẵn sàng nâng tầm hiện diện số của bạn?",
  description = "Để lại thông tin, đội ngũ Lạc Việt Media sẽ liên hệ tư vấn giải pháp phù hợp trong ngày làm việc.",
  sourceComponent,
  defaultService,
  decorated = false,
  visualAssetId,
}: {
  title?: string;
  description?: string;
  sourceComponent: string;
  defaultService?: string;
  /** Enables the approved `dong-son-ring` motif + `gold-noise` texture. ASSET_USAGE_MAP maps
   * these to /dich-vu-so final-cta only — deliberately not applied to every FinalCta. */
  decorated?: boolean;
  /** Approved-UI CTA crop (e.g. /dich-vu-so finalCtaVisual). Rendered at native size only —
   * these are SOURCE_LIMITED_APPROVED_CROP and must not be upscaled. */
  visualAssetId?: string;
}) {
  const { open } = useConsultation();
  return (
    <section className={`bg-ink-950 py-12 md:py-16 xl:py-24 ${decorated ? "relative overflow-hidden" : ""}`}>
      {decorated ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `url(${assetPath("gold-noise")})`, backgroundRepeat: "repeat" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-1/2 hidden h-72 w-72 -translate-y-1/2 bg-contain bg-center bg-no-repeat lg:block"
            style={{ backgroundImage: `url(${assetPath("dong-son-ring")})` }}
          />
        </>
      ) : null}
      <Container className={`flex flex-col items-center gap-6 text-center ${decorated ? "relative" : ""}`}>
        {visualAssetId ? (
          <Image
            src={assetPath(visualAssetId)}
            alt=""
            aria-hidden="true"
            width={205}
            height={98}
            className="h-auto w-full max-w-[205px]"
          />
        ) : null}
        <h2 className="max-w-editorial text-h2-mobile lg:text-h2-desktop text-white">{title}</h2>
        <p className="max-w-editorial text-body-lg text-white/75">{description}</p>
        <Button size="lg" onClick={() => open(sourceComponent, defaultService)}>
          Nhận tư vấn miễn phí
        </Button>
      </Container>
    </section>
  );
}
