export interface CourseData {
  BILL_HRS: number | null;
  BILL_HR_HIGH: number | null;
  BILL_HR_LOW: number | null;
  BILL_IND: string | null;
  CAMPUS: string;
  COLLEGE: string;
  CONN: string | null;
  COURSE_DESCRIPTION: string;
  COURSE_NAME: string;
  COURSE_NUMBER: string;
  COURSE_TITLE: string;
  CREDIT_HRS: number | null;
  CREDIT_HR_IND: string | null;
  CRN: string;
  DEPT: string;
  ERRORS: string[];
  GRADE_MODE: string;
  HAS_SYLLABUS: string;
  HRS_HIGH: number | null;
  HRS_IND: string | null;
  HRS_LOW: number | null;
  INSTRUCTIONAL_METHOD: string;
  INSTRUCTOR: string;
  NUMBER_OF_UNITS: number | null;
  OTHER_ATTRIBUTES: {
    "Bookstore links": Record<string, unknown>;
    "Campus restrictions": string[];
    "Classification restrictions": string[];
  };
  SCHEDULE_TYPE: string;
  SCHEDULE_TYPE_DESC: string;
  SECTION_NOTES: string | null;
  SECTION_NUMBER: string;
  SSBSECT_CRSE_TITLE: string | null;
  SSBSECT_PTRM_CODE: string;
  STATUS: number;
  SUBJECT_CODE: string;
  SYLLABUS: string;
  TERM_CODE: string;
  TERM_DESC: string;
  XLIST_GROUP: string | null;
}

export interface SeatData {
  ACTUAL: number,
  CAPACITY: number,
  REMAINING: number
}