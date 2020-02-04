import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CartItem } from '../core/types/models/cart';
import { Product } from '../core/types/models/product';
import { CollectionResponse } from '../core/types/requests/pagination-response';
import { serverErrorHandle } from '../core/helpers/error-hadle';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];
  cart = JSON.parse(window.localStorage.getItem('cart')) || {};
  apiUrl =  environment.baseUrl + '/products/cart';

  constructor(
    private http: HttpClient
  ) { }

  addItem(product: Product, quantity: number) {
    const { id } = product;
    const cartItem = this.findById(id);

    if (this.cart[id] && cartItem) {
      const newQuantity = cartItem.quantity + quantity;
      cartItem.quantity = newQuantity;
      this.cart[id] = newQuantity;
    } else {
      this.items.push({
        product,
        quantity
      });
      this.cart[id] = quantity;
    }

    this.refreshCart();
  }

  removeItem(product: Product, quantity: number) {
    const { id } = product;
    const cartItem = this.findById(id);

    if (id in this.cart) {
      const newQuantity = this.cart[id] - quantity;
      if (newQuantity > 0) {
        this.cart[id] = newQuantity;
        if (cartItem) {
          cartItem.quantity = newQuantity;
        } else {
          this.items.push({
            product,
            quantity
          });
        }
      } else {
        this.items = this.items.filter(el => {
          return el.product.id !== id;
        });
        delete this.cart[id];
      }
    }
    this.refreshCart();
  }

  findById(id: number) {
    return this.items.find(element => {
      return element.product.id === id;
    });
  }

  calculateTotalCost() {
    let totalCost = 0;
    this.items.forEach(value => {
      totalCost += value.quantity * value.product.price;
    });

    return totalCost;
  }

  fetchCartItems() {
    const key = 'ids';
    const ids = Object.keys(this.cart);

    if (ids.length > 0) {
      const url = this.apiUrl + '?' + key + '[]=' + ids.join('&' + key + '[]=');

      return this.http.get<CollectionResponse<Product>>(url)
        .pipe(
          tap(response => {
            this.setCartItems(response.data);
          }),
          catchError(serverErrorHandle<CollectionResponse<Product>>({data: []}))
        );
    }
  }

  private setCartItems(dataFromServer: Product[]) {
    this.items = [];
    dataFromServer.forEach(product => {
      const id = product.id;
      const quantity = this.cart[id];

      if (quantity > 0) {
        this.items.push({
          product,
          quantity,
        });
      }
    });
  }

  private refreshCart() {
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

}
