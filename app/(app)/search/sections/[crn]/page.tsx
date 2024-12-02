"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import LoadingCircle from "@/components/loading-circle";
import { SectionHowdy } from "@/lib/howdy-types";

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `/api/sections?crn=${crn}&term=${term}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export default function Section() {

  const params = useParams(); // This will get the dynamic parameters
  const {crn} = params;
  const [courseData, setCourseData] = useState<SectionHowdy | null>(null);

  useEffect(() => {
    if (typeof crn != "string") return;
    const term = crn?.substring(0, 6);
    const courseCRN = crn?.substring(6);
    fetchSectionDetails(term, courseCRN)
      .then(data => {
        setCourseData(data);
      });
  }, [crn]);

  return (
    <div className="space-y-4">
      {courseData
        ? <p>
          { courseData?.COURSE_DESCRIPTION }
        </p>
        : <div className={ "flex justify-center" }>
        <LoadingCircle/>
        </div>}
    </div>
  );
} 