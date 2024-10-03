import { useId } from "react";
import clsx from "clsx";

import "./Checkbox.scss";

import { FormError } from "../form-error/FormError";
import { FormLabel } from "../form-label/FormLabel";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = ({
  label,
  onChange,
  value,
  error,
  name,
  ...props
}: CheckboxProps) => {
  const uniqueId = useId();

  return (
    <div className="checkbox-wrapper">
      <input
        {...props}
        value={value}
        onChange={(e) => onChange && onChange(e)}
        id={`${name}-${uniqueId}`}
        className={clsx("checkbox", [error && "checkbox-error"])}
        type="checkbox"
        aria-describedby={
          error ? `error-${uniqueId}` : `label-${name}-${uniqueId}`
        }
      />
      <FormLabel name={name} id={uniqueId} error={error} label={label} />
      <FormError error={error} id={uniqueId} />
    </div>
  );
};
