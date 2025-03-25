import { IScheduleHowdy } from "@/lib/types/howdy-types";
import { cn } from "@/lib/utils";

function DayBox({ active, title }: { active: boolean; title: string }) {
  return (
    <div className="flex flex-col items-center relative">
      <div
        className={cn(
          "font-bold opacity-50 text-[0.6rem] absolute -top-4",
          active && "opacity-100 text-black"
        )}
      >
        {title}
      </div>
      <div className={cn("w-6 h-6 border", active && "bg-[#492727]")}></div>
    </div>
  );
}

export default function ScheduleDisplay({
  schedules,
}: {
  schedules: IScheduleHowdy[];
}) {
  return (
    <table>
      <tbody>
        {schedules.map((schedule, index) => (
          <tr
            key={index}
            className={cn(
              schedule.SSRMEET_MTYP_CODE === "Examination" && "opacity-50"
            )}
          >
            <td className="py-3">
              <div className="flex gap-x-2">
                <DayBox
                  title={"MON"}
                  active={schedule.SSRMEET_MON_DAY !== null}
                />
                <DayBox
                  title={"TUE"}
                  active={schedule.SSRMEET_TUE_DAY !== null}
                />
                <DayBox
                  title={"WED"}
                  active={schedule.SSRMEET_WED_DAY !== null}
                />
                <DayBox
                  title={"THU"}
                  active={schedule.SSRMEET_THU_DAY !== null}
                />
                <DayBox
                  title={"FRI"}
                  active={schedule.SSRMEET_FRI_DAY !== null}
                />
              </div>
            </td>
            <td className="pl-4">
              <div className="flex flex-col text-xs font-semibold">
                {schedule.SSRMEET_BEGIN_TIME && (
                  <p>
                    {schedule.SSRMEET_BEGIN_TIME} - {schedule.SSRMEET_END_TIME}
                  </p>
                )}
                {schedule.SSRMEET_BLDG_CODE && (
                  <p>
                    {schedule.SSRMEET_BLDG_CODE} {schedule.SSRMEET_ROOM_CODE}
                  </p>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
