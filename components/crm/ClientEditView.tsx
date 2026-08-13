"use client";

import { useRouter, notFound } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { ClientForm } from "@/components/crm/ClientForm";

export function ClientEditView({ id }: { id: string }) {
  const router = useRouter();
  const { clients, updateClient } = useDemoData();

  const client = clients.find((c) => c.id === id);
  if (!client) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Editar cliente</h1>
        <p className="mt-1 text-sm text-secondary">{client.name}</p>
      </header>

      <ClientForm
        initialClient={client}
        onCancel={() => router.push(`/crm/${client.id}`)}
        onSubmit={(input) => {
          updateClient(client.id, input);
          router.push(`/crm/${client.id}`);
        }}
      />
    </div>
  );
}
