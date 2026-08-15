"use client";

import { useRouter } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { ProductionForm } from "@/components/crm/ProductionForm";
import { BackButton } from "@/components/ui/BackButton";

export default function NuevaProduccionPage() {
  const router = useRouter();
  const { clients, addProduction } = useDemoData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Nueva producción</h1>
        <p className="mt-1 text-sm text-secondary">Cargá una producción nueva, vinculada a un cliente.</p>
      </header>

      <ProductionForm
        clients={clients}
        onCancel={() => router.push("/producciones")}
        onSubmit={(input) => {
          addProduction(input);
          router.push("/producciones");
        }}
      />
    </div>
  );
}
