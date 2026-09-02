import { Icon } from "@/components/ui/Icon";

/** PRO V2.2 §8 — /kien-thuc's hero right column was empty on desktop. A hexagonal "knowledge
 * network": a center idea mark connected by thin static gold lines to the same 6 real content
 * categories already used by the page's own filter chips (`categories` in page.tsx) — restating
 * existing real content as a visual, not inventing new claims or a 3D asset. */

const CATEGORIES = ["AI", "SEO", "Marketing", "Facebook", "TikTok", "Website"];
const CENTER = { x: 160, y: 160 };
const RADIUS = 120;

function nodePosition(index: number, total: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  return { x: CENTER.x + RADIUS * Math.cos(angle), y: CENTER.y + RADIUS * Math.sin(angle) };
}

export function KnowledgeNetwork({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-[320px] w-[320px] ${className}`}>
      {CATEGORIES.map((label, idx) => {
        const { x, y } = nodePosition(idx, CATEGORIES.length);
        const dx = x - CENTER.x;
        const dy = y - CENTER.y;
        const length = Math.hypot(dx, dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <span
            key={label}
            className="absolute h-px bg-gradient-to-r from-v5-gold/45 to-v5-gold/5"
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

      <div
        className="orbit-glow absolute"
        style={{ left: CENTER.x, top: CENTER.y, width: 150, aspectRatio: "1" }}
        aria-hidden="true"
      />
      <div
        className="absolute flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-v5-gold/40 bg-ink-950"
        style={{ left: CENTER.x, top: CENTER.y }}
      >
        <Icon name="lightbulb" size="feature" className="text-v5-gold" />
      </div>

      {CATEGORIES.map((label, idx) => {
        const { x, y } = nodePosition(idx, CATEGORIES.length);
        return (
          <span
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-pill border border-v5-gold/30 bg-white/[0.04] px-3 py-1.5 text-caption font-medium text-white/85"
            style={{ left: x, top: y }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
