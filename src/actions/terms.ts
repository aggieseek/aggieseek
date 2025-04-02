"use server";

import prisma from "@/lib/prisma-client";
import { Term } from "@/lib/types/course-types";
import { ITermHowdy } from "@/lib/types/howdy-types";

export async function getTerms() {
  const response = await fetch("https://howdy.tamu.edu/api/all-terms");
  const data = await response.json();

  const terms = data.map((term: ITermHowdy) => ({
    code: term.STVTERM_CODE,
    desc: term.STVTERM_DESC,
    startDate: term.STVTERM_START_DATE,
  }));

  const query = await prisma.section.findMany({
    select: {
      term: true,
    },
    distinct: ["term"],
    orderBy: {
      term: "desc",
    },
  });
  const availableTerms = query.map((obj) => obj.term);

  return terms.filter((term: Term) => availableTerms.includes(term.code));
}
