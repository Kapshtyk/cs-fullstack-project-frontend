import { AxiosError } from "axios";

import { HttpError, ValidationError } from "./error.type";

interface ErrorHandlerProps {
  error: AxiosError<HttpError | ValidationError> | Error | null;
}

export const processError = (
  props: ErrorHandlerProps,
): {
  status: string;
  message: string[];
} => {
  const { error } = props;

  if (!error) {
    return {
      status: "Unknown error",
      message: ["Unknown error"],
    };
  }

  if (error instanceof AxiosError) {
    if (error.response?.data && "errors" in error.response.data) {
      const errors = error.response.data.errors;
      const errorMessages: string[] = [];

      for (const key in errors) {
        errorMessages.push(...errors[key]);
      }
      return {
        status:
          error.response?.data?.title ||
          error.response?.statusText ||
          error.status?.toString() ||
          "Unknown error",
        message: errorMessages,
      };
    } else {
      return {
        status:
          error.response?.statusText ||
          error.status?.toString() ||
          "Unknown error",
        message: [error.response?.data?.detail || error.message],
      };
    }
  } else if (error instanceof Error) {
    return {
      status: "Error",
      message: [error.message],
    };
  }

  return {
    status: "Unknown error",
    message: ["Unknown error"],
  };
};
