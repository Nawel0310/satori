"use client";

import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/format";

const icon = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function DashboardPage() {
  const { productions, budgets, reminders, clients } = useDemoData();

  const activeProductions = productions.filter((p) => p.stage !== "perdido");
  const pendingBudgets = budgets.filter((b) => b.status === "enviado" || b.status === "visto");
  const pendingReminders = reminders.filter((r) => !r.done);

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Panorama general</h1>
        <p className="mt-1 text-sm text-secondary">Esto es lo que vas a ver todos los días.</p>
      </header>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <SummaryCard
          label="Producciones activas"
          value={String(activeProductions.length)}
          detail="En curso entre contacto, propuesta y ganado"
          icon={
            <svg {...icon}>
              <path d="m22 8-6 4 6 4V8Z" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
            </svg>
          }
        />
        <SummaryCard
          label="Presupuestos pendientes"
          value={String(pendingBudgets.length)}
          detail="Esperando aprobación del cliente"
          icon={
            <svg {...icon}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
          }
        />
        <SummaryCard
          label="Recordatorios de hoy"
          value={String(pendingReminders.length)}
          detail="Seguimientos por hacer"
          icon={
            <svg {...icon}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          }
        />
      </section>

      <section className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-heading text-lg font-semibold text-primary">Recordatorios</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {pendingReminders.slice(0, 4).map((reminder) => (
              <li key={reminder.id} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-primary">
                    {reminder.text}, {clientName(reminder.clientId)}
                  </p>
                  <p className="text-xs text-secondary">{formatDate(reminder.dueDate)}</p>
                </div>
              </li>
            ))}
            {pendingReminders.length === 0 ? (
              <p className="text-sm text-secondary">No hay recordatorios pendientes.</p>
            ) : null}
          </ul>
          <Link href="/crm/recordatorios" className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4">
            Ver todos los recordatorios
          </Link>
        </Card>

        <div className="flex flex-col gap-5">
          <Link href="/crm" className="block">
            <Card className="flex items-center justify-between p-6 transition-colors duration-200 hover:border-primary">
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">Ir al CRM</h3>
                <p className="mt-1 text-sm text-secondary">Clientes, agencias y el embudo de propuestas.</p>
              </div>
              <svg {...icon}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Card>
          </Link>
          <Link href="/presupuestos" className="block">
            <Card className="flex items-center justify-between p-6 transition-colors duration-200 hover:border-primary">
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">Ir a Presupuestos</h3>
                <p className="mt-1 text-sm text-secondary">Armar, enviar y ver el estado de cada uno.</p>
              </div>
              <svg {...icon}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
