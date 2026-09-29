"use client";

import type { ReactNode } from "react";

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number; // seconds
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-10 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-10 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
