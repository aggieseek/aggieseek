import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ message: "Please specify an ID." }, { status: 400 });

  try {
    const instructor = await prisma.instructor.findFirst({
      where: {
        instructorId: id
      }
    });

    return NextResponse.json(instructor, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error while fetching instructor" }, { status: 500 });
  }
}