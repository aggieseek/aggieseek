"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { getUserId } from "./user";

export async function getWebhooks() {
  const session = await getServerSession(authOptions);
  const userId = await getUserId(session);
  if (!userId) return;

  const webhooks = await prisma.webhook.findMany({
    where: {
      userId,
    },
  });
  return webhooks.map((webhook) => webhook.webhookUrl);
}

export async function addWebhook(webhookUrl: string) {
  const session = await getServerSession(authOptions);
  const userId = await getUserId(session);
  if (!userId) return;

  return await prisma.webhook.create({
    data: {
      userId,
      webhookUrl,
    },
  });
}

export async function deleteWebhook(webhookUrl: string) {
  const session = await getServerSession(authOptions);
  const userId = await getUserId(session);
  if (!userId) return;

  return await prisma.webhook.delete({
    where: {
      userId_webhookUrl: {
        userId,
        webhookUrl,
      },
    },
  });
}
