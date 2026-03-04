"use client";

import React, { useCallback, useEffect, useState } from "react";
import Container from "./Container";
import { useLanguage } from "./LanguageContext";

// Single color so section looks solid; stripes exist only for play-background animation.
const SECTION_BG_COLOR = "#A5DD9B";
const STRIPE_COUNT = 4;

const COLLECTION_NAME = "askmequestions";

/** Fallback when DB has no data or fetch fails */
const FALLBACK_QUESTIONS: (string | { text: string; autoSend?: boolean })[] = [
  { text: "How can I contact you?", autoSend: true },
  "Show me your social medias",
  "What's your best project and why are you proud of it?",
  "Tell me about your tech stack and what you want to learn",
  "What makes you different from other developers?",
  "Why should I hire you for my company?",
  "What kind of problems excite you?",
  "Where can I download your portfolio (PDF)?",
  "Show me your CV",
  "Play the site background animation",
];

/** Same language filter as Section.tsx: keep keys that match current language */
function filterByLanguage<T extends Record<string, unknown>>(
  items: T[],
  language: string
): T[] {
  const unwantedProps = ["_id", "updatedAt", "createdAt", "__v"];
  return items.map((item) => {
    const filtered: Record<string, unknown> = {};
    let itemId = item._id;
    for (const key in item) {
      if (
        ((!key.startsWith("ua") && !key.startsWith("pl")) && language === "en") ||
        ((!key.startsWith("en") && !key.startsWith("pl")) && language === "ua") ||
        ((!key.startsWith("en") && !key.startsWith("ua")) && language === "pl")
      ) {
        if (!unwantedProps.includes(key)) {
          filtered[key] = item[key];
        }
      }
    }
    if (itemId !== undefined) filtered._id = itemId;
    return filtered as T;
  });
}

export interface AskMeQuestionDoc {
  _id?: unknown;
  enText?: string;
  uaText?: string;
  plText?: string;
  autoSend?: boolean;
  order?: number;
}

function getQuestionText(doc: Record<string, unknown>): string {
  const text =
    (doc.enText as string) ?? (doc.uaText as string) ?? (doc.plText as string) ?? "";
  return String(text).trim();
}

function useAskChat() {
  const sendToChat = useCallback((text: string, autoSend = false) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("autoui-prefill-chat", {
        detail: { text: text.trim(), autoSend },
      })
    );
  }, []);
  return sendToChat;
}

type LoadState = "loading" | "ready" | "fallback";

export default function AskMeSection() {
  const sendToChat = useAskChat();
  const { language } = useLanguage();
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [questions, setQuestions] = useState<{ text: string; autoSend: boolean }[]>([]);

  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    async function load() {
      try {
        const res = await fetch(`/api/fetchContentFromDB/${COLLECTION_NAME}`);
        if (cancelled) return;
        if (!res.ok) {
          setLoadState("fallback");
          setQuestions([]);
          return;
        }
        const json = await res.json();
        if (cancelled) return;
        const raw = Array.isArray(json.documents) ? json.documents : [];
        const filtered = filterByLanguage(raw as Record<string, unknown>[], language);
        const sorted = [...filtered].sort(
          (a, b) => (Number(a.order) ?? 999) - (Number(b.order) ?? 999)
        );
        const parsed = sorted.map((doc) => ({
          text: getQuestionText(doc),
          autoSend: Boolean(doc.autoSend),
        }));
        const valid = parsed.filter((q) => q.text.length > 0);
        if (cancelled) return;
        if (valid.length > 0) {
          setQuestions(valid);
          setLoadState("ready");
        } else {
          setQuestions([]);
          setLoadState("fallback");
        }
      } catch {
        if (!cancelled) {
          setQuestions([]);
          setLoadState("fallback");
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [language]);

  const list =
    loadState === "ready" && questions.length > 0
      ? questions
      : loadState === "fallback"
        ? FALLBACK_QUESTIONS.map((q) => ({
            text: typeof q === "string" ? q : q.text,
            autoSend: typeof q === "string" ? false : q.autoSend ?? false,
          }))
        : [];

  return (
    <section
      id="ask-me"
      className="relative min-h-[100dvh] md:min-h-[100vh] w-full overflow-hidden py-16 md:py-24 pb-[calc(1rem+env(safe-area-inset-bottom))]"
      style={{ background: SECTION_BG_COLOR }}
    >
      {/* Stripe background — one color; stripes only for play-background animation */}
      <div className="absolute inset-0 z-0 flex flex-col">
        {Array.from({ length: STRIPE_COUNT }, (_, i) => (
          <div
            key={i}
            className="h-1/4 w-full site-stripe"
            style={{ backgroundColor: SECTION_BG_COLOR }}
          />
        ))}
      </div>

      <Container classes="relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="flex justify-center items-center">
          <h1 className="text-center capitalize my-5 text-white z-10 md:sectionTitle">
            Ask me anything
          </h1>
        </div>
        <p className="text-center text-white/90 text-lg md:text-xl mb-10 max-w-2xl">
          Tap a question — the assistant will open and answer it for you.
        </p>

        {/* Question grid: loading skeleton, or DB questions, or fallback */}
        {loadState === "loading" ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i}>
                <div
                  className="w-full h-[72px] rounded-xl bg-white/60 animate-pulse"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
            {list.map((q, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => sendToChat(q.text, q.autoSend)}
                  className="group w-full text-left px-5 py-4 rounded-xl font-medium text-gray-900 bg-white/95 border-2 border-white shadow-md hover:shadow-xl hover:scale-[1.02] hover:border-[#A5DD9B] hover:bg-white transition-all duration-200 active:scale-[0.99] flex items-start gap-3"
                >
                  <span
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#A5DD9B] bg-[#A5DD9B]/20 group-hover:bg-[#A5DD9B]/30 transition-colors"
                    aria-hidden
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                  <span className="block text-sm md:text-base leading-snug pt-0.5">{q.text}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
