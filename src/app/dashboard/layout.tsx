"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { PageTitleProvider } from "@/contexts/title-context";
import { DashboardTitle } from "@/lib/dashboard-titles";

export default function Layout({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<DashboardTitle | null>(null);

  useSession({
    required: true,
  });

  return (
    <SidebarProvider>
      <PageTitleProvider pageTitle={title} setPageTitle={setTitle}>
        <div className="flex w-full overflow-hidden relatve">
          <AppSidebar />
          <main className="flex w-full p-6 flex-col relative overflow-auto bg-zinc-100">
            <SidebarTrigger className="transition-opacity border rounded-md bg-gray-50 absolute top-3 opacity-50 hover:opacity-100 left-3 shadow-lg" />
            <div className="w-full h-full bg-white p-6 md:p-8 rounded-lg shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </PageTitleProvider>
    </SidebarProvider>
  );
}
