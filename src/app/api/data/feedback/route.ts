import { getUserId } from "@/actions/user";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

const webhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK;
const logo = "https://i.imgur.com/IGwnRFi.png";
const embedColor = 0x6e1016;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userId = await getUserId(session);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, body, priority } = await req.json();

  if (!title || !body || !priority) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }

  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "AggieSeek",
        embeds: [
          {
            author: {
              name: "AggieSeek Feedback",
              icon_url: logo,
            },
            color: embedColor,
            title: title,
            description: body,
            fields: [
              {
                name: "Priority",
                value: priority,
                inline: true,
              },
            ],
          },
        ],
      }),
    });
  }

  const addedFeedback = await prisma.feedback.create({
    data: {
      userId,
      title,
      body,
      priority,
    },
  });
  return NextResponse.json({ addedFeedback }, { status: 201 });
}
