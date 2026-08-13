"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BudgetClientView } from "@/components/presupuestos/BudgetClientView";

function BudgetClientViewPageInner() {
  const searchParams = useSearchParams();
  return <BudgetClientView id={searchParams.get("id") ?? ""} />;
}

export default function BudgetClientViewPage() {
  return (
    <Suspense fallback={null}>
      <BudgetClientViewPageInner />
    </Suspense>
  );
}
