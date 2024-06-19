import React from "react";
import { cva } from "class-variance-authority";

export interface WarningProps {
  message: string;
}

const Warning = ({ message }: WarningProps) => {
  return <div className={wrapper()}>{message}</div>;
};

export default Warning;

const wrapper = cva(["bg-[#000000]"]);
