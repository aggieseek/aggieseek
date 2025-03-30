import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const term = searchParams.get("term");

  try {
    const subjects = await prisma.section.findMany({
      where: {
        ...(term ? { term } : {}),
      },
      distinct: ["subject"],
      orderBy: {
        subject: "asc",
      },
      select: {
        subject: true,
      },
    });

    return NextResponse.json(
      subjects.map((sub) => sub.subject),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error while fetching subjects" },
      { status: 500 }
    );
  }
}
