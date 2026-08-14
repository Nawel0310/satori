"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RowAction } from "@/components/ui/RowAction";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { ProductionFilters, type ProductionSortDir } from "@/components/crm/ProductionFilters";
import { CategoryBadge } from "@/components/crm/CategoryBadge";
import { StageBadge } from "@/components/crm/StageBadge";
import { formatDate, PIPELINE_STAGE_LABELS, PRODUCTION_CATEGORY_LABELS } from "@/lib/format";
import type { PipelineStage, ProductionCategory } from "@/lib/types";

export default function ProduccionesPage() {
  const { productions, clients, deleteProduction } = useDemoData();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState<string | "todos">("todos");
  const [categoryFilter, setCategoryFilter] = useState<ProductionCategory | "todas">("todas");
  const [stageFilter, setStageFilter] = useState<PipelineStage | "todas">("todas");
  const [sortDir, setSortDir] = useState<ProductionSortDir>("asc");

  function client(clientId: string) {
    return clients.find((c) => c.id === clientId);
  }

  const filteredProductions = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const filtered = productions.filter((production) => {
      const matchesClient = clientFilter === "todos" || production.clientId === clientFilter;
      const matchesCategory = categoryFilter === "todas" || production.category === categoryFilter;
      const matchesStage = stageFilter === "todas" || production.stage === stageFilter;
      const searchable = [
        production.title,
        clients.find((c) => c.id === production.clientId)?.name ?? "",
        PRODUCTION_CATEGORY_LABELS[production.category],
        PIPELINE_STAGE_LABELS[production.stage],
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = searchable.includes(keyword);
      return matchesSearch && matchesClient && matchesCategory && matchesStage;
    });
    return [...filtered].sort((a, b) => {
      if (!a.startDate && !b.startDate) return 0;
      if (!a.startDate) return 1;
      if (!b.startDate) return -1;
      const diff = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      return sortDir === "asc" ? diff : -diff;
    });
  }, [productions, clients, search, clientFilter, categoryFilter, stageFilter, sortDir]);

  const pendingProduction = productions.find((p) => p.id === pendingDeleteId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Producciones</h1>
          <p className="mt-1 text-sm text-secondary">Todas las producciones, más allá de en qué etapa estén.</p>
        </div>
        <Link href="/producciones/nueva">
          <Button>+ Nueva producción</Button>
        </Link>
      </header>

      <div className="mb-6">
        <ProductionFilters
          search={search}
          onSearchChange={setSearch}
          clients={clients}
          clientFilter={clientFilter}
          onClientChange={setClientFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          stageFilter={stageFilter}
          onStageChange={setStageFilter}
          sortDir={sortDir}
          onSortDirToggle={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
        />
      </div>

      {filteredProductions.length === 0 ? (
        <div className="rounded-md border border-dashed border-border py-16 text-center">
          <p className="text-sm text-secondary">Ninguna producción coincide con los filtros.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-secondary">
                <th scope="col" className="px-5 py-3">
                  Título
                </th>
                <th scope="col" className="px-5 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-5 py-3">
                  Categoría
                </th>
                <th scope="col" className="px-5 py-3">
                  Etapa
                </th>
                <th scope="col" className="px-5 py-3">
                  Inicio
                </th>
                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProductions.map((production) => {
                const productionClient = client(production.clientId);
                return (
                <tr key={production.id} className="border-b border-border last:border-0 hover:bg-surface">
                  <td className="px-5 py-4 font-medium text-primary">{production.title}</td>
                  <td className="px-5 py-4">
                    {productionClient ? (
                      <Link
                        href={`/crm/detalle?id=${productionClient.id}`}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {productionClient.name}
                      </Link>
                    ) : (
                      <span className="text-secondary">Cliente eliminado</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <CategoryBadge category={production.category} />
                  </td>
                  <td className="px-5 py-4">
                    <StageBadge stage={production.stage} />
                  </td>
                  <td className="px-5 py-4 text-secondary">
                    {production.startDate ? formatDate(production.startDate) : "Sin definir"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <RowAction
                        icon={<PencilIcon />}
                        label="Editar"
                        href={`/producciones/editar?id=${production.id}`}
                      />
                      <RowAction
                        icon={<TrashIcon />}
                        label="Eliminar"
                        onClick={() => setPendingDeleteId(production.id)}
                      />
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={pendingProduction != null}
        title="¿Eliminar esta producción?"
        description={`"${pendingProduction?.title ?? ""}" se va a eliminar. Los presupuestos vinculados se conservan, sin producción asociada.`}
        confirmLabel="Eliminar"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteProduction(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
