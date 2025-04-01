"use server";

import prisma from "@/lib/prisma-client";
import { Class } from "@prisma/client";

export async function getClasses() {
  const classes = Object.values(Class);
  return classes;
}

export async function getMajors() {
  const majors = (await prisma.major.findMany()).map((major) => major.name);

  return majors;
}
