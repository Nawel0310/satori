"use client";

import { useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PIPELINE_STAGE_LABELS, PRODUCTION_CATEGORY_LABELS, formatDate } from "@/lib/format";

export default function ProduccionesPage() {
  const { productions, clients, deleteProduction } = useDemoData();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente eliminado";
  }

  const pendingProduction = productions.find((p) => p.id === pendingDeleteId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Producciones</h1>
          <p className="mt-1 text-sm text-secondary">Todas las producciones, más allá de en qué etapa estén.</p>
        </div>
        <Link href="/crm/producciones/nueva">
          <Button>+ Nueva producción</Button>
        </Link>
      </header>

      {productions.length === 0 ? (
        <div className="rounded-md border border-dashed border-border py-16 text-center">
          <p className="text-sm text-secondary">Todavía no hay producciones cargadas.</p>
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
              {productions.map((production) => (
                <tr key={production.id} className="border-b border-border last:border-0 hover:bg-surface">
                  <td className="px-5 py-4 font-medium text-primary">{production.title}</td>
                  <td className="px-5 py-4 text-secondary">{clientName(production.clientId)}</td>
                  <td className="px-5 py-4 text-secondary">{PRODUCTION_CATEGORY_LABELS[production.category]}</td>
                  <td className="px-5 py-4 text-secondary">{PIPELINE_STAGE_LABELS[production.stage]}</td>
                  <td className="px-5 py-4 text-secondary">
                    {production.startDate ? formatDate(production.startDate) : "Sin definir"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/crm/producciones/${production.id}/editar`}
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(production.id)}
                        className="cursor-pointer text-sm font-medium text-secondary hover:text-primary"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
