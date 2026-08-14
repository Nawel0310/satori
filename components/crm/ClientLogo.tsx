import { withBasePath } from "@/lib/base-path";

type ClientLogoSize = "sm" | "md" | "lg";

const sizeClasses: Record<ClientLogoSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-2xl",
};

interface ClientLogoProps {
  name: string;
  logoUrl?: string;
  size?: ClientLogoSize;
  className?: string;
}

function initials(name: string): string {
  const words = name.trim().split(/\s+/).slice(0, 2);
  return words.map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export function ClientLogo({ name, logoUrl, size = "md", className = "" }: ClientLogoProps) {
  const base = `shrink-0 rounded-md border border-border ${sizeClasses[size]} ${className}`;

  if (logoUrl) {
    return <img src={withBasePath(logoUrl)} alt="" className={`${base} object-cover`} />;
  }

  return (
    <div
      role="img"
      aria-label={`Logo de ${name}`}
      className={`${base} flex items-center justify-center bg-surface font-heading font-semibold text-secondary`}
    >
      {initials(name)}
    </div>
  );
}
