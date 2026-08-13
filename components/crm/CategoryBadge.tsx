import type { ProductionCategory } from "@/lib/types";
import { PRODUCTION_CATEGORY_LABELS } from "@/lib/format";

export function CategoryBadge({ category, className = "" }: { category: ProductionCategory; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary ${className}`}
    >
      {PRODUCTION_CATEGORY_LABELS[category]}
    </span>
  );
}
