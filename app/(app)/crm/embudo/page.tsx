import { KanbanBoard } from "@/components/crm/KanbanBoard";

export default function EmbudoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Embudo de propuestas</h1>
        <p className="mt-1 text-sm text-secondary">
          Arrastrá una tarjeta para cambiarla de etapa. De un vistazo sabés en qué está cada propuesta.
        </p>
      </header>
      <KanbanBoard />
    </div>
  );
}
