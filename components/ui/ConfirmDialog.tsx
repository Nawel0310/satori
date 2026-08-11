"use client";

import { useDialogA11y } from "@/hooks/useDialogA11y";
import { Button } from "./Button";
import { Card } from "./Card";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useDialogA11y(open, onCancel);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="absolute inset-0" aria-hidden="true" onClick={onCancel} />
      <Card
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="relative w-full max-w-sm p-6"
      >
        <h2 id="confirm-dialog-title" className="font-heading text-lg font-semibold text-primary">
          {title}
        </h2>
        <p id="confirm-dialog-description" className="mt-2 text-sm text-secondary">
          {description}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" variant={danger ? "danger" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
}
