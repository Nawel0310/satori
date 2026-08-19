"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SearchSelect } from "@/components/ui/SearchSelect";
import type { Client, Reminder } from "@/lib/types";

interface ReminderFormProps {
  clients: Client[];
  defaultClientId?: string;
  initialReminder?: Reminder;
  onSubmit: (input: Omit<Reminder, "id" | "done">) => void;
  onCancel: () => void;
}

export function ReminderForm({ clients, defaultClientId, initialReminder, onSubmit, onCancel }: ReminderFormProps) {
  const [clientId, setClientId] = useState(initialReminder?.clientId ?? defaultClientId ?? "");
  const [text, setText] = useState(initialReminder?.text ?? "");
  const [dueDate, setDueDate] = useState(
    initialReminder?.dueDate ?? new Date().toISOString().slice(0, 10),
  );

  function handleSubmit() {
    onSubmit({ clientId, text, dueDate });
  }

  return (
    <Card className="flex flex-col gap-6 p-6">
      <SearchSelect
        label="Cliente"
        options={clients.map((client) => ({ id: client.id, label: client.name }))}
        value={clientId}
        onChange={setClientId}
        searchPlaceholder="Buscar cliente…"
      />

      <Input
        label="Recordatorio"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ej: Llamar para confirmar fecha de rodaje"
        required
      />

      <Input
        label="Fecha"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex justify-end gap-3 border-t border-border pt-5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Guardar recordatorio
        </Button>
      </div>
    </Card>
  );
}
