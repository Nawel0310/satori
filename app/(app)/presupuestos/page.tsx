"use client";

import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { BudgetTable } from "@/components/presupuestos/BudgetTable";
import { Button } from "@/components/ui/Button";

export default function PresupuestosPage() {
  const { budgets, clients } = useDemoData();

  return (
    <div className="mx-auto max-w-6xl px-8 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Presupuestos</h1>
          <p className="mt-1 text-sm text-secondary">Estado siempre visible — nada perdido en un mail.</p>
        </div>
        <Link href="/presupuestos/nuevo">
          <Button>+ Nuevo presupuesto</Button>
        </Link>
      </header>

      <BudgetTable budgets={budgets} clients={clients} />
    </div>
  );
}
