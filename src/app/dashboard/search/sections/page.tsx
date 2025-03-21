"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoadingCircle from "@/components/loading-circle";
import { ISectionHowdy } from "@/lib/types/howdy-types";
import Link from "next/link";
import {
  MdHome,
  MdOutlineAccessTimeFilled,
  MdPerson,
  MdSearch,
} from "react-icons/md";
import { PiDetectiveFill } from "react-icons/pi";
import { Instructor } from "@/lib/types/course-types";
import { usePageTitle } from "@/contexts/title-context";
import { convertTermCode } from "@/lib/utils";

enum PageState {
  LOADING,
  IDLE,
  ERROR,
}

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `/api/data/sections?crn=${crn}&term=${term}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

const fetchWatchers = async (term: string, crn: string) => {
  const url = `/api/data/sections/watching?crn=${crn}&term=${term}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

function SectionPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const crn = searchParams.get("crn");
  const back = searchParams.get("back") === "true";
  const router = useRouter();

  const [courseData, setCourseData] = useState<ISectionHowdy | null>(null);
  const [numWatching, setNumWatching] = useState<number | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);

  const { setPageTitle: setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(null);

    if (!term || !crn) {
      router.push("/dashboard/search");
      return;
    }

    fetchSectionDetails(term, crn).then((data: ISectionHowdy) => {
      if (Object.keys(data).length === 0) {
        setTitle({
          title: "Unknown Section",
          subtitle: `${convertTermCode(term)}`,
        });
        setPageState(PageState.ERROR);
        return;
      }

      setCourseData(data);
      setTitle({
        title: `${data.SUBJECT_CODE} ${data.COURSE_NUMBER}-${data.SECTION_NUMBER}`,
        subtitle: `${convertTermCode(term)} / ${data.CRN}`,
      });
      if (data.SWV_CLASS_SEARCH_INSTRCTR_JSON !== null)
        setInstructors(JSON.parse(data.SWV_CLASS_SEARCH_INSTRCTR_JSON));

      fetchWatchers(term, crn).then((data) => {
        setNumWatching(data.count);
      });
      setPageState(PageState.IDLE);
    });
  }, [crn, router, term, setTitle]);

  if (pageState === PageState.ERROR) {
    return (
      <Link
        href={"/dashboard/search"}
        className="inline-flex gap-x-2 w-auto items-center font-bold mb-4 hover:underline"
      >
        <MdSearch />
        Back to Search
      </Link>
    );
  }

  if (
    pageState === PageState.LOADING ||
    courseData === null ||
    numWatching === null
  ) {
    return (
      <div className="flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-x-4 text-sm h-full">
      <div className="translate-y-3 reset-transform">
        {back && (
          <Link
            href={"/dashboard"}
            className="flex gap-x-2 items-center font-bold mb-4 hover:underline"
          >
            <MdHome />
            Back to Dashboard
          </Link>
        )}

        <p className="text-2xl tracking-widest border-b pb-3 font-semibold">
          {courseData.COURSE_TITLE}
        </p>
        <p className="text-gray-500 mt-3">{courseData.COURSE_DESCRIPTION}</p>
      </div>

      <div className="h-full flex flex-col gap-y-2 p-6 bg-black/5">
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
            <div key={instructor.MORE} className="flex items-center gap-x-4">
              <MdPerson className="w-4 h-4" />
              <Link
                className="hover:underline"
                href={`/dashboard/search/instructors?id=${instructor.MORE}`}
              >
                {instructor.NAME}
              </Link>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-x-4">
            <MdPerson className="w-4 h-4" />
            <p>Not assigned</p>
          </div>
        )}

        <div className="flex items-center gap-x-4">
          <MdOutlineAccessTimeFilled className="w-4 h-4" />
          <p>
            <span className="font-semibold text-base">
              {courseData.HRS_LOW}
            </span>{" "}
            credit hours
          </p>
        </div>

        <div className="flex items-center gap-x-4">
          <PiDetectiveFill className="w-4 h-4" />
          <p>
            <span className="font-semibold text-base">{numWatching}</span>{" "}
            student{numWatching === 1 ? "" : "s"} watching
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <Suspense>
      <SectionPage />
    </Suspense>
  );
}
