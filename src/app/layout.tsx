import type { Metadata } from "next";
import "@/src/styles/globals.css";
import "@/src/styles/reset.css";
import { CoordsProvider } from "@/src/context/coords.context";
import React from "react";
import { BASIC_COORDS } from "@/src/constants/basic-coords";

export const metadata: Metadata = {
  title: "SOOGUH",
  description: "우리 주변의 헌웃 수거함을 찾아보아요.",
};
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: string;
}) {
  return (
    <html lang="ko">
      <body>
        <CoordsProvider
          coords={{
            latitude: BASIC_COORDS.latitude,
            longitude: BASIC_COORDS.longitude,
          }}
        >
          <main
            className={
              "lg:p-[16px] sm:p-[8px] min-w-full min-h-screen grid relative overflow-scroll"
            }
          >
            {children}
          </main>
        </CoordsProvider>
      </body>
    </html>
  );
}
