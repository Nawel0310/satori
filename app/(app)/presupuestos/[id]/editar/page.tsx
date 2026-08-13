import { BudgetEditView } from "@/components/presupuestos/BudgetEditView";
import { INITIAL_BUDGETS } from "@/lib/mock-data";

export function generateStaticParams() {
  return INITIAL_BUDGETS.map((b) => ({ id: b.id }));
}

export default async function EditarPresupuestoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BudgetEditView id={id} />;
}
