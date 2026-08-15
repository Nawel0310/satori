"use client";

import { useRouter } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { BudgetForm } from "@/components/presupuestos/BudgetForm";
import { BackButton } from "@/components/ui/BackButton";

export default function NuevoPresupuestoPage() {
  const router = useRouter();
  const { addBudget } = useDemoData();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Nuevo presupuesto</h1>
        <p className="mt-1 text-sm text-secondary">Esto que hacías a mano, ahora en minutos.</p>
      </header>

      <BudgetForm
        onCancel={() => router.back()}
        onSubmit={(budget) => {
          addBudget(budget);
          router.back();
        }}
      />
    </div>
  );
}
