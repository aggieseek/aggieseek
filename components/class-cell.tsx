'use client';

import React from "react";
import { IoPerson } from "react-icons/io5";
import { MdNumbers } from "react-icons/md";
import Link from "next/link";
import { X } from "lucide-react";
import { cn, CURRENT_TERM } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { Section } from "@prisma/client";
import { Instructor } from "@/lib/course-types";
import AttributeBadge from "@/components/attribute-badge";

interface ClassCellProps {
  section: Section;
  onDeleteAction: (crn: string) => void;
}

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin']
});

export default function ClassCell({ section, onDeleteAction }: ClassCellProps) {

  return (
    <div
      className={ "transition-transform select-none flex items-center w-full h-14 bg-zinc-100 border-l-4 border-l-zinc-400 px-3 py-2 shadow-sm cursor-pointer hover:scale-[1.01]" }>
      <div
        className="w-full h-full grid grid-cols-1 xl:grid-cols-[50%_auto]">
        <div className="grid grid-rows-2">
          <div className={ "flex items-center gap-x-2" }>
            <h3 className="font-bold text-sm truncate">
              { section.subject } { section.course } - { section.title.replaceAll('HNR-', '') }</h3>
            { section.attributes?.split('|').map((attr, index) => (
              <AttributeBadge attribute={ attr.trim() } key={ index }/>
            )) }
          </div>

          <div className="grid grid-cols-[3fr_2fr_2fr] gap-x-4 opacity-50">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <IoPerson/>
              </div>
              <p className="text-xs truncate hover:underline select-non e">
                { ((section.instructor_json as unknown) as Instructor[])[0].NAME.replaceAll('(P)', '') }
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <MdNumbers/>
              </div>
              <p className={ cn("text-xs truncate hover:underline select-none", jetbrainsMono.className) }>
                <Link href={ `/search/sections/${CURRENT_TERM}` + section.crn }>{ section.crn }</Link>
              </p>
            </div>

            <div className="flex items-center">
              <p className={"text-xs truncate"}>
                { section.section_open ? "Open"
                  : <span className={"text-red-500"}>Closed</span> }
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
              onClick={ () => onDeleteAction(section.crn) }>
        <X/>
      </button>
    </div>
  );

}