import { createContext, ReactNode, useContext } from "react";
import guessStore from "./guessStore";
import React from "react";

class RootStore {
  guessStore = guessStore;
}

export const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);

export const useStore = () => useContext(RootStoreContext);

export function RootStoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return React.createElement(
    RootStoreContext.Provider,
    { value: rootStore },
    children
  );
}
