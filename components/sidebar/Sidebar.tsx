"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "./SidebarNavItem";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useDemoData } from "@/context/demo-data-context";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  dashboard: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  crm: (
    <svg {...iconProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  presupuestos: (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  ),
  embudo: (
    <svg {...iconProps}>
      <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />
    </svg>
  ),
  producciones: (
    <svg {...iconProps}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m10 9 5 3-5 3z" />
    </svg>
  ),
  recordatorios: (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  ),
  plantillas: (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h3" />
    </svg>
  ),
  logout: (
    <svg {...iconProps}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  ),
  reset: (
    <svg {...iconProps}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  ),
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const inCrm = pathname.startsWith("/crm");
  const inPresupuestos = pathname.startsWith("/presupuestos");
  const { resetDemoData } = useDemoData();
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      ) : null}

      <aside
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label="Navegación principal"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 shrink-0 flex-col bg-primary px-4 py-6 transition-transform duration-200 ease-out md:static md:z-auto md:h-auto md:min-h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link href="/dashboard" onClick={onClose}>
            <span className="font-heading text-2xl font-bold tracking-widest text-white">SATORI</span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.3em] text-secondary">
              Film &amp; Photo
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="cursor-pointer rounded-sm p-1.5 text-white/70 hover:text-white md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1" aria-label="Navegación principal" onClick={onClose}>
        <SidebarNavItem href="/dashboard" icon={icons.dashboard} label="Dashboard" matchPrefix={false} />
        <SidebarNavItem href="/crm" icon={icons.crm} label="Gestión Clientes" />

        {inCrm ? (
          <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
            <SidebarNavItem href="/crm/embudo" icon={icons.embudo} label="Embudo" />
            <SidebarNavItem href="/crm/producciones" icon={icons.producciones} label="Producciones" />
            <SidebarNavItem href="/crm/recordatorios" icon={icons.recordatorios} label="Recordatorios" />
          </div>
        ) : null}

        <SidebarNavItem href="/presupuestos" icon={icons.presupuestos} label="Presupuestos" />

        {inPresupuestos ? (
          <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
            <SidebarNavItem href="/presupuestos/plantillas" icon={icons.plantillas} label="Plantillas" />
          </div>
        ) : null}
        </nav>

        <button
          type="button"
          onClick={() => setConfirmingReset(true)}
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm font-medium text-white/50 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          <span aria-hidden="true">{icons.reset}</span>
          Reiniciar demo
        </button>

        <Link
          href="/login"
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-white/50 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          <span aria-hidden="true">{icons.logout}</span>
          Salir
        </Link>
      </aside>

      <ConfirmDialog
        open={confirmingReset}
        title="¿Reiniciar la demo?"
        description="Se van a borrar todos los clientes, producciones, presupuestos, plantillas y recordatorios creados o editados en este navegador, volviendo a los datos de ejemplo originales. La acción no se puede deshacer."
        confirmLabel="Reiniciar"
        onCancel={() => setConfirmingReset(false)}
        onConfirm={() => {
          resetDemoData();
          setConfirmingReset(false);
          onClose();
        }}
      />
    </>
  );
}
