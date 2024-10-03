import WarningIcon from "@/shared/icons/warning.svg";

import "./FormError.scss";

interface FormErrorProps {
  error: string | undefined;
  id: string;
}

export const FormError = ({ error, id }: FormErrorProps) => {
  return error ? (
    <span id={`error-${id}`} className="error-message">
      <WarningIcon />
      {error}
    </span>
  ) : null;
};
