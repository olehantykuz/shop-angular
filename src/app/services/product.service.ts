import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Products } from '../core/interfaces/products';

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
    return this.http.get<Products>(this.apiUrl);
  }

}
