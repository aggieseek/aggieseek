import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const crn = searchParams.get("crn");
  const term = searchParams.get("term");

  if (!crn || !term) return NextResponse.json({ message: "Please specify a CRN and term" }, { status: 400 });

  const detailsUrl = `https://howdy.tamu.edu/api/course-section-details?term=${ term }&subject=&course=&crn=${ crn }`;
  const jsonsUrl = `https://howdy.tamu.edu/api/section-meeting-times-with-profs/`;

  try {
    const detailsResponse = await fetch(detailsUrl);
    const details = await detailsResponse.json();

    const jsonsResponse = await fetch(jsonsUrl, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ term, crn })
    });
    const jsons = await jsonsResponse.json();

    return NextResponse.json({ ...details, ...jsons }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error while fetching section" }, { status: 500 });
  }
}