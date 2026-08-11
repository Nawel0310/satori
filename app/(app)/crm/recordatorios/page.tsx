"use client";

import { useMemo, useState } from "react";
import { useDemoData } from "@/context/demo-data-context";
import { ReminderFilters, type ReminderSortDir } from "@/components/crm/ReminderFilters";
import { ReminderList } from "@/components/crm/ReminderList";

export default function RecordatoriosPage() {
  const { reminders, clients } = useDemoData();
  const [clientFilter, setClientFilter] = useState<string | "todos">("todos");
  const [sortDir, setSortDir] = useState<ReminderSortDir>("asc");

  const filteredReminders = useMemo(() => {
    const filtered = reminders.filter(
      (reminder) => clientFilter === "todos" || reminder.clientId === clientFilter,
    );
    return [...filtered].sort((a, b) => {
      const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return sortDir === "asc" ? diff : -diff;
    });
  }, [reminders, clientFilter, sortDir]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Recordatorios</h1>
        <p className="mt-1 text-sm text-secondary">Que ningún cliente se pierda entre tantas producciones.</p>
      </header>

      <div className="mb-6">
        <ReminderFilters
          clients={clients}
          clientFilter={clientFilter}
          onClientChange={setClientFilter}
          sortDir={sortDir}
          onSortDirChange={setSortDir}
        />
      </div>

      <ReminderList reminders={filteredReminders} />
    </div>
  );
}
