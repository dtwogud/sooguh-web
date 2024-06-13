"use client";

import React, { createContext, useReducer } from "react";
import { ICoordsState } from "@/src/hooks/useCoords";

type Action =
  | { type: "UPDATE_COORDS"; payload: CoordsContextProps }
  | { type: "RESET_COORDS" };

export interface CoordsContextProps {
  coords?: ICoordsState;
}

function reducer(state: CoordsContextProps, action: Action) {
  switch (action.type) {
    case "UPDATE_COORDS":
      return { ...state, ...action.payload };
    case "RESET_COORDS":
      delete state.coords;
      return { ...state };
    default:
      throw Error("Unknown action.");
  }
}

const CoordsContext = createContext<{
  state: CoordsContextProps;
  dispatch: React.Dispatch<Action>;
}>({
  state: {},
  dispatch: () => null,
});

export function CoordsProvider(
  props: React.PropsWithChildren<CoordsContextProps>,
) {
  const [state, dispatch] = useReducer(reducer, { coords: props.coords });
  return (
    <CoordsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CoordsContext.Provider>
  );
}

export default CoordsContext;
