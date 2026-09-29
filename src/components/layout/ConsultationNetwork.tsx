import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark } from "@/components/ui/BrandMark";

/** PRO V2.2 §9 — /lien-he's hero right column signature visual. A small, static "communication
 * network": a Zalo center bubble (the actual channel every CTA on the page leads to) connected by
 * thin static gold lines to the same 3 things already promised in the page's own proof items
 * (phản hồi nhanh / tư vấn miễn phí / bảo mật thông tin) — visualizing existing copy, not adding
 * a new claim. Deliberately simpler and smaller than ShieldOrbit (/support-mxh's hero): no
 * orbiting motion, no rings spinning — brief explicitly asks to keep hero motion restrained here,
 * this is a supporting-page visual, not a second flagship hero. */

const NODES: { icon: IconName; label: string; x: number; y: number }[] = [
  { icon: "clock", label: "Phản hồi nhanh", x: 160, y: 50 },
  { icon: "messages-square", label: "Tư vấn miễn phí", x: 64.7, y: 215 },
  { icon: "lock-keyhole", label: "Bảo mật thông tin", x: 255.3, y: 215 },
];

const CENTER = { x: 160, y: 160 };

export function ConsultationNetwork({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-[320px] w-[320px] ${className}`}>
      {NODES.map((node) => {
        const dx = node.x - CENTER.x;
        const dy = node.y - CENTER.y;
        const length = Math.hypot(dx, dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <span
            key={node.label}
            className="absolute h-px bg-gradient-to-r from-v5-gold/50 to-v5-gold/10"
            style={{
              left: CENTER.x,
              top: CENTER.y,
              width: length,
              transformOrigin: "0 50%",
              transform: `rotate(${angle}deg)`,
            }}
            aria-hidden="true"
          />
        );
      })}

      {/* Reuses the existing `.orbit-glow` pulse (see ShieldOrbit) — one shared ambient-glow
          primitive instead of a second bespoke keyframe for the same effect. */}
      <div
        className="orbit-glow absolute"
        style={{ left: CENTER.x, top: CENTER.y, width: 140, aspectRatio: "1" }}
        aria-hidden="true"
      />
      <div
        className="absolute flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-v5-gold/40 bg-ink-950"
        style={{ left: CENTER.x, top: CENTER.y }}
      >
        <BrandMark name="zalo" size={30} />
      </div>

      {NODES.map((node) => (
        <div
          key={node.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          style={{ left: node.x, top: node.y }}
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-v5-gold/30 bg-white/[0.04]">
            <Icon name={node.icon} size="default" className="text-v5-gold" />
          </span>
          <span className="whitespace-nowrap text-caption text-white/70">{node.label}</span>
        </div>
      ))}
    </div>
  );
}
