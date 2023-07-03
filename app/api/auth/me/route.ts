import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parseUserToken } from "@/app/lib/tokenHelpers";

export async function GET(req: Request) {
  const nextCookie = cookies().get("next-muzik-player");
  if (!nextCookie) {
    return null;
  }
  const user = parseUserToken(nextCookie?.value);
  return NextResponse.json({ user });
}
