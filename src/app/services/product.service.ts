import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { PaginationResponse } from '../core/types/requests/pagination-response';
import { Product } from '../core/types/models/product';
import { environment } from '../../environments/environment';
import { IPaginationLinks, IPaginationMeta } from '../core/types/requests/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [];
  apiUrl =  environment.baseUrl + '/products';
  paginationMeta: IPaginationMeta = {
    current_page: 1,
    from: null,
    last_page: 1,
    path: this.apiUrl,
    per_page: 15,
    to: null,
    total: 0,
  };

  paginationLinks: IPaginationLinks = {
    first: this.apiUrl,
    last: this.apiUrl,
    prev: null,
    next: null,
  };

  constructor(
    private http: HttpClient
  ) { }

  getProducts(url?: string) {
    return this.http.get<PaginationResponse<Product>>(url || this.apiUrl)
      .pipe(
        tap(response => {
          this.paginationMeta = response.meta;
          this.paginationLinks = response.links;
          this.products = response.data;
        }),
        catchError(this.handleError<PaginationResponse<Product>>({data: []}))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
