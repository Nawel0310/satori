"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { BUDGET_TEMPLATES, nextBudgetId } from "@/lib/mock-data";
import { TemplateSelector } from "@/components/presupuestos/TemplateSelector";
import { BudgetLineItemsEditor } from "@/components/presupuestos/BudgetLineItemsEditor";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { BudgetLineItem } from "@/lib/types";

export default function NuevoPresupuestoPage() {
  const router = useRouter();
  const { clients, addBudget } = useDemoData();
  const [budgetId] = useState(() => nextBudgetId());
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [lineItems, setLineItems] = useState<BudgetLineItem[]>(() => [
    { id: `li-${Date.now()}`, description: "", quantity: 1, unitPrice: 0 },
  ]);

  function applyTemplate(templateId: string) {
    const template = BUDGET_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;
    setTitle(template.name);
    setLineItems(
      template.lineItems.map((item, index) => ({ ...item, id: `li-${Date.now()}-${index}` })),
    );
  }

  function handleSubmit() {
    const validItems = lineItems.filter((item) => item.description.trim() !== "");
    addBudget({
      id: budgetId,
      clientId,
      title: title || "Presupuesto sin título",
      date: new Date().toISOString().slice(0, 10),
      status: "enviado",
      lineItems: validItems.length > 0 ? validItems : lineItems,
    });
    router.push(`/presupuestos/${budgetId}/cliente`);
  }

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{budgetId}</p>
        <h1 className="font-heading mt-1 text-3xl font-bold text-primary">Nuevo presupuesto</h1>
        <p className="mt-1 text-sm text-secondary">Esto que hacías a mano, ahora en minutos.</p>
      </header>

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

          <TemplateSelector onSelect={applyTemplate} />
        </div>

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
          <Button type="button" variant="secondary" onClick={() => router.push("/presupuestos")}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Guardar y enviar
          </Button>
        </div>
      </Card>
    </div>
  );
}
