import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionHeading";
import { assetPath } from "@/lib/assets";

export function PageHero({
  eyebrow,
  title,
  description,
  imageAssetId,
  imageAlt,
  cta,
  metrics,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  imageAssetId: string;
  imageAlt: string;
  cta?: ReactNode;
  /** Inline proof metrics shown under the CTA row (e.g. /du-an hero: 200+/20+/99%). */
  metrics?: { value: string; label: string }[];
}) {
  return (
    <section className="bg-ink-950 bg-dark-hero">
      <Container className="grid items-center gap-10 py-14 md:py-18 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="text-white">
          <SectionEyebrow onDark>{eyebrow}</SectionEyebrow>
          <h1 className="mt-3 text-display-mobile lg:text-display-desktop font-heading text-white">{title}</h1>
          <p className="mt-5 max-w-editorial text-body-lg text-white/80">{description}</p>
          {cta ? <div className="mt-8 flex flex-wrap gap-3">{cta}</div> : null}
          {metrics && metrics.length > 0 ? (
            <dl className="mt-8 flex flex-wrap gap-8">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-h4-mobile lg:text-h4-desktop font-heading text-gold-300">{m.value}</dd>
                  <p className="mt-1 text-small text-white/70">{m.label}</p>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg lg:aspect-[4/3]">
          <Image
            src={assetPath(imageAssetId)}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
