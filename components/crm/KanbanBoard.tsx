"use client";

import { useDemoData } from "@/context/demo-data-context";
import { normalizeSearchText, PIPELINE_STAGE_LABELS, PRODUCTION_CATEGORY_LABELS } from "@/lib/format";
import type { PipelineStage } from "@/lib/types";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";

const STAGES: PipelineStage[] = ["propuesta", "aprobada", "en_produccion"];
const STAGE_SEQUENCE: PipelineStage[] = ["propuesta", "aprobada", "en_produccion", "finalizada"];

interface KanbanBoardProps {
  search?: string;
  boardRef?: React.Ref<HTMLDivElement>;
}

export function KanbanBoard({ search = "", boardRef }: KanbanBoardProps) {
  const { productions, clients, moveProductionStage, showToast } = useDemoData();

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente";
  }

  const keyword = normalizeSearchText(search.trim());

  return (
    <div ref={boardRef} className="flex flex-wrap items-start gap-4">
      {STAGES.map((stage) => {
        const stageProductions = productions.filter((p) => {
          if (p.stage !== stage) return false;
          const searchable = [
            p.title,
            clientName(p.clientId),
            PRODUCTION_CATEGORY_LABELS[p.category],
            PIPELINE_STAGE_LABELS[p.stage],
          ]
            .join(" ");
          return normalizeSearchText(searchable).includes(keyword);
        });
        stageProductions.sort((a, b) => a.stageUpdatedAt - b.stageUpdatedAt);
        return (
          <KanbanColumn
            key={stage}
            stage={stage}
            title={PIPELINE_STAGE_LABELS[stage]}
            count={stageProductions.length}
            onDropProduction={moveProductionStage}
          >
            {stageProductions.map((production) => (
              <KanbanCard
                key={production.id}
                production={production}
                clientName={clientName(production.clientId)}
                onFinish={() => {
                  const currentIndex = STAGE_SEQUENCE.indexOf(production.stage);
                  const nextStage = STAGE_SEQUENCE[currentIndex + 1];
                  if (!nextStage) return;
                  moveProductionStage(production.id, nextStage);
                  showToast("Se actualizó la etapa.");
                }}
              />
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
}
