import { Instructor } from "@/lib/types/course-types";
import { Section } from "@prisma/client";
import Link from "next/link";
import {
  RiArrowRightSLine,
  // RiEyeLine,
} from "react-icons/ri";

interface SearchClassCellProps {
  section: Section;
}

export default function SearchClassCell({ section }: SearchClassCellProps) {
  const parse = section.instructorJson as unknown as Instructor[];
  const instructors = parse?.map((instructor) => {
    return {
      name: instructor.NAME.replace("(P)", ""),
      id: instructor.MORE,
    };
  });

  return (
    <div className="bg-gray-50 border flex justify-between rounded-lg w-full">
      <div className="p-3">
        <div className="font-bold maroon-gradient text-transparent bg-clip-text">
          {section.subject} {section.course}-{section.section}
        </div>

        <div>{section.title}</div>
      </div>

      <div className="flex">
        <div className="truncate flex flex-col mr-3 font-medium items-end p-3">
          {instructors ? (
            <Link
              href={`/dashboard/search/instructors?id=${instructors[0].id}`}
              className="underline-anim"
            >
              {instructors ? instructors[0].name : "Not assigned"}
            </Link>
          ) : (
            <div>Not assigned</div>
          )}

          <div className="opacity-25">{section.crn}</div>
        </div>

        {/* <div className="flex items-center justify-center text-white bg-green-500 px-2">
          <RiEyeLine className="w-4 h-4" />
        </div> */}

        <Link
          href={`/dashboard/search/sections?term=${section.term}&crn=${section.crn}`}
          className="transition-colors duration-100 flex items-center justify-center text-white bg-gray-500 hover:bg-gray-600 px-2 rounded-r-md"
        >
          <RiArrowRightSLine className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
