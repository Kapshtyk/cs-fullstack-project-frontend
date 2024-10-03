export interface PaginatedResult<T> {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  items: T[];
}
