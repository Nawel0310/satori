"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ReminderEditView } from "@/components/crm/ReminderEditView";

function EditarRecordatorioPageInner() {
  const searchParams = useSearchParams();
  return <ReminderEditView id={searchParams.get("id") ?? ""} />;
}

export default function EditarRecordatorioPage() {
  return (
    <Suspense fallback={null}>
      <EditarRecordatorioPageInner />
    </Suspense>
  );
}
