"use client";

import { useLayoutEffect, useRef, useState, type DragEvent, type ReactNode } from "react";
import type { PipelineStage } from "@/lib/types";
import { StageIcon } from "@/components/crm/StageIcon";

const MAX_VISIBLE_CARDS = 5;

interface KanbanColumnProps {
  stage: PipelineStage;
  title: string;
  onDropProduction: (productionId: string, stage: PipelineStage) => void;
  children: ReactNode;
  count: number;
}

export function KanbanColumn({ stage, title, onDropProduction, children, count }: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || count <= MAX_VISIBLE_CARDS) {
      setMaxHeight(undefined);
      return;
    }

    function recompute() {
      if (!list) return;
      const items = Array.from(list.children) as HTMLElement[];
      if (items.length < MAX_VISIBLE_CARDS) {
        setMaxHeight(undefined);
        return;
      }
      const fifth = items[MAX_VISIBLE_CARDS - 1];
      setMaxHeight(fifth.offsetTop + fifth.offsetHeight - items[0].offsetTop);
    }

    recompute();
    const observer = new ResizeObserver(recompute);
    Array.from(list.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [count]);

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
      className={`flex w-full min-h-[120px] flex-col rounded-md border p-3 transition-colors duration-200 lg:w-0 lg:flex-1 ${
        isOver ? "border-primary bg-primary/5" : "border-border bg-surface-strong"
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
          <StageIcon stage={stage} className="shrink-0" />
          {title}
        </h3>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-secondary">{count}</span>
      </div>
      <div
        ref={listRef}
        style={maxHeight !== undefined ? { maxHeight } : undefined}
        className={`flex flex-1 flex-col gap-2.5 ${maxHeight !== undefined ? "overflow-y-auto pr-1" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
