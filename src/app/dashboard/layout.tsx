"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
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
        <div className="flex w-full overflow-hidden">
          <AppSidebar />
          <main className="flex w-full flex-col overflow-auto bg-zinc-100 p-6 md:p-8 md:pt-4">
            <div className="h-36 flex flex-col justify-between">
              <div className="flex items-center gap-x-2">
                <SidebarTrigger className="transition-transform -ml-1 hover:scale-110 active:scale-95" />
                {/* <Input placeholder={"Search course or instructor"} /> */}
              </div>
              <div className="bg-transparent flex pb-4 flex-col justify-end">
                {title ? (
                  <div>
                    <p className="font-semibold text-sm opacity-50">
                      {title.subtitle}
                    </p>
                    <p className="font-bold text-2xl">{title.title}</p>
                  </div>
                ) : (
                  <Skeleton className="h-6 rounded-full w-40 bg-zinc-200" />
                )}
              </div>
            </div>

            <div className="w-full h-full bg-white p-4 md:p-8 rounded-lg shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </PageTitleProvider>
    </SidebarProvider>
  );
}
