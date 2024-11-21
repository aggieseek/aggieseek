'use client';

import { Course, Seat } from "@/lib/course-types";
import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { PiArmchairFill } from "react-icons/pi";
import { MdNumbers } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import AttributeBadge from "@/components/attribute-badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";

interface ClassCellProps {
  crn: string;
  onDeleteAction: (crn: string) => void;
}

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin']
});

const fetchCRNDetails = async (crn: string) => {
  const url = `http://127.0.0.1:8080/terms/202511/classes/${ crn }`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }

  return null;
};

const fetchCRNSeats = async (crn: string) => {
  const url = `http://127.0.0.1:8080/terms/202511/classes/${ crn }/seats`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export default function ClassCell({ crn, onDeleteAction }: ClassCellProps) {

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [seatData, setSeatData] = useState<Seat | null>(null);

  useEffect(() => {
    fetchCRNDetails(crn)
      .then(section => {
        setCourseData(section);
      });
    fetchCRNSeats(crn)
      .then(seatsData => {
        setSeatData(seatsData ? seatsData.SEATS : null);
      });
  }, [crn]);

  return (
    <div
      className={ "transition-transform select-none flex items-center w-full h-14 bg-zinc-100 border-l-4 border-l-zinc-400 px-3 py-2 shadow-sm cursor-pointer hover:scale-[1.01]" }>
      <div
        className="w-full h-full grid grid-cols-1 xl:grid-cols-[50%_auto]">
        <div className="grid grid-rows-2">
          { courseData
            ? <div className={ "flex items-center gap-x-2" }>
              <h3 className="font-bold text-sm truncate">{ courseData.COURSE_NAME } - { courseData.COURSE_TITLE }</h3>
              { courseData.OTHER_ATTRIBUTES["Section attributes"].map((attr, index) => (
                <AttributeBadge attribute={ attr } key={ index }/>
              )) }
            </div>
            : <Skeleton className="h-3 w-[250px] bg-zinc-400"/> }

          <div className="grid grid-cols-[3fr_2fr_2fr] gap-x-4 opacity-50">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <IoPerson/>
              </div>
              { courseData
                ? <p className="text-xs truncate hover:underline select-none">{ courseData.INSTRUCTOR }</p>
                : <Skeleton className="h-3 w-32 bg-zinc-400"/> }
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <MdNumbers/>
              </div>
              <p className={ cn("text-xs truncate hover:underline select-none", jetbrainsMono.className) }>
                { courseData
                  ? <Link href={ "/search/sections/202511" + crn }>{ crn } / { courseData.SECTION_NUMBER }</Link>
                  : crn }
              </p>
            </div>

            <div
              className={ `flex items-center ${ seatData && seatData.REMAINING <= 0 ? "text-red-500" : undefined }` }>
              <PiArmchairFill className="w-4 h-4 mr-2"/>
              { seatData
                ? <p className={ "text-xs" }>{ seatData.REMAINING } seats</p>
                : <Skeleton className="h-3 w-12 bg-zinc-400"/> }
            </div>
          </div>
        </div>
      </div>

      <button className={ "transition-transform hover:scale-110 active:scale-90" }
              onClick={ () => onDeleteAction(crn) }>
        <X/>
      </button>
    </div>
  );

}