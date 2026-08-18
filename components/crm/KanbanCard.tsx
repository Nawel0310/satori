"use client";

import type { DragEvent, MouseEvent } from "react";
import Link from "next/link";
import { CategoryBadge } from "@/components/crm/CategoryBadge";
import type { Production } from "@/lib/types";

interface KanbanCardProps {
  production: Production;
  clientName: string;
  onFinish: (productionId: string) => void;
}

export function KanbanCard({ production, clientName, onFinish }: KanbanCardProps) {
  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("text/plain", production.id);
    event.dataTransfer.effectAllowed = "move";
  }

  function handleFinishClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onFinish(production.id);
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="w-full flex-none cursor-grab rounded-sm border border-border bg-white p-3.5 shadow-sm transition-shadow duration-200 hover:shadow-md active:cursor-grabbing lg:w-64"
    >
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          role="checkbox"
          aria-checked={false}
          aria-label={`Marcar "${production.title}" como finalizada`}
          onClick={handleFinishClick}
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-secondary transition-colors duration-200 cursor-pointer hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-primary">{production.title}</p>
          <p className="mt-1 text-xs text-secondary">{clientName}</p>
          <CategoryBadge category={production.category} className="mt-2" />
          <div className="mt-2 flex gap-3">
            <Link
              href={`/producciones/detalle?id=${production.id}`}
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Ver Producción
            </Link>
            <Link
              href={`/clientes/detalle?id=${production.clientId}`}
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Ver Cliente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
