import type { ReactNode } from "react";
import { DemoDataProvider } from "@/context/demo-data-context";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <DemoDataProvider>
      <div className="flex min-h-screen flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-surface">{children}</main>
      </div>
    </DemoDataProvider>
  );
}
