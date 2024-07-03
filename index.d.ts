import "i18next";
import React from "react";
import { ICoordsState } from "@/src/hooks/useCoords";
import { AppProps } from "next/app";

declare global {
  interface AppLayoutProps<T = AppProps> {
    children: React.ReactNode;
    params: T;
    searchParams: { [key: string]: string | string[] | undefined };
    coords?: ICoordsState;
  }
}
