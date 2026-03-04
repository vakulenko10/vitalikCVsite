import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "vakulenkoforwork@gmail.com";
const resend = new Resend(process.env.RESEND_API_KEY);

/*
 * RESEND RULE (why you saw that error):
 * - Your Resend account is tied to vsesvit.vip@gmail.com.
 * - In "testing" mode (no verified domain), Resend only allows sending TO that
 *   same address. So you cannot send TO vakulenkoforwork@gmail.com with Resend
 *   until you either:
 *   (a) Verify a domain at resend.com/domains and send FROM an address on that
 *       domain (then you can send to any recipient, including vakulenkoforwork@gmail.com),
 *   OR
 *   (b) Use Formspree instead (see FORMSPREE_FORM_ID below) — no domain needed,
 *       and you choose the recipient (vakulenkoforwork@gmail.com) in Formspree's dashboard.
 */

function buildHtmlEmail(data: {
  name: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  otherContacts?: string;
  description: string;
}) {
  const green = "#A5DD9B";
  const greenLight = "#C5EBAA";
  const text = "#1f2937";
  const textMuted = "#4b5563";

  const rows: string[] = [];
  if (data.linkedin?.trim())
    rows.push(`<tr><td style="padding:8px 0;color:${textMuted};font-size:14px;">LinkedIn</td><td style="padding:8px 0;color:${text};"><a href="${data.linkedin.trim()}" style="color:${green};text-decoration:none;">${data.linkedin.trim()}</a></td></tr>`);
  if (data.email?.trim())
    rows.push(`<tr><td style="padding:8px 0;color:${textMuted};font-size:14px;">Email</td><td style="padding:8px 0;color:${text};"><a href="mailto:${data.email.trim()}" style="color:${green};text-decoration:none;">${data.email.trim()}</a></td></tr>`);
  if (data.phone?.trim())
    rows.push(`<tr><td style="padding:8px 0;color:${textMuted};font-size:14px;">Phone</td><td style="padding:8px 0;color:${text};">${escapeHtml(data.phone.trim())}</td></tr>`);
  if (data.otherContacts?.trim())
    rows.push(`<tr><td style="padding:8px 0;color:${textMuted};font-size:14px;">Other</td><td style="padding:8px 0;color:${text};">${escapeHtml(data.otherContacts.trim())}</td></tr>`);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:${greenLight}40;">
  <div style="max-width:560px;margin:24px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px -10px ${green}60;">
    <div style="background:linear-gradient(135deg, ${green} 0%, ${greenLight} 100%);padding:24px 28px;">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">New contact from your portfolio</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Someone reached out via the contact form.</p>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:${textMuted};font-size:14px;width:120px;">Name</td>
          <td style="padding:8px 0;color:${text};font-size:16px;font-weight:600;">${escapeHtml(data.name)}</td>
        </tr>
        ${rows.join("")}
      </table>
      <div style="margin-top:24px;padding-top:24px;border-top:2px solid ${greenLight};">
        <div style="color:${textMuted};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Message</div>
        <div style="color:${text};font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.description)}</div>
      </div>
    </div>
    <div style="background:${greenLight}40;padding:16px 28px;text-align:center;">
      <span style="color:${textMuted};font-size:12px;">Sent from your portfolio site</span>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const linkedin = typeof body.linkedin === "string" ? body.linkedin.trim() : undefined;
    const email = typeof body.email === "string" ? body.email.trim() : undefined;
    const phone = typeof body.phone === "string" ? body.phone.trim() : undefined;
    const otherContacts = typeof body.otherContacts === "string" ? body.otherContacts.trim() : undefined;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required." },
        { status: 400 }
      );
    }
    const hasContact = (linkedin && linkedin.length > 0) || (email && email.length > 0);
    if (!hasContact) {
      return NextResponse.json(
        { error: "Please provide at least one way to contact you: LinkedIn or Email." },
        { status: 400 }
      );
    }

    if (description.length > 1000) {
      return NextResponse.json(
        { error: "Description must be at most 1000 characters." },
        { status: 400 }
      );
    }

    const formspreeId = process.env.FORMSPREE_FORM_ID;

    // Option 1: Formspree — no domain verification; you set recipient (vakulenkoforwork@gmail.com) in Formspree dashboard
    if (formspreeId) {
      const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          linkedin: linkedin || "",
          email: email || "",
          phone: phone || "",
          otherContacts: otherContacts || "",
          _subject: `Portfolio contact from ${name}`,
        }),
      });
      if (!formspreeRes.ok) {
        const err = await formspreeRes.text();
        console.error("Formspree error:", err);
        return NextResponse.json(
          { error: "Failed to send message. Please try again." },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true });
    }

    // Option 2: Resend — requires verified domain to send to vakulenkoforwork@gmail.com (see comment at top)
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email is not configured. Set FORMSPREE_FORM_ID or RESEND_API_KEY in .env.local (see .env.example)." },
        { status: 500 }
      );
    }

    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const { error } = await resend.emails.send({
      from: typeof process.env.RESEND_FROM_NAME === "string"
        ? `${process.env.RESEND_FROM_NAME} <${from}>`
        : `Portfolio Contact <${from}>`,
      to: [TO_EMAIL],
      subject: `Portfolio contact from ${name}`,
      html: buildHtmlEmail({
        name,
        linkedin: linkedin || undefined,
        email: email || undefined,
        phone: phone || undefined,
        otherContacts: otherContacts || undefined,
        description,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
