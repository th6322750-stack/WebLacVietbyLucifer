import Image from "next/image";
import { assetPath, assetSize, assetFocal } from "@/lib/assets";

/** MASTER PARITY V4 / P0-HERO — renders a hero asset cropped to its measured focal box.
 *
 * The V3 hero masters are 4K canvases whose artwork covers only 10-31% of the frame, so drawing
 * the whole canvas produces the "small picture in a black box" the master never shows. This
 * crops to the measured content box so the subject fills the hero column.
 *
 * It is a composition change only: the file is untouched, and because the crop is a SUBSET of a
 * 3840x2160 source the rendered region still has far more source pixels than its display size —
 * nothing is upscaled past native, so the V3 noFakeUpscale rule holds. */
export function HeroVisual({
  assetId,
  alt,
  priority = false,
  className = "",
  desktopVw = 52,
  mobileVw = 86,
}: {
  assetId: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Width of the CROP (the visible wrapper) as a vw number, per breakpoint. `sizes` is derived
   * from these and the crop factor — see below. */
  desktopVw?: number;
  mobileVw?: number;
}) {
  const { width, height } = assetSize(assetId);
  const [x0, y0, x1, y1] = assetFocal(assetId);
  const cw = Math.max(x1 - x0, 0.01);
  const ch = Math.max(y1 - y0, 0.01);

  // The <img> is scaled to 1/cw of the wrapper so the crop fills it, which means the element is
  // far wider than the wrapper (2.76x for the support hero). `sizes` describes the IMG element,
  // not the wrapper, so passing the wrapper width made Next serve a candidate ~35% too small and
  // the hero rendered visibly soft. Scale the hint by the same factor, and cap at 100vw since
  // Next clamps to the device widths anyway.
  const scale = 1 / cw;
  const dv = Math.min(Math.round(desktopVw * scale), 100);
  const mv = Math.min(Math.round(mobileVw * scale), 100);
  const sizes = `(min-width: 1024px) ${dv}vw, ${mv}vw`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      // The wrapper takes the focal box's own aspect ratio, so the crop fills it exactly and the
      // image keeps its true proportions — no squashing.
      style={{ aspectRatio: `${cw * width} / ${ch * height}` }}
    >
      <Image
        src={assetPath(assetId)}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        // The asset's own backdrop is rgb(6,6,7) while the hero is rgb(11,11,11) — close but not
        // equal, which is exactly why the image read as a hard rectangular box pasted on the
        // page. `lighten` keeps the brighter value per channel, so the darker asset field is
        // replaced by the page background and only the artwork shows. No pixel is edited.
        className="absolute max-w-none mix-blend-lighten"
        style={{
          width: `${100 / cw}%`,
          height: `${100 / ch}%`,
          left: `${(-x0 * 100) / cw}%`,
          top: `${(-y0 * 100) / ch}%`,
        }}
      />
    </div>
  );
}
