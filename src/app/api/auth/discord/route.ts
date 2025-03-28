import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const DISCORD_REDIRECT_URI =
  process.env.NEXTAUTH_URL + "/api/auth/discord/callback";

async function linkDiscordAccount(code: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: DISCORD_REDIRECT_URI,
        scope: "identify",
      }),
    });
    const tokenData = await tokenResponse.json();

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const discordUser = await userResponse.json();

    if (!discordUser.id) {
      throw new Error("Failed to fetch Discord user");
    }

    await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        discordId: discordUser.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { code } = await req.json();

  if (!code)
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });

  if (!session || !session.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 402 });

  const result = await linkDiscordAccount(code);
}
