"use client";

import type { Client } from "@/lib/types";

export type ReminderSortDir = "asc" | "desc";
export type ReminderStatusFilter = "todos" | "pendiente" | "hecho";

interface ReminderFiltersProps {
  clients: Client[];
  clientFilter: string | "todos";
  onClientChange: (value: string | "todos") => void;
  statusFilter: ReminderStatusFilter;
  onStatusChange: (value: ReminderStatusFilter) => void;
  sortDir: ReminderSortDir;
  onSortDirChange: (value: ReminderSortDir) => void;
}

export function ReminderFilters({
  clients,
  clientFilter,
  onClientChange,
  statusFilter,
  onStatusChange,
  sortDir,
  onSortDirChange,
}: ReminderFiltersProps) {
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
        aria-label="Filtrar por estado"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as ReminderStatusFilter)}
        className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="todos">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="hecho">Hecho</option>
      </select>

      <select
        aria-label="Ordenar por fecha"
        value={sortDir}
        onChange={(e) => onSortDirChange(e.target.value as ReminderSortDir)}
        className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="asc">Próximas primero</option>
        <option value="desc">Lejanas primero</option>
      </select>
    </div>
  );
}
