import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import useMe from "@/app/lib/hooks/useMe";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { Song, User } from "@/app/lib/store";

export async function GET(req: Request) {
  const nextCookie = cookies().get("next-muzik-player");
  if (!nextCookie) {
    return null;
  }
  // @ts-ignore HELP WHAT IS THIS!?????
  const user: User | JwtPayload | null = jwt.verify(
    nextCookie?.value,
    "super secret"
  );

  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user?.id
      }
    });
    return NextResponse.json({ playlists });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const nextCookie = cookies().get("next-muzik-player");
  if (!nextCookie) {
    return null;
  }
  // @ts-ignore HELP WHAT IS THIS!?????
  const user: User | JwtPayload | null = jwt.verify(
    nextCookie?.value,
    "super secret"
  );

  try {
    const { name } = (await req.json()) as {
      name: string;
    };
    const createdPlaylist = await prisma.playlist.create({
      data: {
        name,
        userId: user?.id
      }
    });
    return NextResponse.json({ createdPlaylist });
  } catch (error: any) {
    JSON.stringify({
      status: "error",
      message: error.message
    }),
      { status: 500 };
  }
}
