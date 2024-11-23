import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const crn = searchParams.get("crn");
  const term = searchParams.get("term");

  if (!crn || !term) return NextResponse.json({ message: "Please specify a CRN and term" }, { status: 400 });

  const url = `https://howdy.tamu.edu/api/course-section-details?term=${ term }&subject=&course=&crn=${ crn }`;

  try {
    const response = await fetch(url);
    const general = await response.json();
    return NextResponse.json(general, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error while fetching section" }, { status: 500 });
  }
};