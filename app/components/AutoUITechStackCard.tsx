"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

const P = { greenLight: "#C5EBAA", yellow: "#F6F193", white: "#ffffff", text: "#1f2937", textMuted: "#4b5563" };

// All props are optional so the AI can render this component
// even if it forgot to call getTechStackAndGoals(). We fall
// back to a canonical definition that matches autouiFunctions.ts.
export interface AutoUITechStackCardProps {
  techStack?: string[];
  interests?: string[];
  oopNote?: string;
  openTo?: string;
  devOpsNote?: string;
}

const DEFAULT_TECH_STACK = ["JavaScript", "TypeScript", "React", "Next.js"];
const DEFAULT_INTERESTS = [
  "AI integrations",
  "Generative UI",
  "OOP languages (C#, Java, C++) — already strong in OOP, eager to go deeper.",
];
const DEFAULT_OOP_NOTE =
  "I'm already really good at OOP and would love to work more with C#, Java, or C++.";
const DEFAULT_OPEN_TO = "I'm open to any kind of propositions.";
const DEFAULT_DEVOPS_NOTE =
  "I would also like to study DevOps and CI/CD in depth.";

const AutoUITechStackCard: React.FC<AutoUITechStackCardProps> = (props) => {
  const techStack = (props.techStack && props.techStack.length > 0)
    ? props.techStack
    : DEFAULT_TECH_STACK;
  const interests = (props.interests && props.interests.length > 0)
    ? props.interests
    : DEFAULT_INTERESTS;
  const oopNote = props.oopNote || DEFAULT_OOP_NOTE;
  const openTo = props.openTo || DEFAULT_OPEN_TO;
  const devOpsNote = props.devOpsNote || DEFAULT_DEVOPS_NOTE;
  return (
    <div className="w-full max-w-xl rounded-2xl border-2 shadow-lg overflow-hidden" style={{ borderColor: P.greenLight, backgroundColor: P.white }}>
      <div className="px-4 py-3 border-b" style={{ backgroundColor: P.greenLight, color: P.text }}>
        <h3 className="text-lg font-bold">Tech stack and goals</h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2" style={{ color: P.text }}>Current stack</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ backgroundColor: P.yellow + "80", color: P.text }}>{t}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2" style={{ color: P.text }}>Interested in</h4>
          <ul className="list-disc list-inside text-sm space-y-1" style={{ color: P.textMuted }}>
            {interests.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <p className="text-sm" style={{ color: P.text }}>{oopNote}</p>
        <p className="text-sm font-medium" style={{ color: P.text }}>{openTo}</p>
        <p className="text-sm" style={{ color: P.text }}>{devOpsNote}</p>
      </div>
    </div>
  );
};

export default AutoUITechStackCard;
autouiRegisterComponentPropsSchema(AutoUITechStackCard);
