"use client";

import { forwardRef, HTMLInputTypeAttribute, useId } from "react";
import clsx from "clsx";

import "./Input.scss";

import { FormError } from "../form-error/FormError";
import { FormLabel } from "../form-label/FormLabel";
import { FormRow } from "../form-row/FormRow";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type, name, label, value, onChange, error, hideLabel = false, ...props },
  ref,
) {
  const uniqueId = useId();

  const getInputMode = (
    type: HTMLInputTypeAttribute,
    step?: string | number,
  ) => {
    switch (type) {
      case "number":
        return step && step.toString().includes(".") ? "decimal" : "numeric";
      case "email":
        return "email";
      case "tel":
        return "tel";
      case "url":
        return "url";
      case "search":
        return "search";
      default:
        return "text";
    }
  };

  return (
    <FormRow>
      <FormLabel
        name={name}
        id={uniqueId}
        error={error}
        label={label}
        hidden={hideLabel}
      />
      {type !== "date" && (
        <input
          {...props}
          value={value}
          onChange={(e) => onChange?.(e)}
          id={`${name}-${uniqueId}`}
          className={clsx("input", [error && "input-error"])}
          type={type}
          inputMode={getInputMode(type ?? "text", props.step)}
          aria-describedby={
            error ? `error-${uniqueId}` : `label-${name}-${uniqueId}`
          }
        />
      )}
      {type === "date" && (
        <input
          {...props}
          id={uniqueId}
          className={clsx("input", [error && "input-error"])}
          type="text"
          inputMode="none"
          value={value}
          readOnly
          maxLength={10}
          ref={ref}
          aria-describedby={error ? `error-${uniqueId}` : `label-${uniqueId}`}
        />
      )}
      <FormError id={uniqueId} error={error} />
    </FormRow>
  );
});
