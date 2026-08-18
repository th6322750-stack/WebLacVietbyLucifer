"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { assetPath } from "@/lib/assets";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

export function SupportHeroCta() {
  const { open } = useConsultation();
  return (
    <Button size="lg" onClick={() => open("support-hero", "Support mạng xã hội")}>
      Nhận tư vấn miễn phí
    </Button>
  );
}

export function SupportLeadCta() {
  const { open } = useConsultation();
  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-gold-300/60 bg-ivory-100 p-8 text-center md:flex-row md:justify-between md:text-left">
      <div>
        <h3 className="text-card-h3-mobile lg:text-card-h3-desktop text-ink-950">Đang gặp sự cố cần xử lý gấp?</h3>
        <p className="mt-1 text-body text-text-secondary">Để lại thông tin, đội ngũ hỗ trợ sẽ liên hệ trong ngày làm việc.</p>
      </div>
      {/* ASSET_USAGE_MAP "/support-mxh".consultationCtaVisual — approved-UI crop rendered at its
          native 295x120; SOURCE_LIMITED_APPROVED_CROP must never be upscaled. */}
      <Image
        src={assetPath("support-cta-device-shield-approved-crop")}
        alt=""
        aria-hidden="true"
        width={295}
        height={120}
        className="h-auto w-full max-w-[295px] shrink-0"
      />
      <Button onClick={() => open("support-lead-cta", "Support mạng xã hội")}>Yêu cầu hỗ trợ ngay</Button>
    </div>
  );
}
