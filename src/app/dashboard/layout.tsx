"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  useSession({
    required: true,
  });

  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden relatve">
        <AppSidebar />
        <main className="flex w-full p-6 flex-col relative overflow-auto bg-zinc-100">
          <SidebarTrigger className="transition-opacity border rounded-md bg-gray-50 absolute top-3 opacity-50 hover:opacity-100 left-3 shadow-lg" />
          <div className="w-full h-full bg-white p-6 md:p-8 rounded-lg shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
