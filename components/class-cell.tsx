import { CourseData, SeatData } from "@/types/CourseData";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { PiArmchairFill } from "react-icons/pi";
import { Skeleton } from "./ui/skeleton";

interface ClassCellProps {
  crn: string;
}

export default function ClassCell({ crn }: ClassCellProps) {

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [seatData, setSeatData] = useState<SeatData | null>(null);

  const fetchCRNSeats = async (crn: string) => {
    const url = `https://api.aggieseek.net/terms/202511/classes/${crn}/seats`;
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();
      setSeatData(data.SEATS);
      console.log(data);
    } else {
      console.error('Error!');
    }
  };

  const fetchCRNDetails = async (crn: string) => {
    const url = `https://api.aggieseek.net/terms/202511/classes/${crn}`;
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();
      setCourseData(data);

      fetchCRNSeats(crn);
    }
  };

  useEffect(() => {
    fetchCRNDetails(crn);
  }, [crn]);

  return (
    <>
      <div className="transition-transform hover:scale-[1.01] cursor-pointer grid grid-cols-1 lg:grid-cols-classcell h-14 bg-zinc-200 border-l-4 border-l-zinc-400 px-3 py-2 shadow-sm">
        <div className="grid grid-rows-2">
          {courseData
            ? <h3 className="font-bold text-sm truncate">{courseData.COURSE_NAME} - {courseData.COURSE_TITLE}</h3>
            : <Skeleton className="h-4 w-[250px] bg-zinc-400" />}

          <div className="grid grid-cols-2 gap-x-4 opacity-50">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <IoPerson />
              </div>
              {courseData
                ? <p className="text-xs truncate hover:underline select-none">{courseData.INSTRUCTOR}</p>
                : <Skeleton className="h-4 w-32 bg-zinc-400" />}
            </div>

            <div className={`flex items-center ${seatData && seatData.REMAINING <= 0 ? "text-red-500" : undefined}`}>
              <PiArmchairFill className="w-4 h-4 mr-2" />
              {seatData
                ? <p className="text-xs">{seatData.REMAINING} seats</p>
                : <Skeleton className="h-4 w-12 bg-zinc-400" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );

}