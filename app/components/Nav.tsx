import { LogoutButton } from "./buttons";
import useMe from "../lib/hooks/useMe";
import { JwtPayload } from "jsonwebtoken";
import type { User } from "../lib/store";

export default async function Nav() {
  const user: User | JwtPayload | null = useMe();
  return (
    <nav>
      <p>🙏🏽 Welcome ! {user?.firstName}</p>
      <LogoutButton />
    </nav>
  );
}
