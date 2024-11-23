export interface SectionHowdy {
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
}

export interface InstructorHowdy {
  SWV_CLASS_SEARCH_INSTRCTR_JSON: string;
  SWV_CLASS_SEARCH_JSON_CLOB: string;
}

export interface AttributeHowdy {
  SSRATTR_ATTR_CODE: string;
  STVATTR_DESC: string;
}