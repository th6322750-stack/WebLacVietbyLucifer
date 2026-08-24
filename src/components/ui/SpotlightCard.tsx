"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  borderBeam?: boolean;
  beamSpeed?: number;
  spotlightColor?: string;
  onClick?: () => void;
}

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
    setOpacity(1);

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;
      // Lift bumped 3px→5px to sit inside the brief's 4-6px hover-lift range.
      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`
      );
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (tilt) {
      setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease",
      }}
      className={`group relative overflow-hidden rounded-2xl bg-gold-600/30 p-[1.8px] shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Hover-only border beam. PRO V2 (2026-08-25): was `animate-spin-slow` unconditionally —
          running on every card, all the time, whether anyone was looking or not. The brief
          explicitly flags both halves of that as anti-patterns ("animation liên tục gây mệt",
          "mọi card đều phát sáng vàng"). `group-hover:animate-spin-slow` means the spin only
          exists while a cursor is actually on the card — everywhere else it's a static,
          motionless gradient. */}
      {borderBeam && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[150%] opacity-0 transition-opacity duration-normal ease-standard group-hover:opacity-100 group-hover:animate-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #806831 305deg, #C7A450 325deg, #FFCA4F 345deg, #FFF4D2 360deg)",
            animationDuration: `${beamSpeed}s`,
          }}
        />
      )}

      {/* 2. Inner White Card */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[14.5px] bg-white">
        {/* Dynamic Cursor-following Spotlight Background */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[14.5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            opacity,
            background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Card Content Container */}
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
}
