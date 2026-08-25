"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// PRO V2.2 §17: the reduced-motion check ran in a plain `useEffect`, which fires AFTER the
// browser paints — so a reduced-motion user's very first frame was still the pre-reveal
// transformed/transparent state, correcting itself only once the effect ran (confirmed as a
// real, if brief, window earlier this session via a flaky overflow test). `useLayoutEffect` runs
// synchronously before paint, so the correction lands before anything is shown on screen. SSR
// has no layout to run it against, so this falls back to `useEffect` there — `typeof window`
// is only ever `undefined` during that server pass, never on the client.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number; // in pixels
  duration?: number; // in seconds
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.7,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "none":
      default:
        return "none";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
