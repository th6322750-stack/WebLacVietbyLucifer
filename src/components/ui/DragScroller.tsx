"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** A track that drifts on its own and can also be grabbed and flung.
 *
 * The CSS-only marquee could not do this: a `transform` animation moves pixels the browser has
 * no scroll model for, so there is nothing to drag. This drives `scrollLeft` on a real overflow
 * container instead, which buys three things at once — pointer drag on desktop, native touch
 * momentum on mobile, and a wheel/trackpad that behaves the way people expect.
 *
 * Children are rendered twice. When the position passes the halfway mark it is rolled back by
 * exactly half the track, landing on an identical frame, so the loop is seamless in both
 * directions and never runs out of runway however hard it is flung.
 *
 * PHUONG_AN §6.6 / WCAG 2.2 AA (2.5.7 Dragging Movements): drag cannot be the only way to reach
 * the rest of the track. Prev/Next buttons give a single-pointer path and, being real buttons,
 * a keyboard one for free. The track itself is focusable and scrolls with arrow keys, which is
 * what a screen-reader user reaching it by Tab will try first.
 *
 * Auto-drift pauses on hover, on focus anywhere inside, and while dragging — an element that
 * keeps sliding out from under the pointer is unusable, and one that keeps moving while a
 * keyboard user is reading it is worse.
 */
export function DragScroller({
  children,
  /** Pixels per second of idle drift. 40 read as barely moving on a 300px card — a card took
   * eight seconds to clear the viewport, and 100 overshot the other way. 70 sits between the
   * two: about four and a half seconds per card, readable without feeling stalled. */
  speed = 70,
  className = "",
  label = "Danh sách cuộn ngang",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  /** Names the scrollable region for assistive tech. */
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  /** One "page" of the track. Falls back to the visible width so it works before layout settles
   *  and for any child size, rather than assuming a fixed card width. */
  const step = useCallback((direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild?.firstElementChild as HTMLElement | null;
    const distance = first?.offsetWidth ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: distance * direction, behavior: "smooth" });
  }, []);

  /** Roll the position back into the first copy. Runs after every move, auto or manual. */
  const wrap = useCallback((el: HTMLDivElement) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft <= 0) el.scrollLeft += half;
  }, []);

  // Idle drift.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollLeft = 1; // just inside the first copy, so a leftward flick has runway immediately

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000; // clamped so a backgrounded tab cannot jump
      last = now;
      if (!drag.current.active && !reduced && !pausedRef.current) el.scrollLeft += speed * dt;
      wrap(el);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, wrap]);

  // Drag, using MOUSE events on window — not pointer events.
  //
  // Pointer events do not survive here. Measured: pointerdown fires, exactly one pointermove
  // gets through, then the browser emits `pointercancel` and the drag dies — a 320px drag moved
  // the track 82px and froze. That is the browser claiming the pointer for its own panning,
  // because this element is a real overflow-x container. `touch-action: none` would stop it,
  // but at the cost of the native touch scrolling that makes this work on a phone.
  //
  // Mouse events are not subject to that takeover, so desktop drag rides on them while touch is
  // left entirely to the browser, which already does momentum and rubber-banding better than a
  // hand-rolled version would.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // left button only
      e.preventDefault(); // suppress text selection and native image dragging
      drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    };

    const onMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 3) drag.current.moved = true;
      el.scrollLeft = drag.current.startScroll - dx;
      wrap(el);
    };

    const onUp = () => {
      drag.current.active = false;
    };

    // A drag that travelled more than a few pixels must not also count as a click, or every
    // flick would open whichever card happened to be under the cursor.
    const onClick = (e: MouseEvent) => {
      if (!drag.current.moved) return;
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [wrap]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div
        ref={ref}
        tabIndex={0}
        role="group"
        aria-label={label}
        className={`no-scrollbar flex cursor-grab select-none overflow-x-auto overscroll-x-contain rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${className}`}
      >
        <div className="flex shrink-0 items-stretch gap-6 pr-6">{children}</div>
        <div className="flex shrink-0 items-stretch gap-6 pr-6" aria-hidden="true">
          {children}
        </div>
      </div>

      {/* 44px minimum per the repo's own touch-target budget, which is above the WCAG 2.2
          24x24 floor. Positioned outside the mask so they never fade with the track edges. */}
      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Xem các mục trước"
          className="grid min-h-touch min-w-touch place-items-center rounded-full border border-gold-500/30 bg-white text-gold-700 transition-colors duration-normal ease-standard hover:border-gold-500/60 hover:bg-gold-500/10"
        >
          <Icon name="arrow-left" size="default" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Xem các mục tiếp theo"
          className="grid min-h-touch min-w-touch place-items-center rounded-full border border-gold-500/30 bg-white text-gold-700 transition-colors duration-normal ease-standard hover:border-gold-500/60 hover:bg-gold-500/10"
        >
          <Icon name="arrow-right" size="default" />
        </button>
      </div>
    </div>
  );
}
