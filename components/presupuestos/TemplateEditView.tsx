"use client";

import { useRouter, notFound } from "next/navigation";
import { useDemoData } from "@/context/demo-data-context";
import { TemplateForm } from "@/components/presupuestos/TemplateForm";
import { BackButton } from "@/components/ui/BackButton";

export function TemplateEditView({ id }: { id: string }) {
  const router = useRouter();
  const { budgetTemplates, updateTemplate } = useDemoData();

  const template = budgetTemplates.find((t) => t.id === id);
  if (!template) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Editar plantilla</h1>
        <p className="mt-1 text-sm text-secondary">{template.name}</p>
      </header>

      <TemplateForm
        initialTemplate={template}
        onCancel={() => router.push("/plantillas")}
        onSubmit={(input) => {
          updateTemplate(template.id, input);
          router.push("/plantillas");
        }}
      />
    </div>
  );
}
