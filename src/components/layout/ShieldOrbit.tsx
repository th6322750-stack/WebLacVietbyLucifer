import Image from "next/image";
import { assetPath, assetSize } from "@/lib/assets";
import { BrandMark, type BrandName } from "@/components/ui/BrandMark";

/** Shield with platform marks in orbit around it.
 *
 * Mechanics live in globals.css (`.orbit-*`). This file owns the composition: where each mark
 * sits, how large it is, and how its float is offset from its neighbours.
 *
 * Positions are percentages of the stage, so the whole arrangement scales as one piece rather
 * than drifting apart at different widths.
 *
 * Each mark carries its OWN float duration and delay. The reference gave every icon the same
 * animation, which made six separate objects rise and fall in lockstep and read as one rigid
 * frame; staggering them is what makes them look independently suspended.
 */

type Orbiter = {
  brand: BrandName;
  /** Centre position as a percentage of the stage. */
  x: number;
  y: number;
  /** Rendered size in px at the stage's natural width; scales with the container. */
  size: number;
  /** Float period and offset — deliberately non-round so they rarely resynchronise. */
  dur: string;
  delay: string;
};

const ORBITERS: Orbiter[] = [
  { brand: "facebook",  x: 14, y: 26, size: 56, dur: "6.2s",  delay: "0s" },
  { brand: "meta",      x: 8,  y: 55, size: 52, dur: "7.4s",  delay: "-1.1s" },
  { brand: "messenger", x: 17, y: 82, size: 50, dur: "6.8s",  delay: "-2.3s" },
  { brand: "tiktok",    x: 86, y: 24, size: 56, dur: "7.1s",  delay: "-0.6s" },
  { brand: "youtube",   x: 92, y: 53, size: 52, dur: "6.5s",  delay: "-1.8s" },
  { brand: "zalo",      x: 84, y: 81, size: 50, dur: "7.8s",  delay: "-3.1s" },
];

export function ShieldOrbit({ className = "" }: { className?: string }) {
  const shield = assetSize("v5-shield-only");

  return (
    <div
      className={`orbit-stage ${className}`}
      // 16:9-ish stage: wide enough for the marks to sit clear of the shield at both edges.
      style={{ aspectRatio: "1672 / 941" }}
    >
      <div className="orbit-ring orbit-ring-a" />
      <div className="orbit-ring orbit-ring-b" />
      <div className="orbit-spark orbit-spark-a" />
      <div className="orbit-spark orbit-spark-b" />

      {/* Pulsing halo behind the shield — a separate layer so the pulse is an opacity change
          rather than an animated filter. */}
      <div className="orbit-glow" style={{ left: "50%", top: "48%", width: "52%", aspectRatio: "1" }} />

      {/* 40% chứ không phải 31% như bản khiên cũ: file mới có tỷ lệ nằm ngang (1328×1160) thay
          vì đứng (669×913), nên cùng một bề rộng thì nó thấp hơn hẳn và lọt thỏm giữa vòng quỹ
          đạo. Con số này giữ cho khiên có đúng độ cao như bố cục đã duyệt. */}
      <div className="orbit-shield" style={{ left: "50%", top: "48%", width: "40%" }}>
        <Image
          src={assetPath("v5-shield-only")}
          alt="Khiên bảo vệ tài khoản mạng xã hội — Lạc Việt Media"
          width={shield.width}
          height={shield.height}
          priority
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="h-auto w-full"
        />
      </div>

      {ORBITERS.map((o) => (
        <div
          key={o.brand}
          className="orbit-icon"
          style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${(o.size / 1672) * 100}%` }}
        >
          <span
            className="orbit-float block"
            style={{ ["--dur" as string]: o.dur, ["--delay" as string]: o.delay }}
          >
            <span className="block w-full">
              <BrandMark name={o.brand} size={o.size} className="w-full" />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
