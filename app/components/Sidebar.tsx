import Link from "next/link";
import useMe from "../lib/hooks/useMe";
import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { User } from "../lib/store";
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

async function createPlaylist() {
  "use server";
  const user: User | JwtPayload | null = useMe();
  const playlist = await prisma.playlist.create({
    data: {
      name: `Playlist ${Math.random().toString().slice(7)}`,
      userId: user?.id
    }
  });
  revalidatePath("/player");
}

export default async function Sidebar() {
  let playlists = await fetchPlaylists();

  return (
    <div className="flex flex-col gap-2 items-start ">
      <aside className="p-4 bg-secondary w-full rounded-lg">
        <ul className="">
          <li className="hover:text-white transition-all duration-300">
            <Link className="flex items-center" href={"/player/profile"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-1 mb-1"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              <span>home</span>
            </Link>
          </li>
          <li className="hover:text-white transition-all duration-300">
            <Link className="flex items-center" href={"/player/search"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>search</span>
            </Link>
          </li>
        </ul>
      </aside>
      <aside className="p-4 bg-secondary overflow-auto w-full h-full rounded-lg">
        <ul className="">
          <li className="flex justify-between items-baseline">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
              <span>library</span>
            </div>
            <form action={createPlaylist}>
              <button className="hover:text-white transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </li>
        </ul>
        <ul className="">
          {playlists?.map((playlist: any) => {
            return (
              <li className="hover:text-white transition-all duration-300">
                <Link
                  className="flex items-center"
                  key={playlist.id}
                  href={`/player/playlist/${playlist.id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                    />
                  </svg>
                  <span>list {playlist.id}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
