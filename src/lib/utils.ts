import { clsx, type ClassValue } from "clsx";
import { Session } from "next-auth";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma-client";

const seasonMapping: Record<string, string> = {
  "11": "Spring",
  "21": "Summer",
  "31": "Fall",
};

export const CURRENT_TERM = process.env.NEXT_PUBLIC_CURRENT_TERM;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTermCode(termCode: string) {
  const year = termCode.slice(0, 4);
  const season = termCode.slice(4);

  return `${seasonMapping[season]} ${year}`;
}

export async function getUserId(session: Session) {
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
