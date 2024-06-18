"use client";
import React, { CSSProperties, forwardRef, useState } from "react";
import { cva } from "class-variance-authority";

export interface TextInputProps {
  name?: string;
  secureText?: boolean;
  placeHolder?: string;
  value?: string;
  onChange?: (value: string) => void;
  max?: number | string | undefined;
  maxLength?: number | undefined;
  min?: number | string | undefined;
  minLength?: number | undefined;
  multiple?: boolean | undefined;
  autoComplete?: boolean;
  readOnly?: boolean;
  readOnlyCssDisabled?: boolean;
  leftIcon?: React.ReactNode;
  leftIconClassName?: string;
  rightIcon?: React.ReactNode;
  rightIconClassName?: string;
  variants?: "default" | "rectangular";
  className?: string;
  onBlur?: (value: string) => void;
  type?: "number";
  style?: CSSProperties;
  defaultValue?: string;
}

const TextInput = forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<TextInputProps>
>((props, ref) => {
  const {
    placeHolder,
    secureText,
    autoComplete,
    children,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    className,
    readOnly,
    readOnlyCssDisabled = false,
    defaultValue,
    ...rest
  } = props;

  const [hideText, setHideText] = useState(true);

  const InputStyle = {
    default: "rounded",
    rectangular: "rounded-[64px]",
  };

  return (
    <div
      className={Wrapper({
        className: `${rightIcon ? `${className} flex items-center px-[8px]` : className}`,
      })}
    >
      {/*// @ts-ignore */}
      <input
        className={Input()}
        id={rest.name}
        ref={ref}
        type={secureText && hideText ? "password" : "text"}
        placeholder={placeHolder}
        autoComplete={autoComplete ? "on" : "off"}
        readOnly={readOnly}
        defaultValue={props.defaultValue}
        step={"0.01"}
        {...rest}
      />
      {rightIcon && rightIcon}
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;

const Wrapper = cva([
  "border-[2px] border-key-color",
  "rounded-[12px]",
  "my-[12px]",
  "bg-white",
]);

const Input = cva([
  "rounded-[12px]",
  "w-full",
  "text-[16px]",
  "font-[500]",
  "leading-[20px]",
  "h-[50px]",
  "p-[5px]",
  "outline-none",
]);
