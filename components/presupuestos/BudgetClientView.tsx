"use client";

import { useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { BudgetDocumentView } from "@/components/presupuestos/BudgetDocumentView";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Toast } from "@/components/ui/Toast";
import { PencilIcon, SendIcon, TrashIcon } from "@/components/ui/icons";

export function BudgetClientView({ id }: { id: string }) {
  const router = useRouter();
  const { budgets, clients, approveBudget, rejectBudget, deleteBudget, sendBudgetEmail } = useDemoData();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [confirmingResend, setConfirmingResend] = useState(false);
  const [emailFeedback, setEmailFeedback] = useState(false);

  const budget = budgets.find((b) => b.id === id);
  if (!budget) {
    notFound();
  }
  const client = clients.find((c) => c.id === budget.clientId);
  if (!client) {
    notFound();
  }

  useEffect(() => {
    if (!emailFeedback) return;
    const timeout = setTimeout(() => setEmailFeedback(false), 2500);
    return () => clearTimeout(timeout);
  }, [emailFeedback]);

  const handleSendEmail = () => {
    if (budget.emailSentAt) {
      setConfirmingResend(true);
      return;
    }
    sendBudgetEmail(budget.id);
    setEmailFeedback(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <BackButton />
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon={<SendIcon />} onClick={handleSendEmail}>
            Enviar por Email
          </Button>
          <Link href={`/presupuestos/editar?id=${budget.id}`}>
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
        title="¿Eliminar este presupuesto?"
        description={`"${budget.id}" se va a eliminar de forma permanente. La acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteBudget(budget.id);
          router.back();
        }}
      />

      <ConfirmDialog
        open={confirmingResend}
        danger={false}
        title="Ya envió este presupuesto a este cliente"
        description={`Ya le enviaste "${budget.id}" a ${client.name} por email. ¿Desea enviarlo de nuevo?`}
        confirmLabel="Enviar de nuevo"
        onCancel={() => setConfirmingResend(false)}
        onConfirm={() => {
          sendBudgetEmail(budget.id);
          setConfirmingResend(false);
          setEmailFeedback(true);
        }}
      />

      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
        Vista del cliente, así lo recibe {client.name}
      </p>

      <BudgetDocumentView budget={budget} client={client} />

      <div className="mt-6 flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6">
        <p className="text-center text-sm text-secondary">
          Decisión del cliente. Un click cambia el estado al instante.
        </p>
        <div className="flex gap-3">
          <Button
            variant={budget.status === "vencido" ? "primary" : "danger"}
            onClick={() => rejectBudget(budget.id)}
          >
            Rechazar
          </Button>
          <Button
            variant={budget.status === "aprobado" ? "primary" : "secondary"}
            onClick={() => approveBudget(budget.id)}
          >
            Aprobar
          </Button>
        </div>
      </div>

      <Toast open={emailFeedback} icon={<SendIcon />} message="Presupuesto enviado por email." />
    </div>
  );
}
