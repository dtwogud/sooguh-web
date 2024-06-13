import type { Metadata } from "next";
import "@/src/styles/globals.css";
import "@/src/styles/reset.css";

export const metadata: Metadata = {
  title: "SOOGUH",
  description: "우리 주변의 헌웃 수거함을 찾아보아요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: string;
}) {
  return (
    <html lang="ko">
      <body>
        <main
          className={
            "lg:p-[16px] sm:p-[8px] min-w-full min-h-screen grid relative"
          }
        >
          {children}
        </main>
      </body>
    </html>
  );
}
