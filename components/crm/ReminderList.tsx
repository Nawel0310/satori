"use client";

import { useState } from "react";
import { useDemoData } from "@/context/demo-data-context";
import { formatDate } from "@/lib/format";
import type { Reminder } from "@/lib/types";
import { RowAction } from "@/components/ui/RowAction";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface ReminderListProps {
  reminders: Reminder[];
}

export function ReminderList({ reminders }: ReminderListProps) {
  const { clients, toggleReminder, deleteReminder } = useDemoData();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente eliminado";
  }

  const pendingReminder = reminders.find((r) => r.id === pendingDeleteId);

  if (reminders.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-16 text-center">
        <p className="text-sm text-secondary">Ningún recordatorio coincide con el filtro.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-secondary">
              <th scope="col" className="px-5 py-3">
                <span className="sr-only">Hecho</span>
              </th>
              <th scope="col" className="px-5 py-3">
                Recordatorio
              </th>
              <th scope="col" className="px-5 py-3">
                Vencimiento
              </th>
              <th scope="col" className="px-5 py-3">
                Estado
              </th>
              <th scope="col" className="px-5 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.id} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-5 py-4">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={reminder.done}
                    aria-label={reminder.done ? "Marcar como pendiente" : "Marcar como hecho"}
                    onClick={() => toggleReminder(reminder.id)}
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      reminder.done ? "border-primary bg-primary text-white" : "border-secondary"
                    }`}
                  >
                    {reminder.done ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : null}
                  </button>
                </td>
                <td className="px-5 py-4">
                  <p className={`font-medium ${reminder.done ? "text-secondary line-through" : "text-primary"}`}>
                    {reminder.text}
                  </p>
                  <p className="text-xs text-secondary">{clientName(reminder.clientId)}</p>
                </td>
                <td className="px-5 py-4 text-secondary">{formatDate(reminder.dueDate)}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      reminder.done ? "bg-surface text-secondary" : "border border-accent text-accent"
                    }`}
                  >
                    {reminder.done ? "Hecho" : "Pendiente"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <RowAction icon={<PencilIcon />} label="Editar" href={`/recordatorios/editar?id=${reminder.id}`} />
                    <RowAction
                      icon={<TrashIcon />}
                      label="Eliminar"
                      onClick={() => setPendingDeleteId(reminder.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={pendingReminder != null}
        title="¿Eliminar este recordatorio?"
        description={`"${pendingReminder?.text ?? ""}" se va a eliminar de forma permanente.`}
        confirmLabel="Eliminar"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteReminder(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </>
  );
}
