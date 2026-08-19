"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { assetPath, assetSize } from "@/lib/assets";
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
      {/* ASSET_USAGE_MAP "/support-mxh".consultationCtaVisual. V3 supersedes the 295x120
          source-limited crop with a full 1920x1080 lossless production render, so it is sized
          for the card rather than pinned to the old sliver — still never above native. */}
      <Image
        src={assetPath("support-cta-device-shield-approved-crop")}
        alt=""
        aria-hidden="true"
        width={assetSize("support-cta-device-shield-approved-crop").width}
        height={assetSize("support-cta-device-shield-approved-crop").height}
        sizes="(min-width: 1024px) 360px, 60vw"
        className="h-auto w-full max-w-[360px] shrink-0"
      />
      <Button onClick={() => open("support-lead-cta", "Support mạng xã hội")}>Yêu cầu hỗ trợ ngay</Button>
    </div>
  );
}
