import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const DISCORD_REDIRECT_URI = NEXTAUTH_URL + "/api/auth/discord/callback";

async function linkDiscordAccount(code: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("unauthorized");
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

    if (!tokenData.access_token) {
      throw new Error("Failed to get access token");
    }

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const discordUser = await userResponse.json();

    if (!discordUser.id) {
      throw new Error("Failed to fetch Discord user");
    }

    const existingUser = await prisma.user.findFirst({
      where: { discordId: discordUser.id },
    });

    if (existingUser) {
      return { error: "user_exists" };
    }

    if (discordUser)
      await prisma.user.update({
        where: { email: session.user.email! },
        data: {
          discordId: discordUser.id,
        },
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "failed" };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) return NextResponse.redirect(NEXTAUTH_URL + "/");

  const result = await linkDiscordAccount(code);
  if (result.error) {
    if (result.error == "user_exists")
      return NextResponse.redirect(
        NEXTAUTH_URL + "/dashboard/settings?status=exists"
      );
    return NextResponse.redirect(
      NEXTAUTH_URL + "/dashboard/settings?status=failed"
    );
  }
  return NextResponse.redirect(
    NEXTAUTH_URL + "/dashboard/settings?status=success"
  );
}
