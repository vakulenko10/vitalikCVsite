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
    const handler = (e: CustomEvent<{ text: string }>) => {
      const text = e.detail?.text?.trim();
      if (!text) return;
      const openBtn = document.querySelector<HTMLElement>(".autoui-chat-open-btn");
      openBtn?.click();
      const send = () => {
        const textbox = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(".autoui-chat-textbox");
        const sendBtn = document.querySelector<HTMLElement>(".autoui-chat-send");
        if (textbox && sendBtn) {
          const proto = Object.getPrototypeOf(textbox);
          const descriptor = Object.getOwnPropertyDescriptor(proto, "value")?.set;
          if (descriptor) {
            descriptor.call(textbox, text);
          } else {
            textbox.value = text;
          }
          textbox.dispatchEvent(new Event("input", { bubbles: true }));
          sendBtn.click();
          return true;
        }
        return false;
      };
      const trySend = (attempts = 0) => {
        if (send()) return;
        if (attempts < 20) setTimeout(() => trySend(attempts + 1), 150);
      };
      setTimeout(() => trySend(), 400);
    };
    window.addEventListener("autoui-ask", handler as EventListener);
    return () => window.removeEventListener("autoui-ask", handler as EventListener);
  }, []);
}

const AutoUIChatClient = () => {
  useAskChatTrigger();
  return <ModalChatNoSSR config={autouiConfig} />;
};

export default AutoUIChatClient;

