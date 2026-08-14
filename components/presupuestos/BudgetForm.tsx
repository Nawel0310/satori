"use client";

import { useState } from "react";
import { useDemoData } from "@/context/demo-data-context";
import { TemplateSelector } from "./TemplateSelector";
import { BudgetLineItemsEditor } from "./BudgetLineItemsEditor";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { CategoryBadge } from "@/components/crm/CategoryBadge";
import { StageBadge } from "@/components/crm/StageBadge";
import { BUDGET_STATUS_LABELS } from "@/lib/format";
import { nextBudgetId } from "@/lib/mock-data";
import type { Budget, BudgetLineItem, BudgetStatus } from "@/lib/types";

interface BudgetFormProps {
  initialBudget?: Budget;
  onSubmit: (budget: Budget) => void;
  onCancel: () => void;
}

export function BudgetForm({ initialBudget, onSubmit, onCancel }: BudgetFormProps) {
  const { clients, productions, budgetTemplates } = useDemoData();
  const [budgetId] = useState(() => initialBudget?.id ?? nextBudgetId());
  const [clientId, setClientId] = useState(initialBudget?.clientId ?? clients[0]?.id ?? "");
  const [productionId, setProductionId] = useState(initialBudget?.productionId ?? "");
  const [title, setTitle] = useState(initialBudget?.title ?? "");
  const [status, setStatus] = useState<BudgetStatus>(initialBudget?.status ?? "en_espera");
  const [lineItems, setLineItems] = useState<BudgetLineItem[]>(
    () => initialBudget?.lineItems ?? [{ id: `li-${Date.now()}`, description: "", quantity: 1, unitPrice: 0 }],
  );

  const clientProductions = productions.filter((p) => p.clientId === clientId);
  const selectedProduction = productions.find((p) => p.id === productionId);

  function handleClientChange(id: string) {
    setClientId(id);
    setProductionId("");
  }

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
      productionId: productionId || undefined,
      title: title || "Presupuesto sin título",
      date: initialBudget?.date ?? new Date().toISOString().slice(0, 10),
      status,
      lineItems: validItems.length > 0 ? validItems : lineItems,
    });
  }

  return (
    <Card className="flex flex-col gap-6 p-6">
      <SearchSelect
        label="Cliente"
        options={clients.map((client) => ({ id: client.id, label: client.name }))}
        value={clientId}
        onChange={handleClientChange}
        searchPlaceholder="Buscar cliente…"
      />

      <div className="flex flex-col gap-1.5 sm:w-48">
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

      <SearchSelect
        label="Producciones asociadas"
        options={clientProductions.map((production) => ({ id: production.id, label: production.title }))}
        value={productionId}
        onChange={setProductionId}
        searchPlaceholder="Buscar producción…"
        emptyMessage="Este cliente no tiene producciones cargadas."
        placeholder="Sin producción asociada"
      />

      {selectedProduction ? (
        <div className="rounded-md border border-border bg-surface p-4">
          <p className="text-sm font-medium text-primary">{selectedProduction.title}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <CategoryBadge category={selectedProduction.category} />
            <StageBadge stage={selectedProduction.stage} />
          </div>
        </div>
      ) : null}

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
