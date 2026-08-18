"use client";

import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { Card } from "@/components/ui/Card";
import { DashboardIcon } from "@/components/ui/icons";
import { StageBadge } from "@/components/crm/StageBadge";
import { formatDate } from "@/lib/format";
import type { PipelineStage } from "@/lib/types";

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

const groupIcon = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const subIcon = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STAGE_ORDER: PipelineStage[] = ["propuesta", "aprobada", "en_produccion", "finalizada", "cancelada"];

const QUICK_GROUPS = [
  {
    href: "/clientes",
    title: "Gestión Clientes",
    description: "Clientes y agencias",
    icon: (
      <svg {...groupIcon}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    sub: {
      href: "/recordatorios",
      title: "Recordatorios",
      icon: (
        <svg {...subIcon}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
    },
  },
  {
    href: "/producciones",
    title: "Producciones",
    description: "Todas las producciones",
    icon: (
      <svg {...groupIcon}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m10 9 5 3-5 3z" />
      </svg>
    ),
    sub: {
      href: "/embudo",
      title: "Embudo",
      icon: (
        <svg {...subIcon}>
          <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />
        </svg>
      ),
    },
  },
  {
    href: "/presupuestos",
    title: "Presupuestos",
    description: "Armar y enviar",
    icon: (
      <svg {...groupIcon}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
    sub: {
      href: "/plantillas",
      title: "Plantillas",
      icon: (
        <svg {...subIcon}>
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      ),
    },
  },
];

export default function DashboardPage() {
  const { productions, budgets, reminders, clients } = useDemoData();

  const activeProductions = productions.filter((p) => p.stage !== "cancelada" && p.stage !== "finalizada");
  const pendingBudgets = budgets.filter((b) => b.status === "enviado" || b.status === "visto");
  const pendingReminders = reminders.filter((r) => !r.done);

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente";
  }

  function stageCount(stage: PipelineStage) {
    return productions.filter((p) => p.stage === stage).length;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <DashboardIcon width={28} height={28} className="text-primary" />
          <h1 className="font-heading text-3xl font-bold text-primary">Panorama general</h1>
        </div>
        <p className="mt-1 text-sm text-secondary">Esto es lo que vas a ver todos los días.</p>
      </header>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <SummaryCard
          label="Producciones activas"
          value={String(activeProductions.length)}
          detail="En curso entre propuesta, aprobada y producción"
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
          label="Recordatorios pendientes"
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

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-bold text-primary">Accesos rápidos</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {QUICK_GROUPS.map((group) => (
            <Card key={group.href} className="p-5">
              <Link
                href={group.href}
                className="-m-2 flex items-center gap-4 rounded-sm p-2 transition-colors duration-200 hover:bg-surface"
              >
                <span aria-hidden="true" className="text-primary/70">
                  {group.icon}
                </span>
                <span>
                  <span className="block font-heading text-lg font-semibold uppercase tracking-wide text-primary">
                    {group.title}
                  </span>
                  <span className="block text-sm text-secondary">{group.description}</span>
                </span>
              </Link>
              <div className="ml-6 mt-3 flex flex-col gap-1 border-l border-border pl-3">
                <Link
                  href={group.sub.href}
                  className="-my-1 flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-base font-medium text-secondary transition-colors duration-200 hover:bg-surface hover:text-primary"
                >
                  <span aria-hidden="true">{group.sub.icon}</span>
                  {group.sub.title}
                </Link>
              </div>
            </Card>
          ))}
        </div>
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
          <Link href="/recordatorios" className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4">
            Ver todos los recordatorios
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="font-heading text-lg font-semibold text-primary">Embudo</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {STAGE_ORDER.map((stage) => (
              <li key={stage} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <StageBadge stage={stage} />
                <span className="text-sm font-medium text-primary">{stageCount(stage)}</span>
              </li>
            ))}
          </ul>
          <Link href="/embudo" className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4">
            Ver embudo completo
          </Link>
        </Card>
      </section>
    </div>
  );
}
