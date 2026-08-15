"use client";

import { useRouter, notFound } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { formatCurrency } from "@/lib/format";

export function TemplateDetailView({ id }: { id: string }) {
  const router = useRouter();
  const { budgetTemplates, deleteTemplate } = useDemoData();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const template = budgetTemplates.find((t) => t.id === id);
  if (!template) {
    notFound();
  }

  const total = template.lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver
        </button>
        <div className="flex gap-3">
          <Link href={`/plantillas/editar?id=${template.id}`}>
            <Button variant="secondary" icon={<PencilIcon />}>
              Editar
            </Button>
          </Link>
          <Button variant="danger" icon={<TrashIcon />} onClick={() => setConfirmingDelete(true)}>
            Eliminar
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingDelete}
        title="¿Eliminar esta plantilla?"
        description={`"${template.name}" se va a eliminar. Los presupuestos ya creados a partir de ella no se ven afectados.`}
        confirmLabel="Eliminar"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteTemplate(template.id);
          router.push("/plantillas");
        }}
      />

      <Card className="p-6">
        <h1 className="font-heading text-2xl font-bold text-primary">{template.name}</h1>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold uppercase tracking-wider text-secondary">
                <th scope="col" className="py-3">
                  Descripción
                </th>
                <th scope="col" className="py-3 text-right">
                  Cant.
                </th>
                <th scope="col" className="py-3 text-right">
                  Precio unitario
                </th>
                <th scope="col" className="py-3 text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {template.lineItems.map((item, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-3 text-primary">{item.description}</td>
                  <td className="py-3 text-right tabular-nums text-secondary">{item.quantity}</td>
                  <td className="py-3 text-right tabular-nums text-secondary">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-3 text-right tabular-nums font-medium text-primary">
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end border-t border-border pt-4">
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Total</p>
            <p className="font-heading text-3xl font-bold tabular-nums text-primary">{formatCurrency(total)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
