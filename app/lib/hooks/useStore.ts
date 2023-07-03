"use client";
import { useStoreActions, useStoreState } from "easy-peasy";

export default function useStore() {
  // @ts-ignore
  const { changeActiveSong, changeActiveSongs, getMe } = useStoreActions(
    (actions) => actions
  );
  // @ts-ignore
  const { activeSong, activeSongs, user } = useStoreState((state) => state);

  console.log({
    store: {
      activeSong,
      activeSongs,
      changeActiveSong,
      changeActiveSongs,
      user
    }
  });

  return {
    user,
    getMe,
    activeSong,
    changeActiveSong,
    activeSongs,
    changeActiveSongs
  };
}
