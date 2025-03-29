import { Instructor } from "@/lib/types/course-types";
import { ISectionHowdy } from "@/lib/types/howdy-types";
import Link from "next/link";
import {
  RiPencilFill,
  RiSpyFill,
  RiTimeFill,
  RiUserFill,
  RiUserStarFill,
} from "react-icons/ri";

interface SectionSidebarProps {
  instructors: Instructor[];
  courseData: ISectionHowdy;
  numWatching: number;
}

export default function SectionSidebar({
  instructors,
  courseData,
  numWatching,
}: SectionSidebarProps) {
  return (
    <div className="bg-gray-50 border rounded-lg p-6 gap-y-2 flex flex-1 flex-col">
      <div className="border-b pb-2 border-b-neutral-300">
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
            <div key={instructor.MORE} className="flex items-center gap-x-4">
              {instructor.NAME.endsWith("(P)") ? (
                <RiUserStarFill className="w-4 h-4" />
              ) : (
                <RiUserFill className="w-4 h-4" />
              )}
              <Link
                className="hover:underline"
                href={`/dashboard/search/instructors?id=${instructor.MORE}`}
              >
                {instructor.NAME}
              </Link>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-x-4 ">
            <RiUserFill className="w-4 h-4" />
            <p>Not assigned</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-x-4 border-b pb-2 border-b-neutral-300">
        <RiTimeFill className="w-4 h-4" />
        <p>
          <span className="font-semibold text-base">{courseData.HRS_LOW}</span>{" "}
          {courseData.HRS_HIGH && (
            <span className="font-semibold text-base">
              - {courseData.HRS_HIGH}
            </span>
          )}{" "}
          credit hour
          {(courseData.HRS_LOW !== 1 || courseData.HRS_HIGH) && "s"}
        </p>
      </div>

      <div className="flex items-center gap-x-4 border-b pb-2 border-b-neutral-300">
        <RiPencilFill className="w-4 h-4" />
        <p>{courseData.INSTRUCTIONAL_METHOD}</p>
      </div>

      <div className="flex items-center gap-x-4">
        <RiSpyFill className="w-4 h-4" />
        <p>
          <span className="font-semibold text-base">{numWatching}</span> student
          {numWatching !== 1 && "s"} watching
        </p>
      </div>
    </div>
  );
}
