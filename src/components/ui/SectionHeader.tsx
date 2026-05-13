import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  label: string;
  heading: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  index,
  label,
  heading,
  description,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "relative mb-16 overflow-hidden",
        centered && "text-center",
        className,
      )}
    >
      {/* Large decorative index number — purely visual */}
      <span
        className={cn(
          "pointer-events-none absolute -top-4 leading-none font-black select-none",
          "text-foreground/[0.03] text-[7rem] md:text-[10rem]",
          centered ? "left-1/2 -translate-x-1/2" : "-left-4",
        )}
        aria-hidden="true"
      >
        {index}
      </span>

      <div className="relative">
        {/* Eyebrow label */}
        <p className="text-accent mb-3 font-mono text-xs tracking-[0.25em] uppercase">
          <span className="opacity-50">{index}</span>
          <span className="mx-2 opacity-30">—</span>
          {label}
        </p>

        {/* Heading with gradient accent on first word */}
        <h2
          className={cn(
            "text-foreground text-3xl font-black tracking-tight md:text-4xl lg:text-5xl",
          )}
        >
          {heading}
        </h2>

        {/* Underline accent */}
        <div
          className={cn(
            "from-accent mt-4 h-px w-16 bg-gradient-to-r to-violet-500/50",
            centered && "mx-auto",
          )}
        />

        {description && (
          <p
            className={cn(
              "text-muted mt-5 text-base leading-relaxed md:text-lg",
              !centered && "max-w-2xl",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
