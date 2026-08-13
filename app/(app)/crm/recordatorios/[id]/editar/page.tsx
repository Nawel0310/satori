import { ReminderEditView } from "@/components/crm/ReminderEditView";
import { INITIAL_REMINDERS } from "@/lib/mock-data";

export function generateStaticParams() {
  return INITIAL_REMINDERS.map((r) => ({ id: r.id }));
}

export default async function EditarRecordatorioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReminderEditView id={id} />;
}
