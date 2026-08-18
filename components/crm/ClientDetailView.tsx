"use client";

import { useRouter, notFound } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { ClientCard } from "@/components/crm/ClientCard";
import { InteractionTimeline } from "@/components/crm/InteractionTimeline";
import { Card } from "@/components/ui/Card";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { StatusBadge } from "@/components/presupuestos/StatusBadge";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import {
  PIPELINE_STAGE_LABELS,
  PRODUCTION_CATEGORY_LABELS,
  budgetTotal,
  formatCurrency,
  formatDate,
} from "@/lib/format";

export function ClientDetailView({ id }: { id: string }) {
  const router = useRouter();
  const { clients, productions, budgets, reminders, deleteClient } = useDemoData();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const client = clients.find((c) => c.id === id);
  if (!client) {
    notFound();
  }

  const clientProductions = productions.filter((p) => p.clientId === client.id);
  const clientBudgets = budgets.filter((b) => b.clientId === client.id);
  const clientReminders = reminders.filter((r) => r.clientId === client.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <BackButton />
        <div className="flex gap-3">
          <Link href={`/clientes/detalle/editar?id=${client.id}`}>
            <Button variant="secondary" icon={<PencilIcon />}>
              Editar
            </Button>
          </Link>
          <Button variant="danger" icon={<TrashIcon />} onClick={() => setConfirmingDelete(true)}>
            Eliminar cliente
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingDelete}
        title="¿Eliminar este cliente?"
        description={`Esto también va a eliminar ${clientProductions.length} producción(es), ${clientBudgets.length} presupuesto(s) y ${clientReminders.length} recordatorio(s) vinculados. La acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteClient(client.id);
          router.back();
        }}
      />

      <div className="flex flex-col gap-6">
        <ClientCard client={client} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="font-heading text-lg font-semibold text-primary">Producciones</h2>
            {clientProductions.length === 0 ? (
              <p className="mt-3 text-sm text-secondary">Sin producciones asociadas.</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {clientProductions.map((p) => (
                  <li key={p.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-primary">{p.title}</p>
                      <p className="text-xs text-secondary">{PRODUCTION_CATEGORY_LABELS[p.category]}</p>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide text-secondary">
                      {PIPELINE_STAGE_LABELS[p.stage]}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-heading text-lg font-semibold text-primary">Presupuestos</h2>
            {clientBudgets.length === 0 ? (
              <p className="mt-3 text-sm text-secondary">Sin presupuestos vinculados.</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {clientBudgets.map((b) => (
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

          <Card className="p-6">
            <h2 className="font-heading text-lg font-semibold text-primary">Recordatorios vinculados</h2>
            {clientReminders.length === 0 ? (
              <p className="mt-3 text-sm text-secondary">Sin recordatorios vinculados.</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {clientReminders.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/recordatorios/editar?id=${r.id}`}
                      className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0 hover:opacity-80"
                    >
                      <div>
                        <p className={`text-sm font-medium ${r.done ? "text-secondary line-through" : "text-primary"}`}>
                          {r.text}
                        </p>
                        <p className="text-xs text-secondary">{formatDate(r.dueDate)}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          r.done ? "bg-surface text-secondary" : "border border-accent text-accent"
                        }`}
                      >
                        {r.done ? "Hecho" : "Pendiente"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <InteractionTimeline clientId={client.id} notes={client.notes} />
      </div>
    </div>
  );
}
