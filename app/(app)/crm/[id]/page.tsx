"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { ClientCard } from "@/components/crm/ClientCard";
import { InteractionTimeline } from "@/components/crm/InteractionTimeline";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/presupuestos/StatusBadge";
import { PIPELINE_STAGE_LABELS, PRODUCTION_CATEGORY_LABELS, budgetTotal, formatCurrency } from "@/lib/format";

export default function ClientDetailPage() {
  const params = useParams<{ id: string }>();
  const { clients, productions, budgets } = useDemoData();

  const client = clients.find((c) => c.id === params.id);
  if (!client) {
    notFound();
  }

  const clientProductions = productions.filter((p) => p.clientId === client.id);
  const clientBudgets = budgets.filter((b) => b.clientId === client.id);

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <Link href="/crm" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver al listado
      </Link>

      <div className="flex flex-col gap-6">
        <ClientCard client={client} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                      href={`/presupuestos/${b.id}/cliente`}
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

        <InteractionTimeline notes={client.notes} />
      </div>
    </div>
  );
}
