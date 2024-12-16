"use client";

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
  subsets: ["latin"],
});

export default function ClassCell({ section, onDeleteAction }: ClassCellProps) {
  return (
    <div className="transition-transform select-none flex flex-col sm:flex-row items-start sm:items-center w-full min-h-[3.5rem] bg-zinc-100 border-l-4 border-l-zinc-400 px-3 py-2 shadow-sm cursor-pointer hover:scale-[1.01]">
      <div className="w-full grid grid-cols-1 gap-y-2 sm:gap-y-0 sm:grid-cols-[1fr_auto]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-between">
            <h3 className="font-bold text-sm">
              {section.subject} {section.course} -{" "}
              {section.title.replaceAll("HNR-", "")}
            </h3>
            <div className="flex flex-wrap gap-1">
              {section.attributes?.split("|").map((attr, index) => (
                <AttributeBadge attribute={attr.trim()} key={index} />
              ))}
            </div>
            <button
              className="transition-transform hover:scale-110 active:scale-90 mt-2 justify-end"
              onClick={() => onDeleteAction(section.crn)}
            >
              <X />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs opacity-50">
            <div className="flex items-center">
              <IoPerson className="w-4 h-4 mr-2" />
              <p className="truncate hover:underline">
                {section.instructorJson
                  ? (
                      section.instructorJson as unknown as Instructor[]
                    )[0].NAME.replaceAll("(P)", "")
                  : "Not assigned"}
              </p>
            </div>

            <div className="flex items-center">
              <MdNumbers className="w-4 h-4 mr-2" />
              <p
                className={cn(
                  "truncate hover:underline",
                  jetbrainsMono.className
                )}
              >
                <Link href={`/search/sections/${CURRENT_TERM}${section.crn}`}>
                  {section.crn}
                </Link>
              </p>
            </div>

            <div className="flex items-center">
              <p className="truncate">
                {section.isSectionOpen ? (
                  "Open"
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
