"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  width: number;
}

const GOLD_PALETTE = ["#FFE9A8", "#FFCA4F", "#C7A450", "#806831", "#FFF4D2"] as const;

export function InteractiveStarCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const meteors: Meteor[] = [];
    const mouse = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let isVisible = true;
    let lastMeteorTime = Date.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initStars();
    };

    const initStars = () => {
      stars = [];
      const density = Math.floor((width * height) / 7500);
      const starCount = Math.max(45, Math.min(density, 120));

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)] ?? "#FFCA4F";
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 1.6 + 0.7,
          color,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    const spawnMeteor = () => {
      if (meteors.length >= 2) return;
      meteors.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 90 + 60,
        speed: Math.random() * 4 + 4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg
        opacity: 1,
        width: Math.random() * 1.5 + 1,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Random meteor trigger every 4-7 seconds
      const now = Date.now();
      if (now - lastMeteorTime > Math.random() * 3000 + 4000) {
        spawnMeteor();
        lastMeteorTime = now;
      }

      // Draw & update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!star) continue;

        // Drift
        star.baseX += star.vx;
        star.baseY += star.vy;
        if (star.baseX < 0) star.baseX = width;
        if (star.baseX > width) star.baseX = 0;
        if (star.baseY < 0) star.baseY = height;
        if (star.baseY > height) star.baseY = 0;

        // Mouse interaction (gravity push/pull)
        let targetX = star.baseX;
        let targetY = star.baseY;

        if (mouse.active) {
          const dx = mouse.x - star.baseX;
          const dy = mouse.y - star.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 18;
            targetX -= (dx / dist) * force;
            targetY -= (dy / dist) * force;
          }
        }

        // Smooth transition
        star.x += (targetX - star.x) * 0.1;
        star.y += (targetY - star.y) * 0.1;

        // Twinkle calculation
        const opacity = ((Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase) + 1) / 2) * 0.75 + 0.25;

        // Star drawing with subtle aura
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.size * 3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby stars with faint constellation line if near mouse
        if (mouse.active) {
          const mDist = Math.hypot(star.x - mouse.x, star.y - mouse.y);
          if (mDist < 110) {
            for (let j = i + 1; j < stars.length; j++) {
              const other = stars[j];
              if (!other) continue;
              const d = Math.hypot(star.x - other.x, star.y - other.y);
              if (d < 80) {
                const lineAlpha = (1 - d / 80) * (1 - mDist / 110) * 0.28;
                ctx.save();
                ctx.strokeStyle = `rgba(255, 202, 79, ${lineAlpha})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
                ctx.restore();
              }
            }
          }
        }
      }

      // Draw & update meteors (Shooting stars)
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m) continue;

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.012;

        if (m.opacity <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, "rgba(255, 233, 168, 0)");
        grad.addColorStop(0.7, `rgba(255, 202, 79, ${m.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.opacity})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = "round";
        ctx.shadowColor = "#FFCA4F";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: "radial-gradient(ellipse at 50% 120%, #3a2c0d 0%, #140f04 38%, #000 75%)",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
    </div>
  );
}
