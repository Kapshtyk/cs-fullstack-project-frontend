import clsx from "clsx";

import "./FormLabel.scss";

interface FormLabelProps {
  name: string | undefined;
  id: string;
  error: string | undefined;
  label: string;
  hidden?: boolean;
}

export const FormLabel = ({
  label,
  name,
  id,
  error,
  hidden = false,
}: FormLabelProps) => {
  return (
    <label
      id={`label-${name}-${id}`}
      htmlFor={`${name}-${id}`}
      className={clsx(
        "label",
        [error && "label-error"],
        [hidden && "visually-hidden"],
      )}
    >
      {label}
    </label>
  );
};
