"use client";

import { useRouter, notFound } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { CategoryBadge } from "@/components/crm/CategoryBadge";
import { StageBadge } from "@/components/crm/StageBadge";
import { StatusBadge } from "@/components/presupuestos/StatusBadge";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { budgetTotal, formatCurrency, formatDate } from "@/lib/format";

export function ProductionDetailView({ id }: { id: string }) {
  const router = useRouter();
  const { productions, clients, budgets, deleteProduction } = useDemoData();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const production = productions.find((p) => p.id === id);
  if (!production) {
    notFound();
  }

  const client = clients.find((c) => c.id === production.clientId);
  const linkedBudgets = budgets.filter((b) => b.productionId === production.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link href="/producciones" className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver al listado
        </Link>
        <div className="flex gap-3">
          <Link href={`/producciones/editar?id=${production.id}`}>
            <Button variant="secondary" icon={<PencilIcon />}>
              Editar
            </Button>
          </Link>
          <Button variant="danger" icon={<TrashIcon />} onClick={() => setConfirmingDelete(true)}>
            Eliminar
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingDelete}
        title="¿Eliminar esta producción?"
        description={`"${production.title}" se va a eliminar. Los presupuestos vinculados se conservan, sin producción asociada.`}
        confirmLabel="Eliminar"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteProduction(production.id);
          router.push("/producciones");
        }}
      />

      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CategoryBadge category={production.category} />
              <h1 className="font-heading mt-2 text-2xl font-bold text-primary">{production.title}</h1>
              {client ? (
                <Link href={`/crm/detalle?id=${client.id}`} className="mt-1 inline-block text-sm text-secondary underline-offset-4 hover:underline">
                  {client.name}
                </Link>
              ) : (
                <p className="mt-1 text-sm text-secondary">Cliente eliminado</p>
              )}
            </div>
            <StageBadge stage={production.stage} />
          </div>

          {production.description ? (
            <p className="mt-4 text-sm text-secondary">{production.description}</p>
          ) : null}

          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-secondary">Inicio</dt>
              <dd className="text-sm font-medium text-primary">
                {production.startDate ? formatDate(production.startDate) : "Sin definir"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="font-heading text-lg font-semibold text-primary">Presupuestos vinculados</h2>
          {linkedBudgets.length === 0 ? (
            <p className="mt-3 text-sm text-secondary">Sin presupuestos vinculados.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {linkedBudgets.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/presupuestos/cliente?id=${b.id}`}
                    className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0 hover:opacity-80"
                  >
                    <div>
                      <p className="text-sm font-medium text-primary">{b.id}</p>
                      <p className="text-xs text-secondary">{formatCurrency(budgetTotal(b.lineItems))}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
