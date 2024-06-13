import React from "react";
import { cva } from "class-variance-authority";

const NavBar = () => {
  return (
    <div className={wrapper()} style={{ zIndex: "800" }}>
      asdf
    </div>
  );
};

export default NavBar;

const wrapper = cva([
  "z-80",
  "absolute",
  "bg-[pink]",
  "text-[16px]",
  "font-[500]",
  "leading-[20px]",
  "p-[20px]",
  "fixed inset-x-[16px] top-[0]",
  "rounded-[12px]",
  "border-[2px]",
  "border-[red]",
]);
