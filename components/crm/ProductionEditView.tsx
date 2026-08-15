"use client";

import { useRouter, notFound } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { ProductionForm } from "@/components/crm/ProductionForm";
import { BackButton } from "@/components/ui/BackButton";

export function ProductionEditView({ id }: { id: string }) {
  const router = useRouter();
  const { clients, productions, updateProduction } = useDemoData();

  const production = productions.find((p) => p.id === id);
  if (!production) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Editar producción</h1>
        <p className="mt-1 text-sm text-secondary">{production.title}</p>
      </header>

      <ProductionForm
        clients={clients}
        initialProduction={production}
        onCancel={() => router.push("/producciones")}
        onSubmit={(input) => {
          updateProduction(production.id, input);
          router.push("/producciones");
        }}
      />
    </div>
  );
}
