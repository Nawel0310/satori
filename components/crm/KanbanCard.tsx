"use client";

import type { DragEvent } from "react";
import Link from "next/link";
import { CategoryBadge } from "@/components/crm/CategoryBadge";
import type { Production } from "@/lib/types";

interface KanbanCardProps {
  production: Production;
  clientName: string;
}

export function KanbanCard({ production, clientName }: KanbanCardProps) {
  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("text/plain", production.id);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab rounded-sm border border-border bg-white p-3.5 shadow-sm transition-shadow duration-200 hover:shadow-md active:cursor-grabbing"
    >
      <p className="text-sm font-medium text-primary">{production.title}</p>
      <p className="mt-1 text-xs text-secondary">{clientName}</p>
      <CategoryBadge category={production.category} className="mt-2" />
      <Link
        href={`/crm/detalle?id=${production.clientId}`}
        className="mt-2 block text-xs font-medium text-primary underline-offset-4 hover:underline"
      >
        Ver ficha →
      </Link>
    </div>
  );
}
