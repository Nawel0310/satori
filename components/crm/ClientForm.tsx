"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CLIENT_TYPE_LABELS } from "@/lib/format";
import type { Client, ClientType } from "@/lib/types";

interface ClientFormProps {
  initialClient?: Client;
  onSubmit: (input: Omit<Client, "id" | "notes">) => void;
  onCancel: () => void;
}

export function ClientForm({ initialClient, onSubmit, onCancel }: ClientFormProps) {
  const [name, setName] = useState(initialClient?.name ?? "");
  const [type, setType] = useState<ClientType>(initialClient?.type ?? "inmobiliaria");
  const [contactName, setContactName] = useState(initialClient?.contactName ?? "");
  const [contactEmail, setContactEmail] = useState(initialClient?.contactEmail ?? "");
  const [contactPhone, setContactPhone] = useState(initialClient?.contactPhone ?? "");
  const [lastContactDate, setLastContactDate] = useState(
    initialClient?.lastContactDate ?? new Date().toISOString().slice(0, 10),
  );

  function handleSubmit() {
    onSubmit({ name, type, contactName, contactEmail, contactPhone, lastContactDate });
  }

  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Nombre del cliente o agencia" value={name} onChange={(e) => setName(e.target.value)} required />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="client-type" className="text-sm font-medium text-primary">
            Tipo
          </label>
          <select
            id="client-type"
            value={type}
            onChange={(e) => setType(e.target.value as ClientType)}
            className="w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(CLIENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Nombre de contacto" value={contactName} onChange={(e) => setContactName(e.target.value)} />
        <Input
          label="Email de contacto"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Teléfono" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        <Input
          label="Último contacto"
          type="date"
          value={lastContactDate}
          onChange={(e) => setLastContactDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Guardar cliente
        </Button>
      </div>
    </Card>
  );
}
