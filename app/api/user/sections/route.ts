import { NextRequest, NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma-client";

async function getID(session: Session) {
  if (!session.user) return null;
  return prisma.user.findUnique({
    where: {
      email: session.user.email || ""
    }
  })
    .then(user => {
      return user?.id;
    });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "You are not signed in!" }, { status: 401 });

  const userId = await getID(session);
  if (!userId) return NextResponse.json({ message: "You are not signed in!" }, { status: 401 });

  const sections: string[] = (await prisma.trackedSection.findMany({
    where: {
      userId: userId
    }
  })).map(section => section.crn);

  return NextResponse.json({ sections }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "You are not signed in!" }, { status: 401 });

  const userId = await getID(session);
  if (!userId) return NextResponse.json({ message: "You are not signed in!" }, { status: 401 });

  const res = await req.json();
  const { crn } = res;
  if (!crn) return NextResponse.json({ message: "CRN not specified" }, { status: 400 });

  const newTrackedSection = await prisma.trackedSection.create({
    data: {
      userId,
      crn,
    }
  });
  return NextResponse.json({ newTrackedSection }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "error" });

  const userId = await getID(session);
  if (!userId) return NextResponse.json({ message: "error" });

  const res = await req.json();
  const { crn } = res;
  if (!crn) return NextResponse.json({ message: "CRN not specified" }, { status: 400 });

  const deletedSection = await prisma.trackedSection.delete({
    where: {
      userId_crn: {
        userId: userId,
        crn: crn
      }
    }
  });

  return NextResponse.json({ deletedSection }, { status: 200 });
}
