import { GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { experience, education } from "@/data/experience";
import type { ExperienceItem } from "@/data/experience";
import { cn } from "@/lib/utils";

/** Maps data id to number of bullet points */
const DESCRIPTION_COUNTS: Record<string, number> = {
  candescent: 4,
  smsparking: 3,
  bezimeni: 4,
  itengine: 2,
  pricebee: 3,
  vegait: 2,
};

/** Single color per company — muted but distinctive */
const COMPANY_COLORS: Record<string, string> = {
  candescent: "from-violet-500/20 to-indigo-500/20",
  smsparking: "from-blue-500/20 to-sky-500/20",
  bezimeni: "from-rose-500/20 to-pink-500/20",
  itengine: "from-emerald-500/20 to-teal-500/20",
  pricebee: "from-amber-500/20 to-yellow-500/20",
  vegait: "from-orange-500/20 to-red-500/20",
};

export async function ExperienceSection() {
  const t = await getTranslations("Experience");

  return (
    <section id="experience" className="py-28">
      <Container>
        <FadeIn>
          <SectionHeader index="02" label={t("label")} heading={t("heading")} />
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="from-accent/50 via-border absolute top-0 left-0 hidden h-full w-px bg-gradient-to-b to-transparent md:block" />

          <FadeInStagger className="space-y-10 md:pl-8" staggerDelay={0.12}>
            {experience.map((item) => (
              <FadeInItem key={item.id} from="right">
                <ExperienceCard
                  item={item}
                  presentLabel={t("present")}
                  bulletCount={DESCRIPTION_COUNTS[item.id] ?? 2}
                  getDescription={(i) => {
                    const key = `${item.descriptionKey}_${i}` as Parameters<typeof t>[0];
                    return t(key);
                  }}
                />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>

        {/* Education */}
        <FadeIn delay={0.1} className="mt-24">
          <h3 className="text-foreground mb-8 flex items-center gap-2 text-xl font-semibold">
            <GraduationCap size={20} className="text-accent" />
            {t("educationHeading")}
          </h3>
          <FadeInStagger className="grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <FadeInItem key={item.id}>
                <div className="border-border bg-card hover:border-accent/30 rounded-2xl border p-6 transition-colors">
                  <p className="text-accent mb-1 font-mono text-xs">{item.period}</p>
                  <h4 className="text-foreground mb-1 font-semibold">
                    {item.institution}
                  </h4>
                  <p className="text-muted text-sm">{item.degree}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </FadeIn>
      </Container>
    </section>
  );
}

function ExperienceCard({
  item,
  presentLabel,
  bulletCount,
  getDescription,
}: {
  item: ExperienceItem;
  presentLabel: string;
  bulletCount: number;
  getDescription: (index: number) => string;
}) {
  const gradient = COMPANY_COLORS[item.id] ?? "from-accent/10 to-accent/5";

  return (
    <div className="group relative">
      {/* Timeline dot */}
      <span
        className={cn(
          "absolute top-5 -left-[37px] hidden h-3 w-3 rounded-full border-2 transition-all duration-200 md:block",
          item.current
            ? "border-accent bg-accent shadow-[0_0_14px_rgba(129,140,248,0.85)]"
            : "border-border bg-card group-hover:border-accent group-hover:bg-accent/30 group-hover:shadow-[0_0_12px_rgba(129,140,248,0.45)]",
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "border-border/80 bg-card/70 rounded-2xl border p-6 backdrop-blur-md transition-all duration-200",
          "hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(129,140,248,0.1)]",
        )}
      >
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {/* Company badge */}
            <div className="mb-2 flex items-center gap-2">
              <span
                className={cn(
                  "text-foreground flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold",
                  gradient,
                )}
              >
                {item.company[0]}
              </span>
              <div>
                <h3 className="text-foreground font-bold">{item.company}</h3>
                {item.project && (
                  <p className="text-muted font-mono text-[11px]">{item.project}</p>
                )}
              </div>
            </div>
            <p className="text-accent text-sm font-medium">{item.role}</p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="border-border text-muted rounded-full border px-3 py-0.5 font-mono text-xs">
              {item.period}
            </span>
            {item.current && (
              <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-0.5 text-xs font-medium text-green-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {presentLabel}
              </span>
            )}
          </div>
        </div>

        {/* Bullet points */}
        <ul className="mb-5 space-y-2">
          {Array.from({ length: bulletCount }, (_, i) => (
            <li key={i} className="text-muted flex gap-2 text-sm">
              <span className="bg-accent/60 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
              {getDescription(i)}
            </li>
          ))}
        </ul>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="border-border/70 bg-muted-bg text-muted rounded-md border px-2.5 py-0.5 font-mono text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
