import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { signUserToken } from "@/app/lib/tokenHelpers";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    // parralell zod type for user that matches the prisma user type
    // sign user token function
    // parse use token function

    // const userTokenSchema = z.object({
    //   id: z.number(),
    //   email: z.string(),
    //   firstName: z.string(),
    //   lastName: z.string(),
    //   iat: z.string()
    // });

    // type UserToken = z.infer<typeof userTokenSchema>;

    // function signUserToken(payload: UserToken) {
    //   const token = jwt.sign(user, "super secret");
    //   return token;
    // }

    // function parseUserToken(token: string): UserToken {
    //   const user = jwt.verify(token, "super secret");
    //   return userTokenSchema.parse(user);
    // }

    if (!user) {
      throw {
        message: "There is no user associated with that email"
      };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      // Create JWT
      // delete user.password;
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
    } else {
      throw {
        message: "password is incorrect!"
      };
    }
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
