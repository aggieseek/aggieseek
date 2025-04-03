import { IInstructorHowdy } from "@/lib/types";
import { Section } from "@prisma/client";
import Link from "next/link";
import { RiArrowRightWideLine } from "react-icons/ri";

export default function SearchClassCell({ section }: { section: Section }) {
  const instructors = section.instructorJson as unknown as IInstructorHowdy[];
  const sortedInstructors = instructors?.sort((a, b) => {
    const hasP_A = a.NAME.includes("(P)");
    const hasP_B = b.NAME.includes("(P)");

    if (hasP_A && !hasP_B) return -1;
    if (!hasP_A && hasP_B) return 1;

    return a.NAME.localeCompare(b.NAME);
  });
  const primary = sortedInstructors?.[0];

  return (
    <div
      className="transition-transform bg-gray-50 border flex justify-between rounded-lg w-full"
      key={section.crn}
    >
      <div className="p-3">
        <div className="font-bold maroon-gradient text-transparent bg-clip-text">
          {section.subject} {section.course}-{section.section}
        </div>

        <div>{section.title}</div>
      </div>

      <div className="flex flex-row gap-x-2">
        <div className="truncate p-3 flex flex-col font-medium items-end">
          {primary ? (
            <Link
              href={`/dashboard/search/instructors?id=${primary.MORE}&source=search`}
              className="underline-anim"
            >
              {primary.NAME.replace("(P)", "")}
            </Link>
          ) : (
            <div>Not assigned</div>
          )}

          <div className="opacity-25">{section.crn}</div>
        </div>

        <Link
          href={`/dashboard/search/sections?term=${section.term}&crn=${section.crn}&source=search`}
          className="transition-colors duration-150 flex bg-gray-200 hover:bg-gray-300 flex-col hover:cursor-pointer justify-center items-center h-full border-l rounded-r-md p-1"
        >
          <RiArrowRightWideLine className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
