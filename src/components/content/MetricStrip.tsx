export type Metric = { value: string; label: string };

/** .webby/component-map.json: "demo metrics must not ship as factual claims" — always
 * paired with a visible demo disclaimer per CONTENT_TRUTH.json until verified. */
export function MetricStrip({ metrics, onDark = false }: { metrics: Metric[]; onDark?: boolean }) {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <dt className="sr-only">{m.label}</dt>
            <dd className={`text-h2-mobile lg:text-h2-desktop font-heading ${onDark ? "text-gold-300" : "text-gold-700"}`}>
              {m.value}
            </dd>
            <p className={`mt-1 text-small ${onDark ? "text-white/75" : "text-text-secondary"}`}>{m.label}</p>
          </div>
        ))}
      </dl>
      <p className={`mt-4 text-center text-caption ${onDark ? "text-white/50" : "text-text-muted"}`}>
        Số liệu minh hoạ, chưa phải dữ liệu thực tế được xác nhận.
      </p>
    </div>
  );
}
