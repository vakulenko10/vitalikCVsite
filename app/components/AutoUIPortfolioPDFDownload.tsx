"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

/** PDF portfolio is served from public folder at this path */
const PORTFOLIO_PDF_PATH = "/VakulenkoCV2026.pdf";

export interface AutoUIPortfolioPDFDownloadProps {
  /** Optional heading; defaults to "My portfolio (PDF)". */
  title?: string;
  /** Optional short line under the button. */
  subtitle?: string;
}

const AutoUIPortfolioPDFDownload: React.FC<AutoUIPortfolioPDFDownloadProps> = ({
  title = "My portfolio (PDF)",
  subtitle = "Download or open in a new tab",
}) => {
  return (
    <div className="mt-2 mb-1 w-full rounded-2xl border-2 border-[#A5DD9B] bg-white/95 p-4 shadow-md">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[#A5DD9B]">
        Portfolio
      </p>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      )}
      <a
        href={PORTFOLIO_PDF_PATH}
        target="_blank"
        rel="noopener noreferrer"
        download="VakulenkoCV2026.pdf"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#A5DD9B] bg-[#A5DD9B]/20 px-5 py-3 font-semibold text-gray-900 shadow-sm transition-all hover:bg-[#A5DD9B]/40 hover:scale-[1.02] active:scale-100"
      >
        <svg
          className="h-5 w-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Download portfolio (PDF)
      </a>
    </div>
  );
};

export default AutoUIPortfolioPDFDownload;
autouiRegisterComponentPropsSchema(AutoUIPortfolioPDFDownload);
