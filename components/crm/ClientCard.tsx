import { Card } from "@/components/ui/Card";
import { CLIENT_TYPE_LABELS, formatDate } from "@/lib/format";
import type { Client } from "@/lib/types";
import { ClientLogo } from "@/components/crm/ClientLogo";

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ClientCard({ client }: { client: Client }) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <ClientLogo name={client.name} logoUrl={client.logoUrl} size="md" />
        <div className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            {CLIENT_TYPE_LABELS[client.type]}
          </span>
          <h1 className="font-heading mt-1 text-3xl font-bold text-primary">{client.name}</h1>
        </div>
        <div className="text-right text-xs text-secondary">
          <p>Último contacto</p>
          <p className="font-medium text-primary">{formatDate(client.lastContactDate)}</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <svg {...iconProps} className="mt-0.5 text-secondary" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
          </svg>
          <div>
            <dt className="text-xs text-secondary">Contacto</dt>
            <dd className="text-sm font-medium text-primary">{client.contactName}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <svg {...iconProps} className="mt-0.5 text-secondary" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 6-10 7L2 6" />
          </svg>
          <div>
            <dt className="text-xs text-secondary">Email</dt>
            <dd className="text-sm font-medium text-primary">{client.contactEmail}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <svg {...iconProps} className="mt-0.5 text-secondary" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
          </svg>
          <div>
            <dt className="text-xs text-secondary">Teléfono</dt>
            <dd className="text-sm font-medium text-primary">{client.contactPhone}</dd>
          </div>
        </div>
      </dl>
    </Card>
  );
}
