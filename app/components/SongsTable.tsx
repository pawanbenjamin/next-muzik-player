"use client";
import { useEffect, useState } from "react";
import useStore from "../lib/hooks/useStore";
import { addToPlaylist } from "../lib/serverActions";
import { Song } from "../lib/store";

// Songs will be passed in, from a Server Component
export function SongsTable({ songs }: { songs: Song[] | undefined }) {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<[]>([]);

  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);

  // To fetch user playlists to possible add song to
  useEffect(() => {
    async function fetchPlaylists() {
      const res = await fetch("/api/playlists");
      if (!res.ok) {
        throw {
          message: "error fetching playlists"
        };
      } else {
        const { playlists } = await res.json();
        setPlaylists(playlists);
      }
    }
    fetchPlaylists();
  }, []);

  const { activeSongs, activeSong, changeActiveSongs, changeActiveSong } =
    useStore();

  function handlePlay() {
    changeActiveSongs(songs);
    if (songs !== undefined) {
      changeActiveSong(songs[0]);
    }
  }

  return (
    <div className="">
      <button className="text-xl mt-4 mb-4" onClick={handlePlay}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
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
          <div className="grid grid-cols-3 grid-rows-1" key={song.id}>
            <span>{song.name}</span>
            <div className="flex justify-end">
              <details className="dropdown">
                <summary>+</summary>
                <ul className="dropdown-content bg-neutral z-10 p-5 w-max overflow-auto h-36">
                  {playlists.map((playlist: any) => {
                    return (
                      <li
                        onClick={() => {
                          addToPlaylist(playlist.id, song.id);
                          alert("added");
                        }}
                        key={playlist.id}
                      >
                        <span>playlist {playlist.id}</span>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </div>

            <span className="flex justify-end">{song.duration}</span>
          </div>
        );
      })}

      {/* {showPlaylists && (
        <details>
          <ul className="dropdown-content">
            {playlists.map((playlist: any) => {
              return (
                <li
                  onClick={() => {
                    addToPlaylist(playlist.id, selectedSongId as number);
                    alert("added");
                  }}
                  key={playlist.id}
                >
                  {playlist.name}
                </li>
              );
            })}
          </ul>
        </details>
      )} */}
    </div>
  );
}
