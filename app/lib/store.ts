"use client";
import { createStore, action, thunk } from "easy-peasy";
import { Action, StateMapper, FilterActionTypes, Thunk } from "easy-peasy";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
} | null;

export type Song = {
  artistId: number;
  duration: number;
  id: number;
  name: string;
  url: string;
} | null;

export type Store = {
  activeSong: Song;
  changeActiveSong: Action<{}, any>;
  activeSongs: Song[];
  changeActiveSongs: Action<{}, any>;
  getMe: Thunk<{}, any>;
  user: User;
  setUser: Action<{}, any>;
};

export const store = createStore<Store>({
  user: null,
  activeSongs: [],
  activeSong: null,

  setUser: action((state, payload) => {
    state.user = payload;
  }),
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    console.log("payload", payload);
    state.activeSong = payload;
  }),
  getMe: thunk(async (actions, payload) => {
    const response = await fetch("/api/auth/me");
    if (!response.ok) {
      console.error("Error fetching loged in user");
    } else {
      const { user } = await response.json();
      actions.setUser(user);
    }
  })
});
