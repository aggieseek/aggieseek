"use client";

import { DashboardTitle } from "@/lib/dashboard-titles";
import { SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

interface DashboardHeaderProps {
  title: DashboardTitle | null
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {

  return <header className="flex flex-col justify-between h-48 p-6 md:p-8">

    <SidebarTrigger/>

    <div className="flex flex-col justify-end">
      { title ? (
        <>
          <p className="font-semibold opacity-30">{ title.term }</p>
          <h1 className="font-bold text-3xl">{ title.title }</h1>
          <h2 className="font-medium text-base opacity-30">
            { title.subtitle }
          </h2>
        </>
      ) : (
        <>
          <Skeleton className="h-6 rounded-full w-36 mb-2 bg-zinc-200"/>
          <Skeleton className="h-4 rounded-full w-52 bg-zinc-200 mb-1"/>
        </>
      ) }
    </div>
  </header>;
} 