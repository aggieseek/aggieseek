"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";
import LoadingCircle from "@/components/loading-circle";
import { ISectionHowdy } from "@/lib/types/howdy-types";
import Link from "next/link";
import { IInstructorHowdy } from "@/lib/types/howdy-types";
import { cn, CURRENT_TERM } from "@/lib/utils";
import useTrackedSectionsStore, {
  LoadingState,
} from "@/stores/useTrackedSectionsStore";
import { useSession } from "next-auth/react";
import ScheduleDisplay from "@/components/schedule-display";
import SectionSidebar from "@/components/section-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RiEyeCloseFill,
  RiEyeFill,
  RiHome3Line,
  RiSearch2Line,
} from "react-icons/ri";

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
  const isProcessing =
    loadState === LoadingState.ADDING || loadState === LoadingState.DELETING;
  const isTracked = trackedSections.some((section) => section.crn === crn);

  const handleClick = isLoading
    ? () => {}
    : isTracked
    ? () => deleteSection(courseData.term, courseData.CRN)
    : () => addSection(courseData.term, courseData.CRN);

  const icon =
    isLoading || isProcessing ? (
      <LoadingCircle />
    ) : isTracked ? (
      <RiEyeCloseFill className="w-6 h-6" />
    ) : (
      <RiEyeFill className="w-6 h-6" />
    );

  const text = isLoading
    ? null
    : isProcessing
    ? ""
    : isTracked
    ? "Untrack Section"
    : "Track Section";

  return (
    <Button
      className={cn(
        "transition-colors duration-100 px-6 py-2 font-semibold hover:cursor-pointer",
        isProcessing && "hover:cursor-default"
      )}
      onClick={isProcessing ? () => {} : handleClick}
      variant={isTracked ? "destructive" : "default"}
    >
      <div className="flex justify-center items-center gap-x-2">
        {icon}
        {text && <span>{text}</span>}
      </div>
    </Button>
  );
};

function SectionPanel({
  children,
  title,
  className = "",
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-semibold text-black text-lg border-b">{title}</h2>
      <div className="py-4">{children}</div>
    </div>
  );
}

function SectionPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term") ?? "202531";
  const crn = searchParams.get("crn");
  const source = searchParams.get("source");
  const router = useRouter();
  const { status } = useSession();

  const [courseData, setCourseData] = useState<ISectionHowdy | null>(null);
  const [numWatching, setNumWatching] = useState<number | null>(null);
  const [instructors, setInstructors] = useState<IInstructorHowdy[]>([]);
  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);

  const { fetchSections } = useTrackedSectionsStore();

  useEffect(() => {
    if (status === "authenticated") {
      fetchSections(term);
    }
  }, [status]);

  useEffect(() => {
    if (!term || !crn) {
      router.push("/dashboard/search");
      return;
    }

    fetchSectionDetails(term, crn).then((data: ISectionHowdy) => {
      if (Object.keys(data).length === 0) {
        setPageState(PageState.ERROR);
        return;
      }

      setCourseData(data);
      if (data.SWV_CLASS_SEARCH_INSTRCTR_JSON !== null)
        setInstructors(JSON.parse(data.SWV_CLASS_SEARCH_INSTRCTR_JSON));

      fetchWatchers(term, crn).then((data) => {
        setNumWatching(data.count);
      });
      setPageState(PageState.IDLE);
    });
  }, [crn, router, term]);

  if (pageState === PageState.ERROR) {
    return (
      <Link
        href={"/dashboard/search"}
        className="inline-flex gap-x-2 w-auto items-center font-bold mb-4 hover:underline"
      >
        <RiSearch2Line />
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
    <div className="flex flex-col gap-y-2 lg:grid lg:grid-cols-[5fr_2fr] xl:grid-cols-[9fr_4fr] lg:gap-x-4 lg:gap-y-0 text-sm h-full">
      <div className="translate-y-3 reset-transform">
        {source === "dashboard" && (
          <Link
            href={"/dashboard"}
            className="inline-flex self-start gap-x-2 items-center font-bold mb-4 group"
          >
            <RiHome3Line className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all" />
            Back to Dashboard
          </Link>
        )}

        <div className="border-b pb-3">
          <div className="text-2xl tracking-wide font-black maroon-gradient inline-block text-transparent bg-clip-text">
            {courseData.COURSE_TITLE}
          </div>
        </div>
        <div className="text-gray-500 flex flex-col gap-y-2">
          <p className="text py-4">{courseData.COURSE_DESCRIPTION}</p>

          <SectionPanel title="Schedule">
            <ScheduleDisplay
              schedules={JSON.parse(courseData.SWV_CLASS_SEARCH_JSON_CLOB)}
            />
          </SectionPanel>

          <SectionPanel title="Attributes">
            <div className="flex gap-x-2 -mt-2">
              {courseData.ATTRIBUTES.map((attr) => (
                <Badge
                  className=" bg-red-950 hover:bg-red-900 text-xs hover:cursor-pointer"
                  key={attr.SSRATTR_ATTR_CODE}
                >
                  {attr.STVATTR_DESC}
                </Badge>
              ))}
            </div>
          </SectionPanel>
        </div>
      </div>

      <div className="flex flex-col h-full gap-y-2">
        <SectionSidebar
          courseData={courseData}
          instructors={instructors}
          numWatching={numWatching}
        />

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
