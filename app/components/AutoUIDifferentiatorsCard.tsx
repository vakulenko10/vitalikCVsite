"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

const PALETTE = {
  green: "#A5DD9B",
  greenLight: "#C5EBAA",
  orange: "#F2C18D",
  white: "#ffffff",
  text: "#1f2937",
} as const;

export interface AutoUIDifferentiatorsCardProps {
  points?: string[];
}

const DEFAULT_POINTS: string[] = [
  "I combine product thinking with code: I don't just implement specs — I propose ideas (like AutoUI) and break them into deliverable tasks.",
  "I care about ownership: from planning sprints to shipping on NPM, I take responsibility for outcomes.",
  "I'm comfortable in both front-end and conceptual work (architecture, APIs, generative UI), and I keep learning (AI, DevOps, CI/CD).",
  "I work well in teams: I've led small teams, divided work clearly, and shipped a real library with friends.",
];

const AutoUIDifferentiatorsCard: React.FC<AutoUIDifferentiatorsCardProps> = ({
  points,
}) => {
  const safePoints = points && points.length > 0 ? points : DEFAULT_POINTS;
  return (
    <div
      className="w-full max-w-xl rounded-2xl border-2 shadow-lg overflow-hidden"
      style={{
        borderColor: PALETTE.green,
        backgroundColor: PALETTE.white,
        boxShadow: "0 10px 40px -10px rgba(165,221,155,0.4)",
      }}
    >
      <div className="px-4 py-3 border-b" style={{ backgroundColor: PALETTE.green, color: PALETTE.white }}>
        <h3 className="text-lg font-bold">What makes Vitalik different</h3>
      </div>
      <div className="p-4 space-y-3">
        {safePoints.map((point, i) => (
          <div
            key={i}
            className="flex gap-3 px-3 py-2 rounded-xl text-sm"
            style={{ backgroundColor: PALETTE.greenLight + "50", color: PALETTE.text }}
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: PALETTE.orange }}>{i + 1}</span>
            {point}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoUIDifferentiatorsCard;
autouiRegisterComponentPropsSchema(AutoUIDifferentiatorsCard);
