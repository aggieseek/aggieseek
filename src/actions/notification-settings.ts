"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { getUserId } from "./user";

export async function getNotificationSettings() {
  const session = await getServerSession(authOptions);
  const userId = await getUserId(session);
  if (!userId) return;

  const data = await prisma.notificationSettings.findUnique({
    where: {
      userId,
    },
  });

  if (data == null) {
    return await prisma.notificationSettings.create({
      data: {
        userId,
        email: session?.user?.email,
      },
    });
  }
  return data;
}

interface CommunicationSettings {
  globalEnabled: boolean;
  smsEnabled: boolean;
  emailEnabled: boolean;
  discordEnabled: boolean;
}

interface EventSettings {
  sectionOpen: boolean;
  sectionClose: boolean;
  instructorChange: boolean;
}

export async function updatePreferences(
  settings: CommunicationSettings | EventSettings
) {
  const session = await getServerSession(authOptions);
  const userId = await getUserId(session);
  if (!userId) return;

  return await prisma.notificationSettings.update({
    where: {
      userId,
    },
    data: {
      ...settings,
    },
  });
}

export async function updatePhoneNumber(phoneNumber: string) {
  const session = await getServerSession(authOptions);
  const userId = await getUserId(session);
  if (!userId) return;

  return await prisma.notificationSettings.update({
    where: {
      userId,
    },
    data: {
      phoneNumber,
    },
  });
}
