"use client";

import { useState } from "react";
import { useDemoData } from "@/context/demo-data-context";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { RowAction } from "@/components/ui/RowAction";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { formatDate } from "@/lib/format";
import type { Note } from "@/lib/types";

interface InteractionTimelineProps {
  clientId: string;
  notes: Note[];
}

export function InteractionTimeline({ clientId, notes }: InteractionTimelineProps) {
  const { addNote, updateNote, deleteNote } = useDemoData();
  const [text, setText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;
    addNote(clientId, trimmed);
    setText("");
  }

  function startEdit(note: Note) {
    setEditingNoteId(note.id);
    setEditText(note.text);
  }

  function saveEdit(noteId: string) {
    const trimmed = editText.trim();
    if (!trimmed) return;
    updateNote(clientId, noteId, trimmed);
    setEditingNoteId(null);
  }

  const pendingNote = notes.find((n) => n.id === pendingDeleteId);

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

              {editingNoteId === note.id ? (
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(note.id);
                      if (e.key === "Escape") setEditingNoteId(null);
                    }}
                    autoFocus
                    className="flex-1 rounded-sm border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => setEditingNoteId(null)}>
                      Cancelar
                    </Button>
                    <Button type="button" onClick={() => saveEdit(note.id)}>
                      Guardar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex items-start justify-between gap-3">
                  <p className="text-sm text-primary">{note.text}</p>
                  <div className="flex shrink-0 gap-1">
                    <RowAction icon={<PencilIcon />} label="Editar" onClick={() => startEdit(note)} />
                    <RowAction
                      icon={<TrashIcon />}
                      label="Eliminar"
                      onClick={() => setPendingDeleteId(note.id)}
                    />
                  </div>
                </div>
              )}
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
                handleAdd();
              }
            }}
          />
        </div>
        <Button type="button" onClick={handleAdd} disabled={!text.trim()}>
          Agregar nota
        </Button>
      </div>

      <ConfirmDialog
        open={pendingNote != null}
        title="¿Eliminar esta nota?"
        description="Se va a eliminar de forma permanente."
        confirmLabel="Eliminar"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteNote(clientId, pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </Card>
  );
}
