export interface Instructor {
  CV: string | null,
  HAS_CV: "Y" | "N",
  MORE: number,
  NAME: string
}

export interface MeetingTime {
  SSRMEET_BEGIN_TIME: string,
  SSRMEET_BLDG_CODE: string,
  SSRMEET_ROOM_CODE: string,
  SSRMEET_CREDIT_HR_SESS: number,
  SSRMEET_START_DATE: string,
  SSRMEET_END_DATE: string,
  SSRMEET_START_TIME: string,
  SSRMEET_END_TIME: string,
  SSRMEET_MTYP_CODE: string,
  SSRMEET_SUN_DAY: string | null,
  SSRMEET_MON_DAY: string | null,
  SSRMEET_TUE_DAY: string | null,
  SSRMEET_WED_DAY: string | null,
  SSRMEET_THU_DAY: string | null,
  SSRMEET_FRI_DAY: string | null,
  SSRMEET_SAT_DAY: string | null,
}

export interface Attribute {
  SSRATTR_ATTR_CODE: string;
  STVATTR_DESC: string;
}