import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { term, subject, course } = await req.json();

  console.log({ term, subject, course });

  const sections = await prisma.section.findMany({
    where: {
      term,
      ...(subject && { subject }),
      ...(course && { course }),
    },
    orderBy: [{ subject: "asc" }, { course: "asc" }, { section: "asc" }],
  });

  return NextResponse.json(sections, { status: 200 });
}
