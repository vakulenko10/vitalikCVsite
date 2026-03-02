"use client";

import React, { useState } from "react";
import Link from "next/link";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";
import type { PortfolioItemForChat } from "../autouiFunctions";

export interface AutoUIPortfolioListProps {
  /** List of portfolio items (e.g. from fetchPortfolioItems()). */
  items: PortfolioItemForChat[];
  /** Optional section title above the list. */
  title?: string;
}

// Site palette from globals / Sections
const COLORS = {
  bgLight: "#C5EBAA",
  bgGreen: "#A5DD9B",
  bgYellow: "#F6F193",
  bgOrange: "#F2C18D",
  card: "#ffffff",
  text: "#1f2937",
  textMuted: "#4b5563",
} as const;

function PortfolioCard({ item }: { item: PortfolioItemForChat }) {
  const [imgError, setImgError] = useState(false);
  const showImg = item.imageURL && !imgError;

  return (
    <div className="group w-full min-w-0 rounded-2xl bg-gradient-to-r from-[#C5EBAA] via-[#F6F193] to-[#F2C18D] p-[1px] shadow-md hover:shadow-xl transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex flex-col gap-0 rounded-2xl bg-white/95 overflow-hidden">
        <div className="relative w-full min-h-[200px] bg-[#C5EBAA] overflow-hidden">
        {showImg ? (
          <img
            src={item.imageURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-2xl font-semibold text-white"
            style={{ backgroundColor: COLORS.bgGreen }}
          >
            {item.title.charAt(0).toUpperCase()}
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          {item.projectURL && (
            <a
              href={item.projectURL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-white hover:bg-white/20"
              title="View project"
              aria-label="View project"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
            </a>
          )}
          {item.gitHubRepoURL && (
            <a
              href={item.gitHubRepoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-white hover:bg-white/20"
              title="GitHub"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          )}
          <Link
            href={`/projectDescription/${item.id}`}
            className="rounded-full p-2 text-white hover:bg-white/20"
            title="Details"
            aria-label="Project details"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
          </Link>
        </div>
        </div>
        <div className="px-4 py-4 text-left">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 text-xs md:text-sm text-gray-700 leading-snug">
              {item.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-[0.65rem] md:text-xs text-gray-600">
            {item.projectURL && (
              <span className="rounded-full bg-[#C5EBAA]/60 px-3 py-1 uppercase tracking-wide">
                Live project
              </span>
            )}
            {item.gitHubRepoURL && (
              <span className="rounded-full bg-[#A5DD9B]/60 px-3 py-1 uppercase tracking-wide">
                GitHub
              </span>
            )}
            <span className="rounded-full bg-[#F6F193]/70 px-3 py-1 uppercase tracking-wide">
              Portfolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const AutoUIPortfolioList: React.FC<AutoUIPortfolioListProps> = ({
  items,
  title,
}) => {
  if (!items?.length) {
    return (
      <div
        className="rounded-xl p-4 text-center text-sm"
        style={{ backgroundColor: COLORS.bgLight }}
      >
        <p style={{ color: COLORS.textMuted }}>No portfolio items to show.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-4 space-y-3"
      style={{ backgroundColor: COLORS.bgLight }}
    >
      {title && (
        <h2
          className="text-center font-serif text-lg font-semibold"
          style={{ color: COLORS.text }}
        >
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-4 w-full min-w-0">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AutoUIPortfolioList;
autouiRegisterComponentPropsSchema(AutoUIPortfolioList);
