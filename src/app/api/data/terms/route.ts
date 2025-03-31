import prisma from "@/lib/prisma-client";
import { ITermHowdy } from "@/lib/types/howdy-types";
import { NextResponse } from "next/server";

export async function GET() {
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

  const filteredTerms = terms.filter((term) =>
    availableTerms.includes(term.code)
  );

  return NextResponse.json(filteredTerms, { status: 200 });
}
