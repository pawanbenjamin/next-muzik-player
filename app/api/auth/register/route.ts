import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signUserToken } from "@/app/lib/tokenHelpers";
import { NextResponse } from "next/server";
const saltRounds = 10;

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = (await req.json()) as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    const hashed_password = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashed_password
      }
    });

    const token = signUserToken(user);

    // Create HTTP only Cookie and Attach to Response
    cookies().set({
      name: "next-muzik-player",
      value: token,
      httpOnly: true
    });

    return NextResponse.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
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
