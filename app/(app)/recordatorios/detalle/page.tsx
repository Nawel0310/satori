"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ReminderDetailView } from "@/components/crm/ReminderDetailView";

function ReminderDetailPageInner() {
  const searchParams = useSearchParams();
  return <ReminderDetailView id={searchParams.get("id") ?? ""} />;
}

export default function ReminderDetailPage() {
  return (
    <Suspense fallback={null}>
      <ReminderDetailPageInner />
    </Suspense>
  );
}
