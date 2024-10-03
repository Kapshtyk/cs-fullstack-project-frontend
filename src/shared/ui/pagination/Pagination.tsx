import React from "react";

import { Button } from "@/shared/ui/";

import "./Pagination.scss";

import { BasePaginatedQuery } from "../../model";

interface PaginationProps<T extends BasePaginatedQuery> {
  totalItems: number;
  queryProps: T;
}

export const Pagination = <T extends BasePaginatedQuery>({
  totalItems,
  queryProps,
}: PaginationProps<T>) => {
  const totalPages = Math.ceil(totalItems / queryProps.perPage);

  if (totalPages === 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      {queryProps.page > 1 ? (
        <Button
          as="a"
          scroll={false}
          href={{
            query: { ...queryProps, page: +queryProps.page - 1 },
          }}
        >
          Previous
        </Button>
      ) : (
        <Button disabled>Previous</Button>
      )}
      {queryProps.page < totalPages ? (
        <Button
          as="a"
          scroll={false}
          href={{
            query: { ...queryProps, page: +queryProps.page + 1 },
          }}
        >
          Next
        </Button>
      ) : (
        <Button disabled>Next</Button>
      )}
    </div>
  );
};
