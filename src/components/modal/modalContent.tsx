import React, { HTMLAttributes } from "react";

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  height?: string;
  isFillInMobile?: boolean;
}

const ModalContent = ({
  children,
  onClick,
  height,
  isFillInMobile = false,
  ...props
}: ModalContentProps) => {
  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white opacity-100${
        height && `${height}`
      }${isFillInMobile && " w-full tablet:h-auto tablet:w-auto"} `}
      role="document"
      tabIndex={-1}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        event.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default ModalContent;
