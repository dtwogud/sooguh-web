import { ErrorMessage } from "@hookform/error-message";
import React, { CSSProperties } from "react";
import { useController, useFormContext } from "react-hook-form";
import { UseControllerProps } from "react-hook-form";

interface FormItemProps {
  label?: React.ReactNode;
  name: string;
  hidden?: boolean;
  successPrompt?: string;
  errorPrompt?: string;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  rules?: UseControllerProps["rules"];
  className?: string;
}

export default function FormItem(
  props: React.PropsWithChildren<FormItemProps>,
) {
  const {
    label,
    name,
    successPrompt,
    errorPrompt,
    rules,
    style,
    hidden,
    labelStyle,
    children,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={
        props.className
          ? props.className
          : hidden
            ? "hidden"
            : "relative flex w-full flex-col gap-[4px]"
      }
      style={style}
    >
      {label ? (
        <label
          className="text-14 font-normal text-gray-02 tablet:text-14"
          style={labelStyle}
          htmlFor={name}
        >
          {label}
          {rules?.required && <span className="font-normal text-error">*</span>}
        </label>
      ) : null}
      {children &&
        React.cloneElement(children as React.ReactElement, {
          id: name,
          ...register(name, { ...rules }),
        })}
      {successPrompt ? (
        <p className={"text-[12px] font-normal text-highlight"}>
          *{successPrompt}
        </p>
      ) : (
        !errorPrompt && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) =>
              message && (
                <p className={"text-[12px] font-normal text-[red]"}>
                  *{message}
                </p>
              )
            }
          />
        )
      )}
      {errorPrompt && (
        <p className={"text-[12px] font-normal text-error"}>*{errorPrompt}</p>
      )}
    </div>
  );
}
