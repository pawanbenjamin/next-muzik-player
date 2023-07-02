"use client";

import useStore from "../lib/hooks/useStore";
import ReactHowler from "react-howler";
import { useRef, useEffect, useState } from "react";

export default function Player() {
  const { activeSongs, activeSong, changeActiveSong } = useStore();
  const soundRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [index, setIndex] = useState(
    activeSongs.findIndex((s: any) => s.id === activeSong.id)
  );

  if (!activeSong) {
    return null;
  }

  const onEnd = () => {
    // if (repeatRef.current) {
    //   setSeek(0);
    //   soundRef.current.seek(0);
    // } else {
    //   nextSong();
    // }
  };

  const onLoad = () => {
    // const songDuration = soundRef.current.duration();
    // setDuration(songDuration);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : activeSongs.length - 1;
    });
  };

  return (
    <div className="bg-red-200">
      <ReactHowler
        ref={soundRef}
        playing={playing}
        src={activeSong?.url}
        onLoad={onLoad}
        onEnd={onEnd}
      />
      <div>
        <button onClick={() => onShuffle()}>🔀</button>
        <button onClick={prevSong}>⬅️</button>
        {playing ? <button>⏸️</button> : <button>▶️</button>}
        <button>➡️</button>
        <button>🔂</button>
      </div>
      <input type="range" step={0.1} />
    </div>
  );
}
