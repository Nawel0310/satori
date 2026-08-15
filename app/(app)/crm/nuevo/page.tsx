"use client";

import { useRouter } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { ClientForm } from "@/components/crm/ClientForm";
import { BackButton } from "@/components/ui/BackButton";

export default function NuevoClientePage() {
  const router = useRouter();
  const { addClient } = useDemoData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Nuevo cliente</h1>
        <p className="mt-1 text-sm text-secondary">Cargá un cliente o agencia nuevo.</p>
      </header>

      <ClientForm
        onCancel={() => router.back()}
        onSubmit={(input) => {
          const id = addClient(input);
          router.push(`/crm/detalle?id=${id}`);
        }}
      />
    </div>
  );
}
