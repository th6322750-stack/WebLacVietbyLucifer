"use client";

import { useEffect, useState } from "react";

export function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (desktop mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor-text]") as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor-text") || "");
        setIsHovered(true);
      } else {
        setCursorText("");
        const interactive = target.closest("a, button, [role='button'], input, select, textarea");
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const loop = () => {
      // Lerp for smooth lag
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Halo / Follower */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          // 100px covered most of the project thumbnail it was pointing at — the label is
          // meant to sit ON the image, not hide it. 68px still fits "Xem dự án" on two lines.
          width: cursorText ? "68px" : isHovered ? "46px" : "28px",
          height: cursorText ? "68px" : isHovered ? "46px" : "28px",
          border: cursorText
            ? "1.5px solid rgba(255, 202, 79, 0.9)"
            : isHovered
            ? "1.5px solid rgba(212, 175, 55, 0.85)"
            : "1px solid rgba(212, 175, 55, 0.4)",
          backgroundColor: cursorText
            ? "rgba(18, 14, 4, 0.88)"
            : isHovered
            ? "rgba(212, 175, 55, 0.12)"
            : "rgba(212, 175, 55, 0.04)",
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
          backdropFilter: cursorText ? "blur(4px)" : "none",
          boxShadow: cursorText
            ? "0 0 20px rgba(255, 202, 79, 0.3)"
            : isHovered
            ? "0 0 12px rgba(212, 175, 55, 0.2)"
            : "none",
        }}
      >
        {cursorText && (
          <span className="flex h-full w-full items-center justify-center px-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide text-v5-gold">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Micro Dot */}
      {!cursorText && (
        <div
          className="fixed size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-v5-gold shadow-[0_0_6px_#FFCA4F] transition-opacity duration-150"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: isHovered ? 0 : 1,
          }}
        />
      )}
    </div>
  );
}
