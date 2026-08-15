"use client";

import { useRouter } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { TemplateForm } from "@/components/presupuestos/TemplateForm";
import { BackButton } from "@/components/ui/BackButton";

export default function NuevaPlantillaPage() {
  const router = useRouter();
  const { addTemplate } = useDemoData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Nueva plantilla</h1>
        <p className="mt-1 text-sm text-secondary">Un paquete de ítems reutilizable para futuros presupuestos.</p>
      </header>

      <TemplateForm
        onCancel={() => router.back()}
        onSubmit={(input) => {
          addTemplate(input);
          router.back();
        }}
      />
    </div>
  );
}
