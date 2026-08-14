"use client";

import { CLIENT_TYPE_LABELS, PIPELINE_STAGE_LABELS } from "@/lib/format";
import type { Client, ClientType, PipelineStage } from "@/lib/types";
import { SearchInput } from "@/components/ui/SearchInput";

interface ClientFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  clients: Client[];
  clientFilter: string | "todos";
  onClientChange: (value: string | "todos") => void;
  typeFilter: ClientType | "todos";
  onTypeChange: (value: ClientType | "todos") => void;
  stageFilter: PipelineStage | "todas";
  onStageChange: (value: PipelineStage | "todas") => void;
}

export function ClientFilters({
  search,
  onSearchChange,
  clients,
  clientFilter,
  onClientChange,
  typeFilter,
  onTypeChange,
  stageFilter,
  onStageChange,
}: ClientFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Buscar cliente o agencia…"
        aria-label="Buscar cliente o agencia"
      />

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
