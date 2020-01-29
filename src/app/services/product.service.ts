import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { PaginationResponse } from '../core/types/requests/pagination-response';
import { Product } from '../core/types/models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [];
  apiUrl =  environment.baseUrl + '/products';

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<PaginationResponse<Product>>(this.apiUrl)
      .pipe(
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
