"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import {
  ReminderFilters,
  type ReminderSortDir,
  type ReminderStatusFilter,
} from "@/components/crm/ReminderFilters";
import { ReminderList } from "@/components/crm/ReminderList";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { RemindersIcon } from "@/components/ui/icons";
import { normalizeSearchText } from "@/lib/format";

export default function RecordatoriosPage() {
  const { reminders, clients } = useDemoData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReminderStatusFilter>("todos");
  const [sortDir, setSortDir] = useState<ReminderSortDir>("asc");

  const filteredReminders = useMemo(() => {
    const keyword = normalizeSearchText(search.trim());
    const filtered = reminders.filter((reminder) => {
      const matchesStatus =
        statusFilter === "todos" ||
        (statusFilter === "hecho" ? reminder.done : !reminder.done);
      const clientName = clients.find((c) => c.id === reminder.clientId)?.name ?? "";
      const searchable = normalizeSearchText(`${reminder.text} ${clientName}`);
      const matchesSearch = searchable.includes(keyword);
      return matchesSearch && matchesStatus;
    });
    return [...filtered].sort((a, b) => {
      const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return sortDir === "asc" ? diff : -diff;
    });
  }, [reminders, clients, search, statusFilter, sortDir]);

  const filterKey = `${search}|${statusFilter}`;
  const [page, setPage] = useState(1);
  const [pageFilterKey, setPageFilterKey] = useState(filterKey);
  if (filterKey !== pageFilterKey) {
    setPageFilterKey(filterKey);
    setPage(1);
  }
  const totalPages = Math.max(1, Math.ceil(filteredReminders.length / 10));
  const paginatedReminders = filteredReminders.slice((page - 1) * 10, page * 10);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <RemindersIcon width={28} height={28} className="text-primary" />
            <h1 className="font-heading text-3xl font-bold text-primary">Recordatorios</h1>
          </div>
          <p className="mt-1 text-sm text-secondary">Que ningún cliente se pierda entre tantas producciones.</p>
        </div>
        <Link href="/recordatorios/nuevo">
          <Button>+ Nuevo recordatorio</Button>
        </Link>
      </header>

      <div className="mb-6">
        <ReminderFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortDir={sortDir}
          onSortDirToggle={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
        />
      </div>

      <ReminderList reminders={paginatedReminders} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
