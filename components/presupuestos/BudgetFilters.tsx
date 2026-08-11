"use client";

import { BUDGET_STATUS_LABELS } from "@/lib/format";
import type { BudgetStatus, Client } from "@/lib/types";

export type BudgetSortField = "fecha" | "monto";
export type BudgetSortDir = "asc" | "desc";

interface BudgetFiltersProps {
  clients: Client[];
  clientFilter: string | "todos";
  onClientChange: (value: string | "todos") => void;
  statusFilter: BudgetStatus | "todos";
  onStatusChange: (value: BudgetStatus | "todos") => void;
  sortField: BudgetSortField;
  onSortFieldChange: (value: BudgetSortField) => void;
  sortDir: BudgetSortDir;
  onSortDirToggle: () => void;
}

export function BudgetFilters({
  clients,
  clientFilter,
  onClientChange,
  statusFilter,
  onStatusChange,
  sortField,
  onSortFieldChange,
  sortDir,
  onSortDirToggle,
}: BudgetFiltersProps) {
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
        onChange={(e) => onStatusChange(e.target.value as BudgetStatus | "todos")}
        className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="todos">Todos los estados</option>
        {Object.entries(BUDGET_STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <select
          aria-label="Ordenar por"
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value as BudgetSortField)}
          className="rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="fecha">Fecha</option>
          <option value="monto">Monto</option>
        </select>
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
