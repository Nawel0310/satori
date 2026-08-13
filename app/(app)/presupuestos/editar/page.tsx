"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BudgetEditView } from "@/components/presupuestos/BudgetEditView";

function EditarPresupuestoPageInner() {
  const searchParams = useSearchParams();
  return <BudgetEditView id={searchParams.get("id") ?? ""} />;
}

export default function EditarPresupuestoPage() {
  return (
    <Suspense fallback={null}>
      <EditarPresupuestoPageInner />
    </Suspense>
  );
}
