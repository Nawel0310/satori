"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ClientEditView } from "@/components/crm/ClientEditView";

function EditarClientePageInner() {
  const searchParams = useSearchParams();
  return <ClientEditView id={searchParams.get("id") ?? ""} />;
}

export default function EditarClientePage() {
  return (
    <Suspense fallback={null}>
      <EditarClientePageInner />
    </Suspense>
  );
}
