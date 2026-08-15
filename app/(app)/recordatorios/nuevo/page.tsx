"use client";

import { useRouter } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { ReminderForm } from "@/components/crm/ReminderForm";
import { BackButton } from "@/components/ui/BackButton";

export default function NuevoRecordatorioPage() {
  const router = useRouter();
  const { clients, addReminder } = useDemoData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Nuevo recordatorio</h1>
        <p className="mt-1 text-sm text-secondary">Que ningún seguimiento se pierda.</p>
      </header>

      <ReminderForm
        clients={clients}
        onCancel={() => router.push("/recordatorios")}
        onSubmit={(input) => {
          addReminder(input);
          router.push("/recordatorios");
        }}
      />
    </div>
  );
}
