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
        <p
          className={cn(
            "text-accent mb-3 inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] uppercase",
            centered && "justify-center",
          )}
        >
          <span
            className="bg-accent shadow-accent/60 relative inline-flex h-1.5 w-1.5 rounded-full shadow-[0_0_10px_currentColor]"
            aria-hidden="true"
          >
            <span className="bg-accent absolute inset-0 animate-ping rounded-full opacity-40" />
          </span>
          <span className="opacity-50">{index}</span>
          <span className="opacity-30">—</span>
          {label}
        </p>

        <h2 className="text-foreground text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <div
          className={cn(
            "from-accent mt-4 h-px w-16 bg-gradient-to-r via-cyan-400/60 to-transparent",
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
