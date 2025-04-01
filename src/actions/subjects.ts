"use server";

import prisma from "@/lib/prisma-client";

export async function getSubjects(termCode: string) {
  const result = await prisma.section.findMany({
    where: {
      term: termCode,
    },
    select: {
      subject: true,
    },
    distinct: ["subject"],
    orderBy: {
      subject: "asc",
    },
  });

  return result.map((obj) => obj.subject);
}
