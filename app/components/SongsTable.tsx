"use client";
import { useEffect, useState } from "react";
import useStore from "../lib/hooks/useStore";
import { addToPlaylist } from "../lib/serverActions";
import type { Song } from "../lib/store";

export function SongsTable({ songs }: { songs: Song[] }) {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<[]>([]);

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
    <div className="bg-green-500">
      <button onClick={handlePlay}>Play Button!!!</button>
      {songs.map((song: any) => {
        return (
          <div key={song.id}>
            <span>{song.name}</span>
            <button onClick={() => setShowPlaylists(!showPlaylists)}>
              add to playlist
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
