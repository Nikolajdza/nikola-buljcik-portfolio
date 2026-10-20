import Image from "next/image";
import { ExternalLink, Lock, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/data/projects";
import type { FeaturedProject } from "@/data/projects";
import { getCaseStudyByRepo } from "@/data/case-studies";
import { getGitHubRepos, LANGUAGE_COLORS } from "@/lib/github";
import type { GitHubRepo } from "@/lib/github";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "Nikolajdza";

export async function ProjectsSection() {
  const t = await getTranslations("Projects");
  const repos = await getGitHubRepos(GITHUB_USERNAME);

  return (
    <section id="projects" className="py-28">
      <Container>
        <FadeIn>
          <SectionHeader index="03" label={t("label")} heading={t("heading")} />
        </FadeIn>

        {/* ── Featured work ────────────────────────────────────────── */}
        <div className="mb-20">
          <FadeIn delay={0.05}>
            <SubHeading>
              <Lock size={15} className="text-accent" />
              {t("featuredHeading")}
              <span className="border-border text-muted ml-2 rounded-full border px-2.5 py-0.5 font-mono text-[10px]">
                {t("featuredNote")}
              </span>
            </SubHeading>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <FadeInItem key={project.id}>
                <FeaturedCard
                  project={project}
                  description={t(project.descriptionKey as Parameters<typeof t>[0])}
                  impact={
                    project.impactKey
                      ? t(project.impactKey as Parameters<typeof t>[0])
                      : undefined
                  }
                />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>

        {/* ── GitHub repos ─────────────────────────────────────────── */}
        {repos.length > 0 && (
          <div>
            <FadeIn delay={0.05}>
              <SubHeading>
                <GitHubIcon />
                {t("githubHeading")}
                <span className="text-muted ml-2 text-sm font-normal">
                  {t("githubSubtitle")}
                </span>
              </SubHeading>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <FadeInItem key={repo.id}>
                  <RepoCard
                    repo={repo}
                    noDescLabel={t("noDescription")}
                    demoLabel={t("liveDemo")}
                    codeLabel={t("viewCode")}
                    caseStudyLabel={t("caseStudy")}
                  />
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ── Sub-section heading ────────────────────────────────────────── */
function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-foreground mb-6 flex flex-wrap items-center gap-2 text-lg font-semibold">
      {children}
    </h3>
  );
}

/* ── Featured project card ──────────────────────────────────────── */
function FeaturedCard({
  project,
  description,
  impact,
}: {
  project: FeaturedProject;
  description: string;
  impact?: string;
}) {
  return (
    <div
      className={cn(
        "group border-border/80 bg-card/70 flex flex-col rounded-2xl border p-6 backdrop-blur-md",
        "hover:border-accent/30 hover:shadow-accent/10 transition-all duration-200 hover:shadow-[0_0_40px_rgba(129,140,248,0.08)]",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold",
              project.gradient,
            )}
          >
            {project.company[0]}
          </span>
          <div>
            <h4 className="text-foreground leading-tight font-bold">{project.name}</h4>
            <p className="text-muted text-xs">{project.company}</p>
          </div>
        </div>
        <span className="border-border text-muted shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px]">
          {project.year}
        </span>
      </div>

      <p className="text-muted mb-3 flex-1 text-sm leading-relaxed">{description}</p>
      {impact && (
        <p className="text-accent/90 mb-5 font-mono text-[11px] tracking-wide">
          {impact}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="border-border/70 bg-muted-bg text-muted rounded-md border px-2.5 py-0.5 font-mono text-[11px]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── GitHub repo card ───────────────────────────────────────────── */
function RepoCard({
  repo,
  noDescLabel,
  demoLabel,
  codeLabel,
  caseStudyLabel,
}: {
  repo: GitHubRepo;
  noDescLabel: string;
  demoLabel: string;
  codeLabel: string;
  caseStudyLabel: string;
}) {
  const caseStudy = getCaseStudyByRepo(repo.name);

  return (
    <div
      className={cn(
        "group border-border/80 bg-card/70 flex flex-col overflow-hidden rounded-2xl border backdrop-blur-md",
        "hover:border-accent/40 hover:shadow-accent/10 transition-all duration-200 hover:shadow-[0_0_40px_rgba(129,140,248,0.08)]",
      )}
    >
      {repo.image && (
        <div className="border-border/80 relative aspect-[16/10] w-full overflow-hidden border-b">
          <Image
            src={repo.image}
            alt={repo.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4 className="text-foreground font-mono text-sm font-semibold">{repo.name}</h4>
          {repo.stargazers_count > 0 && (
            <span className="text-muted flex shrink-0 items-center gap-1 font-mono text-xs">
              <Star size={11} />
              {repo.stargazers_count}
            </span>
          )}
        </div>

        <p className="text-muted mb-4 flex-1 text-xs leading-relaxed">
          {repo.description ?? noDescLabel}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {repo.stack.map((tag) => {
            const isLanguage = tag === repo.language;
            const dotColor =
              isLanguage && repo.language
                ? (LANGUAGE_COLORS[repo.language] ?? "#8b8b8b")
                : null;

            return (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px]",
                  isLanguage
                    ? "border-border/70 bg-muted-bg text-muted"
                    : "border-accent/35 bg-accent/10 text-accent",
                )}
              >
                {dotColor && (
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: dotColor }}
                    aria-hidden="true"
                  />
                )}
                {tag}
              </span>
            );
          })}
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {repo.demoUrl && (
            <a
              href={repo.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-fg hover:bg-accent/90 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <ExternalLink size={12} />
              {demoLabel}
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "border-border text-muted hover:border-accent/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              !repo.demoUrl && "border-accent/40 text-accent hover:bg-accent/10",
            )}
          >
            <GitHubMark />
            {codeLabel}
          </a>
          {caseStudy && (
            <Link
              href={`/projects/${caseStudy.slug}`}
              className="border-border text-muted hover:border-accent/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
            >
              {caseStudyLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Inline GitHub SVG (brand icon not in lucide) ───────────────── */
function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-foreground"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.573C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.573C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
