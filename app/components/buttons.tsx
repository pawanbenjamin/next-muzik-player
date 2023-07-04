"use client";
import { useRouter } from "next/navigation";

// -----------------------------------------------------
async function logOut() {
  try {
    const response = await fetch("/api/auth/logout");
    if (!response.ok) {
      throw {
        message: "logout failed"
      };
    } else {
      const { message } = await response.json();
      return message;
    }
  } catch (error) {
    console.error(error);
  }
}

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className=""
      onClick={async () => {
        await logOut();
        router.push("/");
      }}
    >
      Sign Out
    </button>
  );
}

// -----------------------------------------------------

// -----------------------------------------------------
