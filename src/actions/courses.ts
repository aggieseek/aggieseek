"use server";

import prisma from "@/lib/prisma-client";
import { Course } from "@/lib/types/course-types";

export async function getCourses(termCode: string, subject: string) {
  const result: Course[] = await prisma.$queryRaw`
    WITH RankedSections AS (
        SELECT 
            subject, 
            course, 
            title, 
            COUNT(*) AS count,
            RANK() OVER (PARTITION BY subject, course ORDER BY COUNT(*) DESC) AS rnk
        FROM section
        WHERE term = ${termCode} AND subject = ${subject}
        GROUP BY subject, course, title
    )
    SELECT subject, course, title
    FROM RankedSections
    WHERE rnk = 1;
`;

  return result;
}
