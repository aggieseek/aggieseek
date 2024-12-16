'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardTitles, titles } from "@/lib/dashboard-titles";
import { useSession } from "next-auth/react";
import { SectionHowdy } from "@/lib/howdy-types";

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `/api/data/sections?crn=${crn}&term=${term}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

const getTitle = async (path: string) => {
  if (path in titles) return titles[path];

  if (path.startsWith("/search/sections/")) {
    const term = path.substring("/search/sections/".length, 23);
    const crn = path.substring("/search/sections/XXXXXX".length);
    const data: SectionHowdy = await fetchSectionDetails(term, crn);

    if (data) {
      return {
        title: `${ data.SUBJECT_CODE } ${ data.COURSE_NUMBER } / ${ data.SECTION_NUMBER }` || "Course Details",
        subtitle: data.COURSE_TITLE || ""
      };
    }
  }

  return null;
};

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [title, setTitle] = useState<DashboardTitles | null>(null);

  useSession({
    required: true,
  });

  useEffect(() => {
    if (pathname in titles) {
      setTitle(titles[pathname]);
      return;
    }

    setTitle(null);
    getTitle(pathname)
      .then(data => setTitle(data));
  }, [pathname]);


  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden">
        <AppSidebar />
        <main className="flex flex-col w-full overflow-hidden">
          <header className="flex flex-col justify-end h-48 flex-shrink-0 p-6 md:p-8">
            {title ? (
              <>
                <h1 className="font-bold text-3xl">{title.title}</h1>
                <h2 className="font-medium text-base opacity-30">{title.subtitle}</h2>
              </>
            ) : (
              <>
                <Skeleton className="h-6 rounded-full w-36 mb-2 bg-zinc-200" />
                <Skeleton className="h-4 rounded-full w-52 bg-zinc-200 mb-1" />
              </>
            )}
          </header>

          <section className="flex-1 overflow-auto bg-zinc-100 p-6 md:p-8">
            <div className="w-full h-full min-h-full bg-white p-4 md:p-8 rounded-lg shadow-sm">
              {children}
            </div>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}