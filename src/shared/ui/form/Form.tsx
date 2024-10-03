import React, { forwardRef } from "react";
import clsx from "clsx";

import "./Form.scss";

import { Button } from "../button/Button";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formTitle: string;
  buttonLabel: string;
  wide?: boolean;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    { children, onSubmit, formTitle, buttonLabel, wide = false, ...props },
    ref,
  ) => {
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className={clsx("form", { "form--wide": wide })}
        {...props}
      >
        <h2 className="h3">{formTitle}</h2>
        {children}
        <Button type="submit">{buttonLabel}</Button>
      </form>
    );
  },
);

Form.displayName = "Form";
