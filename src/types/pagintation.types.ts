export interface PagedResult<T> {
  total: number;
  offset: number;
  count: number;
  items: T[];
}
