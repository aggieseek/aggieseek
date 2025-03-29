import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = searchParams.get("subject");

  if (!subject)
    return NextResponse.json(
      { message: "Please specify a subject." },
      { status: 400 }
    );

  try {
    const courses = await prisma.section.findMany({
      where: {
        subject,
      },
      distinct: ["course", "title"],
      orderBy: {
        course: "asc",
      },
      select: {
        course: true,
        title: true,
      },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error while fetching subjects" },
      { status: 500 }
    );
  }
}
