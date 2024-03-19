export interface IPagination {
  pageSize: number;
  selectedPage: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  skipRows: number;
  maxPageSize: number
}
