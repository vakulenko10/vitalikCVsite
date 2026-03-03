"use client";

import React, { useEffect, useRef } from "react";

const SITE_BACKGROUND_EVENT = "play-site-background";

export default function PlayBackgroundOverlay() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: CustomEvent<{ durationMs?: number }>) => {
      const durationMs = e.detail?.durationMs ?? 10000;
      const root = document.documentElement;

      root.classList.add("site-bg-playing");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        root.classList.remove("site-bg-playing");
        timeoutRef.current = null;
      }, durationMs);
    };

    window.addEventListener(SITE_BACKGROUND_EVENT, handler as EventListener);
    return () => {
      window.removeEventListener(SITE_BACKGROUND_EVENT, handler as EventListener);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.documentElement.classList.remove("site-bg-playing");
    };
  }, []);

  return null;
}
