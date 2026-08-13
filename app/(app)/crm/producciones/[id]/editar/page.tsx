import { ProductionEditView } from "@/components/crm/ProductionEditView";
import { INITIAL_PRODUCTIONS } from "@/lib/mock-data";

export function generateStaticParams() {
  return INITIAL_PRODUCTIONS.map((p) => ({ id: p.id }));
}

export default async function EditarProduccionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductionEditView id={id} />;
}
