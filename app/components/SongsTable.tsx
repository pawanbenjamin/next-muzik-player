"use client";
import { useEffect, useState } from "react";
import useStore from "../lib/hooks/useStore";
import { addToPlaylist } from "../lib/serverActions";
import { Song } from "../lib/store";

interface Playlist {
  id: number;
  name: string;
  userId: number;
}

// Songs will be passed in, from a Server Component
export function SongsTable({
  songs,
  playlists
}: {
  songs: Song[] | undefined;
  playlists: Playlist[];
}) {
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);

  const { activeSongs, activeSong, changeActiveSongs, changeActiveSong } =
    useStore();

  function handlePlay() {
    changeActiveSongs(songs);
    if (songs !== undefined) {
      changeActiveSong(songs[0]);
    }
  }

  console.log("Playlists: ", playlists);

  return (
    <div className="h-full p-2">
      <button className="" onClick={handlePlay}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-16 h-16 hover:fill-white"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {songs?.map((song: Song) => {
        return (
          <div
            className="grid grid-cols-3 grid-rows-1 hover:text-white"
            key={song.id}
          >
            <span>{song.name}</span>

            <div
              onClick={() => setSelectedSongId(song.id)}
              className="flex justify-end dropdown dropdown-end"
            >
              <label tabIndex={0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-4 shadow bg-primary rounded-lg"
              >
                <h2 className="pb-2">Add to Playlist: </h2>
                {playlists.map((playlist: any) => {
                  return (
                    <li
                      onClick={() => {
                        addToPlaylist(playlist.id, selectedSongId as number);
                        alert("added");
                      }}
                      key={playlist.id}
                    >
                      <span>Playlist {playlist.id}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <span className="flex justify-end">{song.duration}</span>
          </div>
        );
      })}
    </div>
  );
}
