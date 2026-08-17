"use client";

import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/content/PricingCard";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function WebsiteHeroCta() {
  const { open } = useConsultation();
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" onClick={() => open("website-hero", "Website doanh nghiệp")}>
        Nhận tư vấn
      </Button>
      <Button href="/du-an" size="lg" variant="outline" onDark>
        Xem các dự án
      </Button>
    </div>
  );
}

export function WebsitePackages({
  packages,
}: {
  packages: { plan: string; description: string; price: string; features: string[]; featured?: boolean }[];
}) {
  const { open } = useConsultation();
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {packages.map((pkg) => (
        <PricingCard key={pkg.plan} {...pkg} onSelect={() => open("website-packages", "Website doanh nghiệp")} />
      ))}
    </div>
  );
}
