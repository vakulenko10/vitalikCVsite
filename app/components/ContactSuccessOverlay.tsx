"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const CONTACT_FORM_SUCCESS_EVENT = "contact-form-success";

const PALETTE = {
  green: "#A5DD9B",
  greenLight: "#C5EBAA",
  yellow: "#F6F193",
  orange: "#F2C18D",
  white: "#ffffff",
  text: "#1f2937",
  textMuted: "#6b7280",
};
const COLORS = [PALETTE.green, PALETTE.greenLight, PALETTE.yellow, PALETTE.orange, "#e8b87a"];
const CONFETTI_COUNT = 450;
const CONFETTI_DURATION_MS = 2000;
const MESSAGE_DURATION_MS = 5000;

function tryCloseChat() {
  if (typeof document === "undefined") return;
  const openBtn = document.querySelector<HTMLElement>(".autoui-chat-open-btn");
  if (openBtn) openBtn.click();
}

function ConfettiLayer() {
  const pieces = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => {
        const spreadAngle = -Math.PI / 2 + (Math.PI * i) / CONFETTI_COUNT + (Math.random() - 0.5) * 0.6;
        return {
          id: i,
          color: COLORS[i % COLORS.length],
          size: 12 + Math.random() * 24,
          spreadAngle,
          delay: Math.random() * 0.25,
          xJitter: (Math.random() - 0.5) * 200,
          yExtra: Math.random() * 300,
          duration: 1.4 + Math.random() * 0.8,
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden w-full h-full" aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: "50%",
            top: "0%",
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            originX: "50%",
            originY: "0%",
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: Math.sin(p.spreadAngle) * 1100 + p.xJitter,
            y: Math.cos(p.spreadAngle) * 1100 + p.yExtra,
            opacity: 0,
            rotate: 360 + (Math.random() - 0.5) * 360,
            scale: 0.3,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
}

export default function ContactSuccessOverlay() {
  const [phase, setPhase] = useState<"idle" | "confetti" | "message">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(typeof document !== "undefined");
  }, []);

  const handler = useCallback(() => {
    setPhase("confetti");
  }, []);

  useEffect(() => {
    window.addEventListener(CONTACT_FORM_SUCCESS_EVENT, handler);
    return () => window.removeEventListener(CONTACT_FORM_SUCCESS_EVENT, handler);
  }, [handler]);

  useEffect(() => {
    if (phase !== "confetti") return;
    const t = setTimeout(() => {
      setPhase("message");
      tryCloseChat();
    }, CONFETTI_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "message") return;
    const t = setTimeout(() => setPhase("idle"), MESSAGE_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (!mounted || phase === "idle") return null;

  const overlay = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-black/20" aria-hidden />
        {phase === "confetti" && <ConfettiLayer />}
        {phase === "message" && (
          <motion.div
            className="relative z-10 mx-4 max-w-md rounded-2xl border-2 shadow-xl p-6 text-center bg-white"
            style={{
              backgroundColor: "#ffffff",
              borderColor: PALETTE.green,
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.15)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={() => setPhase("idle")}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              style={{ color: PALETTE.textMuted }}
              aria-label="Close"
            >
              ×
            </button>
            <p className="text-lg font-medium leading-relaxed pr-8" style={{ color: PALETTE.text }}>
              Thank you for reaching me out through the email, I will contact you back as soon as possible…
            </p>
            <button
              type="button"
              onClick={() => setPhase("idle")}
              className="mt-4 px-5 py-2.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: PALETTE.green }}
            >
              OK
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(overlay, document.body);
}
