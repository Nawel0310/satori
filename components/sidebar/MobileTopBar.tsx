"use client";

interface MobileTopBarProps {
  onOpenMenu: () => void;
}

export function MobileTopBar({ onOpenMenu }: MobileTopBarProps) {
  return (
    <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between bg-primary px-4 md:hidden">
      <span className="font-heading text-lg font-bold tracking-widest text-white">SATORI</span>
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menú"
        className="cursor-pointer rounded-sm p-1.5 text-white/80 hover:text-white"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}
