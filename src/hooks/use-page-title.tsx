import { useEffect, useState } from "react";
import { DashboardTitle, titles } from "@/lib/dashboard-titles";
import { ISectionHowdy } from "@/lib/types/howdy-types";
import { convertTermCode } from "@/lib/utils";

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `/api/data/sections?crn=${crn}&term=${term}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

const usePageTitle = (path: string) => {
  const [title, setTitle] = useState<DashboardTitle | null>(null);

  useEffect(() => {
    const fetchTitle = async () => {
      if (path in titles) {
        setTitle(titles[path]);
        return;
      }

      if (path.startsWith("/dashboard/search/sections/")) {
        const term = path.substring("/dashboard/search/sections/".length, 33);
        const crn = path.substring("/dashboard/search/sections/XXXXXX".length);
        const data: ISectionHowdy = await fetchSectionDetails(term, crn);

        if (data) {
          setTitle({
            title: `${data.SUBJECT_CODE} ${data.COURSE_NUMBER}-${data.SECTION_NUMBER}`,
            subtitle: data.COURSE_TITLE || "",
            term: convertTermCode(term)
          });
        }
      }
    };
    fetchTitle();
  }, [path]);

  return title;
};

export default usePageTitle;