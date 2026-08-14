"use client";

import type { ReactNode } from "react";

interface ToastProps {
  open: boolean;
  message: ReactNode;
  icon?: ReactNode;
}

export function Toast({ open, message, icon }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 transition-all duration-300 ${
        open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-white shadow-lg">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        {message}
      </div>
    </div>
  );
}
