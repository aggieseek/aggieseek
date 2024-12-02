import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const crn = searchParams.get("crn");
  const term = searchParams.get("term");

  if (!crn || !term) return NextResponse.json({ message: "Please specify a CRN and term" }, { status: 400 });

  const url = 'https://howdy.tamu.edu/api/section-meeting-times-with-profs';

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Ensure the server knows we're sending JSON
      },
      body: JSON.stringify({
        term,
        crn,
        subject: null,
        course: null,
      }),
    });
    const instructor = await response.json();

    return NextResponse.json(instructor, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error while fetching section" }, { status: 500 });
  }
}