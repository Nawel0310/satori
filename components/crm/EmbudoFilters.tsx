"use client";

import { SearchInput } from "@/components/ui/SearchInput";

interface EmbudoFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function EmbudoFilters({ search, onSearchChange }: EmbudoFiltersProps) {
  return (
    <SearchInput
      value={search}
      onChange={onSearchChange}
      placeholder="Buscar por título, cliente, categoría o etapa…"
      aria-label="Buscar producción"
    />
  );
}
