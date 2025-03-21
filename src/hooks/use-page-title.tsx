import { useEffect, useState } from "react";
import { DashboardTitle, titles } from "@/lib/dashboard-titles";
import { ISectionHowdy } from "@/lib/types/howdy-types";
import { convertTermCode } from "@/lib/utils";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Instructor } from "@prisma/client";

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `/api/data/sections?crn=${crn}&term=${term}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

const fetchInstructor = async (id: string) => {
  const url = `/api/data/instructors?id=${id}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

const usePageTitle = (path: string, searchParams: ReadonlyURLSearchParams) => {
  const [title, setTitle] = useState<DashboardTitle | null>(null);

  useEffect(() => {
    const fetchTitle = async () => {
      if (path in titles) {
        setTitle(titles[path]);
        return;
      }

      if (path.startsWith("/dashboard/search/sections")) {
        const term = searchParams.get("term") ?? "";
        const crn = searchParams.get("crn") ?? "";
        
        const data: ISectionHowdy = await fetchSectionDetails(term, crn);

        if (Object.keys(data).length === 0) {
          setTitle({
            title: "Oops!",
            subtitle: "The section specified was not found."
          });
        } else {
          setTitle({
            title: `${data.SUBJECT_CODE} ${data.COURSE_NUMBER}-${data.SECTION_NUMBER}`,
            subtitle: `${convertTermCode(term)} / ${data.CRN}`,
          });
        }
      } else if (path.startsWith("/dashboard/search/instructors")) {
        const id = searchParams.get("id") ?? "";

        const data: Instructor = await fetchInstructor(id);

        if (Object.keys(data).length === 0) {
          setTitle({
            title: "Oops!",
            subtitle: "The instructor specified was not found."
          });
        } else {
          setTitle({
            title: data.name ?? "",
            subtitle: data.instructorId
          });
        }
      }
    };
    fetchTitle();
  }, [path, searchParams]);

  return title;
};

export default usePageTitle;