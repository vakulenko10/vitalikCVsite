"use client";

import React, { useCallback } from "react";
import Container from "./Container";

// Single color so section looks solid; stripes exist only for play-background animation.
const SECTION_BG_COLOR = "#A5DD9B";
const STRIPE_COUNT = 4;

const PREDEFINED_QUESTIONS = [
  "What are your social medias?",
  "What is your best project that you are proud of and why?",
  "What is your main tech stack? And what do you want to do and learn in the future?",
  "What makes you different from other developers?",
  "Why should you hire me? (for your specific company)",
  "What kind of problems excite you?",
  "Play the site background animation",
];

function useAskChat() {
  const sendToChat = useCallback((text: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("autoui-prefill-chat", {
        detail: { text: text.trim(), autoSend: false },
      })
    );
  }, []);
  return sendToChat;
}

export default function AskMeSection() {
  const sendToChat = useAskChat();

  return (
    <section
      id="ask-me"
      className="relative min-h-[100vh] w-full overflow-hidden py-16 md:py-24"
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

        {/* Question grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {PREDEFINED_QUESTIONS.map((q, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => sendToChat(q)}
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
                <span className="block text-sm md:text-base leading-snug pt-0.5">{q}</span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
