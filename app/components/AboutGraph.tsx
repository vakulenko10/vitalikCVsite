"use client";

import React, { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OVERLAY_GREEN = "#A5DD9B";

interface AboutGraphProps {
  sectionData: Record<string, unknown>[];
  sectionName?: string;
}

function getTitle(item: Record<string, unknown>): string {
  const key = Object.keys(item).find((k) => k.includes("Title"));
  return key ? String(item[key] ?? "") : "";
}

function getDescription(item: Record<string, unknown>): string {
  const key = Object.keys(item).find((k) => k.includes("Description"));
  return key ? String(item[key] ?? "") : "";
}

function getImageUrl(item: Record<string, unknown>): string | undefined {
  const url = item["imageURL"];
  return typeof url === "string" && url ? url : undefined;
}

const AboutGraph = React.memo(function AboutGraph({ sectionData }: AboutGraphProps) {
  const items = useMemo(() => {
    return sectionData
      .map((item) => ({
        title: getTitle(item),
        description: getDescription(item),
        imageURL: getImageUrl(item),
      }))
      .filter((i) => i.title || i.description || i.imageURL);
  }, [sectionData]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeOverlay = useCallback(() => setActiveIndex(null), []);

  if (!items.length) return null;

  return (
    <div className="about-graph flex flex-col flex-1 min-h-0 w-full relative py-6 sm:py-8 md:py-10 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center min-h-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 justify-items-center items-start content-center">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.button
                key={index}
                type="button"
                className="group flex flex-col items-center justify-center gap-2 sm:gap-2.5 w-full max-w-[180px] min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 rounded-full touch-manipulation mx-auto"
                onClick={() => setActiveIndex(isActive ? null : index)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
                aria-expanded={isActive}
                aria-haspopup="dialog"
                aria-label={item.title ? `${item.title}. Click for details.` : "View details"}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center bg-white/40 backdrop-blur-md border border-white/50 p-2 sm:p-2.5 md:p-3 transition-shadow duration-200 shadow-[0_6px_28px_rgba(255,255,255,0.5)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.6)] flex-shrink-0">
                  {item.imageURL ? (
                    <img
                      src={item.imageURL}
                      alt=""
                      className="w-full h-full object-contain"
                      draggable={false}
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-white/70 text-lg sm:text-xl font-medium">
                      {item.title.charAt(0) || "?"}
                    </span>
                  )}
                </div>
                <span className="text-white text-xs sm:text-sm font-medium text-center leading-tight drop-shadow-sm line-clamp-2 break-words w-full min-w-0 px-0.5">
                  {item.title}
                </span>
                <span className="text-white/80 text-[10px] sm:text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                  Click to view details
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && items[activeIndex] && (
          <motion.div
            key="about-overlay"
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={closeOverlay}
            aria-hidden
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden />
            <motion.dialog
              open
              className="relative z-50 w-full max-w-2xl rounded-2xl border-2 bg-white shadow-xl p-6 sm:p-8 text-left outline-none max-h-[85vh] overflow-y-auto"
              style={{
                borderColor: OVERLAY_GREEN,
                boxShadow: "0 20px 60px -15px rgba(0,0,0,0.2)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClose={closeOverlay}
              onClick={(e) => e.stopPropagation()}
              aria-labelledby="about-overlay-title"
              aria-describedby="about-overlay-desc"
            >
              <h2
                id="about-overlay-title"
                className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 pr-10"
              >
                {items[activeIndex].title}
              </h2>
              <p
                id="about-overlay-desc"
                className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap"
              >
                {items[activeIndex].description}
              </p>
              <button
                type="button"
                onClick={closeOverlay}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-xl font-medium text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                aria-label="Close"
              >
                ×
              </button>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default AboutGraph;
