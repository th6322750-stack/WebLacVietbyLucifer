"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useConsultation } from "@/components/conversion/ConsultationProvider";
import { assetPath, assetSize } from "@/lib/assets";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FinalCta({
  title = "Sẵn sàng nâng tầm hiện diện số của bạn?",
  description = "Để lại thông tin, đội ngũ Lạc Việt Media sẽ liên hệ tư vấn giải pháp phù hợp trong ngày làm việc.",
  sourceComponent,
  defaultService,
  decorated = false,
  glow = false,
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
  /** PRO V2 (2026-08-25): a plain radial gold glow (the existing `bg-dark-hero` utility, no new
   * asset) for the site's highest-traffic closing CTA. Separate from `decorated` on purpose —
   * that one is reserved for /dich-vu-so's dong-son-ring motif specifically, and this shouldn't
   * dilute it by reusing the same flag everywhere. */
  glow?: boolean;
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
      } ${decorated || glow ? "relative overflow-hidden" : ""} ${glow ? "bg-dark-hero" : ""}`}
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
            className="pointer-events-none absolute -right-16 top-1/2 hidden h-30 w-30 -translate-y-1/2 bg-contain bg-center bg-no-repeat lg:block"
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
          <ScrollReveal direction="left" distance={20} duration={0.6}>
            <Image
              src={assetPath(visualAssetId)}
              alt=""
              aria-hidden="true"
              width={assetSize(visualAssetId).width}
              height={assetSize(visualAssetId).height}
              sizes="(min-width: 1024px) 280px, 55vw"
              className="h-auto w-full max-w-[280px]"
            />
          </ScrollReveal>
        ) : null}
        <ScrollReveal direction="up" distance={20} duration={0.6} className={variant === "strip" ? "md:max-w-2xl" : "contents"}>
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
        </ScrollReveal>
        <ScrollReveal direction="up" distance={20} duration={0.6} delay={100}>
          <Button size="lg" className="shrink-0" onClick={() => open(sourceComponent, defaultService)}>
            Nhận tư vấn miễn phí
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
