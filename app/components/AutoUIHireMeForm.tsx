"use client";

import React, { useState, useCallback } from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

const EVENT_ASK = "autoui-ask";
const P = { green: "#A5DD9B", greenLight: "#C5EBAA", orange: "#F2C18D", white: "#ffffff", text: "#1f2937" };

export interface AutoUIHireMeFormProps {
  /** Optional title above the form */
  title?: string;
}

const AutoUIHireMeForm: React.FC<AutoUIHireMeFormProps> = ({ title = "Why hire Vitalik for your company?" }) => {
  const [company, setCompany] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [extra, setExtra] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const companyTrim = company.trim();
      if (!companyTrim) return;
      const parts: string[] = ["We are " + companyTrim + "."];
      if (companyDescription.trim()) parts.push("What we do: " + companyDescription.trim() + ".");
      if (extra.trim()) parts.push(extra.trim());
      parts.push("Why should you hire Vitalik for this company?");
      const message = parts.join(" ");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(EVENT_ASK, { detail: { text: message } }));
      }
      setCompany("");
      setCompanyDescription("");
      setExtra("");
    },
    [company, companyDescription, extra]
  );

  return (
    <div className="w-full max-w-md rounded-2xl border-2 shadow-lg overflow-hidden" style={{ borderColor: P.greenLight, backgroundColor: P.white }}>
      <div className="px-4 py-3 border-b" style={{ backgroundColor: P.greenLight }}>
        <h3 className="text-sm font-semibold" style={{ color: P.text }}>{title}</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: P.text }}>
            Company name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Inc."
            required
            className="w-full px-3 py-2 rounded-xl border-2 focus:outline-none focus:ring-2"
            style={{ borderColor: P.green + "80" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: P.text }}>
            Describe shortly what your company does <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <textarea
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            placeholder="e.g. We build SaaS for healthcare..."
            rows={2}
            className="w-full px-3 py-2 rounded-xl border-2 focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: P.green + "60" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: P.text }}>
            Anything else for context <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder="e.g. We value ownership and learning"
            className="w-full px-3 py-2 rounded-xl border-2 focus:outline-none focus:ring-2"
            style={{ borderColor: P.green + "60" }}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-95 active:scale-[0.99]"
          style={{ backgroundColor: P.green }}
        >
          Get a tailored answer
        </button>
      </form>
    </div>
  );
};

export default AutoUIHireMeForm;
autouiRegisterComponentPropsSchema(AutoUIHireMeForm);
