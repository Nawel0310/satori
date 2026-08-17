import type { ReactNode } from "react";
import { DemoDataProvider } from "@/context/demo-data-context";
import { SidebarShell } from "@/components/sidebar/SidebarShell";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AppToast } from "@/components/ui/AppToast";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DemoDataProvider>
        <div className="flex min-h-screen min-w-0 flex-1 flex-col md:flex-row">
          <SidebarShell />
          <main className="min-w-0 flex-1 contain-paint overflow-x-hidden overflow-y-auto bg-surface pt-14 md:pt-0">
            {children}
          </main>
        </div>
        <AppToast />
      </DemoDataProvider>
    </AuthGuard>
  );
}
