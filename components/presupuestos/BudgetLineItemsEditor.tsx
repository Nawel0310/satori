"use client";

import type { BudgetLineItem } from "@/lib/types";
import { formatCurrency, lineItemTotal, budgetTotal } from "@/lib/format";
import { Button } from "@/components/ui/Button";

interface BudgetLineItemsEditorProps {
  lineItems: BudgetLineItem[];
  onChange: (lineItems: BudgetLineItem[]) => void;
}

export function BudgetLineItemsEditor({ lineItems, onChange }: BudgetLineItemsEditorProps) {
  function updateItem(id: string, patch: Partial<BudgetLineItem>) {
    onChange(lineItems.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeItem(id: string) {
    onChange(lineItems.filter((item) => item.id !== id));
  }

  function addItem() {
    onChange([
      ...lineItems,
      { id: `li-${Date.now()}`, description: "", quantity: 1, unitPrice: 0 },
    ]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-secondary">
              <th scope="col" className="px-4 py-3">
                Ítem (equipo, días de rodaje, edición…)
              </th>
              <th scope="col" className="w-24 px-4 py-3">
                Cantidad
              </th>
              <th scope="col" className="w-36 px-4 py-3">
                Precio unitario
              </th>
              <th scope="col" className="w-36 px-4 py-3 text-right">
                Subtotal
              </th>
              <th scope="col" className="w-12 px-4 py-3">
                <span className="sr-only">Quitar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5">
                  <label className="sr-only" htmlFor={`desc-${item.id}`}>
                    Descripción del ítem
                  </label>
                  <input
                    id={`desc-${item.id}`}
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Ej: Día de rodaje con dron"
                    className="w-full rounded-sm border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <label className="sr-only" htmlFor={`qty-${item.id}`}>
                    Cantidad
                  </label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                    className="w-full rounded-sm border border-border px-2.5 py-1.5 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <label className="sr-only" htmlFor={`price-${item.id}`}>
                    Precio unitario
                  </label>
                  <input
                    id={`price-${item.id}`}
                    type="number"
                    min={0}
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                    className="w-full rounded-sm border border-border px-2.5 py-1.5 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-2.5 text-right font-medium tabular-nums text-primary">
                  {formatCurrency(lineItemTotal(item))}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Quitar ítem ${item.description || "sin nombre"}`}
                    className="cursor-pointer rounded-sm p-1.5 text-secondary hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button type="button" variant="secondary" onClick={addItem} className="self-start">
        + Agregar ítem
      </Button>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
        <span className="text-sm font-medium uppercase tracking-wide text-secondary">Total</span>
        <span className="font-heading text-2xl font-bold tabular-nums text-primary">
          {formatCurrency(budgetTotal(lineItems))}
        </span>
      </div>
    </div>
  );
}
