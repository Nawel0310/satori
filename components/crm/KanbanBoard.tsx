"use client";

import { useDemoData } from "@/context/demo-data-context";
import { PIPELINE_STAGE_LABELS } from "@/lib/format";
import type { PipelineStage } from "@/lib/types";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";

const STAGES: PipelineStage[] = ["contacto", "propuesta", "ganado", "perdido"];

export function KanbanBoard() {
  const { productions, clients, moveProductionStage } = useDemoData();

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente";
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAGES.map((stage) => {
        const stageProductions = productions.filter((p) => p.stage === stage);
        return (
          <KanbanColumn
            key={stage}
            stage={stage}
            title={PIPELINE_STAGE_LABELS[stage]}
            count={stageProductions.length}
            onDropProduction={moveProductionStage}
          >
            {stageProductions.map((production) => (
              <KanbanCard key={production.id} production={production} clientName={clientName(production.clientId)} />
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
}
