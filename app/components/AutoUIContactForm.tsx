"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { autouiRegisterComponentPropsSchema } from "@autoai-ui/autoui";
import { CONTACT_FORM_SUCCESS_EVENT } from "./ContactSuccessOverlay";

const PALETTE = {
  green: "#A5DD9B",
  greenLight: "#C5EBAA",
  yellow: "#F6F193",
  orange: "#F2C18D",
  white: "#ffffff",
  text: "#1f2937",
  textMuted: "#4b5563",
};

const DESCRIPTION_MAX = 1000;

const contactFormSchema = z
  .object({
    name: z.string().min(1, "Name is required.").transform((s) => s.trim()),
    linkedin: z.string().transform((s) => (s ?? "").trim()),
    email: z
      .union([z.string().email("Invalid email."), z.literal("")])
      .transform((s) => (s === "" ? undefined : s.trim())),
    phone: z.string().optional().transform((s) => (s?.trim() || undefined)),
    otherContacts: z.string().optional().transform((s) => (s?.trim() || undefined)),
    description: z
      .string()
      .min(1, "Message is required.")
      .max(DESCRIPTION_MAX, `Message must be at most ${DESCRIPTION_MAX} characters.`)
      .transform((s) => s.trim()),
  })
  .refine((data) => data.linkedin.length > 0 || (data.email?.length ?? 0) > 0, {
    message: "Please provide at least one way to contact you: LinkedIn or Email.",
    path: ["linkedin"],
  });

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  linkedin: "",
  email: "",
  phone: "",
  otherContacts: "",
  description: "",
};

const inputStyle = {
  borderColor: PALETTE.greenLight,
  backgroundColor: `${PALETTE.greenLight}20`,
};

export interface AutoUIContactFormProps {
  /** Optional title above the form */
  title?: string;
}

const AutoUIContactForm: React.FC<AutoUIContactFormProps> = ({
  title = "Contact Vitalik",
}) => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "error" | "alreadySent">("idle");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const descriptionValue = watch("description", "");
  const descCount = descriptionValue.length;
  const descOver = descCount > DESCRIPTION_MAX;

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError("");
    setSubmitStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          linkedin: data.linkedin || undefined,
          email: data.email || undefined,
          phone: data.phone,
          otherContacts: data.otherContacts,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitStatus("error");
        setSubmitError(result.error ?? "Failed to send. Please try again.");
        return;
      }
      setSubmitStatus("alreadySent");
      reset(defaultValues);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(CONTACT_FORM_SUCCESS_EVENT));
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError("Network error. Please try again.");
    }
  };

  if (submitStatus === "alreadySent") {
    return (
      <div
        className="w-full max-w-md rounded-2xl border-2 shadow-lg overflow-hidden p-4"
        style={{
          borderColor: PALETTE.greenLight,
          backgroundColor: PALETTE.white,
          boxShadow: `0 10px 40px -10px ${PALETTE.green}40`,
        }}
      >
        <p
          className="text-sm rounded-lg px-3 py-2 text-center"
          style={{
            backgroundColor: `${PALETTE.green}40`,
            color: PALETTE.text,
          }}
        >
          You have already sent the message to the email.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-md rounded-2xl border-2 shadow-lg overflow-hidden"
      style={{
        borderColor: PALETTE.greenLight,
        backgroundColor: PALETTE.white,
        boxShadow: `0 10px 40px -10px ${PALETTE.green}40`,
      }}
    >
      <div
        className="px-4 py-3 border-b"
        style={{
          background: `linear-gradient(135deg, ${PALETTE.green} 0%, ${PALETTE.greenLight} 100%)`,
          color: PALETTE.white,
        }}
      >
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm opacity-90 mt-0.5">
          Your message will be sent to Vitalik’s inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.text }}>
            Your name <span style={{ color: PALETTE.orange }}>*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="e.g. Jane Doe"
            className="w-full px-3 py-2.5 rounded-xl border-2 focus:outline-none focus:ring-2 transition-colors"
            style={{
              ...inputStyle,
              ...(errors.name ? { borderColor: PALETTE.orange } : {}),
            }}
          />
          {errors.name && (
            <p className="text-xs mt-1" style={{ color: PALETTE.orange }}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.text }}>
            LinkedIn <span style={{ color: PALETTE.textMuted, fontWeight: 400 }}>(or Email below)</span>
          </label>
          <input
            {...register("linkedin")}
            type="url"
            placeholder="https://linkedin.com/in/..."
            className="w-full px-3 py-2.5 rounded-xl border-2 focus:outline-none focus:ring-2 transition-colors"
            style={{
              ...inputStyle,
              ...(errors.linkedin ? { borderColor: PALETTE.orange } : {}),
            }}
          />
          {errors.linkedin && (
            <p className="text-xs mt-1" style={{ color: PALETTE.orange }}>
              {errors.linkedin.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.text }}>
            Email <span style={{ color: PALETTE.textMuted, fontWeight: 400 }}>(or LinkedIn above)</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 rounded-xl border-2 focus:outline-none focus:ring-2 transition-colors"
            style={{
              ...inputStyle,
              ...(errors.email ? { borderColor: PALETTE.orange } : {}),
            }}
          />
          {errors.email && (
            <p className="text-xs mt-1" style={{ color: PALETTE.orange }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.text }}>
            Phone <span style={{ color: PALETTE.textMuted, fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+1 234 567 8900"
            className="w-full px-3 py-2.5 rounded-xl border-2 focus:outline-none focus:ring-2 transition-colors"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.text }}>
            Other contacts
          </label>
          <input
            {...register("otherContacts")}
            type="text"
            placeholder="e.g. Telegram, Twitter..."
            className="w-full px-3 py-2.5 rounded-xl border-2 focus:outline-none focus:ring-2 transition-colors"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.text }}>
            Message <span style={{ color: PALETTE.orange }}>*</span>
          </label>
          <textarea
            {...register("description", {
              setValueAs: (v: string) => (v.length > DESCRIPTION_MAX ? v.slice(0, DESCRIPTION_MAX) : v),
            })}
            placeholder="Write your message here..."
            rows={5}
            className="w-full px-3 py-2.5 rounded-xl border-2 focus:outline-none focus:ring-2 transition-colors resize-y min-h-[100px]"
            style={{
              ...inputStyle,
              ...(descOver || errors.description ? { borderColor: PALETTE.orange } : {}),
            }}
          />
          <p
            className="text-xs mt-1"
            style={{ color: descOver || errors.description ? PALETTE.orange : PALETTE.textMuted }}
          >
            {descCount} / {DESCRIPTION_MAX} characters
          </p>
          {errors.description && (
            <p className="text-xs mt-1" style={{ color: PALETTE.orange }}>
              {errors.description.message}
            </p>
          )}
        </div>

        {submitStatus === "error" && submitError && (
          <p
            className="text-sm rounded-lg px-3 py-2"
            style={{
              backgroundColor: `${PALETTE.orange}30`,
              color: PALETTE.text,
            }}
          >
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
          style={{
            backgroundColor: PALETTE.green,
            boxShadow: `0 2px 8px ${PALETTE.green}60`,
          }}
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default AutoUIContactForm;
autouiRegisterComponentPropsSchema(AutoUIContactForm);
