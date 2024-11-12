'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";

type Title = {
  title: string,
  subtitle: string
}

const titles: Record<string, Title> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "View your tracked courses and stay updated."
  },
  "/search": {
    title: "Search",
    subtitle: "Search for specific classes, professors, and more."
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your account settings and preferences."
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <header className="flex flex-col justify-end h-1/4 p-8">
          <h1 className="font-bold text-3xl">{titles[pathname].title}</h1>
          <h2 className="font-medium text-base opacity-30">{titles[pathname].subtitle}</h2>
        </header>

        <section className="flex h-full bg-zinc-100">
          <div className="w-full m-6 p-10 bg-white">
            {children}
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}