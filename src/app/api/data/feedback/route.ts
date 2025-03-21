import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getUserId } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

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
