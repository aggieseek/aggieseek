import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export async function GET() {

  const majors = (await prisma.major.findMany())
    .map(major => major.name);

  return NextResponse.json(majors, { status: 200 });
}