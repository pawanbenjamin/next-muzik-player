import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseUserToken } from "./app/lib/tokenHelpers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log("NEXT REQUEST-------------------->>>>", request.cookies);
  // const cookies = request.cookies.getAll();
  // console.log("COOKIE", cookies);
  // for (const cookie of cookies) {
  //   if (cookie.name === "next-muzik-player") {
  //     const user = parseUserToken(cookie.value);
  //     if (user) {
  //       return NextResponse.redirect(new URL("/player/profile", request.url));
  //     }
  //   }
  // }
  // const nextCookie = cookies().get("next-muzik-player");
  // if (nextCookie) {
  //   const user = parseUserToken(nextCookie?.value);
  //   return (
  //     user && NextResponse.redirect(new URL("/player/profile", request.url))
  //   );
  // } else {
  //   return null;
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/"
};
