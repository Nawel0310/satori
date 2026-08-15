import type { PipelineStage } from "@/lib/types";
import { PIPELINE_STAGE_LABELS } from "@/lib/format";

const STAGE_STYLES: Record<PipelineStage, string> = {
  propuesta: "border-accent text-accent",
  aprobada: "border-primary text-primary",
  en_produccion: "border-primary bg-primary text-white",
  finalizada: "border-secondary bg-surface text-secondary",
  cancelada: "border-secondary/50 text-secondary/70 line-through decoration-1",
};

export function StageBadge({ stage }: { stage: PipelineStage }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${STAGE_STYLES[stage]}`}
    >
      {PIPELINE_STAGE_LABELS[stage]}
    </span>
  );
}
