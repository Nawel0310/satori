"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { BudgetTable } from "@/components/presupuestos/BudgetTable";
import { BudgetFilters, type BudgetSortDir, type BudgetSortField } from "@/components/presupuestos/BudgetFilters";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { BudgetsIcon } from "@/components/ui/icons";
import { budgetTotal, normalizeSearchText } from "@/lib/format";
import type { BudgetStatus } from "@/lib/types";

export default function PresupuestosPage() {
  const { budgets, clients } = useDemoData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BudgetStatus | "todos">("todos");
  const [sortField, setSortField] = useState<BudgetSortField>("fecha");
  const [sortDir, setSortDir] = useState<BudgetSortDir>("desc");

  const filteredBudgets = useMemo(() => {
    const keyword = normalizeSearchText(search.trim());
    const filtered = budgets.filter((budget) => {
      const matchesStatus = statusFilter === "todos" || budget.status === statusFilter;
      const clientName = clients.find((c) => c.id === budget.clientId)?.name ?? "";
      const searchable = normalizeSearchText(`${budget.id} ${budget.title} ${clientName}`);
      const matchesSearch = searchable.includes(keyword);
      return matchesSearch && matchesStatus;
    });
    return [...filtered].sort((a, b) => {
      const diff =
        sortField === "fecha"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : budgetTotal(a.lineItems) - budgetTotal(b.lineItems);
      return sortDir === "asc" ? diff : -diff;
    });
  }, [budgets, clients, search, statusFilter, sortField, sortDir]);

  const filterKey = `${search}|${statusFilter}`;
  const [page, setPage] = useState(1);
  const [pageFilterKey, setPageFilterKey] = useState(filterKey);
  if (filterKey !== pageFilterKey) {
    setPageFilterKey(filterKey);
    setPage(1);
  }
  const totalPages = Math.max(1, Math.ceil(filteredBudgets.length / 10));
  const paginatedBudgets = filteredBudgets.slice((page - 1) * 10, page * 10);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <BudgetsIcon width={28} height={28} className="text-primary" />
            <h1 className="font-heading text-3xl font-bold text-primary">Presupuestos</h1>
          </div>
          <p className="mt-1 text-sm text-secondary">Estado siempre visible. Nada perdido en un mail.</p>
        </div>
        <Link href="/presupuestos/nuevo">
          <Button>+ Nuevo presupuesto</Button>
        </Link>
      </header>

      <div className="mb-6">
        <BudgetFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortField={sortField}
          onSortFieldChange={setSortField}
          sortDir={sortDir}
          onSortDirToggle={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
        />
      </div>

      <BudgetTable budgets={paginatedBudgets} clients={clients} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
