import React from "react";
import { cva } from "class-variance-authority";
import { ICoordsState } from "@/src/hooks/useCoords";

export interface NavBarProps {
  setLinePath: (linePath: any) => void;
  curCoords: ICoordsState;
}

const NavBar = ({ setLinePath, curCoords }: NavBarProps) => {
  const handleResetPath = () => {
    setLinePath([]);
  };

  const handleToCurCoords = () => {
    console.log("123", curCoords);
  };

  return (
    <div className={wrapper()} style={{ zIndex: "800" }}>
      <button onClick={handleResetPath}>초기화</button>
      &nbsp;
      <button onClick={handleToCurCoords}> | 현재 위치로 돌아가기</button>
    </div>
  );
};

export default NavBar;

const wrapper = cva([
  "z-80",
  "absolute",
  "text-[16px]",
  "font-[500]",
  "leading-[20px]",
  "h-[50px]",
  "p-[5px]",
  "flex items-center",
  "fixed sm:inset-x-[8px] lg:inset-x-[16px] lg:top-[12px] sm:top-[8px]",
  "rounded-[12px]",
  "border-[2px]",
  "border-[green]",
  "bg-[white]",
]);
