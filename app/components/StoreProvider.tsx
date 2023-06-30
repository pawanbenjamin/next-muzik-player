"use client";

import { StoreProvider } from "easy-peasy";
import { store } from "../lib/store";

export default function EZStoreProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
