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

export interface ITermHowdy {
  STVTERM_CODE: string;
  STVTERM_DESC: string;
  STVTERM_START_DATE: string; // ISO date string
  STVTERM_END_DATE: string; // ISO date string
  STVTERM_FA_PROC_YR: string;
  STVTERM_ACTIVITY_DATE: string; // ISO date string
  STVTERM_FA_TERM: string | null;
  STVTERM_FA_PERIOD: string | null;
  STVTERM_FA_END_PERIOD: string | null;
  STVTERM_ACYR_CODE: string;
  STVTERM_HOUSING_START_DATE: string; // ISO date string
  STVTERM_HOUSING_END_DATE: string; // ISO date string
  STVTERM_SYSTEM_REQ_IND: string | null;
  STVTERM_TRMT_CODE: string;
  STVTERM_FA_SUMMER_IND: string | null;
  STVTERM_SURROGATE_ID: number;
  STVTERM_VERSION: number;
  STVTERM_USER_ID: string | null;
  STVTERM_DATA_ORIGIN: string | null;
  STVTERM_VPDI_CODE: string | null;
  STVTERM_APPORT_CDE: string | null;
  STVTERM_MIS_TERM_CTG: string | null;
  STVTERM_MIS_TERM_ID: string | null;
  STVTERM_TERM_LEN_MULT: string | null;
  STVTERM_TERM_LEN_MULT_IS: string | null;
  STVTERM_GUID: string;
  STVTERM_CATALOG_GUID: string;
}
