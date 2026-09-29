/** Animated gold starfield for the hero band.
 *
 * A single drifting layer over a warm floor glow. Three star sizes are baked into one seamless
 * tile rather than split across three elements: each extra animated layer measured at 10-15fps,
 * and the previous compromise — animating only the nearest — left most of the sky standing
 * still. See starfield.css for the numbers.
 *
 * Purely decorative: aria-hidden, non-interactive, and frozen under prefers-reduced-motion.
 */
export function StarField({ className = "" }: { className?: string }) {
  return (
    <div className={`starfield ${className}`} aria-hidden="true">
      <div className="star-a" />
    </div>
  );
}
