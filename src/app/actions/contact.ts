"use server";

import { Resend } from "resend";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const OWNER_EMAIL = "nikolajdza@gmail.com";

export async function sendContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return { status: "error" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error" };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // If no API key, log in dev and return success (graceful fallback)
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("[contact form] RESEND_API_KEY not set — logging submission:");
      console.log({ name, email, subject, message });
    }
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      // Use Resend's shared domain until you verify your own domain
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `New message from your portfolio contact form`,
        ``,
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    if (error) return { status: "error" };
    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
