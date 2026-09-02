import Image from "next/image";
import { assetPath, assetSize } from "@/lib/assets";

/** V5 NEW DIRECTION — the layered phoenix hero.
 *
 * ChatGPT delivered this composition as six independent RGBA layers rather than one flat frame,
 * so the depth is real rather than painted: each plane moves on its own timing, and the glow is
 * a live alpha ramp instead of a baked halo. That is also why nothing here needs `mix-blend`
 * rescue — the previous set shipped an opaque #060607 backdrop that had to be blended away
 * against the page, and every layer below is genuinely transparent.
 *
 * Registration matters: `phoenix`, `gold-ribbon` and `particles` are all 1448x1086, i.e. drawn
 * on ONE shared canvas. They are therefore grouped and transformed together — moving the bird
 * without its light trails and dust would pull the composition apart. `dongson-disc`
 * (1254x1254) and `ground-glow` (1672x941) are separate crops and are placed independently,
 * which is what lets the disc be resized to sit inside the curl of the tail.
 *
 * Motion is decorative only and is fully disabled under prefers-reduced-motion (see globals.css).
 */

const FRAME = assetSize("v5-phoenix"); // 1448x1086 — the shared registration canvas

/** Composition controls, as fractions of the frame. Kept named and in one place because they
 * are tuned together: changing the bird's scale or offset changes how much of the disc it
 * covers, so the two blocks below were solved as a pair against the phoenix alpha map. */
const COMPOSITION = {
  /** The bird is scaled back and pushed right so the disc has somewhere to sit. Without this
   * the bird's mass owns the centre of the frame and the disc is >50% occluded wherever it
   * goes — measured, not assumed. */
  birdScale: 0.86,
  birdShiftX: "10%",
  /** How far the bird group is lifted, so the tail sweeps down across the disc. */
  birdRise: "4%",
  /** Disc placement, measured rather than guessed: the phoenix alpha was sampled against
   * candidate positions to find where the bird OVERLAPS the disc by roughly a third — enough
   * that the tail sweeps across it and reads as an embrace, while ~72% stays visible.
   * For reference: behind the chest at full bird size the occlusion was 81.8% and the disc
   * vanished; at this scale/offset pair it is 27.8%. */
  discWidth: "48%",
  discX: "32%",
  discY: "60%",
};

function Layer({
  id,
  alt = "",
  className,
  style,
  priority = false,
  sizes,
}: {
  id: string;
  alt?: string;
  className: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes: string;
}) {
  const { width, height } = assetSize(id);
  return (
    <Image
      src={assetPath(id)}
      alt={alt}
      aria-hidden={alt === "" ? "true" : undefined}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      style={style}
    />
  );
}

export function HeroPhoenix({ className = "" }: { className?: string }) {
  // The artwork column is ~52vw at desktop and ~92vw on mobile; layers are drawn at or below
  // their native width at both, so nothing is upscaled past the delivered pixels.
  const sizes = "(min-width: 1024px) 52vw, 92vw";

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ aspectRatio: `${FRAME.width} / ${FRAME.height}` }}
    >
      {/* 1 — ground glow: the pool of light the composition stands in. Widest layer, anchored to
          the bottom edge and allowed to spill outside the frame. */}
      <Layer
        id="v5-ground-glow"
        sizes={sizes}
        className="hero-fx-glow pointer-events-none absolute bottom-[-6%] left-1/2 w-[124%] max-w-none -translate-x-1/2"
      />

      {/* 2 — Đông Sơn disc, behind the bird and deliberately smaller than the bird group so the
          tail closes around it instead of the disc overshooting the wings. Slow
          counter-rotation reads as depth without ever being fast enough to notice. */}
      <Layer
        id="v5-dongson-disc"
        sizes={sizes}
        className="hero-fx-disc pointer-events-none absolute max-w-none"
        // The spin keyframes own `transform` (they carry the -50%/-50% centring), so placement
        // has to come from left/top/width rather than a competing translate utility.
        style={{ width: COMPOSITION.discWidth, left: COMPOSITION.discX, top: COMPOSITION.discY }}
      />

      {/* 3 — the bird group. One transform for all three shared-canvas layers keeps the trails
          and dust locked to the bird while the whole group rides up. */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${COMPOSITION.birdShiftX}, -${COMPOSITION.birdRise}) scale(${COMPOSITION.birdScale})`,
        }}
      >
        <Layer id="v5-gold-ribbon" sizes={sizes} className="hero-fx-ribbon pointer-events-none absolute inset-0 h-full w-full" />
        {/* The only layer with a real alt: it is the subject; the rest is atmosphere and must
            not be announced to screen readers. */}
        <Layer
          id="v5-phoenix"
          alt="Phượng hoàng vàng trên nền trống đồng Đông Sơn — biểu tượng Lạc Việt Media Agency"
          priority
          sizes={sizes}
          className="hero-fx-phoenix absolute inset-0 h-full w-full"
        />
        <Layer id="v5-particles" sizes={sizes} className="hero-fx-particles pointer-events-none absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
