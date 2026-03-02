"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

export interface AutoUIHighlightCardProps {
  /** Main title; defaults to "Portfolio highlight" if omitted. */
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  tone?: "primary" | "muted";
  linkLabel?: string;
  linkHref?: string;
}

const badgeBase =
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide";

const AutoUIHighlightCard: React.FC<AutoUIHighlightCardProps> = ({
  title: titleProp,
  subtitle,
  description,
  tags = [],
  tone = "primary",
  linkLabel,
  linkHref,
}) => {
  const title = titleProp ?? "Portfolio highlight";
  const toneClasses =
    tone === "primary"
      ? "from-[#b52c26] via-[#d99592] to-[#6a6a6a]"
      : "from-zinc-800 via-zinc-900 to-black";

  return (
    <div className="relative max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 p-5 shadow-[0_18px_45px_rgba(0,0,0,.55)] ring-1 ring-black/40 backdrop-blur">
      <div
        className={`pointer-events-none absolute inset-[-40%] -z-10 bg-[length:200%_200%] bg-gradient-to-br ${toneClasses} opacity-60`}
      />

      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-black/60 shadow-inner shadow-black/50 ring-1 ring-white/10">
          <span className="text-lg leading-none text-white">VV</span>
        </div>

        <div className="flex-1 space-y-2 text-left">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold tracking-tight text-white">
              {title}
            </h3>
            <span
              className={`${badgeBase} bg-black/40 text-[0.65rem] uppercase text-zinc-100 ring-1 ring-white/15`}
            >
              Portfolio highlight
            </span>
          </div>

          {subtitle && (
            <p className="text-xs font-medium text-zinc-100/90">{subtitle}</p>
          )}

          {description && (
            <p className="text-sm leading-relaxed text-zinc-100/85">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`${badgeBase} bg-black/45 text-[0.7rem] text-zinc-100/90 ring-1 ring-white/15`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(linkLabel || linkHref) && (
            <div className="pt-2">
              {linkHref ? (
                <a
                  href={linkHref}
                  className="inline-flex items-center gap-1 rounded-full bg-black/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.09em] text-zinc-50 ring-1 ring-white/20 transition hover:bg-black hover:ring-white/40"
                >
                  {linkLabel ?? "Open project"}
                  <span aria-hidden="true" className="text-[0.7rem]">
                    ↗
                  </span>
                </a>
              ) : (
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.09em] text-zinc-200/80">
                  {linkLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoUIHighlightCard;

autouiRegisterComponentPropsSchema(AutoUIHighlightCard);
