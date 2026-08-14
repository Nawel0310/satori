"use client";

import { useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RowAction } from "@/components/ui/RowAction";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { formatCurrency } from "@/lib/format";

export default function PlantillasPage() {
  const { budgetTemplates, deleteTemplate } = useDemoData();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const pendingTemplate = budgetTemplates.find((t) => t.id === pendingDeleteId);

  function templateTotal(lineItems: { quantity: number; unitPrice: number }[]) {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Plantillas de presupuesto</h1>
          <p className="mt-1 text-sm text-secondary">Paquetes reutilizables para armar presupuestos en minutos.</p>
        </div>
        <Link href="/plantillas/nueva">
          <Button>+ Nueva plantilla</Button>
        </Link>
      </header>

      {budgetTemplates.length === 0 ? (
        <div className="rounded-md border border-dashed border-border py-16 text-center">
          <p className="text-sm text-secondary">Todavía no hay plantillas cargadas.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {budgetTemplates.map((template) => (
            <Card key={template.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <Link
                  href={`/plantillas/detalle?id=${template.id}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {template.name}
                </Link>
                <p className="mt-1 text-xs text-secondary">
                  {template.lineItems.length} ítem(s), total {formatCurrency(templateTotal(template.lineItems))}
                </p>
              </div>
              <div className="flex gap-2">
                <RowAction
                  icon={<PencilIcon />}
                  label="Editar"
                  href={`/plantillas/editar?id=${template.id}`}
                />
                <RowAction
                  icon={<TrashIcon />}
                  label="Eliminar"
                  onClick={() => setPendingDeleteId(template.id)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={pendingTemplate != null}
        title="¿Eliminar esta plantilla?"
        description={`"${pendingTemplate?.name ?? ""}" se va a eliminar. Los presupuestos ya creados a partir de ella no se ven afectados.`}
        confirmLabel="Eliminar"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteTemplate(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
