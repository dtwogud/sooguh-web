import type { Metadata } from "next";
import "@/src/styles/globals.css";
import "@/src/styles/reset.css";
import { CoordsProvider } from "@/src/context/coords.context";
import { AppLayoutProps } from "@/index";

export const metadata: Metadata = {
  title: "SOOGUH",
  description: "우리 주변의 헌웃 수거함을 찾아보아요.",
};

export default function RootLayout(props: AppLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <CoordsProvider coords={props.coords}>
          <main
            className={
              "lg:p-[16px] sm:p-[8px] min-w-full min-h-screen grid relative"
            }
          >
            {props.children}
          </main>
        </CoordsProvider>
      </body>
    </html>
  );
}
