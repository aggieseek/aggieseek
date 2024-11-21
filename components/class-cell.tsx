'use client';

import { CourseData, SeatData } from "@/types/CourseData";
import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { PiArmchairFill } from "react-icons/pi";
import { MdNumbers } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { JetBrains_Mono } from 'next/font/google';
import AttributeBadge from "@/components/attribute-badge";
import { X } from "lucide-react";

interface ClassCellProps {
  crn: string;
  onDeleteAction: (crn: string) => void;
}

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin']
});

export default function ClassCell({ crn, onDeleteAction }: ClassCellProps) {

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [seatData, setSeatData] = useState<SeatData | null>(null);

  const fetchCRNSeats = async (crn: string) => {
    const url = `http://127.0.0.1:8080/terms/202511/classes/${ crn }/seats`;
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();
      setSeatData(data.SEATS);
    } else {
      console.error(`Error while fetching CRN: ${ crn }`);
    }
  };

  const fetchCRNDetails = async (crn: string) => {
    const url = `http://127.0.0.1:8080/terms/202511/classes/${ crn }`;
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();
      setCourseData(data);

      fetchCRNSeats(crn);
    }
  };

  useEffect(() => {
    fetchCRNDetails(crn);
  }, [crn]);

  return (
    <div className={"transition-transform select-none flex items-center w-full h-14 bg-zinc-100 border-l-4 border-l-zinc-400 px-3 py-2 shadow-sm cursor-pointer hover:scale-[1.01]"}>
      <div
        className="w-full h-full grid grid-cols-1 xl:grid-cols-classcell">
        <div className="grid grid-rows-2">
          { courseData
            ? <div className={ "flex items-center gap-x-2" }>
              <h3 className="font-bold text-sm truncate">{ courseData.COURSE_NAME } - { courseData.COURSE_TITLE }</h3>
              { courseData.OTHER_ATTRIBUTES["Section attributes"].map((attr, index) => (
                <AttributeBadge attribute={ attr } key={ index }/>
              )) }
            </div>
            : <Skeleton className="h-3 w-[250px] bg-zinc-400"/> }

          <div className="grid grid-cols-5 gap-x-4 opacity-50 ">
            <div className="flex items-center col-span-2">
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
              <p className="text-xs truncate hover:underline select-none">
                { courseData
                  ? <Link href={ "/search/sections/202511" + crn } className={ jetbrainsMono.className }>{ crn }</Link>
                  : crn }
              </p>
            </div>

            <div
              className={ `col-span-2 flex items-center ${ seatData && seatData.REMAINING <= 0 ? "text-red-500" : undefined }` }>
              <PiArmchairFill className="w-4 h-4 mr-2"/>
              { seatData
                ? <p className={ "text-xs" }>{ seatData.REMAINING } seats</p>
                : <Skeleton className="h-3 w-12 bg-zinc-400"/> }
            </div>
          </div>
        </div>
      </div>

      <button className={"transition-transform hover:scale-110 active:scale-90"}
      onClick={() => onDeleteAction(crn)}>
        <X />
      </button>
    </div>
  );

}