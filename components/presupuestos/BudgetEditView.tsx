"use client";

import { useRouter, notFound } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { BudgetForm } from "@/components/presupuestos/BudgetForm";
import { BackButton } from "@/components/ui/BackButton";

export function BudgetEditView({ id }: { id: string }) {
  const router = useRouter();
  const { budgets, updateBudget } = useDemoData();

  const budget = budgets.find((b) => b.id === id);
  if (!budget) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{budget.id}</p>
        <h1 className="font-heading mt-1 text-3xl font-bold text-primary">Editar presupuesto</h1>
      </header>

      <BudgetForm
        initialBudget={budget}
        onCancel={() => router.back()}
        onSubmit={(updated) => {
          updateBudget(budget.id, updated);
          router.back();
        }}
      />
    </div>
  );
}
