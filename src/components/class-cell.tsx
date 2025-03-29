"use client";

import React from "react";
import Link from "next/link";
import { CURRENT_TERM } from "@/lib/utils";
import { Section } from "@prisma/client";
import { Instructor } from "@/lib/types/course-types";
import useTrackedSectionsStore from "@/stores/useTrackedSectionsStore";
import { JsonValue } from "@prisma/client/runtime/library";
import {
  RiDeleteBinFill,
  RiGroupFill,
  RiGroupLine,
  RiHashtag,
} from "react-icons/ri";

interface ClassCellProps {
  section: Section;
}

function InstructorLabel({ instructorJson }: { instructorJson: JsonValue }) {
  const data = instructorJson
    ? (instructorJson as unknown as Instructor[])
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
              href={`/dashboard/search/instructors?id=${ins.id}`}
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

export default function ClassCell({ section }: ClassCellProps) {
  const { deleteSection } = useTrackedSectionsStore();

  return (
    <div className="w-full lg:w-[calc(50%-1rem)] bg-gray-50 p-4 rounded-md border relative">
      <Link
        href={`/dashboard/search/sections?term=${CURRENT_TERM}&crn=${section.crn}&source=dashboard`}
        className="inline-block group relative space-y-2 mb-1"
      >
        <div className="text-lg flex flex-col sm:block leading-tight min-h-8 font-extrabold decoration-gray-600 decoration-1">
          <span className="maroon-gradient group-hover:text-[1.2rem] transition-all bg-clip-text text-transparent">
            {section.subject} {section.course}
          </span>
          <span className="hidden sm:inline">{": "}</span>
          <span className="text-black inline line-clamp-1 font-semibold md:text-bold text-sm md:text-base">
            {section.title}
          </span>
        </div>
      </Link>

      <div className="flex gap-x-4 text-xs">
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
      </div>

      <div className="absolute bottom-1 font-medium right-1 text-xs opacity-25">
        {section.crn}
      </div>

      <RiDeleteBinFill
        onClick={() => deleteSection(section.crn)}
        className="transition-opacity duration-300 hover:cursor-pointer w-4 h-4 opacity-25 m-2 hover:opacity-100 absolute top-0 right-0"
      />
    </div>
  );
}
