"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ClientDetailView } from "@/components/crm/ClientDetailView";

function ClientDetailPageInner() {
  const searchParams = useSearchParams();
  return <ClientDetailView id={searchParams.get("id") ?? ""} />;
}

export default function ClientDetailPage() {
  return (
    <Suspense fallback={null}>
      <ClientDetailPageInner />
    </Suspense>
  );
}
