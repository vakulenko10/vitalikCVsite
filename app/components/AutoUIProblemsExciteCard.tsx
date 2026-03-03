"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

const PALETTE = {
  green: "#A5DD9B",
  greenLight: "#C5EBAA",
  yellow: "#F6F193",
  orange: "#F2C18D",
  white: "#ffffff",
  text: "#1f2937",
  textMuted: "#4b5563",
} as const;

export interface AutoUIProblemsExciteCardProps {
  intro?: string;
  points?: string[];
  quote?: string;
}

const DEFAULT_INTRO =
  "I'm excited by problems that expose my weak sides so I can turn them into strengths. I like challenges that force me to learn and to collaborate.";
const DEFAULT_POINTS: string[] = [
  "Finding gaps in my own knowledge so I can systematically improve.",
  "Designing systems that are simple for users but robust under the hood.",
  "Working with others who push me to explain my choices and refine my ideas.",
];
const DEFAULT_QUOTE =
  "The best way to grow is to run toward what you don't yet know.";

const AutoUIProblemsExciteCard: React.FC<AutoUIProblemsExciteCardProps> = (
  props,
) => {
  const intro = props.intro || DEFAULT_INTRO;
  const points = props.points && props.points.length > 0 ? props.points : DEFAULT_POINTS;
  const quote = props.quote || DEFAULT_QUOTE;
  return (
    <div
      className="w-full max-w-xl rounded-2xl border-2 shadow-lg overflow-hidden"
      style={{
        borderColor: PALETTE.greenLight,
        backgroundColor: PALETTE.white,
        boxShadow: `0 10px 40px -10px ${PALETTE.green}40`,
      }}
    >
      <div
        className="px-4 py-3 border-b"
        style={{ backgroundColor: PALETTE.yellow + "99", color: PALETTE.text }}
      >
        <h3 className="text-lg font-bold">What kind of problems excite me</h3>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: PALETTE.text }}>
          {intro}
        </p>
        <ul className="space-y-2">
          {points.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm" style={{ color: PALETTE.text }}>
              <span className="text-[#A5DD9B]">•</span>
              {point}
            </li>
          ))}
        </ul>
        {quote && (
          <blockquote
            className="pl-4 border-l-4 italic text-sm"
            style={{ borderColor: PALETTE.orange, color: PALETTE.textMuted }}
          >
            "{quote}"
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default AutoUIProblemsExciteCard;
autouiRegisterComponentPropsSchema(AutoUIProblemsExciteCard);
