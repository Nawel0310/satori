"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PIPELINE_STAGE_LABELS, PRODUCTION_CATEGORY_LABELS } from "@/lib/format";
import type { Client, PipelineStage, Production, ProductionCategory } from "@/lib/types";

interface ProductionFormProps {
  clients: Client[];
  initialProduction?: Production;
  defaultClientId?: string;
  onSubmit: (input: Omit<Production, "id">) => void;
  onCancel: () => void;
}

export function ProductionForm({
  clients,
  initialProduction,
  defaultClientId,
  onSubmit,
  onCancel,
}: ProductionFormProps) {
  const [clientId, setClientId] = useState(
    initialProduction?.clientId ?? defaultClientId ?? clients[0]?.id ?? "",
  );
  const [title, setTitle] = useState(initialProduction?.title ?? "");
  const [category, setCategory] = useState<ProductionCategory>(initialProduction?.category ?? "drone");
  const [stage, setStage] = useState<PipelineStage>(initialProduction?.stage ?? "contacto");
  const [startDate, setStartDate] = useState(initialProduction?.startDate ?? "");

  function handleSubmit() {
    onSubmit({
      clientId,
      title,
      category,
      stage,
      startDate: startDate || undefined,
    });
  }

  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="production-client" className="text-sm font-medium text-primary">
          Cliente
        </label>
        <select
          id="production-client"
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

      <Input
        label="Título de la producción"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ej: Video drone lanzamiento"
        required
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="production-category" className="text-sm font-medium text-primary">
            Categoría
          </label>
          <select
            id="production-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductionCategory)}
            className="w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(PRODUCTION_CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="production-stage" className="text-sm font-medium text-primary">
            Etapa
          </label>
          <select
            id="production-stage"
            value={stage}
            onChange={(e) => setStage(e.target.value as PipelineStage)}
            className="w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(PIPELINE_STAGE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Fecha de inicio"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <div className="flex justify-end gap-3 border-t border-border pt-5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Guardar producción
        </Button>
      </div>
    </Card>
  );
}
