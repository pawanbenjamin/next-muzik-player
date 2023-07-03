"use client";

import useStore from "../lib/hooks/useStore";
import ReactHowler from "react-howler";
import { useRef, useEffect, useState } from "react";

export default function Player() {
  const { activeSongs, activeSong, changeActiveSong } = useStore();

  const [playing, setPlaying] = useState(true);
  const [shuffle, setShuffle] = useState(false);

  const [index, setIndex] = useState(0);

  const [duration, setDuration] = useState(0.0);
  const [repeat, setRepeat] = useState(false);

  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);

  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {
    changeActiveSong(activeSongs[index]);
  }, [index, changeActiveSong, activeSongs]);

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef?.current?.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      // When component unmounts (cleanup)
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onSeek = (e) => {
    setIsSeeking(true);
    setSeek(parseFloat(e.target.value));
    soundRef.current.seek(parseFloat(e.target.value));
    setIsSeeking(false);
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const prevSong = () => {
    setIndex((state: any) => {
      return state ? state - 1 : activeSongs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state: any) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * activeSongs.length);
        if (next === state) {
          return nextSong();
        }
        return next;
      }
      return state === activeSongs.length - 1 ? 0 : state + 1;
    });
  };

  if (!activeSong) {
    return null;
  }

  return (
    <div className="bg-red-200">
      <button
        onClick={() => {
          console.log(soundRef.current);
        }}
      >
        Log SOUND REF
      </button>
      <ReactHowler
        ref={soundRef}
        playing={playing}
        src={activeSong?.url}
        onLoad={onLoad}
        onEnd={onEnd}
      />
      <div>
        <button onClick={() => setShuffle(!shuffle)}>🔀</button>
        <button onClick={prevSong}>⬅️</button>
        {playing ? (
          <button onClick={() => setPlaying(false)}>⏸️</button>
        ) : (
          <button onClick={() => setPlaying(true)}>▶️</button>
        )}
        <button onClick={nextSong}>➡️</button>
        <button onClick={() => setRepeat(!repeat)}>🔂</button>
      </div>
      <input
        className="range"
        type="range"
        step={0.1}
        min={0}
        max={duration ? +duration.toFixed(2) : 0}
        value={seek}
        onChange={onSeek}
      />
    </div>
  );
}
