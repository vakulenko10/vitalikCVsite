"use client";

import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import type { AutoUIConfig } from "@autoai-ui/autoui";
import { baseAutouiConfig } from "../autouiConfig";
import { useLanguage } from "./LanguageContext";

const SITE_LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  ua: "Ukrainian",
  pl: "Polish",
};

const ModalChatNoSSR = dynamic<{ config: AutoUIConfig }>(
  () =>
    import("@autoai-ui/autoui").then((mod) => {
      return mod.ModalChat;
    }),
  { ssr: false }
);

function useAskChatTrigger() {
  useEffect(() => {
    const handler = (e: CustomEvent<{ text: string; autoSend?: boolean }>) => {
      const rawText = e.detail?.text ?? "";
      const text = rawText.trim();
      if (!text) return;
      const shouldAutoSend = e.detail?.autoSend !== false;

      const openBtn = document.querySelector<HTMLElement>(".autoui-chat-open-btn");
      openBtn?.click();

      const fillAndMaybeSend = () => {
        const textbox = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(".autoui-chat-textbox");
        const sendBtn = document.querySelector<HTMLElement>(".autoui-chat-send");
        if (!textbox) return false;

        const proto = Object.getPrototypeOf(textbox);
        const descriptor = Object.getOwnPropertyDescriptor(proto, "value")?.set;
        if (descriptor) {
          descriptor.call(textbox, text);
        } else {
          textbox.value = text;
        }
        textbox.dispatchEvent(new Event("input", { bubbles: true }));

        if (shouldAutoSend && sendBtn) {
          sendBtn.click();
        }
        return true;
      };

      const tryFill = (attempts = 0) => {
        if (fillAndMaybeSend()) return;
        if (attempts < 20) setTimeout(() => tryFill(attempts + 1), 150);
      };

      setTimeout(() => tryFill(), 400);
    };

    window.addEventListener("autoui-prefill-chat", handler as EventListener);
    return () => window.removeEventListener("autoui-prefill-chat", handler as EventListener);
  }, []);
}

const AutoUIChatClient = () => {
  useAskChatTrigger();
  const { language } = useLanguage();
  const label = SITE_LANGUAGE_LABELS[language] ?? "English";

  const config = useMemo<AutoUIConfig>(() => {
    const base = baseAutouiConfig;
    const appDescriptionPrompt = base.llm?.appDescriptionPrompt
      ? `${base.llm.appDescriptionPrompt} The current website language is ${label}. When greeting, say "The current website language is ${label}" and respond in this language.`
      : base.llm?.appDescriptionPrompt;
    return {
      ...base,
      llm: base.llm
        ? { ...base.llm, appDescriptionPrompt }
        : base.llm,
    };
  }, [label]);

  return <ModalChatNoSSR config={config} />;
};

export default AutoUIChatClient;

