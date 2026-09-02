"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  borderBeam?: boolean;
  beamSpeed?: number;
  spotlightColor?: string;
  onClick?: () => void;
}

/** PRO V2.1 §18-21: was three `setState` calls on every `mousemove` (position/opacity/transform),
 * forcing a React re-render per pixel of cursor movement across every card on the page. Cursor
 * position now only ever writes CSS custom properties straight to the DOM node, coalesced to one
 * write per animation frame via rAF — React never re-renders for hover motion. The actual visual
 * (spotlight gradient position, tilt transform) is CSS reading `var(--mx)`/`var(--rx)` etc., see
 * `.spotlight-tilt`/`.spotlight-glow` in globals.css.
 *
 * Tilt is capped at ±3deg (was ±3.5) and skipped entirely on `hover:none` devices — a touch
 * screen has no cursor to tilt toward, so the check happens once on mount rather than costing
 * anything per-frame. */
export function SpotlightCard({
  children,
  className = "",
  tilt = true,
  borderBeam = true,
  beamSpeed = 3.5,
  spotlightColor = "rgba(212, 175, 55, 0.12)",
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const canTiltRef = useRef(false);

  useEffect(() => {
    canTiltRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      if (tilt && canTiltRef.current) {
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
        card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
        card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
        card.style.setProperty("--lift", "-5px");
      }
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--lift", "0px");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ ["--spot-color" as string]: spotlightColor }}
      className={`spotlight-tilt group relative overflow-hidden rounded-2xl bg-gold-600/30 p-[1.8px] shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Hover-only border beam — see the PRO V2 note in git history: was `animate-spin-slow`
          unconditionally, running on every card at all times regardless of reduced-motion. */}
      {borderBeam && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[150%] opacity-0 transition-opacity duration-normal ease-standard group-hover:opacity-100 group-hover:animate-spin-slow motion-reduce:group-hover:animate-none"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #806831 305deg, #C7A450 325deg, #FFCA4F 345deg, #FFF4D2 360deg)",
            animationDuration: `${beamSpeed}s`,
          }}
        />
      )}

      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[14.5px] bg-white">
        <div
          aria-hidden="true"
          className="spotlight-glow pointer-events-none absolute -inset-px rounded-[14.5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
}
