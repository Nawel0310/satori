import type { ReactNode } from "react";
import { DemoDataProvider } from "@/context/demo-data-context";
import { SidebarShell } from "@/components/sidebar/SidebarShell";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DemoDataProvider>
        <div className="flex min-h-screen flex-1 flex-col md:flex-row">
          <SidebarShell />
          <main className="flex-1 overflow-y-auto bg-surface pt-14 md:pt-0">{children}</main>
        </div>
      </DemoDataProvider>
    </AuthGuard>
  );
}
