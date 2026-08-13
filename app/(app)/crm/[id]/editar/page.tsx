import { ClientEditView } from "@/components/crm/ClientEditView";
import { INITIAL_CLIENTS } from "@/lib/mock-data";

export function generateStaticParams() {
  return INITIAL_CLIENTS.map((c) => ({ id: c.id }));
}

export default async function EditarClientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientEditView id={id} />;
}
