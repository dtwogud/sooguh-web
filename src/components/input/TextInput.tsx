"use client";
import React, { CSSProperties, forwardRef, useState } from "react";

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
    onChange,
    onBlur,
    placeHolder,
    secureText,
    autoComplete,
    value = "",
    // rightButton,
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value ?? "");
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    onBlur?.(e.target.value ?? "");
  }

  const InputStyle = {
    default: "rounded",
    rectangular: "rounded-[64px]",
  };

  return (
    <div
      className={`flex items-center justify-center gap-10 ${className} [&_input]:w-full`}
    >
      <div
        className={`flex grow items-center rounded border-system-grey-02 border-opacity-100 focus-within:border-[1px] focus-within:border-key-color-01 focus-within:outline-0 ${
          InputStyle[props.variants ?? "default"]
        } ${
          readOnly && !readOnlyCssDisabled
            ? "read-only:bg-gray-06 read-only:text-gray-02"
            : "bg-[white]"
        }`}
      >
        {leftIcon && (
          <div className="pl-[10px] pr-[16px]">
            {React.isValidElement(leftIcon) &&
              React.cloneElement(leftIcon, {
                ...leftIcon.props,
                className: leftIconClassName,
              })}
          </div>
        )}
        {/*// @ts-ignore*/}
        <input
          className={`grow rounded text-[14px] leading-[20px] outline-none placeholder:text-system-grey-02 p-[14px] bg-system-grey-06-50-no-alpha ${
            !readOnlyCssDisabled
              ? " read-only:bg-system-grey-06 read-only:text-gray-02"
              : ""
          }`}
          id={rest.name}
          ref={ref}
          type={secureText && hideText ? "password" : "text"}
          placeholder={placeHolder}
          // onChange={handleChange}
          // onBlur={handleBlur}
          autoComplete={autoComplete ? "on" : "off"}
          // value={value}
          readOnly={readOnly}
          defaultValue={props.defaultValue}
          step={"0.01"}
          {...rest}
        />
        {secureText && (
          <button
            type="button"
            className="absolute right-[1.6rem]"
            onClick={() => setHideText(!hideText)}
          ></button>
        )}
        {children}
        {rightIcon && (
          <div className="pl-[16px] pr-[10px]">
            {React.isValidElement(rightIcon) &&
              React.cloneElement(rightIcon, {
                ...rightIcon.props,
                className: rightIconClassName,
              })}
          </div>
        )}
      </div>
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
