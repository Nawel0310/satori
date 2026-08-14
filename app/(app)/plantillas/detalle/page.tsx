"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TemplateDetailView } from "@/components/presupuestos/TemplateDetailView";

function TemplateDetailPageInner() {
  const searchParams = useSearchParams();
  return <TemplateDetailView id={searchParams.get("id") ?? ""} />;
}

export default function TemplateDetailPage() {
  return (
    <Suspense fallback={null}>
      <TemplateDetailPageInner />
    </Suspense>
  );
}
