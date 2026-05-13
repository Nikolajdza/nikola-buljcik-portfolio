import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: cn(
    // Gradient fill + shadow glow
    "relative overflow-hidden",
    "bg-gradient-to-r from-indigo-500 via-accent to-violet-500 text-white",
    "shadow-lg shadow-accent/30",
    "hover:shadow-xl hover:shadow-accent/50 hover:brightness-110",
    "active:scale-[0.98]",
    // Shimmer sweep on hover
    "after:absolute after:inset-0",
    "after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
    "after:-translate-x-full after:transition-transform after:duration-500 after:ease-in-out",
    "hover:after:translate-x-full",
  ),
  outline: cn(
    "relative overflow-hidden border border-accent/70 text-accent bg-transparent",
    "hover:border-accent hover:bg-accent/10",
    "active:scale-[0.98]",
  ),
  ghost: "text-muted hover:bg-muted-bg hover:text-foreground active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-4 text-xs rounded-lg",
  md: "h-10 px-5 text-sm rounded-xl",
  lg: "h-12 px-7 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold",
          "transition-all duration-200",
          "focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
