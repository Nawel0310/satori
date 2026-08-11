"use client";

import { useState, type DragEvent, type ReactNode } from "react";
import type { PipelineStage } from "@/lib/types";

interface KanbanColumnProps {
  stage: PipelineStage;
  title: string;
  onDropProduction: (productionId: string, stage: PipelineStage) => void;
  children: ReactNode;
  count: number;
}

export function KanbanColumn({ stage, title, onDropProduction, children, count }: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const productionId = event.dataTransfer.getData("text/plain");
    if (productionId) {
      onDropProduction(productionId, stage);
    }
    setIsOver(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={() => setIsOver(true)}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`flex min-h-[420px] w-full flex-col rounded-md border p-3 transition-colors duration-200 ${
        isOver ? "border-primary bg-primary/5" : "border-border bg-surface"
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">{title}</h3>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-secondary">{count}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">{children}</div>
    </div>
  );
}
