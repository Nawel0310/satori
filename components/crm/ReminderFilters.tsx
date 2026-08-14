"use client";

import { SearchInput } from "@/components/ui/SearchInput";

export type ReminderSortDir = "asc" | "desc";
export type ReminderStatusFilter = "todos" | "pendiente" | "hecho";

interface ReminderFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: ReminderStatusFilter;
  onStatusChange: (value: ReminderStatusFilter) => void;
  sortDir: ReminderSortDir;
  onSortDirToggle: () => void;
}

export function ReminderFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortDir,
  onSortDirToggle,
}: ReminderFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Buscar por texto o cliente…"
        aria-label="Buscar recordatorio"
      />

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
