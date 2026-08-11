import type { ReactNode } from "react";
import Link from "next/link";

interface RowActionProps {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

const rowActionClasses =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-transparent px-2.5 py-1.5 text-sm font-medium text-primary transition-colors duration-200 hover:border-border hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export function RowAction({ icon, label, href, onClick }: RowActionProps) {
  if (href) {
    return (
      <Link href={href} className={rowActionClasses}>
        <span aria-hidden="true">{icon}</span>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={rowActionClasses}>
      <span aria-hidden="true">{icon}</span>
      {label}
    </button>
  );
}
