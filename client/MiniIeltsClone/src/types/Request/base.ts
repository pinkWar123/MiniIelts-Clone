export interface BaseQuery {
  pageNumber: number;
  pageSize: number;
  orderBy?: string;
  isDescending?: boolean;
  sortBy?: string;
}
