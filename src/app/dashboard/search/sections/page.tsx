"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/loading-circle";
import { ISectionHowdy } from "@/lib/types/howdy-types";
import Link from "next/link";
import { MdHome, MdOutlineAccessTimeFilled, MdPerson } from "react-icons/md";
import { Instructor } from "@/lib/types/course-types";

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `/api/data/sections?crn=${crn}&term=${term}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export default function Section() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const crn = searchParams.get("crn");
  const back = searchParams.get("back") === "true";
  const router = useRouter();
  
  const [courseData, setCourseData] = useState<ISectionHowdy | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    if (!term || !crn) {
      router.push("/dashboard/search");
      return;
    };

    fetchSectionDetails(term, crn).then((data) => {
      setCourseData(data);
      if (data.SWV_CLASS_SEARCH_INSTRCTR_JSON !== null)
        setInstructors(JSON.parse(data.SWV_CLASS_SEARCH_INSTRCTR_JSON));
    });
  }, [crn, router, term]);

  if (courseData === null) {
    return <div className="flex justify-center">
      <LoadingCircle />
    </div>;
  }

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-x-4 text-sm h-full">
      <div className="translate-y-3 reset-transform">
            {back && (
            <Link href={"/dashboard/home"} className="flex gap-x-2 items-center font-bold mb-4 hover:underline">
              <MdHome/>
              Back to Dashboard
            </Link>
            )}

          <p className="text-2xl tracking-widest border-b pb-3 font-semibold">{courseData.COURSE_TITLE}</p>
          <p className="text-gray-500 mt-3">{courseData.COURSE_DESCRIPTION}</p>

        </div>

      <div className="h-full flex flex-col gap-y-2 p-6 bg-black/5">
        {instructors.length > 0 ?
        instructors.map(instructor =>
          <div key={instructor.MORE} className="flex items-center gap-x-4">
            <MdPerson className="w-4 h-4" />
            <Link className="hover:underline" href={`/dashboard/search/instructors?id=${instructor.MORE}`}>{instructor.NAME}</Link>
          </div>) :
        <div className="flex items-center gap-x-4">
          <MdPerson className="w-4 h-4" />
          <p>Not assigned</p>
        </div>}

        <div className="flex items-center gap-x-4">
          <MdOutlineAccessTimeFilled className="w-4 h-4" />
          <p><span className="font-semibold text-base">{courseData.HRS_LOW}</span> credit hours</p>
        </div>
      </div>
    </div>
  );
}
