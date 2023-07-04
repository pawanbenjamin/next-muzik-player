"use client";
import { useEffect, useState } from "react";
import useStore from "../lib/hooks/useStore";
import { addToPlaylist } from "../lib/serverActions";
import type { Song } from "../lib/store";

// Songs will be passed in, from a Server Component
export function SongsTable({ songs }: { songs: Song[] | undefined }) {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<[]>([]);

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
    changeActiveSong(songs[0]);
  }

  return (
    <div className="">
      <button className="text-xl mt-4 mb-4" onClick={handlePlay}>
        ▶️
      </button>
      {songs.map((song: any) => {
        return (
          <div className="grid grid-cols-3 grid-rows-1" key={song.id}>
            <span>{song.name}</span>
            <button
              className="font-extrabold"
              onClick={() => setShowPlaylists(!showPlaylists)}
            >
              +
            </button>
            {showPlaylists && (
              <ul>
                {
                  // ! Check this TYPE!
                }
                {playlists.map((playlist: any) => {
                  return (
                    <li
                      onClick={() => {
                        addToPlaylist(playlist.id, song.id);
                        alert("added");
                      }}
                      key={playlist.id}
                    >
                      {playlist.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
