"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface SidebarNavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  matchPrefix?: boolean;
}

export function SidebarNavItem({ href, icon, label, matchPrefix = true }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = matchPrefix ? pathname === href || pathname.startsWith(`${href}/`) : pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 ${
        isActive ? "bg-white text-primary" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="shrink-0" aria-hidden="true">
        {icon}
      </span>
      {label}
    </Link>
  );
}
