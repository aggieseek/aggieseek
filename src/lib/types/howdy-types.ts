export interface ISectionHowdy {
  TERM_CODE: string;
  CRN: string;
  SSBSECT_PTRM_CODE: string;
  SUBJECT_CODE: string;
  COURSE_NUMBER: string;
  SECTION_NUMBER: string;
  SSBSECT_CRSE_TITLE: string | null;
  GRADE_MODE: string;
  COLLEGE: string;
  DEPT: string;
  CAMPUS: string;
  SCHEDULE_TYPE: string;
  SCHEDULE_TYPE_DESC: string;
  INSTRUCTIONAL_METHOD: string;
  COURSE_TITLE: string;
  COURSE_DESCRIPTION: string;
  SECTION_NOTES: string | null;
  TERM_DESC: string;
  HRS_LOW: number;
  HRS_HIGH: number | null;
  HRS_IND: number | null;
  XLIST_GROUP: string | null;
  CONN: string | null;
  HAS_SYLLABUS: string;
  BILL_HRS: number | null;
  BILL_IND: number | null;
  BILL_HR_HIGH: number | null;
  BILL_HR_LOW: number;
  CREDIT_HR_IND: number | null;
  CREDIT_HRS: number | null;
  NUMBER_OF_UNITS: number | null;
  SWV_CLASS_SEARCH_INSTRCTR_JSON: string;
  SWV_CLASS_SEARCH_JSON_CLOB: string;
  ATTRIBUTES: IAttributeHowdy[];
}

export interface IScheduleHowdy {
  SSRMEET_CREDIT_HR_SESS: number;
  SSRMEET_SUN_DAY: string | null;
  SSRMEET_MON_DAY: string | null;
  SSRMEET_TUE_DAY: string | null;
  SSRMEET_WED_DAY: string | null;
  SSRMEET_THU_DAY: string | null;
  SSRMEET_FRI_DAY: string | null;
  SSRMEET_SAT_DAY: string | null;
  SSRMEET_BEGIN_TIME: string;
  SSRMEET_END_TIME: string;
  SSRMEET_START_DATE: string;
  SSRMEET_END_DATE: string;
  SSRMEET_BLDG_CODE: string;
  SSRMEET_ROOM_CODE: string;
  SSRMEET_MTYP_CODE: string;
}

export interface IAttributeHowdy {
  SSRATTR_ATTR_CODE: string;
  STVATTR_DESC: string;
}
