"use client";

import { useParams, useRouter, notFound } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { ReminderForm } from "@/components/crm/ReminderForm";

export default function EditarRecordatorioPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { clients, reminders, updateReminder } = useDemoData();

  const reminder = reminders.find((r) => r.id === params.id);
  if (!reminder) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Editar recordatorio</h1>
        <p className="mt-1 text-sm text-secondary">{reminder.text}</p>
      </header>

      <ReminderForm
        clients={clients}
        initialReminder={reminder}
        onCancel={() => router.push("/crm/recordatorios")}
        onSubmit={(input) => {
          updateReminder(reminder.id, input);
          router.push("/crm/recordatorios");
        }}
      />
    </div>
  );
}
