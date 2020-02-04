export interface IPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface IPaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginationResponse<T> {
  data: T[];
  links?: IPaginationLinks;
  meta?: IPaginationMeta;
}

export interface CollectionResponse<T> {
  data: T[];
}
