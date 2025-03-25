import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineAccessTimeFilled, MdPerson } from "react-icons/md";
import { PiDetectiveFill } from "react-icons/pi";

export default function SectionSidebar({
  instructors,
  courseData,
  numWatching,
}) {
  return (
    <div className="bg-black/5 rounded-lg p-6 gap-y-2 flex flex-1 flex-col">
      <div className="border-b pb-2 border-b-neutral-300">
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
            <div key={instructor.MORE} className="flex items-center gap-x-4">
              <MdPerson className="w-4 h-4" />
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
            <MdPerson className="w-4 h-4" />
            <p>Not assigned</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-x-4 border-b pb-2 border-b-neutral-300">
        <MdOutlineAccessTimeFilled className="w-4 h-4" />
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
        <FaChalkboardTeacher className="w-4 h-4" />
        <p>{courseData.INSTRUCTIONAL_METHOD}</p>
      </div>

      <div className="flex items-center gap-x-4">
        <PiDetectiveFill className="w-4 h-4" />
        <p>
          <span className="font-semibold text-base">{numWatching}</span> student
          {numWatching !== 1 && "s"} watching
        </p>
      </div>
    </div>
  );
}
