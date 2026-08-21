import { ReactNode } from "react";
import Sidebar from "./SidebarTemp";
import Header from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto bg-slate-100">
          <div className="mx-auto w-full max-w-7xl p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}