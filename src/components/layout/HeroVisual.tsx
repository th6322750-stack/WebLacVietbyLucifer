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
  sizes = "(min-width: 1024px) 52vw, 78vw",
}: {
  assetId: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const { width, height } = assetSize(assetId);
  const [x0, y0, x1, y1] = assetFocal(assetId);
  const cw = Math.max(x1 - x0, 0.01);
  const ch = Math.max(y1 - y0, 0.01);

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
        className="absolute max-w-none"
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
