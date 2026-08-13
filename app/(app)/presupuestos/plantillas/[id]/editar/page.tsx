import { TemplateEditView } from "@/components/presupuestos/TemplateEditView";
import { INITIAL_BUDGET_TEMPLATES } from "@/lib/mock-data";

export function generateStaticParams() {
  return INITIAL_BUDGET_TEMPLATES.map((t) => ({ id: t.id }));
}

export default async function EditarPlantillaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TemplateEditView id={id} />;
}
