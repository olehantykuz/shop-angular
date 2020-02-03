import { Injectable } from '@angular/core';

import { CartItem } from '../core/types/models/cart';
import { Product } from '../core/types/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];

  constructor() { }

  addItem(item: Product, quantity: number) {
    this.items.push({
      item,
      quantity
    });
  }

}
