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
import { cn, convertTermCode, CURRENT_TERM } from "@/lib/utils";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import useTrackedSectionsStore, {
  LoadingState,
} from "@/stores/useTrackedSectionsStore";
import { useSession } from "next-auth/react";
import ScheduleDisplay from "@/components/schedule-display";
import { FaChalkboardTeacher } from "react-icons/fa";

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

const SectionButton = ({ crn, courseData }) => {
  const { loadState, trackedSections, addSection, deleteSection } =
    useTrackedSectionsStore();
  const isLoading = loadState === LoadingState.FETCHING;
  const isTracked = trackedSections.some((section) => section.crn === crn);

  const handleClick = isLoading
    ? () => deleteSection(courseData.CRN)
    : isTracked
    ? () => deleteSection(courseData.CRN)
    : () => addSection(courseData.CRN);

  const icon = isLoading ? (
    <LoadingCircle />
  ) : isTracked ? (
    <IoIosEyeOff className="w-6 h-6" />
  ) : (
    <IoIosEye className="w-6 h-6" />
  );
  const text = isLoading ? null : isTracked ? "Untrack" : "Track";

  return (
    <div
      className={cn(
        "transition-colors duration-100 px-6 py-2 font-semibold hover:cursor-pointer",
        isLoading
          ? "bg-black/5"
          : isTracked
          ? "bg-red-500/25 hover:bg-red-500/35 active:bg-red-500/45"
          : "bg-black/5 hover:bg-black/10 active:bg-black/20"
      )}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center gap-x-2">
        {icon}
        {text && <span>{text}</span>}
      </div>
    </div>
  );
};

function SectionPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const crn = searchParams.get("crn");
  const source = searchParams.get("source");
  const router = useRouter();
  const { status } = useSession();

  const [courseData, setCourseData] = useState<ISectionHowdy | null>(null);
  const [numWatching, setNumWatching] = useState<number | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);

  const { fetchSections } = useTrackedSectionsStore();

  const { setPageTitle: setTitle } = usePageTitle();

  useEffect(() => {
    if (status === "authenticated") {
      fetchSections();
    }
  }, [status]);

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
    <div className="flex flex-col gap-y-2 lg:grid lg:grid-cols-[5fr_2fr] xl:grid-cols-[3fr_1fr] lg:gap-x-4 lg:gap-y-0 text-sm h-full">
      <div className="translate-y-3 reset-transform">
        {source === "dashboard" && (
          <Link
            href={"/dashboard"}
            className="inline-flex gap-x-2 items-center font-bold mb-4 hover:underline"
          >
            <MdHome />
            Back to Dashboard
          </Link>
        )}

        <div className="border-b pb-3 relative">
          <div className="text-2xl tracking-widest font-semibold">
            {courseData.COURSE_TITLE}
          </div>
          <div
            className={
              "xl:flex hidden flex-col items-end uppercase opacity-25 font-bold text-xs/3 absolute right-0 bottom-3"
            }
          >
            {courseData.ATTRIBUTES.map((attr) => (
              <div key={attr.SSRATTR_ATTR_CODE}>{attr.STVATTR_DESC}</div>
            ))}
          </div>
        </div>
        <div className="text-gray-500 space-y-6 py-5">
          <p className="text">{courseData.COURSE_DESCRIPTION}</p>

          <ScheduleDisplay
            schedules={JSON.parse(courseData.SWV_CLASS_SEARCH_JSON_CLOB)}
          />
        </div>
      </div>

      <div className="flex flex-col h-full gap-y-2">
        <div className="flex flex-1 flex-col gap-y-2 p-6 bg-black/5">
          <div className="border-b pb-2 border-b-neutral-300">
            {instructors.length > 0 ? (
              instructors.map((instructor) => (
                <div
                  key={instructor.MORE}
                  className="flex items-center gap-x-4"
                >
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
              <div className="flex items-center gap-x-4 ">
                <MdPerson className="w-4 h-4" />
                <p>Not assigned</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-x-4 border-b pb-2 border-b-neutral-300">
            <MdOutlineAccessTimeFilled className="w-4 h-4" />
            <p>
              <span className="font-semibold text-base">
                {courseData.HRS_LOW}
              </span>{" "}
              {courseData.HRS_HIGH && (
                <span className="font-semibold text-base">
                  - {courseData.HRS_HIGH}
                </span>
              )}{" "}
              credit hour
              {(courseData.HRS_LOW !== 1 || courseData.HRS_HIGH) && "s"}
            </p>
          </div>

          <div className="flex items-center gap-x-4 border-b pb-2 border-b-neutral-300">
            <FaChalkboardTeacher className="w-4 h-4" />
            <p>{courseData.INSTRUCTIONAL_METHOD}</p>
          </div>

          <div className="flex items-center gap-x-4">
            <PiDetectiveFill className="w-4 h-4" />
            <p>
              <span className="font-semibold text-base">{numWatching}</span>{" "}
              student{numWatching !== 1 && "s"} watching
            </p>
          </div>
        </div>

        {courseData.TERM_CODE === CURRENT_TERM && (
          <SectionButton crn={crn} courseData={courseData} />
        )}
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
