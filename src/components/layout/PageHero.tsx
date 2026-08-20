import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { HeroVisual } from "@/components/layout/HeroVisual";

export function PageHero({
  eyebrow,
  title,
  description,
  imageAssetId,
  imageAlt,
  cta,
  metrics,
  heroRole = "heroH1",
  visualShare = "dominant",
  proofItems,
  breadcrumbs,
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
  metrics?: { value: string; label: string; demoOnly: boolean; icon?: IconName }[];
  /** Hero type role from .webby/TYPOGRAPHY_ROUTE_MATRIX.json. Most routes are `heroH1`;
   * `/lien-he` is `heroDisplay` + uppercase. Never guessed per-route in the component. */
  heroRole?: "heroDisplay" | "heroH1";
  /** MASTER PARITY V4 / P0-HERO. The approved masters give the hero artwork a large share of the
   * right-hand side (phoenix, laptop+phone, shield, still-life). `dominant` widens the visual
   * column and lets the artwork fill it. `supporting` keeps the older balanced treatment for
   * heroes the master really does render small. */
  visualShare?: "dominant" | "supporting";
  /** MASTER PARITY V4: several hero masters (e.g. /lien-he) show a row of icon proof items
   * under the copy — "Phản hồi nhanh / Trong 30 phút" and so on — which the runtime was missing
   * entirely. Distinct from `metrics`, which is the numeric strip used on /du-an. */
  proofItems?: { icon: IconName; title: string; note: string }[];
  /** Master pages 7 and 10 show a breadcrumb row inside the dark hero, above the H1. */
  breadcrumbs?: ReactNode;
}) {
  const heroClass =
    heroRole === "heroDisplay"
      ? "text-display-mobile lg:text-display-desktop uppercase"
      : "text-h1-mobile lg:text-h1-desktop";
  return (
    <section className="bg-ink-950 bg-dark-hero">
      {/* MASTER PARITY V4 / P0-HERO + P0-SECTION-SPACING: the hero column ratio is master-derived
          rather than a fixed 50/50, and the vertical padding is tightened from the old
          `lg:py-24`, which was inflating every hero well past the approved height. */}
      <Container
        className={`grid items-center gap-8 py-10 md:py-12 lg:gap-12 lg:py-16 ${
          visualShare === "dominant" ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-2"
        }`}
      >
        <div className="text-white">
          {breadcrumbs ? <div className="mb-5">{breadcrumbs}</div> : null}
          <SectionEyebrow onDark>{eyebrow}</SectionEyebrow>
          <h1 className={`mt-3 ${heroClass} font-heading text-white`}>{title}</h1>
          <p className="mt-5 max-w-editorial text-body-lg text-white/80">{description}</p>
          {proofItems && proofItems.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.title} className="flex items-start gap-2">
                  <Icon name={item.icon} size="default" className="mt-px shrink-0 text-gold-300" />
                  <div>
                    <p className="text-small font-semibold text-white">{item.title}</p>
                    <p className="text-caption text-white/70">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {cta ? <div className="mt-8 flex flex-wrap gap-3">{cta}</div> : null}
          {metrics && metrics.length > 0 ? (
            <dl className="mt-8 flex flex-wrap gap-8">
              {metrics.map((m) => (
                <div key={m.label} data-demo-only={m.demoOnly} className="flex items-start gap-2">
                  {m.icon ? <Icon name={m.icon} size="default" className="mt-1 shrink-0 text-gold-500" /> : null}
                  <div>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="text-h4-mobile lg:text-h4-desktop font-heading text-gold-300">{m.value}</dd>
                    <p className="mt-1 text-small text-white/70">{m.label}</p>
                  </div>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        {/* Cropped to the asset's measured focal box — see HeroVisual. Rendering the whole
            4K canvas showed the artwork as a small object in a large dark field. */}
        <div className="flex justify-center lg:justify-end">
          <HeroVisual
            assetId={imageAssetId}
            alt={imageAlt}
            priority
            className={visualShare === "dominant" ? "w-[86%] max-w-[560px] lg:w-full" : "w-[62%] max-w-[400px] lg:w-full"}
            sizes={visualShare === "dominant" ? "(min-width: 1024px) 52vw, 86vw" : "(min-width: 1024px) 40vw, 62vw"}
          />
        </div>
      </Container>
    </section>
  );
}
