import React from "react";
import { RootStoreProvider } from "../contexts/RootStoreContext";

export default function RootStore({ children }: { children: React.ReactNode }) {
  return <RootStoreProvider>{children}</RootStoreProvider>;
}
