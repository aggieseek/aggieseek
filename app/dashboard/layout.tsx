import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <header className="h-1/5 p-12">
            <h1 className="font-bold text-4xl">Dashboard</h1>
            <h2 className="font-semibold opacity-50">View your tracked courses and stay updated.</h2>
        </header>

        <section className="flex h-full bg-zinc-100">
            <div className="w-full m-6 p-12 bg-white">
            {children}
            </div>
        </section>
      </main>
    </SidebarProvider>
  );
}