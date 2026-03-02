"use client";

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

const AutoUIChatClient = () => {
  return <ModalChatNoSSR config={autouiConfig} />;
};

export default AutoUIChatClient;

