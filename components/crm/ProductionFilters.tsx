"use client";

import { PIPELINE_STAGE_LABELS, PRODUCTION_CATEGORY_LABELS } from "@/lib/format";
import type { Client, PipelineStage, ProductionCategory } from "@/lib/types";

export type ProductionSortDir = "asc" | "desc";

interface ProductionFiltersProps {
  clients: Client[];
  clientFilter: string | "todos";
  onClientChange: (value: string | "todos") => void;
  categoryFilter: ProductionCategory | "todas";
  onCategoryChange: (value: ProductionCategory | "todas") => void;
  stageFilter: PipelineStage | "todas";
  onStageChange: (value: PipelineStage | "todas") => void;
  sortDir: ProductionSortDir;
  onSortDirToggle: () => void;
}

export function ProductionFilters({
  clients,
  clientFilter,
  onClientChange,
  categoryFilter,
  onCategoryChange,
  stageFilter,
  onStageChange,
  sortDir,
  onSortDirToggle,
}: ProductionFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <select
        aria-label="Filtrar por cliente"
        value={clientFilter}
        onChange={(e) => onClientChange(e.target.value)}
        className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="todos">Todos los clientes</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <select
        aria-label="Filtrar por categoría"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value as ProductionCategory | "todas")}
        className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="todas">Todas las categorías</option>
        {Object.entries(PRODUCTION_CATEGORY_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        aria-label="Filtrar por etapa"
        value={stageFilter}
        onChange={(e) => onStageChange(e.target.value as PipelineStage | "todas")}
        className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="todas">Todas las etapas</option>
        {Object.entries(PIPELINE_STAGE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <span className="text-sm text-secondary">Fecha</span>
        <button
          type="button"
          onClick={onSortDirToggle}
          aria-label={sortDir === "asc" ? "Orden ascendente" : "Orden descendente"}
          className="cursor-pointer rounded-sm border border-border bg-white p-2.5 text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`transition-transform duration-200 ${sortDir === "desc" ? "rotate-180" : ""}`}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
