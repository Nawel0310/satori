"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TemplateEditView } from "@/components/presupuestos/TemplateEditView";

function EditarPlantillaPageInner() {
  const searchParams = useSearchParams();
  return <TemplateEditView id={searchParams.get("id") ?? ""} />;
}

export default function EditarPlantillaPage() {
  return (
    <Suspense fallback={null}>
      <EditarPlantillaPageInner />
    </Suspense>
  );
}
