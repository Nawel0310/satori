import type { ProductionCategory } from "@/lib/types";

const VARIANT_STYLES: Record<ProductionCategory, { gradient: string; label: string }> = {
  drone: {
    gradient: "from-zinc-800 via-zinc-500 to-zinc-200",
    label: "Foto de referencia — dron",
  },
  obra: {
    gradient: "from-zinc-900 via-zinc-600 to-zinc-300",
    label: "Foto de referencia — obra civil",
  },
  evento: {
    gradient: "from-zinc-700 via-zinc-400 to-zinc-100",
    label: "Foto de referencia — evento",
  },
  institucional: {
    gradient: "from-zinc-950 via-zinc-700 to-zinc-400",
    label: "Foto de referencia — institucional",
  },
};

interface PlaceholderImageProps {
  variant: ProductionCategory;
  className?: string;
}

export function PlaceholderImage({ variant, className = "" }: PlaceholderImageProps) {
  const { gradient, label } = VARIANT_STYLES[variant];
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-end overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <span className="m-3 rounded-sm bg-black/40 px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}
