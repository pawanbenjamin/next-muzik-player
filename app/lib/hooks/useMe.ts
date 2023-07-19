import { cookies } from "next/headers";
import type { UserToken } from "../tokenHelpers";
import { parseUserToken } from "../tokenHelpers";

export default function useMe(): UserToken | null {
  const nextCookie = cookies().get("next-muzik-player");
  if (!nextCookie) {
    return null;
  }

  const user = parseUserToken(nextCookie?.value);
  return user;
}
