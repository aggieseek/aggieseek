'use client';

import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdNumbers } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import AttributeBadge from "@/components/attribute-badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { AttributeHowdy, InstructorHowdy, SectionHowdy } from "@/lib/howdy-types";

interface ClassCellProps {
  crn: string;
  onDeleteAction: (crn: string) => void;
}

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin']
});

const fetchSectionDetails = async (term: string, crn: string) => {
  const url = `/api/sections?crn=${ crn }&term=${ term }`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

const fetchSectionInstructor = async (term: string, crn: string) => {
  const url = `/api/instructors?crn=${ crn }&term=${ term }`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

const fetchSectionAttributes = async (term: string, crn: string) => {
  const url = `/api/attributes?crn=${ crn }&term=${ term }`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};


export default function ClassCell({ crn, onDeleteAction }: ClassCellProps) {

  const [courseData, setCourseData] = useState<SectionHowdy | null>(null);
  const [instructorData, setInstructorData] = useState<InstructorHowdy | null>(null);
  const [attributeData, setAttributeData] = useState<AttributeHowdy[] | null>(null);

  useEffect(() => {
    fetchSectionDetails('202511', crn)
      .then(section => {
        setCourseData(section);
      });
    fetchSectionInstructor('202511', crn)
      .then(data => {
        setInstructorData(data);
      });
    fetchSectionAttributes('202511', crn)
      .then(data => {
        setAttributeData(data);
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
              <h3 className="font-bold text-sm truncate">
                { courseData.SUBJECT_CODE } { courseData.COURSE_NUMBER } - { courseData.COURSE_TITLE }</h3>
              { attributeData?.map((attr, index) => (
                <AttributeBadge attribute={ attr } key={ index }/>
              )) }
            </div>
            : <Skeleton className="h-3 w-[250px] bg-zinc-400"/> }

          <div className="grid grid-cols-[3fr_2fr_2fr] gap-x-4 opacity-50">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <IoPerson/>
              </div>
              { instructorData
                ? <p className="text-xs truncate hover:underline select-none">
                  { JSON.parse(instructorData?.SWV_CLASS_SEARCH_INSTRCTR_JSON)[0].NAME }
                </p>
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

            {/*<div*/ }
            {/*  className={ `flex items-center ${ seatData && seatData.REMAINING <= 0 ? "text-red-500" : undefined }` }>*/ }
            {/*  <PiArmchairFill className="w-4 h-4 mr-2"/>*/ }
            {/*  { seatData*/ }
            {/*    ? <p className={ "text-xs" }>{ seatData.REMAINING } seats</p>*/ }
            {/*    : <Skeleton className="h-3 w-12 bg-zinc-400"/> }*/ }
            {/*</div>*/ }
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