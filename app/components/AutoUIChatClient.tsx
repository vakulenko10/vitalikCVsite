"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { AutoUIConfig } from "@autoai-ui/autoui";
import autouiConfig from "../autouiConfig";

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
  return <ModalChatNoSSR config={autouiConfig} />;
};

export default AutoUIChatClient;

