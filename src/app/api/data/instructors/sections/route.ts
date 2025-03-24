import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json(
      { message: "Please specify an ID." },
      { status: 400 }
    );

  try {
    const sections = await prisma.$queryRaw`
    SELECT *
    FROM section
    WHERE (
        jsonb_typeof(instructor_json) = 'array' AND
        EXISTS (
            SELECT 1
            FROM jsonb_array_elements(instructor_json) AS elem
            WHERE elem->>'MORE' = ${id}
        )
    )`;

    return NextResponse.json(sections, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error while fetching instructor" },
      { status: 500 }
    );
  }
}
