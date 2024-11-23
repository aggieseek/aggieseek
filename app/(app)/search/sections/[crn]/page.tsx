"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Course} from "@/lib/course-types";
import LoadingCircle from "@/components/loading-circle";

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `http://127.0.0.1:8080/terms/${term}/classes/${crn}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export default function Section() {

  const params = useParams(); // This will get the dynamic parameters
  const {crn} = params;
  const [courseData, setCourseData] = useState<Course | null>(null);

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
      <p>
        {courseData?.COURSE_DESCRIPTION}
      </p>
      {courseData
        ? <h3 className="text-xl">
          <span className={"font-bold"}>Instructor:</span> {courseData.INSTRUCTOR}
        </h3>
        : <div className={"flex justify-center"}>
          <LoadingCircle/>
        </div>}
    </div>
  );
} 