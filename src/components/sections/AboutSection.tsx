import { Mail, MapPin } from "lucide-react";
import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { skillCategories } from "@/data/skills";

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.573C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface SocialItem {
  label: string;
  href: string;
  Icon: ComponentType<{ size?: number }>;
}

const SOCIALS: SocialItem[] = [
  { label: "GitHub", href: "https://github.com/nikolajdza", Icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikola-buljcik-4aab65205",
    Icon: LinkedInIcon,
  },
  { label: "Email", href: "mailto:nikolajdza@gmail.com", Icon: Mail },
];

export async function AboutSection() {
  const t = await getTranslations("About");

  const skillLabelMap: Record<string, string> = {
    frontend: t("skillFrontend"),
    mobile: t("skillMobile"),
    backend: t("skillBackend"),
    tools: t("skillTools"),
  };

  return (
    <section id="about" className="py-28">
      <Container>
        <SectionHeader index="01" label={t("label")} heading={t("heading")} />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_340px]">
          {/* ── Left: bio + facts + skills ──────────────────────────── */}
          <div className="flex flex-col gap-10">
            <p className="text-foreground/80 max-w-prose text-lg leading-relaxed">
              {t("bio")}
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Fact
                icon={<MapPin size={15} />}
                label={t("locationLabel")}
                value={t("locationValue")}
              />
              <Fact label={t("availabilityLabel")} value={t("availabilityValue")} dot />
              <Fact label={t("experienceLabel")} value={t("experienceValue")} />
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-border text-muted hover:border-accent/50 hover:text-foreground flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors"
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-5">
              <h3 className="text-foreground font-semibold">{t("skillsHeading")}</h3>
              <div className="space-y-4">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <p className="text-muted mb-2 font-mono text-[10px] tracking-widest uppercase">
                      {skillLabelMap[cat.id]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border-border bg-card text-foreground/80 hover:border-accent/40 hover:text-accent rounded-lg border px-3 py-1 text-xs font-medium transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: photo placeholder ─────────────────────────────── */}
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <div
              className="relative w-full max-w-[280px] overflow-hidden rounded-2xl lg:max-w-full"
              style={{ aspectRatio: "3 / 4" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(129,140,248,0.15) 0%, rgba(24,24,27,0.8) 50%, rgba(34,211,238,0.1) 100%)",
                }}
              />
              <div className="dot-grid absolute inset-0 opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="gradient-text text-8xl font-black select-none">NB</span>
              </div>
              <div className="border-accent/20 absolute inset-0 rounded-2xl border" />
              <div className="absolute right-0 bottom-4 left-0 flex justify-center">
                <span className="border-border/60 bg-card/80 text-muted rounded-full border px-3 py-1 font-mono text-[10px] backdrop-blur-sm">
                  {t("photoAlt")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Fact({
  icon,
  label,
  value,
  dot,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  dot?: boolean;
}) {
  return (
    <div className="border-border bg-card rounded-xl border p-4">
      <p className="text-muted mb-1 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
        {icon}
        {label}
      </p>
      <p className="text-foreground flex items-center gap-2 text-sm font-medium">
        {dot && (
          <span
            className="inline-flex h-2 w-2 rounded-full bg-green-400"
            aria-hidden="true"
          />
        )}
        {value}
      </p>
    </div>
  );
}
