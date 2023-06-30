import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const nextCookie = cookies().get("next-muzik-player");

  const user = jwt.verify(nextCookie?.value as string, "super secret");
  return NextResponse.json({ user });
}
