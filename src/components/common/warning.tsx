import React from "react";
import { cva } from "class-variance-authority";

export interface WarningProps {
  message: string;
}

const Warning = ({ message }: WarningProps) => {
  return <div className={wrapper()}>{message}</div>;
};

export default Warning;

const wrapper = cva([
  "bg-[rgba(0,0,0,0.7)]",
  "rounded-[6px]",
  "text-[red]",
  "absolute",
  "top-[80px]",
  "px-[12px]",
  "py-[6px]",
  "z-[100]",
]);
