import { getServerSession, Session } from "next-auth";
import prisma from "@/lib/prisma-client";
import { authOptions } from "@/lib/auth-options";
import { NextResponse } from "next/server";

async function getUserId(session: Session) {
  if (!session.user) return null;
  return prisma.user.findUnique({
    where: {
      email: session.user.email || ""
    }
  })
    .then((user) => {
      return user?.id;
    });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const notificationSettings = await prisma.notificationSettings.findUnique(
    {
      where: {
        userId
      }
    }
  );

  return NextResponse.json(notificationSettings, { status: 200 });
}