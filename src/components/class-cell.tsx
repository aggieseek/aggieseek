"use client";

import React from "react";
import Link from "next/link";
import { CURRENT_TERM } from "@/lib/utils";
import { Section } from "@prisma/client";
import { IInstructorHowdy } from "@/lib/types/howdy-types";
import useTrackedSectionsStore from "@/stores/useTrackedSectionsStore";
import { JsonValue } from "@prisma/client/runtime/library";
import {
  RiDeleteBinFill,
  RiDoorClosedFill,
  RiGroupFill,
  RiGroupLine,
  RiHashtag,
  RiMessage2Fill,
  RiMoreFill,
} from "react-icons/ri";
import { RiDoorOpenFill } from "react-icons/ri";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ClassCellProps {
  section: Section;
  sms: boolean;
  smsLimitReached: boolean;
}

function InstructorLabel({ instructorJson }: { instructorJson: JsonValue }) {
  const data = instructorJson
    ? (instructorJson as unknown as IInstructorHowdy[])
    : [];
  const instructors = data.map((instructor) => {
    return {
      name: instructor.NAME.split(" ")
        .filter((name) => name !== "(P)")
        .pop(),
      id: instructor.MORE,
    };
  });

  return (
    <div>
      {data.length > 0 ? (
        instructors.map((ins, index) => (
          <div key={ins.id} className="inline">
            <Link
              key={ins.id}
              className="underline-anim"
              href={`/dashboard/search/instructors?id=${ins.id}&source=dashboard`}
            >
              {ins.name}
            </Link>
            {index < instructors.length - 1 && ", "}
          </div>
        ))
      ) : (
        <span>Not assigned</span>
      )}
    </div>
  );
}

export default function ClassCell({
  section,
  sms,
  smsLimitReached,
}: ClassCellProps) {
  const { deleteSectionImmediately, toggleSms } = useTrackedSectionsStore();

  return (
    <div className="w-full lg:w-[calc(50%-1rem)] bg-gray-50 p-4 rounded-md border relative">
      <div className="w-[calc(100%-4rem)]">
        <Link
          href={`/dashboard/search/sections?term=${CURRENT_TERM}&crn=${section.crn}&source=dashboard`}
          className="inline-block group relative space-y-2 mb-1"
        >
          <div className="text-lg flex flex-col sm:block leading-tight min-h-8 font-extrabold decoration-gray-600 decoration-1">
            <span className="maroon-gradient group-hover:text-[1.2rem] transition-all bg-clip-text text-transparent">
              {section.subject} {section.course}
            </span>
            <span className="hidden sm:inline">{": "}</span>
            <span className="text-black inline-flex line-clamp-1 font-semibold md:text-bold text-sm md:text-base">
              {section.title}
              {sms && <RiMessage2Fill className="ml-2 self-center" />}
            </span>
          </div>
        </Link>

        <div className="flex flex-wrap gap-x-4 text-xs">
          <div className="flex items-center gap-x-2">
            {section.instructorJson ? (
              <RiGroupFill className="w-3 h-3" />
            ) : (
              <RiGroupLine className="w-3 h-3" />
            )}
            <InstructorLabel instructorJson={section.instructorJson} />
          </div>

          <div className="flex items-center gap-x-2">
            <RiHashtag className="w-3 h-3" />
            <div>Section {section.section}</div>
          </div>

          <div className="flex items-center gap-x-2">
            {section.isSectionOpen ? (
              <RiDoorOpenFill className="w-3 h-3" />
            ) : (
              <RiDoorClosedFill className="w-3 h-3" />
            )}
            <div>{section.isSectionOpen ? "Open" : "Closed"}</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 font-medium right-1 text-xs opacity-25">
        {section.crn}
      </div>

      <Popover>
        <PopoverTrigger className="absolute top-0 right-0">
          <RiMoreFill className="transition-opacity duration-150 hover:cursor-pointer w-4 h-4 opacity-25 m-2 hover:opacity-100" />
        </PopoverTrigger>
        <PopoverContent
          className="text-xs w-max p-2 font-medium"
          align="end"
          side="top"
        >
          <div
            className="flex p-1 items-center gap-x-2 hover:cursor-pointer hover:bg-gray-50"
            onClick={() => {
              deleteSectionImmediately(section.term, section.crn).then(() => {
                toast.success(`Successfully deleted section ${section.crn}!`);
              });
            }}
          >
            <RiDeleteBinFill />
            <div>Delete Section</div>
          </div>

          {(sms || !smsLimitReached) && (
            <div
              className="flex p-1 items-center gap-x-2 hover:cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSms(section.term, section.crn)}
            >
              <RiMessage2Fill />

              <div>
                {sms ? "Disable SMS Notifications" : "Enable SMS Notifications"}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
