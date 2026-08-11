"use client";

import { useState } from "react";
import { useDemoData } from "@/context/demo-data-context";
import { TemplateSelector } from "./TemplateSelector";
import { BudgetLineItemsEditor } from "./BudgetLineItemsEditor";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BUDGET_STATUS_LABELS } from "@/lib/format";
import { nextBudgetId } from "@/lib/mock-data";
import type { Budget, BudgetLineItem, BudgetStatus } from "@/lib/types";

interface BudgetFormProps {
  initialBudget?: Budget;
  onSubmit: (budget: Budget) => void;
  onCancel: () => void;
}

export function BudgetForm({ initialBudget, onSubmit, onCancel }: BudgetFormProps) {
  const { clients, budgetTemplates } = useDemoData();
  const [budgetId] = useState(() => initialBudget?.id ?? nextBudgetId());
  const [clientId, setClientId] = useState(initialBudget?.clientId ?? clients[0]?.id ?? "");
  const [title, setTitle] = useState(initialBudget?.title ?? "");
  const [status, setStatus] = useState<BudgetStatus>(initialBudget?.status ?? "en_espera");
  const [lineItems, setLineItems] = useState<BudgetLineItem[]>(
    () => initialBudget?.lineItems ?? [{ id: `li-${Date.now()}`, description: "", quantity: 1, unitPrice: 0 }],
  );

  function applyTemplate(templateId: string) {
    const template = budgetTemplates.find((t) => t.id === templateId);
    if (!template) return;
    setTitle(template.name);
    setLineItems(template.lineItems.map((item, index) => ({ ...item, id: `li-${Date.now()}-${index}` })));
  }

  function handleSubmit() {
    const validItems = lineItems.filter((item) => item.description.trim() !== "");
    onSubmit({
      id: budgetId,
      clientId,
      productionId: initialBudget?.productionId,
      title: title || "Presupuesto sin título",
      date: initialBudget?.date ?? new Date().toISOString().slice(0, 10),
      status,
      lineItems: validItems.length > 0 ? validItems : lineItems,
    });
  }

  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="client-select" className="text-sm font-medium text-primary">
            Cliente
          </label>
          <select
            id="client-select"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="status-select" className="text-sm font-medium text-primary">
            Estado
          </label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as BudgetStatus)}
            className="w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(BUDGET_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TemplateSelector templates={budgetTemplates} onSelect={applyTemplate} />

      <Input
        label="Título del presupuesto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ej: Video institucional 2 días de rodaje + dron + edición"
      />

      <div>
        <h2 className="font-heading mb-3 text-lg font-semibold text-primary">Ítems</h2>
        <BudgetLineItemsEditor lineItems={lineItems} onChange={setLineItems} />
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Guardar presupuesto
        </Button>
      </div>
    </Card>
  );
}
