"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

const SITE_BACKGROUND_EVENT = "play-site-background";
const DEFAULT_DURATION_MS = 10000;

export interface AutoUIPlayBackgroundButtonProps {
  /** Button label; defaults to "Play site background". */
  label?: string;
}

const AutoUIPlayBackgroundButton: React.FC<AutoUIPlayBackgroundButtonProps> = ({
  label = "Play site background",
}) => {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent(SITE_BACKGROUND_EVENT, { detail: { durationMs: DEFAULT_DURATION_MS } })
    );
  };

  return (
    <div className="mt-2 mb-1 w-full">
      <button
        type="button"
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-gray-900 shadow-md border border-[#1f2937]/10 bg-[#F6F193] hover:bg-[#F2C18D] hover:scale-[1.02] hover:shadow-lg active:scale-100 transition-all duration-200"
      >
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#A5DD9B]/60 shadow-inner">
          <svg className="w-3.5 h-3.5 ml-0.5 text-gray-800" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </span>
        {label}
      </button>
    </div>
  );
};

export default AutoUIPlayBackgroundButton;
autouiRegisterComponentPropsSchema(AutoUIPlayBackgroundButton);
