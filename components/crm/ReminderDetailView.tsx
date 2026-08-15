"use client";

import { useRouter, notFound } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";

export function ReminderDetailView({ id }: { id: string }) {
  const router = useRouter();
  const { reminders, clients, toggleReminder, deleteReminder } = useDemoData();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const reminder = reminders.find((r) => r.id === id);
  if (!reminder) {
    notFound();
  }

  const client = clients.find((c) => c.id === reminder.clientId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver
        </button>
        <div className="flex gap-3">
          <Link href={`/recordatorios/editar?id=${reminder.id}`}>
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
        title="¿Eliminar este recordatorio?"
        description={`"${reminder.text}" se va a eliminar de forma permanente.`}
        confirmLabel="Eliminar"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteReminder(reminder.id);
          router.push("/recordatorios");
        }}
      />

      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-xl font-medium ${reminder.done ? "text-secondary line-through" : "text-primary"}`}>
              {reminder.text}
            </p>
            {client ? (
              <Link href={`/crm/detalle?id=${client.id}`} className="mt-1 inline-block text-sm text-secondary underline-offset-4 hover:underline">
                {client.name}
              </Link>
            ) : (
              <p className="mt-1 text-sm text-secondary">Cliente eliminado</p>
            )}
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
              reminder.done ? "bg-surface text-secondary" : "border border-accent text-accent"
            }`}
          >
            {reminder.done ? "Hecho" : "Pendiente"}
          </span>
        </div>

        <dl className="mt-6 border-t border-border pt-5">
          <dt className="text-xs text-secondary">Vencimiento</dt>
          <dd className="text-sm font-medium text-primary">{formatDate(reminder.dueDate)}</dd>
        </dl>

        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => toggleReminder(reminder.id)}
        >
          {reminder.done ? "Marcar como pendiente" : "Marcar como hecho"}
        </Button>
      </Card>
    </div>
  );
}
