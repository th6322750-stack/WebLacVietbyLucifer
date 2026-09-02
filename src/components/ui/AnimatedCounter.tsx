"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string; // e.g. "200+", "350+", "4+", "99%"
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 1600, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract number and surrounding characters (e.g., "200+" -> num: 200, suffix: "+")
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const rawNum = match?.[2];
  const targetNum = rawNum !== undefined ? parseFloat(rawNum) : null;
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    if (targetNum === null || hasAnimated) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // PRO V2.2 §18: the one motion primitive in the codebase that didn't check this —
          // ScrollReveal, SpotlightCard, and every hero scene all do. Reduced-motion users get
          // the final value immediately, no count-up.
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplayValue(value);
            return;
          }

          const startTime = performance.now();

          const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentNum = Math.floor(easeProgress * targetNum);

            setDisplayValue(`${prefix}${currentNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [targetNum, duration, hasAnimated, prefix, suffix, value]);

  if (targetNum === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {hasAnimated ? displayValue : `${prefix}0${suffix}`}
    </span>
  );
}
