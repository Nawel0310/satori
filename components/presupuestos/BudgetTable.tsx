"use client";

import { useState } from "react";
import { useDemoData } from "@/context/demo-data-context";
import type { Budget, Client } from "@/lib/types";
import { budgetTotal, formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RowAction } from "@/components/ui/RowAction";
import { EyeIcon, PencilIcon, TrashIcon } from "@/components/ui/icons";

interface BudgetTableProps {
  budgets: Budget[];
  clients: Client[];
}

export function BudgetTable({ budgets, clients }: BudgetTableProps) {
  const { deleteBudget } = useDemoData();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente eliminado";
  }

  const pendingBudget = budgets.find((b) => b.id === pendingDeleteId);

  if (budgets.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-16 text-center">
        <p className="text-sm text-secondary">No hay presupuestos que coincidan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-white">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-secondary">
            <th scope="col" className="px-5 py-3">
              N° Presupuesto
            </th>
            <th scope="col" className="px-5 py-3">
              Cliente
            </th>
            <th scope="col" className="px-5 py-3">
              Fecha
            </th>
            <th scope="col" className="px-5 py-3 text-right">
              Monto
            </th>
            <th scope="col" className="px-5 py-3">
              Estado
            </th>
            <th scope="col" className="px-5 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id} className="border-b border-border last:border-0 hover:bg-surface">
              <td className="px-5 py-4 font-medium text-primary">{budget.id}</td>
              <td className="px-5 py-4 text-secondary">{clientName(budget.clientId)}</td>
              <td className="px-5 py-4 text-secondary">{formatDate(budget.date)}</td>
              <td className="px-5 py-4 text-right font-medium tabular-nums text-primary">
                {formatCurrency(budgetTotal(budget.lineItems))}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={budget.status} />
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <RowAction icon={<EyeIcon />} label="Ver" href={`/presupuestos/cliente?id=${budget.id}`} />
                  <RowAction icon={<PencilIcon />} label="Editar" href={`/presupuestos/editar?id=${budget.id}`} />
                  <RowAction
                    icon={<TrashIcon />}
                    label="Eliminar"
                    onClick={() => setPendingDeleteId(budget.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={pendingBudget != null}
        title="¿Eliminar este presupuesto?"
        description={`"${pendingBudget?.id ?? ""}" se va a eliminar de forma permanente.`}
        confirmLabel="Eliminar"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteBudget(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
