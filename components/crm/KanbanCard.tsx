"use client";

import { useState, type DragEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { CategoryBadge } from "@/components/crm/CategoryBadge";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { TrashIcon } from "@/components/ui/icons";
import type { Production } from "@/lib/types";

interface KanbanCardProps {
  production: Production;
  clientName: string;
  onFinish: (productionId: string) => void;
}

export function KanbanCard({ production, clientName, onFinish }: KanbanCardProps) {
  const { deleteProduction } = useDemoData();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("text/plain", production.id);
    event.dataTransfer.effectAllowed = "move";
  }

  function handleFinishClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onFinish(production.id);
  }

  function handleDeleteClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setConfirmingDelete(true);
  }

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        className="w-full flex-none cursor-grab rounded-sm border border-border bg-white p-3.5 shadow-sm transition-shadow duration-200 hover:shadow-md active:cursor-grabbing"
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
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-primary">{production.title}</p>
              <button
                type="button"
                aria-label={`Eliminar "${production.title}"`}
                onClick={handleDeleteClick}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-secondary transition-colors duration-200 cursor-pointer hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <TrashIcon width={18} height={18} />
              </button>
            </div>
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

      <ConfirmDialog
        open={confirmingDelete}
        title="¿Eliminar esta producción?"
        description={`"${production.title}" se va a eliminar. Los presupuestos vinculados se conservan, sin producción asociada.`}
        confirmLabel="Eliminar"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteProduction(production.id);
          setConfirmingDelete(false);
        }}
      />
    </>
  );
}
