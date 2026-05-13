"use client";

import { useActionState, useEffect, useRef } from "react";
import { MapPin, Clock, Briefcase, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { sendContactForm } from "@/app/actions/contact";
import type { ContactFormState } from "@/app/actions/contact";
import { PERSONAL } from "@/config/personal";
import { cn } from "@/lib/utils";

const NIKOLA_EMAIL = PERSONAL.email;
const NIKOLA_LINKEDIN = PERSONAL.linkedin;
const NIKOLA_GITHUB = PERSONAL.github;

const initialState: ContactFormState = { status: "idle" };

export interface ContactLabels {
  heading: string;
  subheading: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorMsg: string;
  orReachOut: string;
  emailMe: string;
  linkedIn: string;
  github: string;
  locationLabel: string;
  locationValue: string;
  availableLabel: string;
  availableValue: string;
  responseLabel: string;
  responseValue: string;
}

export function ContactForm({ labels }: { labels: ContactLabels }) {
  const [state, formAction, isPending] = useActionState(sendContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
      {/* ── Left: form ──────────────────────────────────────────────── */}
      <div className="lg:col-span-3">
        <p className="text-muted mb-8 text-base leading-relaxed">{labels.subheading}</p>

        {/* Success state */}
        {state.status === "success" && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-400" />
            <div>
              <p className="text-foreground font-semibold">{labels.successTitle}</p>
              <p className="text-muted mt-0.5 text-sm">{labels.successBody}</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {state.status === "error" && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />
            <p className="text-muted text-sm">{labels.errorMsg}</p>
          </div>
        )}

        <form ref={formRef} action={formAction} className="space-y-5" noValidate>
          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label={labels.nameLabel}
              name="name"
              placeholder={labels.namePlaceholder}
            />
            <Field
              label={labels.emailLabel}
              name="email"
              type="email"
              placeholder={labels.emailPlaceholder}
            />
          </div>

          {/* Subject */}
          <Field
            label={labels.subjectLabel}
            name="subject"
            placeholder={labels.subjectPlaceholder}
          />

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-foreground text-sm font-medium" htmlFor="message">
              {labels.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={labels.messagePlaceholder}
              required
              className={cn(
                "border-border bg-card w-full resize-none rounded-xl border px-4 py-3",
                "text-foreground placeholder:text-muted/60 text-sm",
                "focus:border-accent focus:ring-accent/30 transition-colors focus:ring-1 focus:outline-none",
              )}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-7 py-3.5",
              "bg-accent text-sm font-semibold text-white",
              "hover:bg-accent/90 hover:shadow-accent/20 transition-all duration-200 hover:shadow-lg",
              "focus-visible:outline-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {labels.sending}
              </>
            ) : (
              <>
                <Send size={15} />
                {labels.send}
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── Right: info panel ───────────────────────────────────────── */}
      <div className="flex flex-col gap-6 lg:col-span-2">
        {/* Info cards */}
        <InfoCard
          icon={<MapPin size={16} />}
          label={labels.locationLabel}
          value={labels.locationValue}
        />
        <InfoCard
          icon={<Briefcase size={16} />}
          label={labels.availableLabel}
          value={labels.availableValue}
          accent
        />
        <InfoCard
          icon={<Clock size={16} />}
          label={labels.responseLabel}
          value={labels.responseValue}
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <span className="bg-border h-px flex-1" />
          <span className="text-muted text-xs">{labels.orReachOut}</span>
          <span className="bg-border h-px flex-1" />
        </div>

        {/* Social links */}
        <div className="flex flex-col gap-3">
          <SocialLink
            href={`mailto:${NIKOLA_EMAIL}`}
            icon={<EmailIcon />}
            label={labels.emailMe}
            value={NIKOLA_EMAIL}
          />
          <SocialLink
            href={NIKOLA_LINKEDIN}
            icon={<LinkedInIcon />}
            label={labels.linkedIn}
            value="nikola-buljcik"
          />
          <SocialLink
            href={NIKOLA_GITHUB}
            icon={<GitHubIcon />}
            label={labels.github}
            value="Nikolajdza"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Reusable field ─────────────────────────────────────────────── */
function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-foreground text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className={cn(
          "border-border bg-card w-full rounded-xl border px-4 py-3",
          "text-foreground placeholder:text-muted/60 text-sm",
          "focus:border-accent focus:ring-accent/30 transition-colors focus:ring-1 focus:outline-none",
        )}
      />
    </div>
  );
}

/* ── Info card ──────────────────────────────────────────────────── */
function InfoCard({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border-border bg-card flex items-center gap-4 rounded-2xl border p-4">
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          accent ? "bg-accent/15 text-accent" : "bg-muted-bg text-muted",
        )}
      >
        {icon}
      </span>
      <div>
        <p className="text-muted text-xs">{label}</p>
        <p
          className={cn(
            "text-sm font-semibold",
            accent ? "text-accent" : "text-foreground",
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ── Social link ────────────────────────────────────────────────── */
function SocialLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      className={cn(
        "group border-border bg-card flex items-center gap-4 rounded-2xl border p-4",
        "hover:border-accent/40 hover:shadow-accent/5 transition-all duration-200 hover:shadow-md",
      )}
    >
      <span className="bg-muted-bg text-muted group-hover:bg-accent/15 group-hover:text-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-muted text-xs">{label}</p>
        <p className="text-foreground group-hover:text-accent truncate text-sm font-semibold transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}

/* ── SVG brand icons ────────────────────────────────────────────── */
function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.573C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
