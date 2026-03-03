"use client";

import React, { useState, useEffect, useRef } from "react";

const SITE_BACKGROUND_EVENT = "play-site-background";
const STRIPE_COLORS = ["#F6F193", "#C5EBAA", "#A5DD9B", "#F2C18D"] as const;
const STRIPE_COUNT = 10;

export default function PlayBackgroundOverlay() {
  const [visible, setVisible] = useState(false);
  const [stripes, setStripes] = useState<readonly string[]>(() =>
    Array.from({ length: STRIPE_COUNT }, (_, i) => STRIPE_COLORS[i % STRIPE_COLORS.length])
  );
  const rafRef = useRef<number>(0);
  const endTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const handler = (e: CustomEvent<{ durationMs?: number }>) => {
      const durationMs = e.detail?.durationMs ?? 10000;
      setVisible(true);
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / durationMs, 1);
        const shift =
          Math.floor(progress * STRIPE_COLORS.length * 4) % STRIPE_COLORS.length;
        setStripes((prev) =>
          prev.map((_, i) => STRIPE_COLORS[(i + shift) % STRIPE_COLORS.length])
        );
        if (progress >= 1) {
          setVisible(false);
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener(SITE_BACKGROUND_EVENT, handler as EventListener);
    return () => {
      window.removeEventListener(SITE_BACKGROUND_EVENT, handler as EventListener);
      cancelAnimationFrame(rafRef.current);
      if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-col h-screen"
      aria-hidden
    >
      {stripes.map((color, i) => (
        <div
          key={i}
          className="h-[10%] w-full transition-[background-color] duration-500 ease-in-out"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
