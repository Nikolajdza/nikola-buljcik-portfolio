import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const t = await getTranslations({ locale, namespace: "CaseStudies" });
  const title = `${study.title} — Nikola Buljčik`;
  const description = t(`${study.contentKey}.tagline` as Parameters<typeof t>[0]);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: study.image }],
      type: "article",
      locale,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = getCaseStudy(slug);
  if (!study) notFound();

  const t = await getTranslations("CaseStudies");
  const ui = await getTranslations("CaseStudy");
  const key = study.contentKey;

  const problem = t(`${key}.problem` as Parameters<typeof t>[0]);
  const approach = t(`${key}.approach` as Parameters<typeof t>[0]);
  const outcome = t(`${key}.outcome` as Parameters<typeof t>[0]);
  const tagline = t(`${key}.tagline` as Parameters<typeof t>[0]);
  const highlights = [0, 1, 2].map((i) =>
    t(`${key}.highlight_${i}` as Parameters<typeof t>[0]),
  );

  return (
    <article className="pb-28">
      <Container size="md" className="pt-10">
        <FadeIn>
          <Link
            href="/#projects"
            className="text-muted hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            {ui("back")}
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="text-accent mb-3 font-mono text-xs tracking-widest uppercase">
            {ui("label")} · {study.year}
          </p>
          <h1 className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {study.title}
          </h1>
          <p className="text-muted mb-8 max-w-2xl text-base leading-relaxed sm:text-lg">
            {tagline}
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            {study.demoUrl && (
              <a
                href={study.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-fg hover:bg-accent/90 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} />
                {ui("liveDemo")}
              </a>
            )}
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-foreground hover:border-accent/40 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
            >
              {ui("viewCode")}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className={cn(
              "border-border relative mb-12 overflow-hidden rounded-2xl border bg-gradient-to-br",
              study.gradient,
            )}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <ul className="border-border bg-card mb-12 grid gap-4 rounded-2xl border p-6 sm:grid-cols-3">
            {highlights.map((item) => (
              <li key={item} className="text-muted text-sm leading-relaxed">
                <span className="bg-accent mb-2 block h-1 w-8 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="space-y-10">
          <FadeIn delay={0.14}>
            <Section title={ui("problem")}>{problem}</Section>
          </FadeIn>
          <FadeIn delay={0.16}>
            <Section title={ui("approach")}>{approach}</Section>
          </FadeIn>
          <FadeIn delay={0.18}>
            <Section title={ui("outcome")}>{outcome}</Section>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-foreground mb-4 text-lg font-semibold">
                {ui("stack")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-border/70 bg-muted-bg text-muted rounded-md border px-2.5 py-1 font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </article>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h2 className="text-foreground mb-3 text-lg font-semibold">{title}</h2>
      <p className="text-muted text-sm leading-relaxed sm:text-base">{children}</p>
    </section>
  );
}
