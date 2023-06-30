import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  cookies().set({
    name: "next-muzik-player",
    value: "",
    path: "/", // For all paths,
    maxAge: 0
  });

  return NextResponse.json({ message: "You are logged out" });
}
