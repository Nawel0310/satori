import type { BudgetStatus } from "@/lib/types";

const STATUS_CONFIG: Record<BudgetStatus, { label: string; className: string; icon: string }> = {
  enviado: {
    label: "Enviado",
    className: "border-secondary text-secondary",
    icon: "M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z",
  },
  visto: {
    label: "Visto",
    className: "border-accent text-accent",
    icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  aprobado: {
    label: "Aprobado",
    className: "border-primary bg-primary text-white",
    icon: "M20 6 9 17l-5-5",
  },
  vencido: {
    label: "Vencido",
    className: "border-secondary/60 text-secondary/70",
    icon: "M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
  },
};

export function StatusBadge({ status }: { status: BudgetStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      <svg
        aria-hidden="true"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={config.icon} />
      </svg>
      {config.label}
    </span>
  );
}
