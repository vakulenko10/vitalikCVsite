"use client";

import React, { useState } from "react";
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
  /** Optional image URL (e.g. project thumbnail). Shows above content when provided. */
  imageURL?: string;
}

// Site palette – same as portfolio section
const PALETTE = {
  green: "#A5DD9B",
  greenLight: "#C5EBAA",
  yellow: "#F6F193",
  orange: "#F2C18D",
  white: "#ffffff",
  text: "#1f2937",
  textMuted: "#4b5563",
} as const;

const AutoUIHighlightCard: React.FC<AutoUIHighlightCardProps> = ({
  title: titleProp,
  subtitle,
  description,
  tags = [],
  tone = "primary",
  linkLabel,
  linkHref,
  imageURL,
}) => {
  const title = titleProp ?? "Portfolio highlight";
  const [imgError, setImgError] = useState(false);
  const showImage = imageURL && !imgError;

  const isMuted = tone === "muted";

  return (
    <div
      className="group w-full max-w-xl overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{
        borderColor: isMuted ? "#e5e7eb" : PALETTE.greenLight,
        backgroundColor: isMuted ? "#f9fafb" : PALETTE.white,
        boxShadow: isMuted
          ? "0 4px 6px -1px rgb(0 0 0 / 0.07)"
          : `0 10px 40px -10px ${PALETTE.green}40, 0 0 0 1px ${PALETTE.greenLight}60`,
      }}
    >
      {/* Optional hero image – full width, fixed aspect */}
      {showImage && (
        <div className="relative w-full aspect-video overflow-hidden bg-[#C5EBAA]">
          <img
            src={imageURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            onError={() => setImgError(true)}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to top, ${PALETTE.greenLight}99 0%, transparent 50%)`,
            }}
          />
        </div>
      )}

      <div className="p-4 sm:p-5">
        {/* Top row: accent + title */}
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-inner"
            style={{
              backgroundColor: isMuted ? "#9ca3af" : PALETTE.green,
              boxShadow: isMuted ? undefined : `inset 0 1px 0 ${PALETTE.greenLight}, 0 2px 4px ${PALETTE.green}40`,
            }}
          >
            {title.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-serif text-lg font-semibold leading-tight"
              style={{ color: PALETTE.text }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                className="mt-0.5 text-sm font-medium"
                style={{ color: PALETTE.textMuted }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {description && (
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            {description}
          </p>
        )}

        {/* Tags */}
        {(tags.length > 0 || !isMuted) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide"
                style={{
                  backgroundColor: isMuted ? "#e5e7eb" : `${PALETTE.greenLight}99`,
                  color: isMuted ? PALETTE.textMuted : PALETTE.text,
                  border: isMuted ? "none" : `1px solid ${PALETTE.green}60`,
                }}
              >
                {tag}
              </span>
            ))}
            {!isMuted && tags.length === 0 && (
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide"
                style={{
                  backgroundColor: `${PALETTE.yellow}99`,
                  color: PALETTE.text,
                  border: `1px solid ${PALETTE.orange}80`,
                }}
              >
                Portfolio
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        {(linkLabel || linkHref) && (
          <div className="mt-4">
            {linkHref ? (
              <a
                href={linkHref}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: PALETTE.green,
                  boxShadow: `0 2px 8px ${PALETTE.green}60`,
                }}
              >
                {linkLabel ?? "Open project"}
                <span aria-hidden className="text-base leading-none">→</span>
              </a>
            ) : (
              <span
                className="text-sm font-medium"
                style={{ color: PALETTE.textMuted }}
              >
                {linkLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoUIHighlightCard;
autouiRegisterComponentPropsSchema(AutoUIHighlightCard);
