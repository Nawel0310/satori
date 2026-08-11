import { KanbanBoard } from "@/components/crm/KanbanBoard";

export default function EmbudoPage() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-10">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Embudo de propuestas</h1>
        <p className="mt-1 text-sm text-secondary">
          Arrastrá una tarjeta para cambiarla de etapa — de un vistazo sabés en qué está cada propuesta.
        </p>
      </header>
      <KanbanBoard />
    </div>
  );
}
