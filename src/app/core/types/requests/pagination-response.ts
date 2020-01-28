export interface PaginationResponse<T> {
  data: T[];
  links?: object;
  meta?: object;
}
