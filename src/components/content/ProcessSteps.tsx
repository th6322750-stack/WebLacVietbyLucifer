import { Icon } from "@/components/ui/Icon";

export type ProcessStep = { title: string; description: string };

/** Approved process treatment:
 * a thin CONNECTED HORIZONTAL TIMELINE on desktop with interactive gold-ringed numbers,
 * joined left-to-right by arrow connectors, with glowing micro-interactions on hover.
 */
export function ProcessSteps({ steps, onDark = false }: { steps: ProcessStep[]; onDark?: boolean }) {
  return (
    <ol data-component="process-timeline" className="flex flex-col gap-6 md:flex-row md:items-start md:gap-0">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="group relative flex flex-1 gap-4 transition-all duration-300 md:flex-col md:items-center md:gap-3 md:px-2 md:text-center"
        >
          {/* Mobile: vertical rail joining the numbers */}
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
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-step-number font-heading transition-all duration-300 group-hover:scale-110 ${
                onDark
                  ? "border-gold-500/40 bg-ink-900 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-gold-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                  : "border-gold-500/40 bg-white text-gold-700 shadow-sm group-hover:border-gold-500 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              }`}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 ? (
              <Icon
                name="arrow-right"
                size="inline"
                className={`absolute left-[calc(50%+2.2rem)] top-1/2 hidden -translate-y-1/2 transition-colors duration-300 group-hover:text-gold-500 md:block ${
                  onDark ? "text-white/25" : "text-border"
                }`}
              />
            ) : null}
          </span>

          <div className="md:mt-2">
            <h3
              className={`font-heading text-card-h3-mobile transition-colors duration-200 group-hover:text-gold-600 lg:text-card-h3-desktop ${
                onDark ? "text-white" : "text-ink-950"
              }`}
            >
              {step.title}
            </h3>
            <p className={`mt-1 text-small ${onDark ? "text-white/70" : "text-text-secondary"}`}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
