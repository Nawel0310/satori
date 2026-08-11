"use client";

import type { ChangeEvent } from "react";
import { CLIENT_TYPE_LABELS, PIPELINE_STAGE_LABELS } from "@/lib/format";
import type { ClientType, PipelineStage } from "@/lib/types";

interface ClientFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: ClientType | "todos";
  onTypeChange: (value: ClientType | "todos") => void;
  stageFilter: PipelineStage | "todas";
  onStageChange: (value: PipelineStage | "todas") => void;
}

export function ClientFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  stageFilter,
  onStageChange,
}: ClientFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <label htmlFor="client-search" className="sr-only">
          Buscar cliente o agencia
        </label>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="client-search"
          type="text"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          placeholder="Buscar cliente o agencia…"
          className="w-full rounded-sm border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <select
        aria-label="Filtrar por tipo de cliente"
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value as ClientType | "todos")}
        className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="todos">Todos los tipos</option>
        {Object.entries(CLIENT_TYPE_LABELS).map(([value, label]) => (
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
    </div>
  );
}
