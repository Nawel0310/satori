import { ReminderList } from "@/components/crm/ReminderList";

export default function RecordatoriosPage() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Recordatorios</h1>
        <p className="mt-1 text-sm text-secondary">Que ningún cliente se pierda entre tantas producciones.</p>
      </header>
      <ReminderList />
    </div>
  );
}
