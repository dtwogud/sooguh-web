import React, { CSSProperties, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";

interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  form: UseFormReturn<T>;
  className?: string;
  style?: CSSProperties;
  handleSubmit: (values: T) => void;
  children: ReactNode | ReactNode[];
}

function Form<T extends FieldValues>(
  props: React.PropsWithChildren<FormProps<T>>,
) {
  const { form, className, style, handleSubmit, children } = props;
  return (
    <FormProvider {...form}>
      <form
        className={className ? className : "flex flex-col gap-[40px]"}
        style={style}
        onSubmit={(event) => {
          form.handleSubmit(handleSubmit)(event);
          event.stopPropagation();
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
