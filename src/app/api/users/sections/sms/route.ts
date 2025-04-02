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

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { crn, term } = await req.json();
  const paramsInvalid = validateParams(crn, term);
  if (paramsInvalid) return NextResponse.json(paramsInvalid, { status: 400 });

  try {
    const current = (
      await prisma.trackedSection.findFirst({
        where: {
          userId,
          term,
          crn,
        },
        select: {
          smsEnabled: true,
        },
      })
    )?.smsEnabled;

    const updated = await prisma.trackedSection.update({
      where: {
        userId_term_crn: {
          userId,
          term,
          crn,
        },
      },
      data: {
        smsEnabled: !current,
      },
    });
    return NextResponse.json(updated, { status: 201 });
  } catch {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
