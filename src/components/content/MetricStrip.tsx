import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export type Metric = { value: string; label: string; demoOnly: boolean };

/** .webby/component-map.json: "demo metrics must not ship as factual claims". Each metric
 * carries its own demoOnly flag in the data model (not just a UI-level disclaimer string)
 * so a future production data source can flip it to false once numbers are verified.
 *
 * The flag no longer drives a visible disclosure (removed 2026-09-02 at Lucifer's
 * instruction); it survives as `data-demo-only` on each metric, which is what the
 * content-truth tests assert against and what tells the team which numbers still need
 * verifying. `hasDemoMetric` went with the paragraph it used to gate. */
export function MetricStrip({ metrics, onDark = false }: { metrics: Metric[]; onDark?: boolean }) {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {/* PRO V2.1: was missing `data-demo-only` on the per-metric wrapper — PageHero's metric
            row already tags each one this way, but this component only showed the AGGREGATE
            disclosure paragraph below, with nothing machine-checkable on the numbers themselves.
            Real gap surfaced by re-running the test suite after /support-mxh's old trust-row
            section (which did carry the tag) was removed earlier this session — its metrics
            stayed exactly as unverified as before, just with no way to assert that anymore. */}
        {metrics.map((m) => (
          <div key={m.label} data-demo-only={m.demoOnly} className="text-center">
            <dt className="sr-only">{m.label}</dt>
            <dd className={`text-metric font-heading ${onDark ? "text-gold-300" : "text-gold-700"}`}>
              <AnimatedCounter value={m.value} />
            </dd>
            <p className={`mt-1 text-small ${onDark ? "text-white/75" : "text-text-secondary"}`}>{m.label}</p>
          </div>
        ))}
      </dl>
      {/* Visible "số liệu minh hoạ" disclosure removed 2026-09-02 at Lucifer's instruction: the
          figures stay on display without a hedge in front of customers. `demoOnly` is still
          carried in the data and emitted as `data-demo-only` in markup, so the team keeps an
          internal record of which numbers are not yet verified, and the truth tests still pin
          them. Re-enable this paragraph, or clear the flags, once the figures are confirmed. */}
    </div>
  );
}
