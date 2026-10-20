import { ArrowRight, Download, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroCodeCard } from "@/components/HeroCodeCard";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PERSONAL } from "@/config/personal";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Hero");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        <Container className="relative z-10 py-24">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[3fr_2fr]">
            <div>
              <div className="border-accent/40 bg-accent/10 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-[0_0_24px_rgba(129,140,248,0.15)] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="text-accent text-xs font-medium">{t("badge")}</span>
              </div>

              <p className="text-muted mb-2 text-base font-medium md:text-lg">
                {t("greeting")}
              </p>

              <h1 className="mb-6 text-5xl leading-none font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="gradient-text drop-shadow-[0_0_40px_rgba(129,140,248,0.25)]">
                  Nikola
                </span>
                <br />
                <span className="gradient-text drop-shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                  Buljčik
                </span>
              </h1>

              {/* Role */}
              <p className="text-foreground/80 mb-4 text-lg font-medium sm:text-xl md:text-2xl">
                {t("role")}
              </p>

              {/* Stack */}
              <p className="text-muted mb-10 font-mono text-sm tracking-wider md:text-base">
                {t("stack")}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link href="/#projects">
                  <Button size="lg" variant="primary" className="group gap-2">
                    {t("cta_projects")}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Button>
                </Link>
                <a href={PERSONAL.cvUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Download size={16} />
                    {t("cta_cv")}
                  </Button>
                </a>
                <Link href="/#contact">
                  <Button size="lg" variant="ghost" className="gap-2">
                    <Mail size={16} />
                    {t("cta_contact")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* ── Right: code card (hidden on small screens) ─────── */}
            <div className="hidden lg:flex lg:justify-end">
              <HeroCodeCard />
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="text-muted absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.2em] uppercase">scroll</span>
          <div className="from-muted/60 h-8 w-px bg-gradient-to-b to-transparent" />
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <div className="section-divider" />
      <AboutSection />

      {/* ── Experience ───────────────────────────────────────────────── */}
      <div className="section-divider" />
      <ExperienceSection />

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <div className="section-divider" />
      <ProjectsSection />

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <div className="section-divider" />
      <ContactSection />
    </>
  );
}
