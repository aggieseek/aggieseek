export interface Instructor {
  NAME: string;
  MORE: number;
  HAS_CV: string;
}

export interface Term {
  code: string;
  desc: string;
  startDate: string;
}

export interface Course {
  course: string;
  title: string;
}
