import { ArrowRight, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Hero");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        {/* Dot grid background */}
        <div className="dot-grid absolute inset-0 opacity-60" />

        {/* Gradient orbs */}
        <div
          className="animate-blob absolute -top-40 right-[10%] h-[500px] w-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #818cf8 0%, #6366f1 50%, transparent 70%)",
          }}
        />
        <div
          className="animate-blob animation-delay-2000 absolute bottom-0 left-[5%] h-[400px] w-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #22d3ee 0%, #0891b2 50%, transparent 70%)",
          }}
        />
        <div
          className="animate-blob animation-delay-4000 absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full opacity-8 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #a78bfa 0%, #7c3aed 50%, transparent 70%)",
          }}
        />

        {/* Content */}
        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Available badge */}
            <div className="border-accent/30 bg-accent/10 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-accent text-xs font-medium">{t("badge")}</span>
            </div>

            {/* Greeting */}
            <p className="text-muted mb-2 text-base font-medium md:text-lg">
              {t("greeting")}
            </p>

            {/* Name */}
            <h1 className="mb-6 text-5xl leading-none font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="gradient-text">Nikola</span>
              <br />
              <span className="gradient-text">Buljčik</span>
            </h1>

            {/* Role */}
            <p className="text-foreground/80 mb-4 text-lg font-medium sm:text-xl md:text-2xl">
              {t("role")}
            </p>

            {/* Tech stack */}
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
              <Link href="/#contact">
                <Button size="lg" variant="outline" className="gap-2">
                  <Mail size={16} />
                  {t("cta_contact")}
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="text-muted absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.2em] uppercase">scroll</span>
          <div className="from-muted/60 h-8 w-px bg-gradient-to-b to-transparent" />
        </div>
      </section>

      <section id="about" className="border-border border-t py-32" aria-label="About">
        <Container>
          <p className="text-muted text-center font-mono text-sm">
            {"// about — coming next"}
          </p>
        </Container>
      </section>

      <section
        id="experience"
        className="border-border border-t py-32"
        aria-label="Experience"
      >
        <Container>
          <p className="text-muted text-center font-mono text-sm">
            {"// experience — coming next"}
          </p>
        </Container>
      </section>

      <section
        id="projects"
        className="border-border border-t py-32"
        aria-label="Projects"
      >
        <Container>
          <p className="text-muted text-center font-mono text-sm">
            {"// projects — coming next"}
          </p>
        </Container>
      </section>

      <section id="contact" className="border-border border-t py-32" aria-label="Contact">
        <Container>
          <p className="text-muted text-center font-mono text-sm">
            {"// contact — coming next"}
          </p>
        </Container>
      </section>
    </>
  );
}
