"use client";

import { useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import type { Client } from "@/lib/types";
import { CLIENT_TYPE_LABELS, formatDate } from "@/lib/format";
import { ClientLogo } from "@/components/crm/ClientLogo";
import { RowAction } from "@/components/ui/RowAction";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const { deleteClient } = useDemoData();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const pendingClient = clients.find((c) => c.id === pendingDeleteId);

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
              Email
            </th>
            <th scope="col" className="px-5 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-5 py-3">
              Último contacto
            </th>
            <th scope="col" className="px-5 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
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
                <td className="px-5 py-4 text-secondary">{client.contactEmail}</td>
                <td className="px-5 py-4 text-secondary">{client.contactPhone}</td>
                <td className="px-5 py-4 text-secondary">{formatDate(client.lastContactDate)}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <RowAction icon={<PencilIcon />} label="Editar" href={`/crm/detalle/editar?id=${client.id}`} />
                    <RowAction
                      icon={<TrashIcon />}
                      label="Eliminar"
                      onClick={() => setPendingDeleteId(client.id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ConfirmDialog
        open={pendingClient != null}
        title="¿Eliminar este cliente?"
        description={`"${pendingClient?.name ?? ""}" se va a eliminar, junto con sus producciones, presupuestos y recordatorios vinculados. La acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteClient(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
