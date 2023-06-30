"use client";
import { useRouter } from "next/navigation";

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
      onClick={async () => {
        await logOut();
        router.push("/");
      }}
    >
      Sign Out
    </button>
  );
}

// Create a playlist
async function createPlaylist(name: string) {
  const response = await fetch("/api/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });
  if (!response.ok) {
    throw {
      message: "Error Creating a Playlist"
    };
  } else {
    const { createdPlaylist } = (await response.json()) as any;
    return createdPlaylist;
  }
}

export function createPlaylistButton() {
  async function handleClick(
    e: any,
    name: string = `Playlist ${Math.random().toString()}`
  ) {
    try {
      const playList = await createPlaylist(name);
    } catch (error) {
      console.error(error);
    }
  }
  return <button onClick={(e) => handleClick(e)}>Create Playlist</button>;
}
