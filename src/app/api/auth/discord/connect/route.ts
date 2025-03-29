import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const DISCORD_REDIRECT_URI = NEXTAUTH_URL + "/api/auth/discord/callback";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.redirect(NEXTAUTH_URL + "/");
  }
  const url = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&response_type=code&scope=identify`;
  return NextResponse.redirect(url);
}
