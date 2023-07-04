import { LogoutButton } from "./buttons";
import useMe from "../lib/hooks/useMe";
import { JwtPayload } from "jsonwebtoken";
import type { User } from "../lib/store";

export default async function Nav() {
  const user: User | JwtPayload | null = useMe();
  return (
    <nav className="col-span-2 flex justify-between items-center m-10">
      <span>👋🏽 Hello, {user?.firstName}. </span>
      <LogoutButton />
    </nav>
  );
}
