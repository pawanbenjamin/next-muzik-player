import Link from "next/link";
import useMe from "../lib/hooks/useMe";
import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

import type { Song, User } from "../lib/store";
import { JwtPayload } from "jsonwebtoken";

async function fetchPlaylists() {
  try {
    const user: User | JwtPayload | null = useMe();
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user?.id
      }
    });
    return playlists;
  } catch (error) {
    console.error(error);
  }
}

export default async function Sidebar() {
  let playlists = await fetchPlaylists();

  async function createPlaylist() {
    "use server";
    const user: User | JwtPayload | null = useMe();
    const playlist = await prisma.playlist.create({
      data: {
        name: `Playlist ${Math.random().toString()}`,
        userId: user?.id
      }
    });
    revalidatePath("/player");
  }

  return (
    <aside className="bg-green-200">
      <ul>
        <Link href={"/player/profile"}>
          <li>Home</li>
        </Link>
        {playlists?.map((playlist: any) => {
          return (
            <Link key={playlist.id} href={`/player/playlist/${playlist.id}`}>
              <li>{playlist.name}</li>
            </Link>
          );
        })}
        <form action={createPlaylist}>
          <button>Create Playlist</button>
        </form>
      </ul>
    </aside>
  );
}
