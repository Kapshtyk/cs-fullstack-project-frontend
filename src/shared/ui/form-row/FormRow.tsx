import React, { forwardRef, ReactNode } from "react";

import "./FormRow.scss";

interface FormRowProps {
  children: ReactNode;
}

const FormRow = forwardRef<HTMLDivElement, FormRowProps>(
  ({ children }, ref) => {
    return (
      <div className="form-row" ref={ref}>
        {children}
      </div>
    );
  },
);

FormRow.displayName = "FormRow";

export { FormRow };
