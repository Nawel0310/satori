import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface SummaryCardProps {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}

export function SummaryCard({ label, value, detail, icon }: SummaryCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{label}</span>
        <span aria-hidden="true" className="text-primary/70">
          {icon}
        </span>
      </div>
      <p className="font-heading text-4xl font-bold text-primary">{value}</p>
      <p className="text-sm text-secondary">{detail}</p>
    </Card>
  );
}
