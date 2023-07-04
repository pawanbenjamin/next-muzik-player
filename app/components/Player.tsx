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
    let timerId: number | undefined;

    if (playing && !isSeeking) {
      const f = () => {
        //@ts-ignore
        setSeek(soundRef?.current?.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      // When component unmounts (cleanup)
      return () => cancelAnimationFrame(timerId as number);
    }
    if (timerId !== undefined) {
      cancelAnimationFrame(timerId);
    }
  }, [playing, isSeeking]);

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      //@ts-ignore
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onSeek = (e) => {
    setIsSeeking(true);
    setSeek(parseFloat(e.target.value));
    //@ts-ignore
    soundRef.current.seek(parseFloat(e.target.value));
    setIsSeeking(false);
  };

  const onLoad = () => {
    //@ts-ignore
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
    <div className="col-span-2 pl-20 pr-20 grid grid-row-2">
      <div className="flex justify-center gap-7">
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
        <button onClick={() => setShuffle(!shuffle)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button onClick={prevSong}>
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {playing ? (
          <button onClick={() => setPlaying(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => setPlaying(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        <button onClick={nextSong}>
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button onClick={() => setRepeat(!repeat)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
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
