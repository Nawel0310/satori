"use client";

import type { Client } from "@/lib/types";
import { SearchInput } from "@/components/ui/SearchInput";

interface EmbudoFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  clients: Client[];
  clientFilter: string | "todos";
  onClientChange: (value: string | "todos") => void;
}

export function EmbudoFilters({
  search,
  onSearchChange,
  clients,
  clientFilter,
  onClientChange,
}: EmbudoFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Buscar por título, cliente, categoría o etapa…"
        aria-label="Buscar producción"
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
    </div>
  );
}
