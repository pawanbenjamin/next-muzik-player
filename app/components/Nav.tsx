import { LogoutButton } from "./buttons";
import useMe from "../lib/hooks/useMe";
import { JwtPayload } from "jsonwebtoken";
import type { User } from "../lib/store";

export default async function Nav() {
  const user: User | JwtPayload | null = useMe();
  return (
    <nav className="col-span-2 flex justify-between items-center m-4">
      <div className="flex gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
        hello, {user?.firstName}.{" "}
      </div>
      <LogoutButton />
    </nav>
  );
}
