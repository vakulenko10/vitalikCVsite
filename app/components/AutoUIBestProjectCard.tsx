"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

const P = { green: "#A5DD9B", greenLight: "#C5EBAA", orange: "#F2C18D", white: "#ffffff", text: "#1f2937" };

export interface AutoUIBestProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  tags: string[];
  npmUrl?: string;
  repoUrl?: string;
}

const AutoUIBestProjectCard: React.FC<AutoUIBestProjectCardProps> = (props) => {
  const { title, subtitle, description, points, tags, npmUrl, repoUrl } = props;
  return (
    <div className="w-full max-w-xl rounded-2xl border-2 shadow-lg overflow-hidden" style={{ borderColor: P.orange, backgroundColor: P.white }}>
      <div className="px-4 py-3 border-b" style={{ backgroundColor: P.orange, color: P.text }}>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: P.text }}>{description}</p>
        <ul className="space-y-2">
          {points.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm" style={{ color: P.text }}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: P.green }}>{i + 1}</span>
              {point}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: P.greenLight, color: P.text }}>{tag}</span>
          ))}
        </div>
        {(npmUrl || repoUrl) && (
          <div className="flex gap-2 pt-2">
            {npmUrl && <a href={npmUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: P.green }}>View on NPM</a>}
            {repoUrl && <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl text-sm font-semibold border-2" style={{ borderColor: P.green, color: P.text }}>Repository</a>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoUIBestProjectCard;
autouiRegisterComponentPropsSchema(AutoUIBestProjectCard);
