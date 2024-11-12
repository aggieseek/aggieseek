'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Title = {
  title: string,
  subtitle: string
}

const fetchCRNDetails = async (term: string, crn: string) => {
  const url = `https://howdy.tamu.edu/api/course-section-details?term=${term}&subject=&course=&crn=${crn}`;
  const response = await fetch(url);
  if (response.status == 200) {
    const data = await response.json();
    return data;
  }
  return null;
};

const getTitle = async (path: string) => {
  if (path in titles) return titles[path];

  if (path.startsWith("/search/sections/")) {
    const term = path.substring("/search/sections/".length, 23);
    const crn = path.substring("/search/sections/XXXXXX".length);
    const data = await fetchCRNDetails(term, crn);

    if (data) {
      return {
        title: data.SUBJECT_CODE + " " + data.COURSE_NUMBER || "Course Details",
        subtitle: data.COURSE_TITLE || ""
      };
    }
  }

  return null;
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
  const [title, setTitle] = useState<Title | null>(null);

  useEffect(() => {
    const loadTitle = async () => {
      const titleData = await getTitle(pathname);
      setTitle(titleData);
    };
    loadTitle();
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <header className="flex flex-col justify-end h-1/4 p-8">
          {title
            ? <>
              <h1 className="font-bold text-3xl">{title.title}</h1>
              <h2 className="font-medium text-base opacity-30">{title.subtitle}</h2>
            </>
            : <>
            <Skeleton className="h-6 rounded-full w-36 mb-2 bg-zinc-200" />
            <Skeleton className="h-4 rounded-full w-52 bg-zinc-200 mb-1" />
            </>}
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