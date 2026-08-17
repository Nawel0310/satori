"use client";

import { useDemoData } from "@/context/demo-data-context";
import { Toast } from "@/components/ui/Toast";

export function AppToast() {
  const { toast } = useDemoData();
  return <Toast open={!!toast} message={toast?.message} icon={toast?.icon} />;
}
