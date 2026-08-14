import Link from "next/link";
import type { Client, Production } from "@/lib/types";
import { CLIENT_TYPE_LABELS, formatDate } from "@/lib/format";
import { StageBadge } from "@/components/crm/StageBadge";
import { ClientLogo } from "@/components/crm/ClientLogo";

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
              Logo
            </th>
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
                  <ClientLogo name={client.name} logoUrl={client.logoUrl} size="sm" />
                </td>
                <td className="px-5 py-4">
                  <Link href={`/crm/detalle?id=${client.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
                    {client.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-secondary">{CLIENT_TYPE_LABELS[client.type]}</p>
                </td>
                <td className="px-5 py-4 text-secondary">{production?.title ?? "Sin producción asociada"}</td>
                <td className="px-5 py-4">
                  {production ? (
                    <StageBadge stage={production.stage} />
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
