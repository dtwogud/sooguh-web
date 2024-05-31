import React from "react";
import { cva } from "class-variance-authority";

const NavBar = () => {
  return <div className={wrapper()}>nav bar</div>;
};

export default NavBar;

const wrapper = cva(["w-[100%]", "h-[30px]"]);
