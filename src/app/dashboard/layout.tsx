"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import usePageTitle from "@/hooks/use-page-title";
import DashboardHeader from "@/components/dashboard-header";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = usePageTitle(pathname, searchParams);

  useSession({
    required: true,
  });

  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden">
        <AppSidebar/>
        <div className="flex flex-col w-full overflow-hidden">

          <main className="flex-1 overflow-auto bg-zinc-100 p-6 md:p-8 md:pt-24">
            <div className="w-full h-full min-h-full bg-white p-4 md:p-8 rounded-lg shadow-sm">
              { children }
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
