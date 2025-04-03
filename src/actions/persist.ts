"use server";

import { getCourses } from "./courses";
import { getSubjects } from "./subjects";

export async function persistSearch(
  termCode: string | undefined,
  subject: string | undefined,
  course: string | undefined
) {
  if (!termCode) return false;
  const subjects = await getSubjects(termCode);
  const courses = subject ? await getCourses(termCode, subject) : [];

  if (!subjects.some((subj) => subj === subject)) return false;
  if (course && !courses.some((crse) => crse.course === course)) return false;

  const result = { subjects, courses };
  return result;
}
