import React from "react";
import toast from "react-hot-toast";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { processError } from "./error-handler";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        const data = processError({ error });
        toast.error(
          React.createElement(
            "div",
            null,
            React.createElement("h3", null, data.status),
            React.createElement("p", null, data.message.join(", ")),
          ),
        );
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.log("error", error);
        const data = processError({ error });
        toast.error(
          React.createElement(
            "div",
            null,
            React.createElement("h3", null, data.status),
            React.createElement("p", null, data.message.join(", ")),
          ),
        );
      },
      onSuccess: () => {
        toast.success(
          React.createElement(
            "div",
            null,
            React.createElement("h3", null, "Success"),
            React.createElement("p", null, "The operation was successful."),
          ),
          {
            duration: 5000,
          },
        );
      },
    }),
  });
}
