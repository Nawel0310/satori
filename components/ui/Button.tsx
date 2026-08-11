import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-accent focus-visible:ring-primary disabled:bg-secondary/40",
  secondary:
    "bg-transparent text-primary border border-border hover:border-primary focus-visible:ring-primary disabled:opacity-50",
  ghost:
    "bg-transparent text-secondary hover:text-primary hover:bg-surface focus-visible:ring-primary disabled:opacity-50",
  danger:
    "bg-transparent text-primary border border-primary/70 hover:bg-primary hover:text-white focus-visible:ring-primary disabled:opacity-50",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
