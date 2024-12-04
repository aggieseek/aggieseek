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

  const sections = (await prisma.webhooks.findMany({
    where: {
      userId,
    },
    select: {
      webhook_url: true
    }
  })).map(obj => obj.webhook_url);

  return NextResponse.json(sections, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { webhook } = await req.json();

  const newWebhook = await prisma.webhooks.create({
    data: {
      userId,
      webhook_url: webhook
    }
  });
  return NextResponse.json({ newWebhook }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "error" });

  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ message: "error" });

  const { webhook } = await req.json();

  const deletedWebhook = await prisma.webhooks.delete({
    where: {
      userId_webhook_url: {
        userId, webhook_url: webhook
      }
    }
  });

  return NextResponse.json({ deletedWebhook }, { status: 200 });
}
