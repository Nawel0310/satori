"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductionDetailView } from "@/components/crm/ProductionDetailView";

function ProductionDetailPageInner() {
  const searchParams = useSearchParams();
  return <ProductionDetailView id={searchParams.get("id") ?? ""} />;
}

export default function ProductionDetailPage() {
  return (
    <Suspense fallback={null}>
      <ProductionDetailPageInner />
    </Suspense>
  );
}
