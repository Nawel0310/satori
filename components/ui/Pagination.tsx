import { Button } from "@/components/ui/Button";
import { ChevronLeftIcon } from "@/components/ui/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <Button variant="ghost" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        <ChevronLeftIcon width={16} height={16} />
        Anterior
      </Button>
      <span className="text-sm text-secondary">
        Página {page} de {totalPages}
      </span>
      <Button variant="ghost" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        Siguiente
        <ChevronLeftIcon width={16} height={16} className="rotate-180" />
      </Button>
    </div>
  );
}
