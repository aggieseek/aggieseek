import { Class } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const classes = Object.values(Class);
  return NextResponse.json(classes, { status: 200 });
}