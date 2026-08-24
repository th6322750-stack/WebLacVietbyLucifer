import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";
import { assetPath, assetSize } from "@/lib/assets";
import { StarField } from "@/components/layout/StarField";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PageHero({
  eyebrow,
  title,
  description,
  cta,
  metrics,
  heroImage,
  heroSlot,
  proofItems,
  breadcrumbs,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  /** Still accepted so the six route callers keep compiling unchanged, but the hero renders no
   * artwork any more — see the Container comment below. */
  imageAssetId?: string;
  imageAlt?: string;
  /** V5 hero artwork for the right-hand slot. Asset id, or omitted for a text-only hero. */
  /** Anything richer than a single image — an animated composition, for instance. Takes
   * precedence over heroImage when both are given. */
  heroSlot?: ReactNode;
  heroImage?: {
    assetId: string;
    alt: string;
    /** Mirror the artwork so a device/subject shot faces INTO the copy rather than away from
     * it. A CSS transform, so the delivered file is untouched. */
    flipX?: boolean;
  };
  cta?: ReactNode;
  /** Inline proof metrics shown under the CTA row (e.g. /du-an hero: 200+/20+/99%). `demoOnly`
   * is required per CONTENT_TRUTH.json — customer/project counts and satisfaction percentages in
   * GĐ1 renders are demo until verified. Carried in markup only (data-demo-only): the approved
   * hero has no badge or disclaimer, so adding visible text here would be a redesign. */
  metrics?: { value: string; label: string; demoOnly: boolean; icon?: IconName }[];
  /** Hero type role from .webby/TYPOGRAPHY_ROUTE_MATRIX.json. Most routes are `heroH1`;
   * `/lien-he` is `heroDisplay` + uppercase. Never guessed per-route in the component. */
  /** Kept so the route callers compile unchanged; every hero now uses one scale, so it no
   * longer selects a size. */
  heroRole?: "heroDisplay" | "heroH1";
  /** MASTER PARITY V4 / P0-HERO. The approved masters give the hero artwork a large share of the
   * right-hand side (phoenix, laptop+phone, shield, still-life). `dominant` widens the visual
   * column and lets the artwork fill it. `supporting` keeps the older balanced treatment for
   * heroes the master really does render small. */
  visualShare?: "dominant" | "supporting";
  /** Overrides the H1 type size. The V4 spec allows adjusting "role application/size/line-wrap
   * where needed to match approved master" — /support-mxh has a long headline that wraps to four
   * lines at the default h1 size where the master shows two. */
  titleClassName?: string;
  /** MASTER PARITY V4: several hero masters (e.g. /lien-he) show a row of icon proof items
   * under the copy — "Phản hồi nhanh / Trong 30 phút" and so on — which the runtime was missing
   * entirely. Distinct from `metrics`, which is the numeric strip used on /du-an. */
  proofItems?: { icon: IconName; title: string; note: string }[];
  /** Master pages 7 and 10 show a breadcrumb row inside the dark hero, above the H1. */
  breadcrumbs?: ReactNode;
}) {
  // PRO V2.1 (2026-08-25): was hard-coded to 26/29/35px at lg/xl/ultra — a hero H1 rendering
  // SMALLER than this page's own h3 token. The design system already had h1-desktop (56px) for
  // exactly this role; nothing used it. Back to the semantic token so hero weight actually shows
  // up; a route whose specific headline wraps badly at 56px gets `titleClassName`, which already
  // existed as an escape hatch but had never actually been exercised.
  const heroClass = "text-h1-mobile uppercase lg:text-h1-desktop";
  return (
    <section className="relative overflow-hidden bg-black">
      <StarField />
      <Container className="relative grid items-center gap-8 py-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:gap-12 lg:py-16">
        <div className="text-white">
          {breadcrumbs ? (
            <ScrollReveal direction="down" distance={12} duration={0.5}>
              <div className="mb-5">{breadcrumbs}</div>
            </ScrollReveal>
          ) : null}
          <ScrollReveal direction="down" distance={14} duration={0.6}>
            <SectionEyebrow onDark>{eyebrow}</SectionEyebrow>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={20} duration={0.7} delay={100}>
            <h1 className={`mt-3 ${titleClassName ?? heroClass} font-heading text-white`}>{title}</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={16} duration={0.7} delay={150}>
            <p className="mt-5 max-w-editorial text-body-lg text-white/80">{description}</p>
          </ScrollReveal>
          {proofItems && proofItems.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {proofItems.map((item, idx) => (
                <ScrollReveal key={item.title} direction="up" distance={16} duration={0.6} delay={200 + idx * 80}>
                  <div
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors duration-300 hover:border-gold-500/30 hover:bg-white/[0.07]"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-v5-gold/30 bg-v5-gold/15">
                      <Icon name={item.icon} size="default" className="text-v5-gold" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-small font-semibold text-white">{item.title}</p>
                      <p className="mt-0 text-caption text-white/60">{item.note}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : null}
          {cta ? (
            <ScrollReveal direction="up" distance={16} duration={0.6} delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">{cta}</div>
            </ScrollReveal>
          ) : null}
          {metrics && metrics.length > 0 ? (
            <ScrollReveal direction="up" distance={20} duration={0.7} delay={300}>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
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
            </ScrollReveal>
          ) : null}
        </div>

        {heroSlot ? (
          <div className="flex justify-center lg:justify-end">{heroSlot}</div>
        ) : heroImage ? (
          <ScrollReveal direction="right" distance={24} duration={0.8} delay={150}>
            <div className="flex justify-center lg:justify-end">
              <Image
                src={assetPath(heroImage.assetId)}
                alt={heroImage.alt}
                width={assetSize(heroImage.assetId).width}
                height={assetSize(heroImage.assetId).height}
                priority
                sizes="(min-width: 1024px) 46vw, 90vw"
                className={`h-auto w-[92%] max-w-[560px] lg:w-full lg:max-w-none transition-transform duration-700 hover:scale-103${
                  heroImage.flipX ? " -scale-x-100" : ""
                }`}
              />
            </div>
          </ScrollReveal>
        ) : (
          <div className="hidden lg:block" aria-hidden="true" />
        )}
      </Container>
    </section>
  );
}
