"use client";

import { useId } from "react";
import clsx from "clsx";

import "./Textarea.scss";

import { FormError } from "../form-error/FormError";
import { FormLabel } from "../form-label/FormLabel";
import { FormRow } from "../form-row/FormRow";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = ({
  name,
  label,
  value,
  onChange,
  error,
  ...props
}: TextareaProps) => {
  const uniqueId = useId();

  return (
    <FormRow>
      <FormLabel name={name} id={uniqueId} error={error} label={label} />
      <textarea
        {...props}
        value={value}
        onChange={(e) => onChange && onChange(e)}
        id={`${name}-${uniqueId}`}
        className={clsx("textarea", [error && "textarea-error"])}
        aria-describedby={
          error ? `error-${uniqueId}` : `label-${name}-${uniqueId}`
        }
        rows={8}
      />
      <FormError error={error} id={uniqueId} />
    </FormRow>
  );
};
