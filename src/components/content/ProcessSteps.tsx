import { Icon } from "@/components/ui/Icon";

export type ProcessStep = { title: string; description: string };

/** Approved process treatment (recovery audit "Global corrections" + per-route sections):
 * a thin CONNECTED HORIZONTAL TIMELINE on desktop — a circular gold-ringed number per step,
 * joined left-to-right by arrow connectors, with a compact title/description beneath. The
 * previous large bordered cards in a 4-up grid were not the approved composition.
 *
 * On mobile the master keeps the sequence compact and vertical, so the connectors flip to a
 * left rail rather than the desktop DOM simply stacking.
 *
 * The step count is driven by the caller (6 on / and /website, 5 on /support-mxh and /lien-he,
 * 4 on /dich-vu-so) — this component never assumes 4. */
export function ProcessSteps({ steps, onDark = false }: { steps: ProcessStep[]; onDark?: boolean }) {
  const numberClass = onDark
    ? "border-gold-500/40 bg-ink-900 text-gold-300"
    : "border-gold-500/40 bg-white text-gold-600";
  const titleClass = onDark ? "text-white" : "text-ink-950";
  const bodyClass = onDark ? "text-white/70" : "text-text-secondary";
  const connectorClass = onDark ? "text-white/25" : "text-border";

  return (
    <ol data-component="process-timeline" className="flex flex-col gap-6 md:flex-row md:items-start md:gap-0">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="relative flex flex-1 gap-4 md:flex-col md:items-center md:gap-3 md:px-2 md:text-center"
        >
          {/* Mobile: vertical rail joining the numbers. Desktop: horizontal arrow connector. */}
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={`absolute left-5 top-12 h-[calc(100%-1rem)] w-px md:hidden ${
                onDark ? "bg-white/15" : "bg-border"
              }`}
            />
          ) : null}

          <span className="relative flex shrink-0 items-start md:w-full md:justify-center">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-step-number font-heading ${numberClass}`}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 ? (
              <Icon
                name="arrow-right"
                size="inline"
                className={`absolute left-[calc(50%+2rem)] top-1/2 hidden -translate-y-1/2 md:block ${connectorClass}`}
              />
            ) : null}
          </span>

          <div className="md:mt-1">
            <h3 className={`text-card-h3-mobile lg:text-card-h3-desktop ${titleClass}`}>{step.title}</h3>
            <p className={`mt-1 text-small ${bodyClass}`}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
