"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductionEditView } from "@/components/crm/ProductionEditView";

function EditarProduccionPageInner() {
  const searchParams = useSearchParams();
  return <ProductionEditView id={searchParams.get("id") ?? ""} />;
}

export default function EditarProduccionPage() {
  return (
    <Suspense fallback={null}>
      <EditarProduccionPageInner />
    </Suspense>
  );
}
