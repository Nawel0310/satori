"use client";

import { useState } from "react";
import { useDemoData } from "@/context/demo-data-context";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";
import type { Note } from "@/lib/types";

interface InteractionTimelineProps {
  clientId: string;
  notes: Note[];
}

export function InteractionTimeline({ clientId, notes }: InteractionTimelineProps) {
  const { addNote } = useDemoData();
  const [text, setText] = useState("");

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    addNote(clientId, trimmed);
    setText("");
  }

  return (
    <Card className="p-6">
      <h2 className="font-heading text-lg font-semibold text-primary">Historial de interacciones</h2>
      {notes.length === 0 ? (
        <p className="mt-3 text-sm text-secondary">Todavía no hay notas cargadas.</p>
      ) : (
        <ol className="mt-4 flex flex-col gap-4">
          {notes.map((note) => (
            <li key={note.id} className="border-l-2 border-border pl-4">
              <p className="text-xs font-medium uppercase tracking-wide text-secondary">{formatDate(note.date)}</p>
              <p className="mt-1 text-sm text-primary">{note.text}</p>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Nueva nota"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ej: Llamada de seguimiento, confirmó interés en el paquete"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
        <Button type="button" onClick={handleSubmit} disabled={!text.trim()}>
          Agregar nota
        </Button>
      </div>
    </Card>
  );
}
