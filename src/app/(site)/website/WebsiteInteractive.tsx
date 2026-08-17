"use client";

import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/content/PricingCard";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function WebsiteHeroCta() {
  const { open } = useConsultation();
  return (
    <Button size="lg" onClick={() => open("website-hero", "Website doanh nghiệp")}>
      Nhận tư vấn miễn phí
    </Button>
  );
}

export function WebsitePackages({
  packages,
}: {
  packages: { plan: string; description: string; features: string[]; featured?: boolean }[];
}) {
  const { open } = useConsultation();
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {packages.map((pkg) => (
        <PricingCard key={pkg.plan} {...pkg} onSelect={() => open("website-packages", "Website doanh nghiệp")} />
      ))}
    </div>
  );
}
