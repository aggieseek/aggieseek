import { NextRequest, NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import prisma from "@/lib/prisma-client";
import { authOptions } from "@/lib/auth-options";

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

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const sections = (await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      discordWebhooks: true
    }
  }))?.discordWebhooks.map(obj => obj.webhookUrl);

  return NextResponse.json(sections, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { webhookUrl } = await req.json();

  const newWebhook = await prisma.webhook.create({
    data: {
      userId,
      webhookUrl: webhookUrl
    }
  });
  return NextResponse.json({ newWebhook }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "error" });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "error" });

  const { webhookUrl } = await req.json();

  const deletedWebhook = await prisma.webhook.delete({
    where: {
      userId_webhookUrl: {
        userId, webhookUrl: webhookUrl
      }
    }
  });

  return NextResponse.json({ deletedWebhook }, { status: 200 });
}
