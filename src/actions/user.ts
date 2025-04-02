"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession, Session } from "next-auth";

export async function getUserId(session: Session | null) {
  if (!session || !session.user) return null;
  return await prisma.user
    .findUnique({
      where: {
        email: session.user.email || "",
      },
    })
    .then((user) => {
      return user?.id;
    });
}

export async function getUserInfo() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;

  const role = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    include: {
      role: true,
    },
  });

  return role;
}
