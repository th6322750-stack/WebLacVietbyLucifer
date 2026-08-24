import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export type Metric = { value: string; label: string; demoOnly: boolean };

/** .webby/component-map.json: "demo metrics must not ship as factual claims". Each metric
 * carries its own demoOnly flag in the data model (not just a UI-level disclaimer string)
 * so a future production data source can flip it to false once numbers are verified. */
export function MetricStrip({ metrics, onDark = false }: { metrics: Metric[]; onDark?: boolean }) {
  const hasDemoMetric = metrics.some((m) => m.demoOnly);
  return (
    <div>
      <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <dt className="sr-only">{m.label}</dt>
            <dd className={`text-metric font-heading ${onDark ? "text-gold-300" : "text-gold-700"}`}>
              <AnimatedCounter value={m.value} />
            </dd>
            <p className={`mt-1 text-small ${onDark ? "text-white/75" : "text-text-secondary"}`}>{m.label}</p>
          </div>
        ))}
      </dl>
      {hasDemoMetric ? (
        <p className={`mt-4 text-center text-caption ${onDark ? "text-white/50" : "text-text-muted"}`}>
          Số liệu minh hoạ, chưa phải dữ liệu thực tế được xác nhận.
        </p>
      ) : null}
    </div>
  );
}
