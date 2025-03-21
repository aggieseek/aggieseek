import { NextRequest, NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import prisma from "@/lib/prisma-client";
import { authOptions } from "@/lib/auth-options";

async function getUserId(session: Session) {
  if (!session.user) return null;
  return prisma.user
    .findUnique({
      where: {
        email: session.user.email || "",
      },
    })
    .then((user) => {
      return user?.id;
    });
}

function validateParams(crn: string | undefined, term: string | undefined) {
  if (!crn) return { message: "CRN not specified", status: 400 };
  if (!term) return { message: "Term not specified", status: 400 };
  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const term = searchParams.get("term");
  if (!term)
    return NextResponse.json(
      { message: "Please specify a term" },
      { status: 400 }
    );

  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const sections = await prisma.trackedSection.findMany({
    where: {
      userId,
      term,
    },
    include: {
      section: true,
    },
  });

  return NextResponse.json(sections, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { crn, term } = await req.json();
  const paramsInvalid = validateParams(crn, term);
  if (paramsInvalid) return NextResponse.json(paramsInvalid, { status: 400 });

  const newTrackedSection = await prisma.trackedSection.create({
    data: { userId, term, crn },
  });
  return NextResponse.json({ newTrackedSection }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "error" });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "error" });

  const { crn, term } = await req.json();
  const paramsInvalid = validateParams(crn, term);
  if (paramsInvalid) return NextResponse.json(paramsInvalid, { status: 400 });

  const deletedSection = await prisma.trackedSection.delete({
    where: {
      userId_term_crn: { userId, term, crn },
    },
  });

  return NextResponse.json({ deletedSection }, { status: 200 });
}
