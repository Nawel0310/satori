import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/format";
import type { Note } from "@/lib/types";

export function InteractionTimeline({ notes }: { notes: Note[] }) {
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
    </Card>
  );
}
