"use server";

import prisma from "@/lib/prisma-client";
import { Session } from "next-auth";

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
