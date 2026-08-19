import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionHeading";
import { assetPath, assetSize } from "@/lib/assets";

export function PageHero({
  eyebrow,
  title,
  description,
  imageAssetId,
  imageAlt,
  cta,
  metrics,
  heroRole = "heroH1",
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  imageAssetId: string;
  imageAlt: string;
  cta?: ReactNode;
  /** Inline proof metrics shown under the CTA row (e.g. /du-an hero: 200+/20+/99%). `demoOnly`
   * is required per CONTENT_TRUTH.json — customer/project counts and satisfaction percentages in
   * GĐ1 renders are demo until verified. Carried in markup only (data-demo-only): the approved
   * hero has no badge or disclaimer, so adding visible text here would be a redesign. */
  metrics?: { value: string; label: string; demoOnly: boolean }[];
  /** Hero type role from .webby/TYPOGRAPHY_ROUTE_MATRIX.json. Most routes are `heroH1`;
   * `/lien-he` is `heroDisplay` + uppercase. Never guessed per-route in the component. */
  heroRole?: "heroDisplay" | "heroH1";
}) {
  const heroClass =
    heroRole === "heroDisplay"
      ? "text-display-mobile lg:text-display-desktop uppercase"
      : "text-h1-mobile lg:text-h1-desktop";
  return (
    <section className="bg-ink-950 bg-dark-hero">
      <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="text-white">
          <SectionEyebrow onDark>{eyebrow}</SectionEyebrow>
          <h1 className={`mt-3 ${heroClass} font-heading text-white`}>{title}</h1>
          <p className="mt-5 max-w-editorial text-body-lg text-white/80">{description}</p>
          {cta ? <div className="mt-8 flex flex-wrap gap-3">{cta}</div> : null}
          {metrics && metrics.length > 0 ? (
            <dl className="mt-8 flex flex-wrap gap-8">
              {metrics.map((m) => (
                <div key={m.label} data-demo-only={m.demoOnly}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-h4-mobile lg:text-h4-desktop font-heading text-gold-300">{m.value}</dd>
                  <p className="mt-1 text-small text-white/70">{m.label}</p>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        {/* Recovered hero visuals are exact source-limited master crops with their own aspect
            ratios (phoenix, shield, device). Forcing them into a 16:9/4:3 frame with
            object-cover cropped the approved artwork, so they render contained at native
            aspect instead. Mobile keeps the hero text-led with a smaller supporting visual,
            per the mobile column of ui-000..ui-009. */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={assetPath(imageAssetId)}
            alt={imageAlt}
            width={assetSize(imageAssetId).width}
            height={assetSize(imageAssetId).height}
            priority
            sizes="(min-width: 1024px) 40vw, 60vw"
            className="h-auto w-[60%] max-w-[390px] lg:w-full"
          />
        </div>
      </Container>
    </section>
  );
}
