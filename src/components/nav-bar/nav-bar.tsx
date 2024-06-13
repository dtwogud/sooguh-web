import React from "react";
import { cva } from "class-variance-authority";

export interface NavBarProps {
  setLinePath: (linePath: any) => void;
}

const NavBar = ({ setLinePath }: NavBarProps) => {
  const handleResetPath = () => {
    setLinePath([]);
  };

  return (
    <div className={wrapper()} style={{ zIndex: "800" }}>
      <button onClick={handleResetPath}>초기화</button>
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
