"use client";

import React from "react";
import { IoPerson } from "react-icons/io5";
import { MdNumbers } from "react-icons/md";
import Link from "next/link";
import { X } from "lucide-react";
import { cn, CURRENT_TERM } from "@/lib/utils";
import { Section } from "@prisma/client";
import AttributeBadge from "@/components/attribute-badge";
import { Instructor } from "@/lib/types/course-types";
import { jetbrainsMono } from "@/lib/fonts";

interface ClassCellProps {
  section: Section;
  onDeleteAction: (crn: string) => void;
}

export default function ClassCell({ section, onDeleteAction }: ClassCellProps) {
  return (
    <div className="transition-transform select-none flex flex-col sm:flex-row items-start sm:items-center md:w-[calc(50%-1rem)] min-h-[3.5rem] bg-zinc-100 border-l-4 border-l-zinc-400 px-3 py-2 shadow-sm cursor-pointer hover:scale-[1.01]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_auto]">
        <div className="space-y-2 sm:space-y-0 w-full">
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="flex justify-start space-x-2 w-full">
              <h3 className="font-bold text-sm">
                {section.subject} {section.course} -{" "}
                {section.title.replaceAll("HNR-", "")}
              </h3>

              <div className="flex flex-wrap gap-1">
                {section.attributes?.split("|").map((attr, index) => (
                  <AttributeBadge attribute={attr.trim()} key={index} />
                ))}
              </div>
            </div>
            <button
              className="transition-transform hover:scale-110 active:scale-90 justify-end"
              onClick={() => onDeleteAction(section.crn)}
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-y-1 text-xs">
            <div className="flex items-center">
              <IoPerson className="w-4 h-4 mr-2" />
              {section.instructorJson ? (
                <Link
                  href={`/dashboard/search/instructors?id=${
                    (section.instructorJson as unknown as Instructor[])[0].MORE
                  }`}
                  className="truncate hover:underline"
                >
                  {(
                    section.instructorJson as unknown as Instructor[]
                  )[0].NAME.replace("(P)", "")}
                </Link>
              ) : (
                <p>Not assigned</p>
              )}
            </div>

            <div
              className={cn(
                "flex items-center gap-x-2",
                jetbrainsMono.className
              )}
            >
              <div className="flex items-center">
                <MdNumbers className="w-4 h-4 mr-2" />
                <p
                  className={cn(
                    "truncate hover:underline",
                    jetbrainsMono.className
                  )}
                >
                  <Link
                    href={`/dashboard/search/sections?term=${CURRENT_TERM}&crn=${section.crn}&back=true`}
                  >
                    {section.crn}
                  </Link>
                </p>
              </div>

              <div>
                <p className="truncate font-semibold">
                  {section.isSectionOpen ? (
                    "OPEN"
                  ) : (
                    <span className="text-red-500">CLOSED</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
