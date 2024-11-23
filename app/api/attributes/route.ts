import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const crn = searchParams.get("crn");
  const term = searchParams.get("term");

  if (!crn || !term) return NextResponse.json({ message: "Please specify a CRN and term" }, { status: 400 });

  const url = 'https://howdy.tamu.edu/api/section-attributes';

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Ensure the server knows we're sending JSON
      },
      body: JSON.stringify({
        term: "202511",
        subject: null,
        course: null,
        crn: crn
      }),
    });
    const attributes = await response.json();

    return NextResponse.json(attributes, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error while fetching section" }, { status: 500 });
  }
};