import React from "react";

interface SpinnerProps {
  width?: number;
  height?: number;
  borderWidth?: number;
}

export default function Spinner(props: SpinnerProps) {
  const { width = 22, borderWidth = 2 } = props;
  return (
    <div
      className="animate-spin"
      style={{
        width,
        aspectRatio: "1 / 1",
        borderRadius: "100%",
        borderWidth,
        borderStyle: "solid",
        borderBottomColor: "transparent",
        borderImage: "initial",
        animationFillMode: "both",
      }}
    />
  );
}
