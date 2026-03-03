"use client";

import React from "react";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";

// No props: this component always shows Vitalik's real profiles.
const PALETTE = {
  green: "#A5DD9B",
  greenLight: "#C5EBAA",
  yellow: "#F6F193",
  orange: "#F2C18D",
  white: "#ffffff",
  text: "#1f2937",
};

// Canonical contact details taken from the main site.
const GITHUB_URL = "https://github.com/vakulenko10";
const LINKEDIN_URL = "https://www.linkedin.com/in/vitalik-vakulenko/";
const PHONE_DISPLAY = "+48 514 598 268";
const TEL_HREF = "tel:" + PHONE_DISPLAY.replace(/\s/g, "");
const EMAIL_ADDRESS = "vakulenkoforwork@gmail.com";
const MAILTO_HREF = "mailto:" + EMAIL_ADDRESS;

const AutoUISocialLinks: React.FC = () => {
  const links = [
    { href: GITHUB_URL, label: "GitHub" },
    { href: LINKEDIN_URL, label: "LinkedIn" },
    { href: MAILTO_HREF, label: "Email", display: EMAIL_ADDRESS },
    { href: TEL_HREF, label: "Phone", display: PHONE_DISPLAY },
  ];

  return (
    <div
      className="w-full max-w-md rounded-2xl border-2 shadow-lg overflow-hidden"
      style={{ borderColor: PALETTE.greenLight, backgroundColor: PALETTE.white }}
    >
      <div
        className="px-4 py-3 border-b"
        style={{ backgroundColor: PALETTE.greenLight }}
      >
        <h3
          className="text-sm font-semibold uppercase"
          style={{ color: PALETTE.text }}
        >
          Connect with Vitalik
        </h3>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {links.map(({ href, label, display }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:scale-[1.02] transition-transform"
            style={{
              backgroundColor: PALETTE.yellow + "40",
              color: PALETTE.text,
              border: "2px solid " + PALETTE.orange + "99",
            }}
          >
            <span
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden bg-white"
              style={{ border: "1px solid rgba(15, 23, 42, 0.08)" }}
            >
              {label === "GitHub" && (
                <img
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="GitHub"
                  className="w-7 h-7 object-contain"
                />
              )}
              {label === "LinkedIn" && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              {label === "Phone" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              )}
              {label === "Email" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M22 6l-10 7L2 6"
                  />
                </svg>
              )}
            </span>
            <span className="whitespace-nowrap">{label}</span>
            <span className="ml-auto text-sm opacity-80 truncate max-w-[200px]">
              {display ?? href.replace(/^https?:\/\//, "").split("/")[0]}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AutoUISocialLinks;
autouiRegisterComponentPropsSchema(AutoUISocialLinks);
