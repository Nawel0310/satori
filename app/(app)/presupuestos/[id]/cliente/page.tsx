import { BudgetClientView } from "@/components/presupuestos/BudgetClientView";
import { INITIAL_BUDGETS } from "@/lib/mock-data";

export function generateStaticParams() {
  return INITIAL_BUDGETS.map((b) => ({ id: b.id }));
}

export default async function BudgetClientViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BudgetClientView id={id} />;
}
