import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function PricingCard({
  plan,
  description,
  price,
  priceSuffix,
  features,
  featured = false,
  ctaLabel = "Chọn gói này",
  onSelect,
}: {
  plan: string;
  description: string;
  /** Exact display string, e.g. "Từ 8.900.000đ" or "Liên hệ báo giá" — demo pricing per
   * CONTENT_TRUTH.json, tagged demoOnly in the package data, not a verified production price. */
  price: string;
  priceSuffix?: string;
  features: string[];
  featured?: boolean;
  ctaLabel?: string;
  onSelect?: () => void;
}) {
  return (
    <div
      className={`flex flex-col rounded-lg p-6 md:p-8 ${
        featured ? "bg-ink-950 text-white shadow-lg ring-1 ring-gold-500/40" : "border border-border bg-white shadow-sm"
      }`}
    >
      {featured ? (
        <span className="mb-4 inline-flex w-fit items-center rounded-pill bg-gold-metallic px-3 py-1 text-caption font-semibold uppercase text-ink-950">
          Phổ biến nhất
        </span>
      ) : null}
      <h3 className={`text-h4-desktop font-heading ${featured ? "text-white" : "text-ink-950"}`}>{plan}</h3>
      <p className={`mt-2 text-small ${featured ? "text-white/75" : "text-text-secondary"}`}>{description}</p>
      <p className={`mt-6 text-h3-mobile font-heading ${featured ? "text-gold-300" : "text-gold-700"}`}>
        {price}
        {priceSuffix ? <span className="text-small font-body text-white/60"> {priceSuffix}</span> : null}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f} className={`flex items-start gap-2 text-small ${featured ? "text-white/90" : "text-text-secondary"}`}>
            <Icon name="check" size="inline" className={`mt-0.5 shrink-0 ${featured ? "text-gold-300" : "text-gold-600"}`} />
            {f}
          </li>
        ))}
      </ul>

      <Button
        variant={featured ? "primary" : "outline"}
        onDark={featured}
        className="mt-8 w-full"
        onClick={onSelect}
      >
        {ctaLabel}
      </Button>
    </div>
  );
}
