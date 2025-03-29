import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma-client";
import { authOptions } from "@/lib/auth-options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!session.user.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const discordId = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      discordId: true,
    },
  });

  return NextResponse.json(discordId, { status: 200 });
}
