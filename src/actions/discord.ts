"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession } from "next-auth";

export async function getUserDiscordId() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  if (!session.user.email) return null;

  const discordId = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      discordId: true,
    },
  });

  return discordId?.discordId;
}
