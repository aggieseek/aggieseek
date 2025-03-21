"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/loading-circle";
import { ISectionHowdy } from "@/lib/types/howdy-types";

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
  const router = useRouter();
  const [courseData, setCourseData] = useState<ISectionHowdy | null>(null);

  useEffect(() => {
    if (!term || !crn) {
      router.push("/dashboard/search");
      return;
    };

    fetchSectionDetails(term, crn).then((data) => {
      setCourseData(data);
    });
  }, [crn, router, term]);

  return (
    <div className="grid grid-cols-[3fr_1fr] text-sm">
      <div className="border">
      {courseData ? (
        <div>
        <h1>{courseData.COURSE_TITLE}</h1>
        <p>{courseData.COURSE_DESCRIPTION}</p>
        {/* Add more course details here */}
        </div>
      ) : (
        <LoadingCircle />
      )}
      </div>

      <div className="border">
      {/* Additional content or components can go here */}
      </div>
    </div>
  );
}
