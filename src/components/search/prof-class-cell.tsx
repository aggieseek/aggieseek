"use client";

import React from "react";
import Link from "next/link";
import { CURRENT_TERM } from "@/lib/utils";
import { Section } from "@prisma/client";
import {
  RiHashtag,
} from "react-icons/ri";

interface ProfClassCellProps {
  section: Section;
}

export default function ProfClassCell({ section }: ProfClassCellProps) {

  return (
    <div className="w-full bg-gray-50 p-4 rounded-md border relative">
      <Link
        href={`/dashboard/search/sections?term=${section.term}&crn=${section.crn}&source=dashboard`}
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
          <RiHashtag className="w-3 h-3" />
          <div>Section {section.section}</div>
        </div>
      </div>

      <div className="absolute bottom-1 font-medium right-1 text-xs opacity-25">
        {section.crn}
      </div>
    </div>
  );
}