import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseUserToken } from "./app/lib/tokenHelpers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //   const nextCookie = cookies().get("next-muzik-player");
  //   if (nextCookie) {
  //     const user = parseUserToken(nextCookie?.value);
  //     return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  //   } else {
  //     return null;
  //   }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
};
