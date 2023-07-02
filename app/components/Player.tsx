"use client";
import EZStoreProvider from "./StoreProvider";
import useStore from "../lib/hooks/useStore";
import ReactHowler from "react-howler";
import { useRef, useEffect, useState } from "react";

export default function Player() {
  const { activeSongs, activeSong, changeActiveSong } = useStore();
  const soundRef = useRef(null);
  const [playing, setPlaying] = useState(true);

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

  return (
    <div className="bg-red-200">
      <EZStoreProvider>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
        <div>
          <button>🔀</button>
          <button>⬅️</button>
          {playing ? <button>⏸️</button> : <button>▶️</button>}
          <button>➡️</button>
          <button>🔂</button>
        </div>
        <input type="range" step={0.1} />
      </EZStoreProvider>
    </div>
  );
}
