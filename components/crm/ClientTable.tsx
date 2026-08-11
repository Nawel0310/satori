import Link from "next/link";
import type { Client, Production } from "@/lib/types";
import { CLIENT_TYPE_LABELS, PIPELINE_STAGE_LABELS, formatDate } from "@/lib/format";

const STAGE_STYLES: Record<Production["stage"], string> = {
  contacto: "border-secondary text-secondary",
  propuesta: "border-accent text-accent",
  ganado: "border-primary bg-primary text-white",
  perdido: "border-secondary/50 text-secondary/70 line-through decoration-1",
};

interface ClientTableProps {
  clients: Client[];
  productions: Production[];
}

export function ClientTable({ clients, productions }: ClientTableProps) {
  function primaryProduction(clientId: string): Production | undefined {
    return productions.find((p) => p.clientId === clientId);
  }

  if (clients.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-16 text-center">
        <p className="text-sm text-secondary">Ningún cliente coincide con la búsqueda o los filtros.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-secondary">
            <th scope="col" className="px-5 py-3">
              Cliente / Agencia
            </th>
            <th scope="col" className="px-5 py-3">
              Tipo de producción
            </th>
            <th scope="col" className="px-5 py-3">
              Etapa actual
            </th>
            <th scope="col" className="px-5 py-3">
              Último contacto
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const production = primaryProduction(client.id);
            return (
              <tr key={client.id} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-5 py-4">
                  <Link href={`/crm/${client.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
                    {client.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-secondary">{CLIENT_TYPE_LABELS[client.type]}</p>
                </td>
                <td className="px-5 py-4 text-secondary">{production?.title ?? "Sin producción asociada"}</td>
                <td className="px-5 py-4">
                  {production ? (
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${STAGE_STYLES[production.stage]}`}
                    >
                      {PIPELINE_STAGE_LABELS[production.stage]}
                    </span>
                  ) : (
                    <span className="text-secondary">Sin etapa</span>
                  )}
                </td>
                <td className="px-5 py-4 text-secondary">{formatDate(client.lastContactDate)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
