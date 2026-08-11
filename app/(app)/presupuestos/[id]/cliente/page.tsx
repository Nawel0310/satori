"use client";

import { useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { BudgetDocumentView } from "@/components/presupuestos/BudgetDocumentView";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function BudgetClientViewPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { budgets, clients, approveBudget, rejectBudget, deleteBudget } = useDemoData();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const budget = budgets.find((b) => b.id === params.id);
  if (!budget) {
    notFound();
  }
  const client = clients.find((c) => c.id === budget.clientId);
  if (!client) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/presupuestos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver al listado
        </Link>
        <div className="flex gap-3">
          <Link href={`/presupuestos/${budget.id}/editar`}>
            <Button variant="secondary">Editar</Button>
          </Link>
          <Button variant="danger" onClick={() => setConfirmingDelete(true)}>
            Eliminar
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingDelete}
        title="¿Eliminar este presupuesto?"
        description={`"${budget.id}" se va a eliminar de forma permanente. La acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteBudget(budget.id);
          router.push("/presupuestos");
        }}
      />

      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
        Vista del cliente, así lo recibe {client.name}
      </p>

      <BudgetDocumentView budget={budget} client={client} />

      <div className="mt-6 flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6">
        <p className="text-center text-sm text-secondary">
          Decisión del cliente. Un click cambia el estado al instante.
        </p>
        <div className="flex gap-3">
          <Button
            variant={budget.status === "vencido" ? "primary" : "danger"}
            onClick={() => rejectBudget(budget.id)}
          >
            Rechazar
          </Button>
          <Button
            variant={budget.status === "aprobado" ? "primary" : "secondary"}
            onClick={() => approveBudget(budget.id)}
          >
            Aprobar
          </Button>
        </div>
      </div>
    </div>
  );
}
