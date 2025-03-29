import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.redirect(NEXTAUTH_URL + "/");
  }

  if (!session.user.email) {
    return NextResponse.redirect(
      NEXTAUTH_URL + "/dashboard/settings?status=dcerror"
    );
  }

  await prisma.user.update({
    where: {
      email: session.user.email ?? undefined,
    },
    data: {
      discordId: null,
    },
  });

  return NextResponse.redirect(
    NEXTAUTH_URL + "/dashboard/settings?status=dcsuccess"
  );
}
