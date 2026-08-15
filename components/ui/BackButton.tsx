"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/ui/icons";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary"
    >
      <ChevronLeftIcon />
      Volver
    </button>
  );
}
