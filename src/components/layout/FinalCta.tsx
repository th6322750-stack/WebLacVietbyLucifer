"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";
import { assetPath, assetSize } from "@/lib/assets";

export function FinalCta({
  title = "Sẵn sàng nâng tầm hiện diện số của bạn?",
  description = "Để lại thông tin, đội ngũ Lạc Việt Media sẽ liên hệ tư vấn giải pháp phù hợp trong ngày làm việc.",
  sourceComponent,
  defaultService,
  decorated = false,
  visualAssetId,
  variant = "band",
  tone = "dark",
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
  /** MASTER PARITY V4 / P0-CTA. The old component was one tall centred black block on every
   * route. The masters show route-specific geometry instead:
   *   `band`  - compact centred band (default, much shorter than the old block)
   *   `strip` - a low horizontal strip with the copy left and the button right
   * Both are far shorter than the previous `py-12 md:py-16 xl:py-24`. */
  variant?: "band" | "strip";
  /** Several masters render the closing CTA on ivory rather than black. */
  tone?: "dark" | "ivory";
}) {
  const { open } = useConsultation();
  return (
    <section
      className={`${tone === "ivory" ? "bg-ivory-100" : "bg-ink-950"} ${
        variant === "strip" ? "py-8 md:py-10" : "py-10 md:py-12"
      } ${decorated ? "relative overflow-hidden" : ""}`}
    >
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
      <Container
        className={`${
          variant === "strip"
            ? "flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:gap-8 md:text-left"
            : "flex flex-col items-center gap-4 text-center"
        } ${decorated ? "relative" : ""}`}
      >
        {visualAssetId ? (
          <Image
            src={assetPath(visualAssetId)}
            alt=""
            aria-hidden="true"
            width={assetSize(visualAssetId).width}
            height={assetSize(visualAssetId).height}
            sizes="(min-width: 1024px) 280px, 55vw"
            className="h-auto w-full max-w-[280px]"
          />
        ) : null}
        <div className={variant === "strip" ? "md:max-w-2xl" : "contents"}>
          <h2
            className={`max-w-editorial text-h2-mobile lg:text-h2-desktop ${
              tone === "ivory" ? "text-ink-950" : "text-white"
            }`}
          >
            {title}
          </h2>
          <p
            className={`max-w-editorial text-body ${
              tone === "ivory" ? "mt-2 text-text-secondary" : "mt-2 text-white/75"
            }`}
          >
            {description}
          </p>
        </div>
        <Button size="lg" className="shrink-0" onClick={() => open(sourceComponent, defaultService)}>
          Nhận tư vấn miễn phí
        </Button>
      </Container>
    </section>
  );
}
