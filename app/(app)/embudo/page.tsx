"use client";

import { useEffect, useRef, useState } from "react";
import { EmbudoFilters } from "@/components/crm/EmbudoFilters";
import { KanbanBoard } from "@/components/crm/KanbanBoard";
import { FunnelIcon } from "@/components/ui/icons";

export default function EmbudoPage() {
  const [search, setSearch] = useState("");
  const boardRef = useRef<HTMLDivElement>(null);
  const [rowWidth, setRowWidth] = useState<number>();

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const observer = new ResizeObserver(() => {
      const children = Array.from(board.children) as HTMLElement[];
      if (children.length === 0) return;
      const firstTop = children[0].offsetTop;
      const rowChildren = children.filter((c) => c.offsetTop === firstTop);
      const left = rowChildren[0].getBoundingClientRect().left;
      const right = rowChildren[rowChildren.length - 1].getBoundingClientRect().right;
      setRowWidth(right - left);
    });
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <FunnelIcon width={28} height={28} className="text-primary" />
          <h1 className="font-heading text-3xl font-bold text-primary">Embudo de propuestas</h1>
        </div>
        <p className="mt-1 text-sm text-secondary">
          Arrastrá una tarjeta para cambiarla de etapa. De un vistazo sabés en qué está cada propuesta.
        </p>
      </header>

      <div className="mb-6" style={{ maxWidth: rowWidth }}>
        <EmbudoFilters search={search} onSearchChange={setSearch} />
      </div>

      <KanbanBoard search={search} boardRef={boardRef} />
    </div>
  );
}
