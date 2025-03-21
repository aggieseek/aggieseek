import { NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";

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

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await prisma.user.delete({
      where: {
        id: userId
      }
    });
    return new NextResponse("User deleted successfully", { status: 200 });
  } catch {
    return new NextResponse("Error while deleting user", { status: 500 });
  }
}
