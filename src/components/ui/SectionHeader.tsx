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
    <div className={cn("mb-16", centered && "text-center", className)}>
      <p className="text-accent mb-3 font-mono text-xs tracking-[0.2em] uppercase">
        <span className="opacity-60">{index}</span>
        <span className="mx-2 opacity-40">/</span>
        {label}
      </p>
      <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted mt-4 text-base leading-relaxed md:text-lg",
            !centered && "max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
