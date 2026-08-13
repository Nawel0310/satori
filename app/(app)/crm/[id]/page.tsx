import { ClientDetailView } from "@/components/crm/ClientDetailView";
import { INITIAL_CLIENTS } from "@/lib/mock-data";

export function generateStaticParams() {
  return INITIAL_CLIENTS.map((c) => ({ id: c.id }));
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientDetailView id={id} />;
}
