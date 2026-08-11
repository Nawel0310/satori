"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { BudgetDocumentView } from "@/components/presupuestos/BudgetDocumentView";
import { Button } from "@/components/ui/Button";

export default function BudgetClientViewPage() {
  const params = useParams<{ id: string }>();
  const { budgets, clients, approveBudget, rejectBudget } = useDemoData();

  const budget = budgets.find((b) => b.id === params.id);
  if (!budget) {
    notFound();
  }
  const client = clients.find((c) => c.id === budget.clientId);
  if (!client) {
    notFound();
  }

  const isDecided = budget.status === "aprobado" || budget.status === "vencido";

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <Link
        href="/presupuestos"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver al listado
      </Link>

      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
        Vista del cliente — así lo recibe {client.name}
      </p>

      <BudgetDocumentView budget={budget} client={client} />

      <div className="mt-6 flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6">
        {isDecided ? (
          <p className="text-center text-sm font-medium text-primary">
            {budget.status === "aprobado"
              ? "Presupuesto aprobado. El estado ya se actualizó en el sistema de Satori."
              : "Presupuesto marcado como no aprobado."}
          </p>
        ) : (
          <>
            <p className="text-center text-sm text-secondary">¿Confirmás este presupuesto?</p>
            <div className="flex gap-3">
              <Button variant="danger" onClick={() => rejectBudget(budget.id)}>
                Rechazar
              </Button>
              <Button onClick={() => approveBudget(budget.id)}>Aprobar</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
