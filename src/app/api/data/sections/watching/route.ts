import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const crn = searchParams.get("crn");
  const term = searchParams.get("term");

  if (!crn || !term)
    return NextResponse.json(
      { message: "Please specify a CRN and term" },
      { status: 400 }
    );

  try {
    const result = await prisma.trackedSection.findMany({
      where: {
        term,
        crn,
      },
    });

    return NextResponse.json({ count: result.length }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error while fetching data" },
      { status: 500 }
    );
  }
}
