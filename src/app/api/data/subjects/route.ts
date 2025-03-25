import prisma from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subjects = await prisma.section.findMany({
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
