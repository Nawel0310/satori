"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BudgetLineItemsEditor } from "./BudgetLineItemsEditor";
import type { BudgetLineItem, BudgetTemplate } from "@/lib/types";

interface TemplateFormProps {
  initialTemplate?: BudgetTemplate;
  onSubmit: (input: Omit<BudgetTemplate, "id">) => void;
  onCancel: () => void;
}

export function TemplateForm({ initialTemplate, onSubmit, onCancel }: TemplateFormProps) {
  const [name, setName] = useState(initialTemplate?.name ?? "");
  const [lineItems, setLineItems] = useState<BudgetLineItem[]>(() =>
    initialTemplate
      ? initialTemplate.lineItems.map((item, index) => ({ ...item, id: `li-${Date.now()}-${index}` }))
      : [{ id: `li-${Date.now()}`, description: "", quantity: 1, unitPrice: 0 }],
  );

  function handleSubmit() {
    const validItems = lineItems.filter((item) => item.description.trim() !== "");
    onSubmit({
      name: name || "Plantilla sin título",
      lineItems: (validItems.length > 0 ? validItems : lineItems).map(({ description, quantity, unitPrice }) => ({
        description,
        quantity,
        unitPrice,
      })),
    });
  }

  return (
    <Card className="flex flex-col gap-6 p-6">
      <Input
        label="Nombre de la plantilla"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: Video institucional 2 días + dron + edición"
        required
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
          Guardar plantilla
        </Button>
      </div>
    </Card>
  );
}
