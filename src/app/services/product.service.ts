import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PaginationResponse } from '../core/types/requests/pagination-response';
import { Product } from '../core/types/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [];
  apiUrl = 'http://shop-local.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<PaginationResponse<Product>>(this.apiUrl);
  }

}
