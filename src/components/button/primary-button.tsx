"use client";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Spinner from "@/src/components/common/spinner";

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: "default" | "underline" | "outlined" | "rectangular";
  size?: "small" | "medium" | "large";
  icon?: React.ReactElement;
  title: string;
  loading?: boolean;
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      loading = false,
      variants = "default",
      size = "medium",
      icon,
      title,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const buttonTypeStyle = {
      default: "button-contained",
      underline: "button-underline",
      outlined: "button-outlined",
      rectangular: "button-rectangular",
    };

    const buttonSize = {
      small: "h-[42px]",
      medium: "h-[48px]",
      large: "h-[54px]",
    };

    return (
      <button
        {...rest}
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${buttonTypeStyle[variants]}
          ${buttonSize[size]} 
          ${className ?? ""}
          relative flex items-center justify-center bg-key-color text-[white] disabled:text-system-grey-04 disabled:border-gray-05 disabled:bg-system-grey-06-50-no-alpha rounded-[8px] text-[14px] font-[600] leading-[24px] hover:scale-[1.02] transition-transform duration-300 ease-in-out
        `}
      >
        {!loading && <>{icon && <div className={"mr-[8px]"}>{icon}</div>}</>}
        {loading ? <Spinner width={20} /> : title}
      </button>
    );
  },
);

PrimaryButton.displayName = "PrimaryButton";
export default PrimaryButton;
