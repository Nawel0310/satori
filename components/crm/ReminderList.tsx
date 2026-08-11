"use client";

import { useDemoData } from "@/context/demo-data-context";
import { formatDate } from "@/lib/format";
import type { Reminder } from "@/lib/types";

interface ReminderListProps {
  reminders: Reminder[];
}

export function ReminderList({ reminders }: ReminderListProps) {
  const { clients, toggleReminder } = useDemoData();

  function clientName(clientId: string) {
    return clients.find((c) => c.id === clientId)?.name ?? "Cliente eliminado";
  }

  if (reminders.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-16 text-center">
        <p className="text-sm text-secondary">Ningún recordatorio coincide con el filtro.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-border rounded-md border border-border bg-white">
      {reminders.map((reminder) => (
        <li key={reminder.id} className="flex items-center gap-4 px-5 py-4">
          <button
            type="button"
            role="checkbox"
            aria-checked={reminder.done}
            aria-label={reminder.done ? "Marcar como pendiente" : "Marcar como hecho"}
            onClick={() => toggleReminder(reminder.id)}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              reminder.done ? "border-primary bg-primary text-white" : "border-secondary"
            }`}
          >
            {reminder.done ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : null}
          </button>

          <div className="flex-1">
            <p className={`text-sm font-medium ${reminder.done ? "text-secondary line-through" : "text-primary"}`}>
              {reminder.text}
            </p>
            <p className="text-xs text-secondary">{clientName(reminder.clientId)}</p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-secondary">{formatDate(reminder.dueDate)}</p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                reminder.done ? "bg-surface text-secondary" : "border border-accent text-accent"
              }`}
            >
              {reminder.done ? "Hecho" : "Pendiente"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
