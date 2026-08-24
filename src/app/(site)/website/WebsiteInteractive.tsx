"use client";

import { Button } from "@/components/ui/Button";
import { PricingCard, type Package } from "@/components/content/PricingCard";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function WebsiteHeroCta() {
  const { open } = useConsultation();
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" onClick={() => open("website-hero", "Website doanh nghiệp")}>
        Nhận tư vấn
      </Button>
      {/* Neo trong-trang, không phải href="/website": nút này đã nằm ngay trên /website, một
          liên kết trỏ về chính trang đang xem sẽ không làm gì cả. */}
      <Button href="#website-projects" size="lg" variant="outline" onDark>
        Xem các dự án
      </Button>
    </div>
  );
}

export function WebsitePackages({
  packages,
  commitments,
}: {
  /** Giống nhau ở mọi gói — cam kết chung của doanh nghiệp, không riêng gói nào. Hiện ở mặt
   * sau từng thẻ. */
  commitments: string[];
  packages: Package[];
}) {
  const { open } = useConsultation();
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {packages.map((pkg) => (
        <PricingCard
          key={pkg.plan}
          {...pkg}
          commitments={commitments}
          onSelect={() => open("website-packages", pkg.plan)}
        />
      ))}
    </div>
  );
}
