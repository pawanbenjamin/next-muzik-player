import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

import type { Song, User } from "../store";

export default function useMe(): User | JwtPayload {
  const nextCookie = cookies().get("next-muzik-player");
  if (!nextCookie) {
    return null;
  }

  const user: JwtPayload = jwt.verify(nextCookie.value, "super secret");
  console.log("TYPE OF USER: ", typeof user);
  return user;
}
