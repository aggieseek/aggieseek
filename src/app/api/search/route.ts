import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { term, subject, course } = await req.json();

  const sections = await prisma.section.findMany({
    where: {
      term,
      subject,
      ...(course && { course }),
    },
  });

  return NextResponse.json(sections, { status: 200 });
}
