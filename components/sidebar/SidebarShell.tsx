"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileTopBar } from "./MobileTopBar";

export function SidebarShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <MobileTopBar onOpenMenu={() => setMobileOpen(true)} />
      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
