import React from "react";
import { cva } from "class-variance-authority";
import { useMap } from "react-kakao-maps-sdk";

export interface ToastProps {
  message: React.ReactNode;
}

const Toast = ({ message }: ToastProps) => {
  return <div className={wrapper()}>{message}</div>;
};

export default Toast;

const wrapper = cva([
  "absolute",
  "bottom-[10%]",
  "z-[80]",
  "left-[50%]",
  "translate-x-[-50%] translate-y-[-50%]",
]);
