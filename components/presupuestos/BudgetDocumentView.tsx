import type { Budget, Client } from "@/lib/types";
import { budgetTotal, formatCurrency, formatDate, lineItemTotal } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";

interface BudgetDocumentViewProps {
  budget: Budget;
  client: Client;
}

export function BudgetDocumentView({ budget, client }: BudgetDocumentViewProps) {
  return (
    <div className="rounded-md border border-border bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="font-heading text-2xl font-bold tracking-widest text-primary">SATORI</p>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-secondary">Film &amp; Photo</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Presupuesto</p>
          <p className="font-heading text-xl font-bold text-primary">{budget.id}</p>
          <p className="mt-1 text-xs text-secondary">{formatDate(budget.date)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Cliente</p>
          <p className="text-lg font-medium text-primary">{client.name}</p>
          <p className="text-sm text-secondary">{client.contactName}</p>
        </div>
        <StatusBadge status={budget.status} />
      </div>

      <h1 className="font-heading mt-8 text-2xl font-bold text-primary">{budget.title}</h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-semibold uppercase tracking-wider text-secondary">
              <th scope="col" className="py-3">
                Descripción
              </th>
              <th scope="col" className="py-3 text-right">
                Cant.
              </th>
              <th scope="col" className="py-3 text-right">
                Precio unitario
              </th>
              <th scope="col" className="py-3 text-right">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {budget.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-border">
                <td className="py-3 text-primary">{item.description}</td>
                <td className="py-3 text-right tabular-nums text-secondary">{item.quantity}</td>
                <td className="py-3 text-right tabular-nums text-secondary">{formatCurrency(item.unitPrice)}</td>
                <td className="py-3 text-right tabular-nums font-medium text-primary">
                  {formatCurrency(lineItemTotal(item))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end border-t border-border pt-4">
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Total</p>
          <p className="font-heading text-3xl font-bold tabular-nums text-primary">
            {formatCurrency(budgetTotal(budget.lineItems))}
          </p>
        </div>
      </div>
    </div>
  );
}
